package handler

import (
	"errors"
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
	"github.com/xesina/golang-echo-realworld-example-app/model"
	"github.com/xesina/golang-echo-realworld-example-app/utils"
)

func (h *Handler) GetArticle(c echo.Context) error {
	slug := c.Param("slug")
	a, err := h.articleStore.GetBySlug(slug)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, utils.NewError(err))
	}
	if a == nil {
		return c.JSON(http.StatusNotFound, utils.NotFound())
	}
	return c.JSON(http.StatusOK, newArticleResponse(c, a))
}

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
	var articles []model.Article
	var count int
	if tag != "" {
		articles, count, err = h.articleStore.ListByTag(tag, offset, limit)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, nil)
		}
	} else if author != "" {
		articles, count, err = h.articleStore.ListByAuthor(author, offset, limit)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, nil)
		}
	} else if favoritedBy != "" {
		articles, count, err = h.articleStore.ListByWhoFavorited(favoritedBy, offset, limit)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, nil)
		}
	} else {
		articles, count, err = h.articleStore.List(offset, limit)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, nil)
		}
	}
	return c.JSON(http.StatusOK, newArticleListResponse(h.userStore, userIDFromToken(c), articles, count))
}

func (h *Handler) Feed(c echo.Context) error {
	var articles []model.Article
	var count int
	offset, err := strconv.Atoi(c.QueryParam("offset"))
	if err != nil {
		offset = 0
	}
	limit, err := strconv.Atoi(c.QueryParam("limit"))
	if err != nil {
		limit = 20
	}
	articles, count, err = h.articleStore.ListFeed(userIDFromToken(c), offset, limit)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, nil)
	}
	return c.JSON(http.StatusOK, newArticleListResponse(h.userStore, userIDFromToken(c), articles, count))
}

func (h *Handler) CreateArticle(c echo.Context) error {
	var a model.Article
	req := &articleCreateRequest{}
	if err := req.bind(c, &a); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, utils.NewError(err))
	}
	a.AuthorID = userIDFromToken(c)
	err := h.articleStore.CreateArticle(&a)
	if err != nil {
		return c.JSON(http.StatusUnprocessableEntity, utils.NewError(err))
	}

	return c.JSON(http.StatusCreated, newArticleResponse(c, &a))
}

func (h *Handler) UpdateArticle(c echo.Context) error {
	slug := c.Param("slug")
	a, err := h.articleStore.GetUserArticleBySlug(userIDFromToken(c), slug)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, utils.NewError(err))
	}
	if a == nil {
		return c.JSON(http.StatusNotFound, utils.NotFound())
	}
	req := &articleUpdateRequest{}
	req.populate(a)
	if err := req.bind(c, a); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, utils.NewError(err))
	}
	if err = h.articleStore.UpdateArticle(a, req.Article.Tags); err != nil {
		return c.JSON(http.StatusInternalServerError, utils.NewError(err))
	}
	return c.JSON(http.StatusOK, newArticleResponse(c, a))
}

func (h *Handler) DeleteArticle(c echo.Context) error {
	slug := c.Param("slug")
	a, err := h.articleStore.GetUserArticleBySlug(userIDFromToken(c), slug)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, utils.NewError(err))
	}
	if a == nil {
		return c.JSON(http.StatusNotFound, utils.NotFound())
	}
	err = h.articleStore.DeleteArticle(a)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, utils.NewError(err))
	}
	return c.JSON(http.StatusOK, map[string]interface{}{"result": "ok"})
}

func (h *Handler) AddComment(c echo.Context) error {
	slug := c.Param("slug")
	a, err := h.articleStore.GetBySlug(slug)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, utils.NewError(err))
	}
	if a == nil {
		return c.JSON(http.StatusNotFound, utils.NotFound())
	}
	var cm model.Comment
	req := &createCommentRequest{}
	if err := req.bind(c, &cm); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, utils.NewError(err))
	}
	if err = h.articleStore.AddComment(a, &cm); err != nil {
		return c.JSON(http.StatusInternalServerError, utils.NewError(err))
	}
	return c.JSON(http.StatusCreated, newCommentResponse(c, &cm))
}

func (h *Handler) GetComments(c echo.Context) error {
	slug := c.Param("slug")
	cm, err := h.articleStore.GetCommentsBySlug(slug)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, utils.NewError(err))
	}
	return c.JSON(http.StatusOK, newCommentListResponse(c, cm))
}

func (h *Handler) DeleteComment(c echo.Context) error {
	id64, err := strconv.ParseUint(c.Param("id"), 10, 32)
	id := uint(id64)
	if err != nil {
		return c.JSON(http.StatusBadRequest, utils.NewError(err))
	}
	cm, err := h.articleStore.GetCommentByID(id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, utils.NewError(err))
	}
	if cm == nil {
		return c.JSON(http.StatusNotFound, utils.NotFound())
	}
	if cm.UserID != userIDFromToken(c) {
		return c.JSON(http.StatusUnauthorized, utils.NewError(errors.New("unauthorized action")))
	}
	if err := h.articleStore.DeleteComment(cm); err != nil {
		return c.JSON(http.StatusInternalServerError, utils.NewError(err))
	}
	return c.JSON(http.StatusOK, map[string]interface{}{"result": "ok"})
}

func (h *Handler) Favorite(c echo.Context) error {
	slug := c.Param("slug")
	a, err := h.articleStore.GetBySlug(slug)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, utils.NewError(err))
	}
	if a == nil {
		return c.JSON(http.StatusNotFound, utils.NotFound())
	}
	if err := h.articleStore.AddFavorite(a, userIDFromToken(c)); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, utils.NewError(err))
	}
	return c.JSON(http.StatusOK, newArticleResponse(c, a))
}

func (h *Handler) Unfavorite(c echo.Context) error {
	slug := c.Param("slug")
	a, err := h.articleStore.GetBySlug(slug)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, utils.NewError(err))
	}
	if a == nil {
		return c.JSON(http.StatusNotFound, utils.NotFound())
	}
	if err := h.articleStore.RemoveFavorite(a, userIDFromToken(c)); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, utils.NewError(err))
	}
	return c.JSON(http.StatusOK, newArticleResponse(c, a))
}

func (h *Handler) Tags(c echo.Context) error {
	tags, err := h.articleStore.ListTags()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err)
	}
	return c.JSON(http.StatusOK, newTagListResponse(tags))
}
