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
	return c.JSON(http.StatusOK, "Feed Articles")
}
func (h *Handler) GetArticle(c echo.Context) error {
	return c.JSON(http.StatusOK, "Get Articles")
}
func (h *Handler) CreateArticle(c echo.Context) error {
	return c.JSON(http.StatusOK, "create article")
}
func (h *Handler) UpdateArticle(c echo.Context) error {
	return c.JSON(http.StatusOK, "update article")
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
