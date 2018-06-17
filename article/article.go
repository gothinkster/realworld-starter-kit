package article

import (
	"github.com/jinzhu/gorm"
	"github.com/xesina/golang-echo-realworld-example-app/user"
)

type Article struct {
	gorm.Model
	Slug        string      `gorm:"unique_index;not null"`
	Title       string      `gorm:"not null"`
	Description string
	Body        string
	Author      user.User
	AuthorID    uint
	Comments    []Comment
	Favorites   []user.User `gorm:"many2many:favorites;"`
	Tags        []Tag       `gorm:"many2many:article_tags;association_autocreate:false"`
}
type Comment struct {
	gorm.Model
	Article   Article
	ArticleID uint
	User      user.User
	UserID    uint
	Body      string
}

type Tag struct {
	gorm.Model
	Tag      string    `gorm:"unique_index"`
	Articles []Article `gorm:"many2many:article_tags;"`
}

type Storage interface {
	GetBySlug(string) (*Article, error)
	GetUserArticleBySlug(userID uint, slug string) (*Article, error)
	CreateArticle(*Article) error
	UpdateArticle(*Article, []string) error
	DeleteArticle(*Article) error
	List(offset, limit int) ([]Article, int, error)
	ListByTag(tag string, offset, limit int) ([]Article, int, error)
	ListByAuthor(username string, offset, limit int) ([]Article, int, error)
	ListByWhoFavorited(username string, offset, limit int) ([]Article, int, error)
	ListFeed(userID uint, offset, limit int) ([]Article, int, error)

	AddComment(*Article, *Comment) error
	GetCommentsBySlug(string) ([]Comment, error)
	GetCommentByID(uint) (*Comment, error)
	DeleteComment(*Comment) error

	AddFavorite(*Article, uint) error
	RemoveFavorite(*Article, uint) error
	ListTags() ([]Tag, error)
}
