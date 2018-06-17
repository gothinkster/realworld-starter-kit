package http

import (
	"github.com/labstack/echo"
	"github.com/xesina/golang-echo-realworld-example-app/article"
	"github.com/xesina/golang-echo-realworld-example-app/utils"
	"net/http"
	"strconv"
	"errors"
)

func (h *Handler) mustGetArticleBySlug(c echo.Context, slug string) (*article.Article, error) {
	a, err := h.articleStore.GetBySlug(slug)
	if err != nil {
		return nil, c.JSON(http.StatusInternalServerError, utils.NewError(err))
	}
	if a == nil {
		return nil, c.JSON(http.StatusNotFound, nil)
	}
	return a, nil
}

func (h *Handler) mustGetUserArticleBySlug(c echo.Context, userID uint, slug string) (*article.Article, error) {
	a, err := h.articleStore.GetUserArticleBySlug(userID, slug)
	if err != nil {
		return nil, c.JSON(http.StatusInternalServerError, utils.NewError(err))
	}
	if a == nil {
		return nil, c.JSON(http.StatusNotFound, nil)
	}
	return a, nil
}

func (h *Handler) mustGetCommentByID(c echo.Context, id uint) (*article.Comment, error) {
	cm, err := h.articleStore.GetCommentByID(id)
	if err != nil {
		return nil, c.JSON(http.StatusInternalServerError, utils.NewError(err))
	}
	if cm == nil {
		return nil, c.JSON(http.StatusNotFound, nil)
	}
	return cm, nil
}

func (h *Handler) GetArticle(c echo.Context) error {
	slug := c.Param("slug")
	a, err := h.mustGetArticleBySlug(c, slug)
	if err != nil {
		return err
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
	var articles []article.Article
	var count int
	if tag != "" {
		articles, count, err = h.articleStore.ListByTag(tag, limit, offset)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, nil)
		}
	} else if author != "" {
		articles, count, err = h.articleStore.ListByAuthor(author, limit, offset)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, nil)
		}
	} else if favoritedBy != "" {
		articles, count, err = h.articleStore.ListByWhoFavorited(author, limit, offset)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, nil)
		}
	} else {
		articles, count, err = h.articleStore.List(limit, offset)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, nil)
		}
	}
	return c.JSON(http.StatusOK, newArticleListResponse(c, articles, count))
}
func (h *Handler) Feed(c echo.Context) error {
	var articles []article.Article
	var count int
	offset, err := strconv.Atoi(c.QueryParam("offset"))
	if err != nil {
		offset = 0
	}
	limit, err := strconv.Atoi(c.QueryParam("limit"))
	if err != nil {
		limit = 20
	}
	articles, count, err = h.articleStore.ListFeed(userIDFromToken(c), limit, offset)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, nil)
	}
	return c.JSON(http.StatusOK, newArticleListResponse(c, articles, count))
}
func (h *Handler) CreateArticle(c echo.Context) error {
	var a article.Article
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
	a, err := h.mustGetUserArticleBySlug(c, userIDFromToken(c), slug)
	if err != nil {
		return err
	}
	req := &articleUpdateRequest{}
	req.populate(a)
	if err := req.bind(c, a); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, utils.NewError(err))
	}
	if err = h.articleStore.UpdateArticle(a, req.Article.Tags); err != nil {
		return c.JSON(http.StatusInternalServerError, utils.NewError(err))
	}
	return c.JSON(http.StatusCreated, newArticleResponse(c, a))
}

func (h *Handler) DeleteArticle(c echo.Context) error {
	slug := c.Param("slug")
	a, err := h.mustGetUserArticleBySlug(c, userIDFromToken(c), slug)
	if err != nil {
		return err
	}
	err = h.articleStore.DeleteArticle(a)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, utils.NewError(err))
	}
	return c.JSON(http.StatusOK, map[string]interface{}{"result": "ok"})
}

func (h *Handler) AddComment(c echo.Context) error {
	slug := c.Param("slug")
	a, err := h.mustGetArticleBySlug(c, slug)
	if err != nil {
		return err
	}
	var cm article.Comment
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
	cm, err := h.mustGetCommentByID(c, id)
	if err != nil {
		return err
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
	a, err := h.mustGetArticleBySlug(c, slug)
	if err != nil {
		return err
	}
	if err := h.articleStore.AddFavorite(a, userIDFromToken(c)); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, utils.NewError(err))
	}
	return c.JSON(http.StatusOK, newArticleResponse(c, a))
}

func (h *Handler) Unfavorite(c echo.Context) error {
	slug := c.Param("slug")
	a, err := h.mustGetArticleBySlug(c, slug)
	if err != nil {
		return err
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

func userIDFromToken(c echo.Context) uint {
	id, ok := c.Get("user").(uint)
	if !ok {
		return 0
	}
	return id
}
