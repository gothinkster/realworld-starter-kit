package handler

import (
	"errors"
	"github.com/alpody/fiber-realworld/model"
	"github.com/alpody/fiber-realworld/utils"
	"net/http"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

// GetArticle godoc
// @Summary Get an article
// @Description Get an article. Auth not required
// @ID get-article
// @Tags article
// @Accept  json
// @Produce  json
// @Param slug path string true "Slug of the article to get"
// @Success 200 {object} singleArticleResponse
// @Failure 400 {object} utils.Error
// @Failure 500 {object} utils.Error
// @Router /articles/{slug} [get]
func (h *Handler) GetArticle(c *fiber.Ctx) error {
	slug := c.Params("slug")
	a, err := h.articleStore.GetBySlug(slug)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(utils.NewError(err))
	}
	if a == nil {
		return c.Status(http.StatusNotFound).JSON(utils.NotFound())
	}
	return c.Status(http.StatusOK).JSON(newArticleResponse(userIDFromToken(c), a))
}

// Articles godoc
// @Summary Get recent articles globally
// @Description Get most recent articles globally. Use query parameters to filter results. Auth is optional
// @ID get-articles
// @Tags article
// @Accept json
// @Produce json
// @Param tag query string false "Filter by tag"
// @Param author query string false "Filter by author (username)"
// @Param favorited query integer false "Limit number of articles returned (default is 20)"
// @Param offset query integer false "Offset/skip number of articles (default is 0)"
// @Success 200 {object} articleListResponse
// @Failure 500 {object} utils.Error
// @Router /articles [get]
func (h *Handler) Articles(c *fiber.Ctx) error {
	var (
		articles []model.Article
		count    int
	)
	tag := c.Params("tag")
	author := c.Params("author")
	favoritedBy := c.Params("favorited")
	offset, err := strconv.Atoi(c.Params("offset"))
	if err != nil {
		offset = 0
	}

	limit, err := strconv.Atoi(c.Params("limit"))
	if err != nil {
		limit = 20
	}
	if tag != "" {
		articles, count, err = h.articleStore.ListByTag(tag, offset, limit)
		if err != nil {
			return c.Status(http.StatusInternalServerError).JSON(utils.NewError(err))
		}
	} else if author != "" {
		articles, count, err = h.articleStore.ListByAuthor(author, offset, limit)
		if err != nil {
			return c.Status(http.StatusInternalServerError).JSON(utils.NewError(err))
		}
	} else if favoritedBy != "" {
		articles, count, err = h.articleStore.ListByWhoFavorited(favoritedBy, offset, limit)
		if err != nil {
			return c.Status(http.StatusInternalServerError).JSON(utils.NewError(err))
		}
	} else {
		articles, count, err = h.articleStore.List(offset, limit)
		if err != nil {
			return c.Status(http.StatusInternalServerError).JSON(utils.NewError(err))
		}
	}
	return c.Status(http.StatusOK).JSON(newArticleListResponse(h.userStore, userIDFromToken(c), articles, count))
}

// Feed godoc
// @Summary Get recent articles from users you follow
// @Description Get most recent articles from users you follow. Use query parameters to limit. Auth is required
// @ID feed
// @Tags article
// @Accept  json
// @Produce  json
// @Param limit query integer false "Limit number of articles returned (default is 20)"
// @Param offset query integer false "Offset/skip number of articles (default is 0)"
// @Success 200 {object} articleListResponse
// @Failure 401 {object} utils.Error
// @Failure 500 {object} utils.Error
// @Security ApiKeyAuth
// @Router /articles/feed [get]
func (h *Handler) Feed(c *fiber.Ctx) error {
	var (
		articles []model.Article
		count    int
	)
	offset, err := strconv.Atoi(c.Params("offset"))
	if err != nil {
		offset = 0
	}
	limit, err := strconv.Atoi(c.Params("limit"))
	if err != nil {
		limit = 20
	}
	articles, count, err = h.articleStore.ListFeed(userIDFromToken(c), offset, limit)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(utils.NewError(nil))
	}
	return c.Status(http.StatusOK).JSON(newArticleListResponse(h.userStore, userIDFromToken(c), articles, count))
}

// CreateArticle godoc
// @Summary Create an article
// @Description Create an article. Auth is require
// @ID create-article
// @Tags article
// @Accept  json
// @Produce  json
// @Param article body articleCreateRequest true "Article to create"
// @Success 201 {object} singleArticleResponse
// @Failure 401 {object} utils.Error
// @Failure 422 {object} utils.Error
// @Failure 500 {object} utils.Error
// @Security ApiKeyAuth
// @Router /articles [post]
func (h *Handler) CreateArticle(c *fiber.Ctx) error {
	var a model.Article
	req := &articleCreateRequest{}
	if err := req.bind(c, &a, h.validator); err != nil {
		return c.Status(http.StatusUnprocessableEntity).JSON(utils.NewError(err))
	}
	a.AuthorID = userIDFromToken(c)
	err := h.articleStore.CreateArticle(&a)
	if err != nil {
		return c.Status(http.StatusUnprocessableEntity).JSON(utils.NewError(err))
	}
	return c.Status(http.StatusCreated).JSON(newArticleResponse(userIDFromToken(c), &a))
}

// UpdateArticle godoc
// @Summary Update an article
// @Description Update an article. Auth is required
// @ID update-article
// @Tags article
// @Accept  json
// @Produce  json
// @Param slug path string true "Slug of the article to update"
// @Param article body articleUpdateRequest true "Article to update"
// @Success 200 {object} singleArticleResponse
// @Failure 400 {object} utils.Error
// @Failure 401 {object} utils.Error
// @Failure 422 {object} utils.Error
// @Failure 404 {object} utils.Error
// @Failure 500 {object} utils.Error
// @Security ApiKeyAuth
// @Router /articles/{slug} [put]
func (h *Handler) UpdateArticle(c *fiber.Ctx) error {
	slug := c.Params("slug")
	a, err := h.articleStore.GetUserArticleBySlug(userIDFromToken(c), slug)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(utils.NewError(err))
	}
	if a == nil {
		return c.Status(http.StatusNotFound).JSON(utils.NotFound())
	}
	req := &articleUpdateRequest{}
	req.populate(a)

	if err := req.bind(c, a, h.validator); err != nil {
		return c.Status(http.StatusUnprocessableEntity).JSON(utils.NewError(err))
	}
	if err = h.articleStore.UpdateArticle(a, req.Article.Tags); err != nil {
		return c.Status(http.StatusInternalServerError).JSON(utils.NewError(err))
	}
	return c.Status(http.StatusOK).JSON(newArticleResponse(userIDFromToken(c), a))
}

// DeleteArticle godoc
// @Summary Delete an article
// @Description Delete an article. Auth is required
// @ID delete-article
// @Tags article
// @Accept  json
// @Produce  json
// @Param slug path string true "Slug of the article to delete"
// @Success 200 {object} map[string]interface{}
// @Failure 401 {object} utils.Error
// @Failure 404 {object} utils.Error
// @Failure 500 {object} utils.Error
// @Security ApiKeyAuth
// @Router /articles/{slug} [delete]
func (h *Handler) DeleteArticle(c *fiber.Ctx) error {
	slug := c.Params("slug")
	a, err := h.articleStore.GetUserArticleBySlug(userIDFromToken(c), slug)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(utils.NewError(err))
	}
	if a == nil {
		return c.Status(http.StatusNotFound).JSON(utils.NotFound())
	}
	err = h.articleStore.DeleteArticle(a)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(utils.NewError(err))
	}
	return c.Status(http.StatusOK).JSON(map[string]interface{}{"result": "ok"})
}

// AddComment godoc
// @Summary Create a comment for an article
// @Description Create a comment for an article. Auth is required
// @ID add-comment
// @Tags comment
// @Accept  json
// @Produce  json
// @Param slug path string true "Slug of the article that you want to create a comment for"
// @Param comment body createCommentRequest true "Comment you want to create"
// @Success 201 {object} singleCommentResponse
// @Failure 400 {object} utils.Error
// @Failure 401 {object} utils.Error
// @Failure 422 {object} utils.Error
// @Failure 404 {object} utils.Error
// @Failure 500 {object} utils.Error
// @Security ApiKeyAuth
// @Router /articles/{slug}/comments [post]
func (h *Handler) AddComment(c *fiber.Ctx) error {
	slug := c.Params("slug")
	a, err := h.articleStore.GetBySlug(slug)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(utils.NewError(err))
	}
	if a == nil {
		return c.Status(http.StatusNotFound).JSON(utils.NotFound())
	}
	var cm model.Comment
	req := &createCommentRequest{}
	if err := req.bind(c, &cm, h.validator); err != nil {
		return c.Status(http.StatusUnprocessableEntity).JSON(utils.NewError(err))
	}
	if err = h.articleStore.AddComment(a, &cm); err != nil {
		return c.Status(http.StatusInternalServerError).JSON(utils.NewError(err))
	}
	return c.Status(http.StatusCreated).JSON(newCommentResponse(userIDFromToken(c), &cm))
}

// GetComments godoc
// @Summary Get the comments for an article
// @Description Get the comments for an article. Auth is optional
// @ID get-comments
// @Tags comment
// @Accept  json
// @Produce  json
// @Param slug path string true "Slug of the article that you want to get comments for"
// @Success 200 {object} commentListResponse
// @Failure 422 {object} utils.Error
// @Failure 500 {object} utils.Error
// @Router /articles/{slug}/comments [get]
func (h *Handler) GetComments(c *fiber.Ctx) error {
	slug := c.Params("slug")
	cm, err := h.articleStore.GetCommentsBySlug(slug)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(utils.NewError(err))
	}
	return c.Status(http.StatusOK).JSON(newCommentListResponse(userIDFromToken(c), cm))
}

// DeleteComment godoc
// @Summary Delete a comment for an article
// @Description Delete a comment for an article. Auth is required
// @ID delete-comments
// @Tags comment
// @Accept  json
// @Produce  json
// @Param slug path string true "Slug of the article that you want to delete a comment for"
// @Param id path integer true "ID of the comment you want to delete"
// @Success 200 {object} map[string]interface{}
// @Failure 400 {object} utils.Error
// @Failure 401 {object} utils.Error
// @Failure 422 {object} utils.Error
// @Failure 404 {object} utils.Error
// @Failure 500 {object} utils.Error
// @Security ApiKeyAuth
// @Router /articles/{slug}/comments/{id} [delete]
func (h *Handler) DeleteComment(c *fiber.Ctx) error {
	id64, err := strconv.ParseUint(c.Params("id"), 10, 32)
	id := uint(id64)
	if err != nil {
		return c.Status(http.StatusBadRequest).JSON(utils.NewError(err))
	}
	cm, err := h.articleStore.GetCommentByID(id)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(utils.NewError(err))
	}
	if cm == nil {
		return c.Status(http.StatusNotFound).JSON(utils.NotFound())
	}
	if cm.UserID != userIDFromToken(c) {
		return c.Status(http.StatusUnauthorized).JSON(utils.NewError(errors.New("unathorized action")))
	}
	if err := h.articleStore.DeleteComment(cm); err != nil {
		return c.Status(http.StatusInternalServerError).JSON(utils.NewError(err))
	}
	return c.Status(http.StatusOK).JSON(map[string]interface{}{"result": "ok"})
}

// Favorite godoc
// @Summary Favorite an article
// @Description Favorite an article. Auth is required
// @ID favorite
// @Tags favorite
// @Accept  json
// @Produce  json
// @Param slug path string true "Slug of the article that you want to favorite"
// @Success 200 {object} singleArticleResponse
// @Failure 400 {object} utils.Error
// @Failure 401 {object} utils.Error
// @Failure 422 {object} utils.Error
// @Failure 404 {object} utils.Error
// @Failure 500 {object} utils.Error
// @Security ApiKeyAuth
// @Router /articles/{slug}/favorite [post]
func (h *Handler) Favorite(c *fiber.Ctx) error {
	slug := c.Params("slug")
	a, err := h.articleStore.GetBySlug(slug)

	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(utils.NewError(err))
	}

	if a == nil {
		return c.Status(http.StatusNotFound).JSON(utils.NotFound())
	}
	uid := userIDFromToken(c)
	if err := h.articleStore.AddFavorite(a, uid); err != nil {
		return c.Status(http.StatusNotFound).JSON(utils.NotFound())
	}
	return c.Status(http.StatusOK).JSON(newArticleResponse(uid, a))
}

// Unfavorite godoc
// @Summary Unfavorite an article
// @Description Unfavorite an article. Auth is required
// @ID unfavorite
// @Tags favorite
// @Accept  json
// @Produce  json
// @Param slug path string true "Slug of the article that you want to unfavorite"
// @Success 200 {object} singleArticleResponse
// @Failure 400 {object} utils.Error
// @Failure 401 {object} utils.Error
// @Failure 422 {object} utils.Error
// @Failure 404 {object} utils.Error
// @Failure 500 {object} utils.Error
// @Security ApiKeyAuth
// @Router /articles/{slug}/favorite [delete]
func (h *Handler) Unfavorite(c *fiber.Ctx) error {
	slug := c.Params("slug")
	a, err := h.articleStore.GetBySlug(slug)

	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(utils.NewError(err))
	}

	if a == nil {
		return c.Status(http.StatusNotFound).JSON(utils.NotFound())
	}
	uid := userIDFromToken(c)
	if err := h.articleStore.RemoveFavorite(a, uid); err != nil {
		return c.Status(http.StatusUnprocessableEntity).JSON(utils.NewError(err))
	}
	return c.Status(http.StatusOK).JSON(newArticleResponse(uid, a))
}

// Tags godoc
// @Summary Get tags
// @Description Get tags
// @ID tags
// @Tags tag
// @Accept  json
// @Produce  json
// @Success 201 {object} tagListResponse
// @Failure 400 {object} utils.Error
// @Failure 422 {object} utils.Error
// @Failure 404 {object} utils.Error
// @Failure 500 {object} utils.Error
// @Security ApiKeyAuth
// @Router /tags [get]
func (h *Handler) Tags(c *fiber.Ctx) error {
	tags, err := h.articleStore.ListTags()
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(utils.NewError(err))
	}
	return c.Status(http.StatusOK).JSON(newTagListResponse(tags))
}
