// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.17.2

package db

import (
	"context"
)

type Querier interface {
	AddComment(ctx context.Context, arg AddCommentParams) (*Comment, error)
	CountArticles(ctx context.Context) (int64, error)
	CountArticlesByAuthor(ctx context.Context, username string) (int64, error)
	CountArticlesByFavorited(ctx context.Context, username string) (int64, error)
	CountArticlesByFollowing(ctx context.Context, username string) (int64, error)
	CountArticlesByTag(ctx context.Context, name string) (int64, error)
	CreateArticle(ctx context.Context, arg CreateArticleParams) (*Article, error)
	CreateArticleTag(ctx context.Context, arg CreateArticleTagParams) (*ArticleTag, error)
	CreateTag(ctx context.Context, arg CreateTagParams) (string, error)
	CreateUser(ctx context.Context, arg CreateUserParams) (*User, error)
	DeleteArticle(ctx context.Context, arg DeleteArticleParams) error
	DeleteComment(ctx context.Context, id string) error
	DoesFavoriteExist(ctx context.Context, arg DoesFavoriteExistParams) (bool, error)
	FavoriteArticle(ctx context.Context, arg FavoriteArticleParams) error
	FollowUser(ctx context.Context, arg FollowUserParams) error
	GetArticleBySlug(ctx context.Context, slug string) (*GetArticleBySlugRow, error)
	GetArticleIDBySlug(ctx context.Context, slug string) (string, error)
	GetCommentsBySlug(ctx context.Context, slug string) ([]*GetCommentsBySlugRow, error)
	GetTags(ctx context.Context) ([]string, error)
	GetUser(ctx context.Context, id string) (*User, error)
	GetUserByEmail(ctx context.Context, email string) (*User, error)
	GetUserByUsername(ctx context.Context, username string) (*User, error)
	IsFollowing(ctx context.Context, arg IsFollowingParams) (bool, error)
	ListArticles(ctx context.Context, arg ListArticlesParams) ([]*ListArticlesRow, error)
	ListArticlesByAuthor(ctx context.Context, arg ListArticlesByAuthorParams) ([]*ListArticlesByAuthorRow, error)
	ListArticlesByFavorited(ctx context.Context, arg ListArticlesByFavoritedParams) ([]*ListArticlesByFavoritedRow, error)
	ListArticlesByFollowing(ctx context.Context, arg ListArticlesByFollowingParams) ([]*ListArticlesByFollowingRow, error)
	ListArticlesByTag(ctx context.Context, arg ListArticlesByTagParams) ([]*ListArticlesByTagRow, error)
	UnfavoriteArticle(ctx context.Context, arg UnfavoriteArticleParams) error
	UnfollowUser(ctx context.Context, arg UnfollowUserParams) error
	UpdateArticle(ctx context.Context, arg UpdateArticleParams) (*Article, error)
	UpdateUser(ctx context.Context, arg UpdateUserParams) (*User, error)
}

var _ Querier = (*Queries)(nil)
