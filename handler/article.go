package handler

import (
	"github.com/labstack/echo"
	"net/http"
)

func (h *Handler) Articles(c echo.Context) error {
	return c.JSON(http.StatusOK, "Returns most recent articles globally by default, provide tag, author or favorited query parameter to filter results")
}
func (h *Handler) Feed(c echo.Context) error {
	return c.JSON(http.StatusOK, "Feed Articles")
}
func (h *Handler) GetArticles(c echo.Context) error {
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
