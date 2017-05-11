package models

import (
	"fmt"
	"time"

	"github.com/Machiel/slugify"
	"github.com/jinzhu/gorm"
)

type ArticleStorer interface {
	CreateArticle(*Article) error
	DeleteArticle(*Article) error
	GetAllArticles() *gorm.DB
	GetAllArticlesAuthoredBy(string) ([]Article, error)
	GetAllArticlesFavoritedBy(string) ([]Article, error)
	GetAllArticlesWithTag(string) ([]Article, error)
	GetArticle(string) (*Article, error)
	FavoriteArticle(int, int) error
	UnfavoriteArticle(int, int) error
	FindUserByUsername(string) (*User, error)
	IsFavorited(int, int) bool
	IsFollowing(int, int) bool
	SaveArticle(*Article) error
}

// Article the article model
type Article struct {
	ID             int
	Slug           string
	Title          string
	Description    string
	Body           string
	User           User
	UserID         int
	Tags           []Tag `gorm:"many2many:taggings;"`
	Favorites      []Favorite
	FavoritesCount int
	CreatedAt      time.Time
	UpdatedAt      time.Time
}

type ValidationMessages map[string]interface{}

// NewArticle returns a new Article instance.
func NewArticle(title string, description string, body string, user *User) *Article {
	return &Article{
		Title:       title,
		Description: description,
		Body:        body,
		User:        *user,
	}
}

// IsValid check if the article has a valid title, description and body
func (a *Article) IsValid() (bool, map[string]interface{}) {
	var errs = ValidationMessages{}
	var valid = true

	if a.Title == "" {
		errs["title"] = []string{"title field can't be blank"}
		valid = false
	}

	if a.Description == "" {
		errs["description"] = []string{"description field can't be blank"}
		valid = false
	}

	if a.Body == "" {
		errs["body"] = []string{"body field can't be blank"}
		valid = false
	}

	return valid, errs
}

// IsOwnedBy check if the article is owned by the given username
func (a *Article) IsOwnedBy(username string) bool {
	return a.User.Username == username
}

// CreateArticle persist a new article
func (db *DB) CreateArticle(article *Article) (err error) {
	err = db.Create(&article).Error
	return
}

// DeleteArticle persist a new article
func (db *DB) DeleteArticle(article *Article) (err error) {
	err = db.Delete(&article).Error
	return
}

// SaveArticle save an article to the database.
func (db *DB) SaveArticle(article *Article) (err error) {
	err = db.Save(&article).Error
	return
}

// GetArticle retrieve an article by it slug
func (db *DB) GetArticle(slug string) (*Article, error) {
	var article Article
	err := db.DB.Scopes(defaultScope).First(&article, "slug = ?", slug).Error
	return &article, err
}

// GetAllArticles returns all articles.
func (db *DB) GetAllArticles() *gorm.DB {
	return db.Scopes(defaultScope)
}

func (db *DB) GetAllArticlesWithTag(tagName string) (articles []Article, err error) {
	err = db.Scopes(defaultScope).
		Joins("JOIN taggings ON taggings.article_id = articles.id").
		Joins("JOIN tags ON tags.id = taggings.tag_id").
		Where("tags.name = ?", tagName).
		Find(&articles).Error
	return
}

func (db *DB) GetAllArticlesAuthoredBy(username string) (articles []Article, err error) {
	err = db.Scopes(defaultScope).
		Joins("JOIN users ON users.id = articles.user_id").
		Where("users.username = ?", username).
		Find(&articles).Error
	return
}

func (db *DB) GetAllArticlesFavoritedBy(username string) (articles []Article, err error) {
	err = db.Scopes(defaultScope).
		Joins("JOIN favorites ON favorites.article_id = articles.id").
		Joins("JOIN users ON users.id = favorites.user_id").
		Where("users.username = ?", username).
		Find(&articles).Error
	return
}

func (db *DB) IsFavorited(userID int, articleID int) bool {
	f := Favorite{ArticleID: articleID, UserID: userID}
	if db.Where(f).First(&f).RecordNotFound() {
		return false
	}
	return true
}

func (db *DB) IsFollowing(userIDFrom int, userIDTo int) bool {
	// TODO
	return false
}

func (db *DB) FindUserByUsername(username string) (*User, error) {
	var user User
	err := db.First(&user, "username = ?", username).Error
	return &user, err
}

func (db *DB) FavoriteArticle(userID int, articleID int) error {
	var err error
	f := Favorite{UserID: userID, ArticleID: articleID}

	if !db.IsFavorited(userID, articleID) {
		err = db.Create(&f).Error
	} else {
		err = fmt.Errorf("This article is already in your favorites !")
	}

	return err
}

func (db *DB) UnfavoriteArticle(userID int, articleID int) error {
	var err error
	f := Favorite{UserID: userID, ArticleID: articleID}

	if db.IsFavorited(userID, articleID) {
		err = db.Delete(&f).Error
	} else {
		err = fmt.Errorf("Cannot remove this article from your favorites. This article is not in your favorites !")
	}

	return err
}

// Callbacks

// BeforeCreate gorm callback
func (a *Article) BeforeCreate() (err error) {
	a.Slug = slugify.Slugify(a.Title)
	return
}

func (a *Article) BeforeUpdate() (err error) {
	a.Slug = slugify.Slugify(a.Title)
	return
}

// Scopes

// Order articles by created_at DESC eager loading Tags and User
func defaultScope(db *gorm.DB) *gorm.DB {
	return db.Order("articles.created_at desc").
		Preload("Tags").
		Preload("User")
}
