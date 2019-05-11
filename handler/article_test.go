package handler

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/labstack/echo/v4"
	"github.com/stretchr/testify/assert"
	"github.com/xesina/golang-echo-realworld-example-app/router"
	"github.com/xesina/golang-echo-realworld-example-app/router/middleware"
	"github.com/xesina/golang-echo-realworld-example-app/utils"
)

func TestListArticlesCaseSuccess(t *testing.T) {
	tearDown()
	setup()
	e := router.New()
	req := httptest.NewRequest(echo.GET, "/api/articles", nil)
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)
	assert.NoError(t, h.Articles(c))
	if assert.Equal(t, http.StatusOK, rec.Code) {
		var aa articleListResponse
		err := json.Unmarshal(rec.Body.Bytes(), &aa)
		assert.NoError(t, err)
		assert.Equal(t, 2, aa.ArticlesCount)
	}
}

func TestGetArticlesCaseSuccess(t *testing.T) {
	tearDown()
	setup()
	req := httptest.NewRequest(echo.GET, "/api/articles/:slug", nil)
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)
	c.SetPath("/api/articles/:slug")
	c.SetParamNames("slug")
	c.SetParamValues("article1-slug")
	assert.NoError(t, h.GetArticle(c))
	if assert.Equal(t, http.StatusOK, rec.Code) {
		var a singleArticleResponse
		err := json.Unmarshal(rec.Body.Bytes(), &a)
		assert.NoError(t, err)
		assert.Equal(t, "article1-slug", a.Article.Slug)
		assert.Equal(t, 2, len(a.Article.TagList))
	}
}

func TestCreateArticlesCaseSuccess(t *testing.T) {
	tearDown()
	setup()
	var (
		reqJSON = `{"article":{"title":"article2", "description":"article2", "body":"article2", "tagList":["tag1","tag2"]}}`
	)
	jwtMiddleware := middleware.JWT(utils.JWTSecret)
	req := httptest.NewRequest(echo.POST, "/api/articles", strings.NewReader(reqJSON))
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	req.Header.Set(echo.HeaderAuthorization, authHeader(utils.GenerateJWT(1)))
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)
	err := jwtMiddleware(func(context echo.Context) error {
		return h.CreateArticle(c)
	})(c)
	assert.NoError(t, err)
	if assert.Equal(t, http.StatusCreated, rec.Code) {
		var a singleArticleResponse
		err := json.Unmarshal(rec.Body.Bytes(), &a)
		assert.NoError(t, err)
		assert.Equal(t, "article2", a.Article.Slug)
		assert.Equal(t, "article2", a.Article.Description)
		assert.Equal(t, "article2", a.Article.Title)
		assert.Equal(t, "user1", a.Article.Author.Username)
		assert.Equal(t, 2, len(a.Article.TagList))
	}
}

func TestUpdateArticlesCaseSuccess(t *testing.T) {
	tearDown()
	setup()
	var (
		reqJSON = `{"article":{"title":"article1 part 2", "tagList":["tag3"]}}`
	)
	jwtMiddleware := middleware.JWT(utils.JWTSecret)
	req := httptest.NewRequest(echo.PUT, "/api/articles/:slug", strings.NewReader(reqJSON))
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	req.Header.Set(echo.HeaderAuthorization, authHeader(utils.GenerateJWT(1)))
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)
	c.SetPath("/api/articles/:slug")
	c.SetParamNames("slug")
	c.SetParamValues("article1-slug")
	err := jwtMiddleware(func(context echo.Context) error {
		return h.UpdateArticle(c)
	})(c)
	assert.NoError(t, err)
	if assert.Equal(t, http.StatusOK, rec.Code) {
		var a singleArticleResponse
		err := json.Unmarshal(rec.Body.Bytes(), &a)
		assert.NoError(t, err)
		assert.Equal(t, "article1 part 2", a.Article.Title)
		assert.Equal(t, "article1-part-2", a.Article.Slug)
		assert.Equal(t, 1, len(a.Article.TagList))
		assert.Equal(t, "tag3", a.Article.TagList[0])
	}
}

func TestFeedCaseSuccess(t *testing.T) {
	tearDown()
	setup()
	jwtMiddleware := middleware.JWT(utils.JWTSecret)
	req := httptest.NewRequest(echo.GET, "/api/articles/feed", nil)
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	req.Header.Set(echo.HeaderAuthorization, authHeader(utils.GenerateJWT(1)))
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)
	err := jwtMiddleware(func(context echo.Context) error {
		return h.Feed(c)
	})(c)
	assert.NoError(t, err)
	if assert.Equal(t, http.StatusOK, rec.Code) {
		var a articleListResponse
		err := json.Unmarshal(rec.Body.Bytes(), &a)
		assert.NoError(t, err)
		assert.Equal(t, 1, len(a.Articles))
		assert.Equal(t, a.ArticlesCount, len(a.Articles))
		assert.Equal(t, "article2 title", a.Articles[0].Title)
		assert.Equal(t, "article2 title", a.Articles[0].Title)
	}
}

func TestDeleteArticleCaseSuccess(t *testing.T) {
	tearDown()
	setup()
	jwtMiddleware := middleware.JWT(utils.JWTSecret)
	req := httptest.NewRequest(echo.DELETE, "/api/articles/:slug", nil)
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	req.Header.Set(echo.HeaderAuthorization, authHeader(utils.GenerateJWT(1)))
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)
	c.SetPath("/api/articles/:slug")
	c.SetParamNames("slug")
	c.SetParamValues("article1-slug")
	err := jwtMiddleware(func(context echo.Context) error {
		return h.DeleteArticle(c)
	})(c)
	assert.NoError(t, err)
	assert.Equal(t, http.StatusOK, rec.Code)
}

func TestGetCommentsCaseSuccess(t *testing.T) {
	tearDown()
	setup()
	jwtMiddleware := middleware.JWT(utils.JWTSecret)
	req := httptest.NewRequest(echo.GET, "/api/articles/:slug/comments", nil)
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	req.Header.Set(echo.HeaderAuthorization, authHeader(utils.GenerateJWT(2)))
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)
	c.SetPath("/api/articles/:slug/comments")
	c.SetParamNames("slug")
	c.SetParamValues("article1-slug")
	err := jwtMiddleware(func(context echo.Context) error {
		return h.GetComments(c)
	})(c)
	assert.NoError(t, err)
	if assert.Equal(t, http.StatusOK, rec.Code) {
		var cc commentListResponse
		err := json.Unmarshal(rec.Body.Bytes(), &cc)
		assert.NoError(t, err)
		assert.Equal(t, 1, len(cc.Comments))
	}
}

func TestAddCommentCaseSuccess(t *testing.T) {
	tearDown()
	setup()
	var (
		reqJSON = `{"comment":{"body":"article1 comment2 by user2"}}`
	)
	jwtMiddleware := middleware.JWT(utils.JWTSecret)
	req := httptest.NewRequest(echo.POST, "/api/articles/:slug/comments", strings.NewReader(reqJSON))
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	req.Header.Set(echo.HeaderAuthorization, authHeader(utils.GenerateJWT(2)))
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)
	c.SetPath("/api/articles/:slug/comments")
	c.SetParamNames("slug")
	c.SetParamValues("article1-slug")
	err := jwtMiddleware(func(context echo.Context) error {
		return h.AddComment(c)
	})(c)
	assert.NoError(t, err)
	if assert.Equal(t, http.StatusCreated, rec.Code) {
		var c singleCommentResponse
		err := json.Unmarshal(rec.Body.Bytes(), &c)
		assert.NoError(t, err)
		assert.Equal(t, "article1 comment2 by user2", c.Comment.Body)
		assert.Equal(t, "user2", c.Comment.Author.Username)
	}
}

func TestDeleteCommentCaseSuccess(t *testing.T) {
	tearDown()
	setup()
	jwtMiddleware := middleware.JWT(utils.JWTSecret)
	req := httptest.NewRequest(echo.DELETE, "/api/articles/:slug/comments/:id", nil)
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	req.Header.Set(echo.HeaderAuthorization, authHeader(utils.GenerateJWT(1)))
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)
	c.SetPath("/api/articles/:slug/comments/:id")
	c.SetParamNames("slug")
	c.SetParamValues("article1-slug")
	c.SetParamNames("id")
	c.SetParamValues("1")
	err := jwtMiddleware(func(context echo.Context) error {
		return h.DeleteComment(c)
	})(c)
	assert.NoError(t, err)
	assert.Equal(t, http.StatusOK, rec.Code)
}

func TestFavoriteCaseSuccess(t *testing.T) {
	tearDown()
	setup()
	jwtMiddleware := middleware.JWT(utils.JWTSecret)
	req := httptest.NewRequest(echo.POST, "/api/articles/:slug/favorite", nil)
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	req.Header.Set(echo.HeaderAuthorization, authHeader(utils.GenerateJWT(2)))
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)
	c.SetPath("/api/articles/:slug/comments")
	c.SetParamNames("slug")
	c.SetParamValues("article1-slug")
	err := jwtMiddleware(func(context echo.Context) error {
		return h.Favorite(c)
	})(c)
	assert.NoError(t, err)
	if assert.Equal(t, http.StatusOK, rec.Code) {
		var a singleArticleResponse
		err := json.Unmarshal(rec.Body.Bytes(), &a)
		assert.NoError(t, err)
		assert.Equal(t, "article1 title", a.Article.Title)
		assert.True(t, a.Article.Favorited)
		assert.Equal(t, 1, a.Article.FavoritesCount)
	}
}

func TestUnfavoriteCaseSuccess(t *testing.T) {
	tearDown()
	setup()
	jwtMiddleware := middleware.JWT(utils.JWTSecret)
	req := httptest.NewRequest(echo.DELETE, "/api/articles/:slug/favorite", nil)
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	req.Header.Set(echo.HeaderAuthorization, authHeader(utils.GenerateJWT(1)))
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)
	c.SetPath("/api/articles/:slug/favorite")
	c.SetParamNames("slug")
	c.SetParamValues("article2-slug")
	err := jwtMiddleware(func(context echo.Context) error {
		return h.Unfavorite(c)
	})(c)
	assert.NoError(t, err)
	if assert.Equal(t, http.StatusOK, rec.Code) {
		var a singleArticleResponse
		err := json.Unmarshal(rec.Body.Bytes(), &a)
		assert.NoError(t, err)
		assert.Equal(t, "article2 title", a.Article.Title)
		assert.False(t, a.Article.Favorited)
		assert.Equal(t, 0, a.Article.FavoritesCount)
	}
}

func TestGetTagsCaseSuccess(t *testing.T) {
	tearDown()
	setup()
	req := httptest.NewRequest(echo.GET, "/api/tags", nil)
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)
	assert.NoError(t, h.Tags(c))
	if assert.Equal(t, http.StatusOK, rec.Code) {
		var tt tagListResponse
		err := json.Unmarshal(rec.Body.Bytes(), &tt)
		assert.NoError(t, err)
		assert.Equal(t, 2, len(tt.Tags))
		assert.Contains(t, tt.Tags, "tag1")
		assert.Contains(t, tt.Tags, "tag2")
	}
}
