package handler

import (
	"errors"
	"net/http"
	"strconv"

	"github.com/jinzhu/gorm"
	"github.com/labstack/echo"
	"github.com/xesina/golang-echo-realworld-example-app/models"
)

func (h *Handler) Articles(c echo.Context) error {
	tag := c.QueryParam("tag")
	author := c.QueryParam("author")
	favoritedBy := c.QueryParam("favorited")
	offset, err := strconv.Atoi(c.QueryParam("offset"))
	if err != nil {
		offset = 0
	}
	limit, err := strconv.Atoi(c.QueryParam("limit"))
	if err != nil {
		limit = 20
	}
	var articles []models.Article
	var count int
	if tag != "" {
		var t models.Tag
		err := h.db.Where(&models.Tag{Tag: tag}).First(&t).Error
		if err == nil {
			h.db.Model(&t).Preload("Favorites").Preload("Tags").Preload("Author").Offset(offset).Limit(limit).Association("Articles").Find(&articles)
			count = h.db.Model(&t).Association("Articles").Count()
		}
	} else if author != "" {
		var u models.User
		err := h.db.Where(&models.User{Username: author}).First(&u).Error
		if err == nil {
			h.db.Where(&models.Article{AuthorID: u.ID}).Preload("Favorites").Preload("Tags").Preload("Author").Offset(offset).Limit(limit).Find(&articles)
			h.db.Where(&models.Article{AuthorID: u.ID}).Model(&models.Article{}).Count(&count)
		}
	} else if favoritedBy != "" {
		var u models.User
		err := h.db.Where(&models.User{Username: favoritedBy}).First(&u).Error
		if err == nil {
			h.db.Model(&u).Preload("Favorites").Preload("Tags").Preload("Author").Offset(offset).Limit(limit).Association("Favorites").Find(&articles)
			count = h.db.Model(&u).Association("Favorites").Count()
		}
	} else {
		h.db.Model(&articles).Count(&count)
		h.db.Preload("Favorites").Preload("Tags").Preload("Author").Offset(offset).Limit(limit).Find(&articles)
	}
	return c.JSON(http.StatusOK, newArticleListResponse(c, articles, count))
}

func (h *Handler) Feed(c echo.Context) error {
	offset, err := strconv.Atoi(c.QueryParam("offset"))
	if err != nil {
		offset = 0
	}
	limit, err := strconv.Atoi(c.QueryParam("limit"))
	if err != nil {
		limit = 20
	}
	var articles []models.Article
	var count int
	var u models.User
	if err := h.db.First(&u, userIDFromToken(c)).Error; err != nil {
		return c.JSON(http.StatusNotFound, NewError(err))
	}
	var followings []models.Follow
	h.db.Model(&u).Preload("Following").Preload("Follower").Association("Followings").Find(&followings)
	var ids []uint
	for _, i := range followings {
		ids = append(ids, i.FollowingID)
	}
	h.db.Where("author_id in (?)", ids).Preload("Favorites").Preload("Tags").Preload("Author").Offset(offset).Limit(limit).Find(&articles)
	h.db.Where(&models.Article{AuthorID: u.ID}).Model(&models.Article{}).Count(&count)

	return c.JSON(http.StatusOK, newArticleListResponse(c, articles, count))
}

func (h *Handler) GetArticle(c echo.Context) error {
	var article models.Article
	slug := c.Param("slug")
	err := h.db.Where(&models.Article{Slug: slug}).Preload("Favorites").Preload("Tags").Preload("Author").Find(&article).Error
	if err != nil {
		return c.JSON(http.StatusNotFound, NewError(err))
	}
	return c.JSON(http.StatusOK, newArticleResponse(c, &article))
}
func (h *Handler) CreateArticle(c echo.Context) error {
	var a models.Article
	req := &articleCreateRequest{}
	if err := req.bind(c, &a); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, NewError(err))
	}
	a.AuthorID = userIDFromToken(c)
	// begin a transaction
	tx := h.db.Begin()
	if err := tx.Create(&a).Error; err != nil {
		return c.JSON(http.StatusUnprocessableEntity, NewError(err))
	}
	for _, t := range a.Tags {
		err := tx.Where(&models.Tag{Tag: t.Tag}).First(&t).Error
		if err != nil && !gorm.IsRecordNotFoundError(err) {
			tx.Rollback()
			return c.JSON(http.StatusUnprocessableEntity, NewError(err))
		}
		if err := tx.Model(&a).Association("Tags").Append(t).Error; err != nil {
			tx.Rollback()
			return c.JSON(http.StatusUnprocessableEntity, NewError(err))
		}
	}
	if err := tx.Where(a.ID).Preload("Favorites").Preload("Tags").Preload("Author").Find(&a).Error; err != nil {
		tx.Rollback()
		return c.JSON(http.StatusUnprocessableEntity, NewError(err))
	}
	tx.Commit()
	return c.JSON(http.StatusCreated, newArticleResponse(c, &a))
}
func (h *Handler) UpdateArticle(c echo.Context) error {
	slug := c.Param("slug")
	var a models.Article
	err := h.db.Where(&models.Article{Slug: slug, AuthorID: userIDFromToken(c)}).Find(&a).Error
	if err != nil {
		return c.JSON(http.StatusNotFound, NewError(err))
	}
	req := &articleUpdateRequest{}
	req.populate(&a)
	if err := req.bind(c, &a); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, NewError(err))
	}
	tx := h.db.Begin()
	if err := tx.Model(&a).Update(&a).Error; err != nil {
		return c.JSON(http.StatusUnprocessableEntity, NewError(err))
	}
	tags := make([]models.Tag, 0)
	for _, t := range req.Article.Tags {
		tag := models.Tag{Tag: t}
		err := tx.Where(&tag).First(&tag).Error
		if err != nil && !gorm.IsRecordNotFoundError(err) {
			tx.Rollback()
			return c.JSON(http.StatusUnprocessableEntity, NewError(err))
		}
		tags = append(tags, tag)
	}
	if err := tx.Model(&a).Association("Tags").Replace(tags).Error; err != nil {
		tx.Rollback()
		return c.JSON(http.StatusUnprocessableEntity, NewError(err))
	}
	tx.Where(a.ID).Preload("Favorites").Preload("Tags").Preload("Author").Find(&a)
	tx.Commit()
	return c.JSON(http.StatusCreated, newArticleResponse(c, &a))
}
func (h *Handler) DeleteArticle(c echo.Context) error {
	slug := c.Param("slug")
	var a models.Article
	err := h.db.Where(&models.Article{Slug: slug, AuthorID: userIDFromToken(c)}).First(&a).Error
	if err != nil {
		return c.JSON(http.StatusNotFound, NewError(err))
	}
	err = h.db.Delete(&a).Error
	if err != nil {
		return c.JSON(http.StatusInternalServerError, NewError(err))
	}
	return c.JSON(http.StatusOK, map[string]interface{}{"result": "ok"})
}

func (h *Handler) AddComment(c echo.Context) error {
	slug := c.Param("slug")
	var a models.Article
	err := h.db.Where(&models.Article{Slug: slug}).First(&a).Error
	if err != nil {
		return c.JSON(http.StatusNotFound, NewError(err))
	}
	var cm models.Comment
	req := &createCommentRequest{}
	if err := req.bind(c, &cm); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, NewError(err))
	}
	err = h.db.Model(&a).Association("Comments").Append(&cm).Error
	if err != nil {
		return c.JSON(http.StatusUnprocessableEntity, NewError(err))
	}
	h.db.Where(cm.ID).Preload("User").First(&cm)
	return c.JSON(http.StatusCreated, newCommentResponse(c, &cm))
}

func (h *Handler) GetComments(c echo.Context) error {
	slug := c.Param("slug")
	var a models.Article
	err := h.db.Where(&models.Article{Slug: slug}).Preload("Comments").Preload("Comments.User").First(&a).Error
	if err != nil {
		return c.JSON(http.StatusNotFound, NewError(err))
	}
	return c.JSON(http.StatusOK, newCommentListResponse(c, a.Comments))
}

func (h *Handler) DeleteComment(c echo.Context) error {
	id64, err := strconv.ParseUint(c.Param("id"), 10, 32)
	id := uint(id64)
	if err != nil {
		return c.JSON(http.StatusBadRequest, NewError(err))
	}
	var cm models.Comment
	err = h.db.Where(id).First(&cm).Error
	if err != nil {
		return c.JSON(http.StatusNotFound, NewError(err))
	}
	if cm.UserID != userIDFromToken(c) {
		return c.JSON(http.StatusUnauthorized, NewError(errors.New("unauthorized action")))
	}
	err = h.db.Delete(&cm).Error
	if err != nil {
		return c.JSON(http.StatusInternalServerError, NewError(err))
	}
	return c.JSON(http.StatusOK, map[string]interface{}{"result": "ok"})
}

func (h *Handler) Favorite(c echo.Context) error {
	var article models.Article
	slug := c.Param("slug")
	err := h.db.Where(&models.Article{Slug: slug}).Preload("Favorites").Preload("Tags").Preload("Author").Find(&article).Error
	if err != nil {
		return c.JSON(http.StatusNotFound, NewError(err))
	}
	user := models.User{}
	user.ID = userIDFromToken(c)
	err = h.db.Model(&article).Association("Favorites").Append(&user).Error
	if err != nil {
		return c.JSON(http.StatusUnprocessableEntity, NewError(err))
	}
	return c.JSON(http.StatusOK, newArticleResponse(c, &article))
}
func (h *Handler) Unfavorite(c echo.Context) error {
	var article models.Article
	slug := c.Param("slug")
	err := h.db.Where(&models.Article{Slug: slug}).Preload("Favorites").Preload("Tags").Preload("Author").Find(&article).Error
	if err != nil {
		return c.JSON(http.StatusNotFound, NewError(err))
	}
	user := models.User{}
	user.ID = userIDFromToken(c)
	err = h.db.Model(&article).Association("Favorites").Delete(&user).Error
	if err != nil {
		return c.JSON(http.StatusUnprocessableEntity, NewError(err))
	}
	return c.JSON(http.StatusOK, newArticleResponse(c, &article))
}

func (h *Handler) Tags(c echo.Context) error {
	var tags []models.Tag
	h.db.Find(&tags)
	return c.JSON(http.StatusOK, newTagListResponse(tags))
}
