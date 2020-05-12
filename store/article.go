package store

import (
	"github.com/jinzhu/gorm"
	"github.com/xesina/golang-echo-realworld-example-app/model"
)

type ArticleStore struct {
	db *gorm.DB
}

func NewArticleStore(db *gorm.DB) *ArticleStore {
	return &ArticleStore{
		db: db,
	}
}

func (as *ArticleStore) GetBySlug(s string) (*model.Article, error) {
	var m model.Article

	err := as.db.Where(&model.Article{Slug: s}).Preload("Favorites").Preload("Tags").Preload("Author").Find(&m).Error
	if err != nil {
		if gorm.IsRecordNotFoundError(err) {
			return nil, nil
		}

		return nil, err
	}

	return &m, err
}

func (as *ArticleStore) GetUserArticleBySlug(userID uint, slug string) (*model.Article, error) {
	var m model.Article

	err := as.db.Where(&model.Article{Slug: slug, AuthorID: userID}).Find(&m).Error
	if err != nil {
		if gorm.IsRecordNotFoundError(err) {
			return nil, nil
		}

		return nil, err
	}

	return &m, err
}

func (as *ArticleStore) CreateArticle(a *model.Article) error {
	tags := a.Tags

	tx := as.db.Begin()
	if err := tx.Create(&a).Error; err != nil {
		tx.Rollback()
		return err
	}

	for _, t := range a.Tags {
		err := tx.Where(&model.Tag{Tag: t.Tag}).First(&t).Error
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

	a.Tags = tags

	return tx.Commit().Error
}

func (as *ArticleStore) UpdateArticle(a *model.Article, tagList []string) error {
	tx := as.db.Begin()
	if err := tx.Model(a).Update(a).Error; err != nil {
		tx.Rollback()
		return err
	}

	tags := make([]model.Tag, 0)

	for _, t := range tagList {
		tag := model.Tag{Tag: t}

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

func (as *ArticleStore) DeleteArticle(a *model.Article) error {
	return as.db.Delete(a).Error
}

func (as *ArticleStore) List(offset, limit int) ([]model.Article, int, error) {
	var (
		articles []model.Article
		count    int
	)

	as.db.Model(&articles).Count(&count)
	as.db.Preload("Favorites").
		Preload("Tags").
		Preload("Author").
		Offset(offset).
		Limit(limit).
		Order("created_at desc").Find(&articles)

	return articles, count, nil
}

func (as *ArticleStore) ListByTag(tag string, offset, limit int) ([]model.Article, int, error) {
	var (
		t        model.Tag
		articles []model.Article
		count    int
	)

	err := as.db.Where(&model.Tag{Tag: tag}).First(&t).Error
	if err != nil {
		return nil, 0, err
	}

	as.db.Model(&t).
		Preload("Favorites").
		Preload("Tags").
		Preload("Author").
		Offset(offset).
		Limit(limit).
		Order("created_at desc").
		Association("Articles").
		Find(&articles)

	count = as.db.Model(&t).Association("Articles").Count()

	return articles, count, nil
}

func (as *ArticleStore) ListByAuthor(username string, offset, limit int) ([]model.Article, int, error) {
	var (
		u        model.User
		articles []model.Article
		count    int
	)

	err := as.db.Where(&model.User{Username: username}).First(&u).Error
	if err != nil {
		return nil, 0, err
	}

	as.db.Where(&model.Article{AuthorID: u.ID}).
		Preload("Favorites").
		Preload("Tags").
		Preload("Author").
		Offset(offset).
		Limit(limit).
		Order("created_at desc").
		Find(&articles)
	as.db.Where(&model.Article{AuthorID: u.ID}).Model(&model.Article{}).Count(&count)

	return articles, count, nil
}

func (as *ArticleStore) ListByWhoFavorited(username string, offset, limit int) ([]model.Article, int, error) {
	var (
		u        model.User
		articles []model.Article
		count    int
	)

	err := as.db.Where(&model.User{Username: username}).First(&u).Error
	if err != nil {
		return nil, 0, err
	}

	as.db.Model(&u).
		Preload("Favorites").
		Preload("Tags").
		Preload("Author").
		Offset(offset).
		Limit(limit).
		Order("created_at desc").
		Association("Favorites").
		Find(&articles)

	count = as.db.Model(&u).Association("Favorites").Count()

	return articles, count, nil
}

func (as *ArticleStore) ListFeed(userID uint, offset, limit int) ([]model.Article, int, error) {
	var (
		u        model.User
		articles []model.Article
		count    int
	)

	err := as.db.First(&u, userID).Error
	if err != nil {
		return nil, 0, err
	}

	var followings []model.Follow

	as.db.Model(&u).Preload("Following").Preload("Follower").Association("Followings").Find(&followings)

	if len(followings) == 0 {
		return articles, 0, nil
	}

	ids := make([]uint, len(followings))
	for i, f := range followings {
		ids[i] = f.FollowingID
	}

	as.db.Where("author_id in (?)", ids).
		Preload("Favorites").
		Preload("Tags").
		Preload("Author").
		Offset(offset).
		Limit(limit).
		Order("created_at desc").
		Find(&articles)
	as.db.Where(&model.Article{AuthorID: u.ID}).Model(&model.Article{}).Count(&count)

	return articles, count, nil
}

func (as *ArticleStore) AddComment(a *model.Article, c *model.Comment) error {
	err := as.db.Model(a).Association("Comments").Append(c).Error
	if err != nil {
		return err
	}

	return as.db.Where(c.ID).Preload("User").First(c).Error
}

func (as *ArticleStore) GetCommentsBySlug(slug string) ([]model.Comment, error) {
	var m model.Article
	err := as.db.Where(&model.Article{Slug: slug}).Preload("Comments").Preload("Comments.User").First(&m).Error

	if err != nil {
		if gorm.IsRecordNotFoundError(err) {
			return nil, nil
		}

		return nil, err
	}

	return m.Comments, nil
}

func (as *ArticleStore) GetCommentByID(id uint) (*model.Comment, error) {
	var m model.Comment
	if err := as.db.Where(id).First(&m).Error; err != nil {
		if gorm.IsRecordNotFoundError(err) {
			return nil, nil
		}

		return nil, err
	}

	return &m, nil
}

func (as *ArticleStore) DeleteComment(c *model.Comment) error {
	return as.db.Delete(c).Error
}

func (as *ArticleStore) AddFavorite(a *model.Article, userID uint) error {
	usr := model.User{}
	usr.ID = userID

	return as.db.Model(a).Association("Favorites").Append(&usr).Error
}

func (as *ArticleStore) RemoveFavorite(a *model.Article, userID uint) error {
	usr := model.User{}
	usr.ID = userID

	return as.db.Model(a).Association("Favorites").Delete(&usr).Error
}

func (as *ArticleStore) ListTags() ([]model.Tag, error) {
	var tags []model.Tag
	if err := as.db.Find(&tags).Error; err != nil {
		return nil, err
	}

	return tags, nil
}
