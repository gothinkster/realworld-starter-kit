package handler

import (
	"github.com/labstack/echo"
	"net/http"
	"github.com/xesina/golang-echo-realworld-example-app/models"
	"strconv"
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
	if err := h.db.Create(&a).Error; err != nil {
		return c.JSON(http.StatusUnprocessableEntity, NewError(err))
	}
	h.db.Where(a.ID).Preload("Favorites").Preload("Tags").Preload("Author").Find(&a)
	return c.JSON(http.StatusCreated, newArticleResponse(c, &a))
}
func (h *Handler) UpdateArticle(c echo.Context) error {
	slug := c.Param("slug")
	var a models.Article
	err := h.db.Where(&models.Article{Slug: slug, AuthorID: userIDFromToken(c)}).Preload("Tags").Find(&a).Error
	if err != nil {
		return c.JSON(http.StatusNotFound, NewError(err))
	}
	req := &articleUpdateRequest{}
	req.populate(&a)
	if err := req.bind(c, &a); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, NewError(err))
	}
	if err := h.db.Model(&a).Update(&a).Error; err != nil {
		return c.JSON(http.StatusUnprocessableEntity, NewError(err))
	}
	h.db.Where(a.ID).Preload("Favorites").Preload("Tags").Preload("Author").Find(&a)
	return c.JSON(http.StatusCreated, newArticleResponse(c, &a))
}
func (h *Handler) DeleteArticle(c echo.Context) error {
	return c.JSON(http.StatusOK, "delete article")
}

func (h *Handler) AddComment(c echo.Context) error {
	return c.JSON(http.StatusOK, "add Comments to an Article")
}
func (h *Handler) GetComments(c echo.Context) error {
	return c.JSON(http.StatusOK, "Get Comments from an Article")
}
func (h *Handler) DeleteComment(c echo.Context) error {
	return c.JSON(http.StatusOK, "delete Comment")
}

func (h *Handler) Favorite(c echo.Context) error {
	return c.JSON(http.StatusOK, "favorite article")
}
func (h *Handler) Unfavorite(c echo.Context) error {
	return c.JSON(http.StatusOK, "unfavorite Article")
}

func (h *Handler) Tags(c echo.Context) error {
	return c.JSON(http.StatusOK, "get tags")
}
