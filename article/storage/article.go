package storage

import (
	"github.com/jinzhu/gorm"
	"github.com/xesina/golang-echo-realworld-example-app/article"
	"github.com/xesina/golang-echo-realworld-example-app/user"
)

type ArticleStore struct {
	db *gorm.DB
}

func NewArticleStorage(db *gorm.DB) *ArticleStore {
	return &ArticleStore{
		db: db,
	}
}

func (as *ArticleStore) Init() error {
	return as.db.AutoMigrate(
		&article.Article{},
		&article.Comment{},
		&article.Tag{},
	).Error
}

func (as *ArticleStore) GetBySlug(s string) (*article.Article, error) {
	var model article.Article
	err := as.db.Where(&article.Article{Slug: s}).Preload("Favorites").Preload("Tags").Preload("Author").Find(&model).Error
	if err != nil {
		if gorm.IsRecordNotFoundError(err) {
			return nil, nil
		}
		return nil, err
	}
	return &model, err
}

func (as *ArticleStore) GetUserArticleBySlug(userID uint, slug string) (*article.Article, error) {
	var model article.Article
	err := as.db.Where(&article.Article{Slug: slug, AuthorID: userID}).Find(&model).Error
	if err != nil {
		if gorm.IsRecordNotFoundError(err) {
			return nil, nil
		}
		return nil, err
	}
	return &model, err
}

func (as *ArticleStore) CreateArticle(a *article.Article) error {
	tx := as.db.Begin()
	if err := tx.Create(&a).Error; err != nil {
		return err
	}
	for _, t := range a.Tags {
		err := tx.Where(&article.Tag{Tag: t.Tag}).First(&t).Error
		if err != nil && !gorm.IsRecordNotFoundError(err) {
			tx.Rollback()
			return err
		}
		if err := tx.Model(&a).Association("Tags").Append(t).Error; err != nil {
			tx.Rollback()
			return err
		}
	}
	if err := tx.Where(a.ID).Preload("Favorites").Preload("Tags").Preload("Author").Find(&a).Error; err != nil {
		tx.Rollback()
		return err
	}
	return tx.Commit().Error
}

func (as *ArticleStore) UpdateArticle(a *article.Article, tagList []string) error {
	tx := as.db.Begin()
	if err := tx.Model(a).Update(a).Error; err != nil {
		return err
	}
	tags := make([]article.Tag, 0)
	for _, t := range tagList {
		tag := article.Tag{Tag: t}
		err := tx.Where(&tag).First(&tag).Error
		if err != nil && !gorm.IsRecordNotFoundError(err) {
			tx.Rollback()
			return err
		}
		tags = append(tags, tag)
	}
	if err := tx.Model(a).Association("Tags").Replace(tags).Error; err != nil {
		tx.Rollback()
		return err
	}
	if err := tx.Where(a.ID).Preload("Favorites").Preload("Tags").Preload("Author").Find(a).Error; err != nil {
		tx.Rollback()
		return err
	}
	return tx.Commit().Error
}

func (as *ArticleStore) DeleteArticle(a *article.Article) error {
	return as.db.Delete(a).Error
}

func (as *ArticleStore) List(offset, limit int) ([]article.Article, int, error) {
	var (
		articles []article.Article
		count    int
	)
	as.db.Model(&articles).Count(&count)
	as.db.Preload("Favorites").Preload("Tags").Preload("Author").Offset(offset).Limit(limit).Find(&articles)
	return articles, count, nil
}

func (as *ArticleStore) ListByTag(tag string, offset, limit int) ([]article.Article, int, error) {
	var (
		t        article.Tag
		articles []article.Article
		count    int
	)
	err := as.db.Where(&article.Tag{Tag: tag}).First(&t).Error
	if err != nil {
		return nil, 0, err
	}
	as.db.Model(&t).Preload("Favorites").Preload("Tags").Preload("Author").Offset(offset).Limit(limit).Association("Articles").Find(&articles)
	count = as.db.Model(&t).Association("Articles").Count()
	return articles, count, nil
}

func (as *ArticleStore) ListByAuthor(username string, offset, limit int) ([]article.Article, int, error) {
	var (
		u        user.User
		articles []article.Article
		count    int
	)
	err := as.db.Where(&user.User{Username: username}).First(&u).Error
	if err != nil {
		return nil, 0, err
	}
	as.db.Where(&article.Article{AuthorID: u.ID}).Preload("Favorites").Preload("Tags").Preload("Author").Offset(offset).Limit(limit).Find(&articles)
	as.db.Where(&article.Article{AuthorID: u.ID}).Model(&article.Article{}).Count(&count)

	return articles, count, nil
}

func (as *ArticleStore) ListByWhoFavorited(username string, offset, limit int) ([]article.Article, int, error) {
	var (
		u        user.User
		articles []article.Article
		count    int
	)
	err := as.db.Where(&user.User{Username: username}).First(&u).Error
	if err != nil {
		return nil, 0, err
	}
	as.db.Model(&u).Preload("Favorites").Preload("Tags").Preload("Author").Offset(offset).Limit(limit).Association("Favorites").Find(&articles)
	count = as.db.Model(&u).Association("Favorites").Count()
	return articles, count, nil
}

func (as *ArticleStore) ListFeed(userID uint, offset, limit int) ([]article.Article, int, error) {
	var (
		u        user.User
		articles []article.Article
		count    int
	)
	err := as.db.First(&u, userID).Error
	if err != nil {
		return nil, 0, err
	}
	var followings []user.Follow
	as.db.Model(&u).Preload("Following").Preload("Follower").Association("Followings").Find(&followings)
	var ids []uint
	for _, i := range followings {
		ids = append(ids, i.FollowingID)
	}
	as.db.Where("author_id in (?)", ids).Preload("Favorites").Preload("Tags").Preload("Author").Offset(offset).Limit(limit).Find(&articles)
	as.db.Where(&article.Article{AuthorID: u.ID}).Model(&article.Article{}).Count(&count)
	return articles, count, nil
}

func (as *ArticleStore) AddComment(a *article.Article, c *article.Comment) error {
	err := as.db.Model(a).Association("Comments").Append(c).Error
	if err != nil {
		return err
	}
	return as.db.Where(c.ID).Preload("User").First(c).Error
}

func (as *ArticleStore) GetCommentsBySlug(slug string) ([]article.Comment, error) {
	var model article.Article
	if err := as.db.Where(&article.Article{Slug: slug}).Preload("Comments").Preload("Comments.User").First(&model).Error; err != nil {
		if gorm.IsRecordNotFoundError(err) {
			return nil, nil
		}
		return nil, err
	}
	return model.Comments, nil
}

func (as *ArticleStore) GetCommentByID(id uint) (*article.Comment, error) {
	var model article.Comment
	if err := as.db.Where(id).First(&model).Error; err != nil {
		if gorm.IsRecordNotFoundError(err) {
			return nil, nil
		}
		return nil, err
	}
	return &model, nil
}

func (as *ArticleStore) DeleteComment(c *article.Comment) error {
	return as.db.Delete(c).Error
}

func (as *ArticleStore) AddFavorite(a *article.Article, userID uint) error {
	usr := user.User{}
	usr.ID = userID
	return as.db.Model(a).Association("Favorites").Append(&usr).Error
}

func (as *ArticleStore) RemoveFavorite(a *article.Article, userID uint) error {
	usr := user.User{}
	usr.ID = userID
	return as.db.Model(a).Association("Favorites").Delete(&usr).Error
}

func (as *ArticleStore) ListTags() ([]article.Tag, error) {
	var tags []article.Tag
	if err := as.db.Find(&tags).Error; err != nil {
		return nil, err
	}
	return tags, nil
}
