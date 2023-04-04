package api

import (
	"fmt"
	"net/http"
	"time"

	db "github.com/aliml92/realworld-gin-sqlc/db/sqlc"
	"github.com/gin-gonic/gin"
)

type articleResponse struct {
	Article struct {
		Slug           string    `json:"slug"`
		Title          string    `json:"title"`
		Description    string    `json:"description"`
		Body           string    `json:"body"`
		TagList        []string  `json:"tagList"`
		CreatedAt      time.Time `json:"createdAt"`
		UpdatedAt      time.Time `json:"updatedAt"`
		Favorited      bool      `json:"favorited"`
		FavoritesCount int64     `json:"favoritesCount"`
		Author         struct {
			Username  *string  `json:"username"`
			Bio       *string `json:"bio"`
			Image     *string `json:"image"`
			Following bool    `json:"following"`
		} `json:"author"`
	} `json:"article"`
}

func newArticleResponse(article *db.GetArticleBySlugRow) *articleResponse {
	resp := new(articleResponse)
	resp.Article.Slug = article.Slug
	resp.Article.Title = article.Title
	resp.Article.Description = article.Description
	resp.Article.Body = article.Body
	switch article.TagList.(type) {
	case []string:
		resp.Article.TagList = article.TagList.([]string)
	case []interface{}:
		for _, tag := range article.TagList.([]interface{}) {
			resp.Article.TagList = append(resp.Article.TagList, tag.(string))
		}
	}	
	resp.Article.CreatedAt = article.CreatedAt
	resp.Article.UpdatedAt = article.UpdatedAt
	resp.Article.Favorited = false
	resp.Article.FavoritesCount = article.FavoritesCount
	resp.Article.Author.Username = article.Username
	resp.Article.Author.Bio = article.Bio
	resp.Article.Author.Image = article.Image
	return resp
}

// GetArticle godoc
// @Summary Get an article
// @Description Get an article by slug
// @Tags articles
// @Accept  json
// @Produce  json
// @Param slug path string true "Article slug"
// @Success 200 {object} articleResponse
// @Failure 404 {object} Error
// @Failure 500 {object} Error
// @Router /articles/{slug} [get]
func (s *Server) GetArticle(c *gin.Context) {
	slug := c.Param("slug")
	article, err := Nullable(s.store.GetArticleBySlug(c, slug))
	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusInternalServerError, err)
		return
	}
	if article == nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "article not found"})
		return
	}
	c.JSON(http.StatusOK, newArticleResponse(article))
}

type createArticleReq struct {
	Article struct {
		Title       string   `json:"title" binding:"required"`
		Description string   `json:"description" binding:"required"`
		Body        string   `json:"body" binding:"required"`
		TagList     []string `json:"tagList" binding:"omitempty"`
	} `json:"article" binding:"required"`
}

func (req *createArticleReq) bind(c *gin.Context, p *db.CreateArticleTxParams) error {
	if err := c.ShouldBindJSON(req); err != nil {
		return err
	}
	// p.Slug = slugify(req.Article.Title) // Implement
	// generate random slug and check if it does not exist in db
	// do it until it is unique
	p.CreateArticleParams.Slug = "how-to-train-your-dragon-1sd35f48"
	p.CreateArticleParams.Title = req.Article.Title
	p.CreateArticleParams.Description = req.Article.Description
	p.CreateArticleParams.Body = req.Article.Body
	p.Tags = req.Article.TagList
	return nil
}

// CreateArticle godoc
// @Summary Create article
// @Description Create Article
// @Tags articles
// @Accept json
// @Produce json
// @Param article body createArticleReq true "Article"
// @Success 201 {object} articleResponse
// @Failure 401 {object} Error
// @Failure 422 {object} Error
// @Failure 500 {object} Error
// @Security Bearer
// @Router /articles [post]
func (s *Server) CreateArticle(c *gin.Context) {
	id := GetIDFromHeader(c)
	var (
		req createArticleReq
		p   db.CreateArticleTxParams
	)
	if err := req.bind(c, &p); err != nil {
		c.JSON(http.StatusUnprocessableEntity, NewError(err))
	}
	p.AuthorID = id
	unuqueSlug, err := s.findUniqueSlug(c, p.Title)
	if err != nil {
		c.JSON(http.StatusInternalServerError, NewError(err))
		return
	}
	p.Slug = unuqueSlug
	articleTx, err := s.store.CreateArticleTx(c, p)
	if err != nil {
		c.JSON(http.StatusInternalServerError, NewError(err))
		return
	}
	c.JSON(http.StatusCreated, newArticleTxResponse(articleTx))
}

func newArticleTxResponse(articleTx *db.CreateArticleTxResult) *articleResponse {
	resp := new(articleResponse)
	resp.Article.Slug = articleTx.Article.Slug
	resp.Article.Title = articleTx.Article.Title
	resp.Article.Description = articleTx.Article.Description
	resp.Article.Body = articleTx.Article.Body
	resp.Article.TagList = articleTx.Tags
	resp.Article.CreatedAt = articleTx.Article.CreatedAt
	resp.Article.UpdatedAt = articleTx.Article.UpdatedAt
	resp.Article.Favorited = false
	resp.Article.FavoritesCount = 0
	resp.Article.Author.Username = &articleTx.User.Username
	resp.Article.Author.Bio = articleTx.User.Bio
	resp.Article.Author.Image = articleTx.User.Image
	return resp
}

type updateArticleReq struct {
	Article struct {
		Title       *string  `json:"title" binding:"omitempty"`
		Description *string  `json:"description" binding:"omitempty"`
		Body        *string  `json:"body" binding:"omitempty"`
	} `json:"article" binding:"required"`
}

func (req *updateArticleReq) bind(c *gin.Context, p *db.UpdateArticleParams) error {
	if err := c.ShouldBindJSON(req); err != nil {
		return err
	}
	p.Title = req.Article.Title
	p.Description = req.Article.Description
	p.Body = req.Article.Body
	return nil
}

// UpdateArticle godoc
// @Summary Update article
// @Description Update Article
// @Tags articles
// @Accept json
// @Produce json
// @Param slug path string true "Article slug"
// @Param article body updateArticleReq true "Article"
// @Success 200 {object} articleResponse
// @Failure 401 {object} Error
// @Failure 422 {object} Error
// @Failure 500 {object} Error
// @Security Bearer
// @Router /articles/{slug} [put]
func (s *Server) UpdateArticle(c *gin.Context) {
	authorID := GetIDFromHeader(c)
	slug := c.Param("slug")
	var (
		req updateArticleReq
		p   db.UpdateArticleParams
	)
	if err := req.bind(c, &p); err != nil {
		c.JSON(http.StatusUnprocessableEntity, NewError(err))
	}
	p.AuthorID = authorID
	articleID, err := NullableID(s.store.GetArticleIDBySlug(c, slug)) 
	if err != nil {
		c.JSON(http.StatusInternalServerError, NewError(err))
		return
	}
	if articleID == "" {
		c.JSON(http.StatusNotFound, gin.H{"error": "article not found"})
		return
	}
	p.ID = articleID
	if p.Slug != nil {
		uniqueSlug, err := s.findUniqueSlug(c, *p.Slug)
		if err != nil {
			c.JSON(http.StatusInternalServerError, NewError(err))
			return
		}
		p.Slug = &uniqueSlug
	}
	updatedArticle, err := s.store.UpdateArticle(c, p)
	if err != nil {
		c.JSON(http.StatusInternalServerError, NewError(err))
		return
	}
	article, err := s.store.GetArticleBySlug(c, updatedArticle.Slug)
	if err != nil {
		c.JSON(http.StatusInternalServerError, NewError(err))
		return
	}
	c.JSON(http.StatusOK, newArticleResponse(article))
}

func (s *Server) findUniqueSlug(c *gin.Context, title string) (string, error) {
	var (
		found bool
		uniqueSlug string
	)
	for !found {
		uniqueSlug = createUniqueSlug(title)
		articleID, err := NullableID(s.store.GetArticleIDBySlug(c, uniqueSlug))
		if err != nil {
			return "", err
		}
		if articleID == "" {
			found = true
		}	
	}
	return uniqueSlug, nil
}