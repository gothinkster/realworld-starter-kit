package db

import (
	"context"
	"errors"
	"fmt"
	"math/rand"
	"regexp"
	"strings"
	"time"

	"github.com/jackc/pgx/v4"
	"github.com/rs/xid"
)

var (
	ErrNotFound  = errors.New("resourse not found")
	ErrForbidden = errors.New("action forbidden")
)

type Store interface {
	Querier // Querier gives access sqlc-generated methods
	CreateArticleTx(ctx context.Context, arg CreateArticleTxParams) (*CreateArticleTxResult, error)
	UpdateArticleTx(ctx context.Context, arg UpdateArticleTxParams) (*UpdateArticleTxResult, error)
	FavoriteArticleTx(ctx context.Context, arg FavoriteArticleTxParams) (*FavoriteArticleTxResult, error)
	UnfavoriteArticleTx(ctx context.Context, arg UnfavoriteArticleTxParams) (*UnfavoriteArticleTxResult, error)
	DeleteArticleTx(ctx context.Context, arg DeleteArticleTxParams) error
	DeleteCommentTx(ctx context.Context, arg DeleteCommentTxParams) error
}

type ConduitStore struct {
	*Queries // implements Querier
	db       *pgx.Conn
}

func NewConduitStore(db *pgx.Conn) Store {
	return &ConduitStore{
		db:      db,
		Queries: New(db),
	}
}

type CreateArticleTxParams struct {
	CreateArticleParams
	Tags []string
}

type CreateArticleTxResult struct {
	Article *Article
	Tags    []string
	User    *User
}

func (store *ConduitStore) CreateArticleTx(
	ctx context.Context,
	arg CreateArticleTxParams,
) (*CreateArticleTxResult, error) {

	tx, err := store.db.Begin(context.Background())
	if err != nil {
		return nil, err
	}
	defer tx.Rollback(context.Background())
	qtx := store.Queries.WithTx(tx)
	var (
		found   bool
		attempt int
	)

	for !found {
		if attempt > 3 {
			found = true
		}
		attempt++
		uniqueSlug := createUniqueSlug(arg.Title)
		articleID, err := NullableID(qtx.GetArticleIDBySlug(ctx, uniqueSlug))
		if err != nil {
			fmt.Printf("4: error: %v", err)
			return nil, err
		}
		if articleID == "" {
			found = true
			arg.Slug = uniqueSlug
		}
	}
	fmt.Printf("arg: %+v\n", arg)
	article, err := qtx.CreateArticle(ctx, arg.CreateArticleParams)
	if err != nil {
		fmt.Printf("5: error: %v\n", err)
		return nil, err
	}
	tags := arg.Tags
	for _, tag := range tags {
		p := CreateTagParams{
			ID:   xid.New().String(),
			Name: tag,
		}
		id, err := qtx.CreateTag(ctx, p)
		if err != nil {
			fmt.Printf("6: error: %v\n", err)
			return nil, err
		}
		_, err = qtx.CreateArticleTag(ctx, CreateArticleTagParams{
			ArticleID: article.ID,
			TagID:     id,
		})
		if err != nil {
			fmt.Printf("7: error: %v\n", err)
			return nil, err
		}
	}
	user, err := qtx.GetUser(ctx, article.AuthorID)
	if err != nil {
		fmt.Printf("8: error: %v\n", err)
		return nil, err
	}
	if err = tx.Commit(context.Background()); err != nil {
		return nil, err
	}
	return &CreateArticleTxResult{
		Article: article,
		Tags:    tags,
		User:    user,
	}, nil
}

type UpdateArticleTxParams struct {
	UpdateArticleParams
}

type UpdateArticleTxResult struct {
	Article   *GetArticleBySlugRow
	Favorited bool
	Following bool
}

func (store *ConduitStore) UpdateArticleTx(
	ctx context.Context,
	arg UpdateArticleTxParams,
) (*UpdateArticleTxResult, error) {

	tx, err := store.db.Begin(context.Background())
	if err != nil {
		return nil, err
	}
	defer tx.Rollback(context.Background())
	qtx := store.Queries.WithTx(tx)
	a, err := Nullable(qtx.GetArticleAuthorIDBySlug(ctx, *arg.Slug))
	if err != nil {
		fmt.Printf("1: error: %v", err)
		return nil, err
	}
	if a == nil {
		fmt.Printf("2: error: %v", err)
		return nil, ErrNotFound
	}
	if a.AuthorID != arg.AuthorID {
		fmt.Printf("3: error: %v", err)
		return nil, ErrForbidden
	}
	arg.ID = a.ID
	if arg.Title != nil {
		var (
			found   bool
			attempt int
		)
		for !found {
			if attempt > 3 {
				found = true
			}
			attempt++
			uniqueSlug := createUniqueSlug(*arg.Title)
			articleID, err := NullableID(qtx.GetArticleIDBySlug(ctx, uniqueSlug))
			if err != nil {
				fmt.Printf("4: error: %v", err)
				return nil, err
			}
			if articleID == "" {
				found = true
				arg.Slug = &uniqueSlug
			}
		}
	}
	fmt.Printf("arg: %+v\n", arg)
	updatedArticle, err := qtx.UpdateArticle(ctx, arg.UpdateArticleParams)
	if err != nil {
		fmt.Printf("5: error: %v\n", err)
		return nil, err
	}
	article, err := qtx.GetArticleBySlug(ctx, updatedArticle.Slug)
	if err != nil {
		fmt.Printf("6: error: %v\n", err)
		return nil, err
	}
	favorited, err := qtx.DoesFavoriteExist(ctx, DoesFavoriteExistParams{
		ArticleID: article.ID,
		UserID:    article.AuthorID,
	})
	if err != nil {
		fmt.Printf("7: error: %v", err)
		return nil, err
	}
	if err = tx.Commit(context.Background()); err != nil {
		fmt.Printf("8: error: %v", err)
		return nil, err
	}
	return &UpdateArticleTxResult{
		article,
		favorited,
		false,
	}, nil

}

type FavoriteArticleTxParams struct {
	UserID string
	Slug   string
}

type FavoriteArticleTxResult struct {
	Article   *GetArticleBySlugRow
	Favorited bool
	Following bool
}

func (store *ConduitStore) FavoriteArticleTx(
	ctx context.Context,
	arg FavoriteArticleTxParams,
) (*FavoriteArticleTxResult, error) {

	tx, err := store.db.Begin(context.Background())
	if err != nil {
		return nil, err
	}
	defer tx.Rollback(context.Background())
	qtx := store.Queries.WithTx(tx)
	arcticleID, err := qtx.GetArticleIDBySlug(ctx, arg.Slug)
	if err != nil {
		if err == pgx.ErrNoRows {
			return nil, ErrNotFound
		}
		return nil, err
	}
	p := DoesFavoriteExistParams{
		ArticleID: arcticleID,
		UserID:    arg.UserID,
	}
	ok, err := qtx.DoesFavoriteExist(ctx, p) // unnecessary query
	if err != nil {
		return nil, err
	}
	if !ok {
		p1 := FavoriteArticleParams{
			ArticleID: arcticleID,
			UserID:    arg.UserID,
		}
		err = qtx.FavoriteArticle(ctx, p1) // cannot ignored error 25P02
		if err != nil {                    // in transaction
			return nil, err
		}
	}
	article, err := qtx.GetArticleBySlug(ctx, arg.Slug)
	if err != nil {
		return nil, err
	}
	p2 := IsFollowingParams{
		FollowerID:  arg.UserID,
		FollowingID: article.AuthorID,
	}
	isFollowing, err := store.IsFollowing(ctx, p2)
	if err != nil {
		return nil, err
	}
	if err = tx.Commit(context.Background()); err != nil {
		return nil, err
	}
	return &FavoriteArticleTxResult{
		Article:   article,
		Favorited: true,
		Following: isFollowing,
	}, nil

}

type UnfavoriteArticleTxParams struct {
	UserID string
	Slug   string
}

type UnfavoriteArticleTxResult struct {
	Article   *GetArticleBySlugRow
	Favorited bool
	Following bool
}

func (store *ConduitStore) UnfavoriteArticleTx(
	ctx context.Context,
	arg UnfavoriteArticleTxParams,
) (*UnfavoriteArticleTxResult, error) {

	tx, err := store.db.Begin(context.Background())
	if err != nil {
		return nil, err
	}
	defer tx.Rollback(context.Background())
	qtx := store.Queries.WithTx(tx)
	arcticleID, err := qtx.GetArticleIDBySlug(ctx, arg.Slug)
	if err != nil {
		if err == pgx.ErrNoRows {
			return nil, ErrNotFound
		}
		return nil, err
	}
	p := DoesFavoriteExistParams{
		ArticleID: arcticleID,
		UserID:    arg.UserID,
	}
	ok, err := qtx.DoesFavoriteExist(ctx, p) // unnecessary query
	if err != nil {
		return nil, err
	}
	if ok {
		p1 := UnfavoriteArticleParams{
			ArticleID: arcticleID,
			UserID:    arg.UserID,
		}
		err = qtx.UnfavoriteArticle(ctx, p1) // cannot ignored error 25P02
		if err != nil {                      // in transaction
			return nil, err
		}
	}
	article, err := qtx.GetArticleBySlug(ctx, arg.Slug)
	if err != nil {
		return nil, err
	}
	p2 := IsFollowingParams{
		FollowerID:  arg.UserID,
		FollowingID: article.AuthorID,
	}
	isFollowing, err := store.IsFollowing(ctx, p2)
	if err != nil {
		return nil, err
	}
	if err = tx.Commit(context.Background()); err != nil {
		return nil, err
	}
	return &UnfavoriteArticleTxResult{
		Article:   article,
		Favorited: false,
		Following: isFollowing,
	}, nil
}

type DeleteArticleTxParams struct {
	UserID string
	Slug   string
}

func (store *ConduitStore) DeleteArticleTx(
	ctx context.Context,
	arg DeleteArticleTxParams,
) error {

	tx, err := store.db.Begin(context.Background())
	if err != nil {
		return err
	}
	defer tx.Rollback(context.Background())
	qtx := store.Queries.WithTx(tx)
	articleAuthorID, err := NullableID(qtx.GetArticleAuthorID(ctx, arg.Slug))
	if err != nil {
		return err
	}
	if articleAuthorID == "" {
		return ErrNotFound
	}
	if articleAuthorID != arg.UserID {
		return ErrForbidden
	}
	err = qtx.DeleteArticle(ctx, arg.Slug)
	if err != nil {
		return err
	}
	if err = tx.Commit(context.Background()); err != nil {
		return err
	}
	return nil
}

type DeleteCommentTxParams struct {
	CommentID string
	UserID    string
}

func (store *ConduitStore) DeleteCommentTx(
	ctx context.Context,
	arg DeleteCommentTxParams,
) error {

	tx, err := store.db.Begin(context.Background())
	if err != nil {
		return err
	}
	defer tx.Rollback(context.Background())
	qtx := store.Queries.WithTx(tx)
	commentAuthorID, err := NullableID(qtx.GetCommentAuthorID(ctx, arg.CommentID))
	if err != nil {
		return err
	}
	if commentAuthorID == "" {
		return ErrNotFound
	}
	if commentAuthorID != arg.UserID {
		return ErrForbidden
	}
	err = qtx.DeleteComment(ctx, arg.CommentID)
	if err != nil {
		return err
	}
	if err = tx.Commit(context.Background()); err != nil {
		return err
	}
	return nil

}

func Nullable[T any](row *T, err error) (*T, error) {
	if err == nil {
		return row, nil
	}

	if err == pgx.ErrNoRows {
		return nil, nil
	}

	return nil, err
}

func NullableID(row string, err error) (string, error) {
	if err == nil {
		return row, nil
	}

	if err == pgx.ErrNoRows {
		return "", nil
	}

	return "", err
}

func createUniqueSlug(title string) string {
	slug := createSlug(title)
	randomString := generateRandomString(12)
	return slug + "-" + randomString
}

func createSlug(title string) string {
	// Convert to lowercase
	slug := strings.ToLower(title)

	// Replace non-alphanumeric characters with a hyphen
	reg := regexp.MustCompile("[^a-z0-9]+")
	slug = reg.ReplaceAllString(slug, "-")

	// Remove consecutive hyphens and trailing hyphens
	reg = regexp.MustCompile("-+")
	slug = reg.ReplaceAllString(slug, "-")
	slug = strings.Trim(slug, "-")

	return slug
}

func generateRandomString(length int) string {
	rng := rand.New(rand.NewSource(time.Now().UnixNano()))
	chars := []rune("abcdefghijklmnopqrstuvwxyz0123456789")
	result := make([]rune, length)
	for i := range result {
		result[i] = chars[rng.Intn(len(chars))]
	}
	return string(result)
}
