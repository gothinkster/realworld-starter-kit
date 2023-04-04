package db

import (
	"context"

	"github.com/jackc/pgx/v4"
)

type Store interface {
	Querier // Querier gives access sqlc-generated methods
	CreateArticleTx(ctx context.Context, arg CreateArticleTxParams) (*CreateArticleTxResult, error)
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
		id, err := qtx.CreateTag(ctx, tag)
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
