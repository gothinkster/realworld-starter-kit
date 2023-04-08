package db

import (
	"context"
	"errors"
	"github.com/jackc/pgx/v4"
	"github.com/rs/xid"
)

var (
	ErrArticleNotFound = errors.New("article not found")
)

type Store interface {
	Querier // Querier gives access sqlc-generated methods
	CreateArticleTx(ctx context.Context, arg CreateArticleTxParams) (*CreateArticleTxResult, error)
	FavoriteArticleTx(ctx context.Context, arg FavoriteArticleTxParams) (*FavoriteArticleTxResult, error)
	UnfavoriteArticleTx(ctx context.Context, arg UnfavoriteArticleTxParams) (*UnfavoriteArticleTxResult, error)
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
	article, err := qtx.CreateArticle(ctx, arg.CreateArticleParams)
	if err != nil {
		return nil, err
	}
	tags := arg.Tags
	for _, tag := range tags {
		p := CreateTagParams{
			ID: xid.New().String(),
			Name: tag,
		}
		id, err := qtx.CreateTag(ctx, p)
		if err != nil {
			return nil, err
		}
		_, err = qtx.CreateArticleTag(ctx, CreateArticleTagParams{
			ArticleID: article.ID,
			TagID:     id,
		})
		if err != nil {
			return nil, err
		}
	}
	user, err := qtx.GetUser(ctx, article.AuthorID)
	if err != nil {
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

type FavoriteArticleTxParams struct {
	UserID  string
	Slug 	string
}

type FavoriteArticleTxResult struct {
	Article *GetArticleBySlugRow
	Favorited bool
	Following bool
}

func (store *ConduitStore) FavoriteArticleTx(
	ctx context.Context, 
	arg FavoriteArticleTxParams,
	)(*FavoriteArticleTxResult, error) {
		
		tx, err := store.db.Begin(context.Background())	
		if err != nil {
			return nil, err
		}
		defer tx.Rollback(context.Background())
		qtx := store.Queries.WithTx(tx)
		arcticleID, err := qtx.GetArticleIDBySlug(ctx, arg.Slug)
		if err != nil {
			if err == pgx.ErrNoRows {
				return nil, ErrArticleNotFound
			}
			return nil, err
		}
		p := DoesFavoriteExistParams{
			ArticleID: arcticleID,
			UserID:    arg.UserID,
		}
		ok, err := qtx.DoesFavoriteExist(ctx, p)  // unnecessary query 
		if err != nil {
			return nil, err
		}
		if !ok {
			p1 := FavoriteArticleParams{
				ArticleID: arcticleID,
				UserID:    arg.UserID,
			}
			err = qtx.FavoriteArticle(ctx, p1)   // cannot ignored error 25P02
			if err != nil {                      // in transaction
				return nil, err
			}			
		}
		article, err := qtx.GetArticleBySlug(ctx, arg.Slug)
		if err != nil {
			return nil, err
		}
		p2 := IsFollowingParams{
			FollowerID: arg.UserID,
			FollowingID: *article.AuthorID,
		}
		isFollowing, err := store.IsFollowing(ctx, p2)
		if err != nil {
			return nil, err
		}
		if err = tx.Commit(context.Background()); err != nil {
			return nil, err
		}
		return &FavoriteArticleTxResult{
			Article: article,
			Favorited: true,
			Following: isFollowing,
		}, nil

}

type UnfavoriteArticleTxParams struct {
	UserID  string
	Slug 	string
}

type UnfavoriteArticleTxResult struct {
	Article *GetArticleBySlugRow
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
				return nil, ErrArticleNotFound
			}
			return nil, err
		}
		p := DoesFavoriteExistParams{
			ArticleID: arcticleID,
			UserID:    arg.UserID,
		}
		ok, err := qtx.DoesFavoriteExist(ctx, p)  // unnecessary query 
		if err != nil {
			return nil, err
		}
		if ok {
			p1 := UnfavoriteArticleParams{
				ArticleID: arcticleID,
				UserID:    arg.UserID,
			}
			err = qtx.UnfavoriteArticle(ctx, p1)   // cannot ignored error 25P02
			if err != nil {                      // in transaction
				return nil, err
			}			
		}
		article, err := qtx.GetArticleBySlug(ctx, arg.Slug)
		if err != nil {
			return nil, err
		}
		p2 := IsFollowingParams{
			FollowerID: arg.UserID,
			FollowingID: *article.AuthorID,
		}
		isFollowing, err := store.IsFollowing(ctx, p2)
		if err != nil {
			return nil, err
		}
		if err = tx.Commit(context.Background()); err != nil {
			return nil, err
		}
		return &UnfavoriteArticleTxResult{
			Article: article,
			Favorited: false,
			Following: isFollowing,
		}, nil
}