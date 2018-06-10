package handler_test

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/labstack/echo"
	"github.com/stretchr/testify/assert"
	"github.com/xesina/golang-echo-realworld-example-app/handler"
	"github.com/xesina/golang-echo-realworld-example-app/router"
)

var (
	articlesRes = `{"articles":\[{"slug":"article1-slug","title":"article1 title","description":"article1 description","body":"article1 body","tagList":\[],"createdAt":".*","updatedAt":".*","favorited":false,"favoritesCount":1,"author":{"username":"user1","bio":"user1 bio","image":"http://realworld.io/user1.jpg","following":false}}],"articlesCount":1}`
)

func TestListArticles(t *testing.T) {
	tearDown()
	setup()
	e := router.New()
	req := httptest.NewRequest(echo.GET, "/api/articles", nil)
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)
	h := handler.New(db)

	if assert.NoError(t, h.Articles(c)) {
		assert.Equal(t, http.StatusOK, rec.Code)
		assert.Regexp(t, articlesRes, rec.Body.String())
	}
}
