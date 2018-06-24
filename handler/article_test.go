package handler

import (
	"net/http/httptest"
	"github.com/labstack/echo"
	"github.com/stretchr/testify/assert"
	"testing"
	"net/http"
	"github.com/xesina/golang-echo-realworld-example-app/router"
	"encoding/json"
	"github.com/xesina/golang-echo-realworld-example-app/utils"
	"github.com/xesina/golang-echo-realworld-example-app/router/middleware"
	"strings"
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
		assert.Equal(t, 1, aa.ArticlesCount)
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
