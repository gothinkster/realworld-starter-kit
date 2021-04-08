package handler

import (
	//"fmt"
	"github.com/alpody/fiber-realworld/utils"
	//"github.com/gofiber/fiber/v2"
	"encoding/json"
	"github.com/stretchr/testify/assert"
	"io/ioutil"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
)

func TestListArticlesCaseSuccess(t *testing.T) {
	tearDown()
	setup()
	//username := "user2"
	url := "/api/articles"
	req := httptest.NewRequest(http.MethodGet, url, nil)
	req.Header.Set("Content-type", "application/json")
	h.Register(e)

	resp, err := e.Test(req, -1)
	assert.NoError(t, err)

	if assert.Equal(t, http.StatusOK, resp.StatusCode) {
		body, _ := ioutil.ReadAll(resp.Body)
		var aa articleListResponse
		err := json.Unmarshal(body, &aa)
		assert.NoError(t, err)
		assert.Equal(t, 2, aa.ArticlesCount)
	}

}

func TestGetArticlesCaseSuccess(t *testing.T) {
	tearDown()
	setup()
	slug := "article1-slug"
	url := "/api/articles/" + slug
	req := httptest.NewRequest(http.MethodGet, url, nil)
	req.Header.Set("Content-type", "application/json")
	h.Register(e)

	resp, err := e.Test(req, -1)
	assert.NoError(t, err)

	if assert.Equal(t, http.StatusOK, resp.StatusCode) {
		body, _ := ioutil.ReadAll(resp.Body)
		var a singleArticleResponse
		err := json.Unmarshal(body, &a)
		assert.NoError(t, err)
		assert.Equal(t, slug, a.Article.Slug)
		assert.Equal(t, 2, len(a.Article.TagList))
	}
}

func TestCreateArticleCaseSuccess(t *testing.T) {
	tearDown()
	setup()
	var (
		reqJSON = `{"article":{"title":"article2","description":"article2","body":"article2","tagList":["tag1","tag2"]}}`
	)
	req := httptest.NewRequest(http.MethodPost, "/api/articles", strings.NewReader(reqJSON))
	req.Header.Set("Content-type", "application/json")
	req.Header.Set("Authorization", authHeader(utils.GenerateJWT(1)))
	h.Register(e)
	resp, _ := e.Test(req, -1)
	if assert.Equal(t, http.StatusCreated, resp.StatusCode) {
		body, _ := ioutil.ReadAll(resp.Body)
		var a singleArticleResponse
		err := json.Unmarshal(body, &a)
		assert.NoError(t, err)
		assert.Equal(t, "article2", a.Article.Slug)
		assert.Equal(t, "article2", a.Article.Description)
		assert.Equal(t, "article2", a.Article.Title)
		assert.Equal(t, "user1", a.Article.Author.Username)

		assert.Equal(t, 2, len(a.Article.TagList))

	}
}
func TestUpdateArticleCaseSuccess(t *testing.T) {
	tearDown()
	setup()
	var (
		reqJSON = `{"article":{"title":"article1 part 2","tagList":["tag3"]}}`
	)
	slug := "article1-slug"
	req := httptest.NewRequest(http.MethodPut, "/api/articles/"+slug, strings.NewReader(reqJSON))
	req.Header.Set("Content-type", "application/json")
	req.Header.Set("Authorization", authHeader(utils.GenerateJWT(1)))
	h.Register(e)
	resp, _ := e.Test(req, -1)
	if assert.Equal(t, http.StatusOK, resp.StatusCode) {
		body, _ := ioutil.ReadAll(resp.Body)
		var a singleArticleResponse
		err := json.Unmarshal(body, &a)
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
	//username := "user2"
	url := "/api/articles/feed"
	req := httptest.NewRequest(http.MethodGet, url, nil)
	req.Header.Set("Content-type", "application/json")
	req.Header.Set("Authorization", authHeader(utils.GenerateJWT(1)))
	h.Register(e)

	resp, err := e.Test(req, -1)
	assert.NoError(t, err)

	if assert.Equal(t, http.StatusOK, resp.StatusCode) {
		body, _ := ioutil.ReadAll(resp.Body)
		var a articleListResponse
		err := json.Unmarshal(body, &a)
		assert.NoError(t, err)
		assert.Equal(t, 1, len(a.Articles))
		assert.Equal(t, a.ArticlesCount, len(a.Articles))
		assert.Equal(t, "article2 title", a.Articles[0].Title)
	}

}

func TestDeleteArticleCaseSuccess(t *testing.T) {
	tearDown()
	setup()
	slug := "article1-slug"
	url := "/api/articles/" + slug
	req := httptest.NewRequest(http.MethodDelete, url, nil)
	req.Header.Set("Content-type", "application/json")
	req.Header.Set("Authorization", authHeader(utils.GenerateJWT(1)))
	h.Register(e)

	resp, err := e.Test(req, -1)
	assert.NoError(t, err)

	if assert.Equal(t, http.StatusOK, resp.StatusCode) {
		resp, err = e.Test(req, -1)
		assert.NoError(t, err)
		assert.Equal(t, http.StatusNotFound, resp.StatusCode)
	}

}

func TestGetCommentsCaseSuccess(t *testing.T) {
	tearDown()
	setup()
	slug := "article1-slug"
	url := "/api/articles/" + slug + "/comments"
	req := httptest.NewRequest(http.MethodGet, url, nil)
	req.Header.Set("Content-type", "application/json")
	req.Header.Set("Authorization", authHeader(utils.GenerateJWT(1)))
	h.Register(e)

	resp, err := e.Test(req, -1)
	assert.NoError(t, err)

	if assert.Equal(t, http.StatusOK, resp.StatusCode) {
		body, _ := ioutil.ReadAll(resp.Body)
		var cc commentListResponse
		err := json.Unmarshal(body, &cc)
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

	slug := "article1-slug"
	url := "/api/articles/" + slug + "/comments"
	req := httptest.NewRequest(http.MethodPost, url, strings.NewReader(reqJSON))
	req.Header.Set("Content-type", "application/json")
	req.Header.Set("Authorization", authHeader(utils.GenerateJWT(2)))
	h.Register(e)

	resp, err := e.Test(req, -1)
	assert.NoError(t, err)

	if assert.Equal(t, http.StatusCreated, resp.StatusCode) {
		body, _ := ioutil.ReadAll(resp.Body)
		var c singleCommentResponse
		err := json.Unmarshal(body, &c)
		assert.NoError(t, err)
		assert.Equal(t, "article1 comment2 by user2", c.Comment.Body)
		assert.Equal(t, "user2", c.Comment.Author.Username)
	}
}
func TestDeleteCommentCaseSuccess(t *testing.T) {
	tearDown()
	setup()
	slug := "article1-slug"
	commentId := "1"
	url := "/api/articles/" + slug + "/comments/" + commentId
	req := httptest.NewRequest(http.MethodDelete, url, nil)
	req.Header.Set("Content-type", "application/json")
	req.Header.Set("Authorization", authHeader(utils.GenerateJWT(1)))
	h.Register(e)

	resp, err := e.Test(req, -1)
	assert.NoError(t, err)

	if assert.Equal(t, http.StatusOK, resp.StatusCode) {
		resp, err = e.Test(req, -1)
		assert.NoError(t, err)
		assert.Equal(t, http.StatusNotFound, resp.StatusCode)
	}
}

func TestFavoriteCaseSuccess(t *testing.T) {
	tearDown()
	setup()
	slug := "article1-slug"
	url := "/api/articles/" + slug + "/favorite"
	req := httptest.NewRequest(http.MethodPost, url, nil)
	req.Header.Set("Content-type", "application/json")
	req.Header.Set("Authorization", authHeader(utils.GenerateJWT(2)))
	h.Register(e)

	resp, err := e.Test(req, -1)
	assert.NoError(t, err)
	if assert.Equal(t, http.StatusOK, resp.StatusCode) {
		body, _ := ioutil.ReadAll(resp.Body)
		var a singleArticleResponse
		err := json.Unmarshal(body, &a)
		assert.NoError(t, err)
		assert.Equal(t, "article1 title", a.Article.Title)
		assert.True(t, a.Article.Favorited)
		assert.Equal(t, 1, a.Article.FavoritesCount)
	}
}
func TestUnfavoriteCaseSuccess(t *testing.T) {
	tearDown()
	setup()
	slug := "article2-slug"
	url := "/api/articles/" + slug + "/favorite"
	req := httptest.NewRequest(http.MethodDelete, url, nil)
	req.Header.Set("Content-type", "application/json")
	req.Header.Set("Authorization", authHeader(utils.GenerateJWT(1)))
	h.Register(e)

	resp, err := e.Test(req, -1)
	assert.NoError(t, err)
	if assert.Equal(t, http.StatusOK, resp.StatusCode) {
		body, _ := ioutil.ReadAll(resp.Body)
		var a singleArticleResponse
		err := json.Unmarshal(body, &a)
		assert.NoError(t, err)
		assert.Equal(t, "article2 title", a.Article.Title)
		assert.False(t, a.Article.Favorited)
		assert.Equal(t, 0, a.Article.FavoritesCount)
	}
}
func TestGetTagsCaseSuccess(t *testing.T) {
	tearDown()
	setup()
	url := "/api/tags"
	req := httptest.NewRequest(http.MethodGet, url, nil)
	req.Header.Set("Content-type", "application/json")
	h.Register(e)

	resp, err := e.Test(req, -1)
	assert.NoError(t, err)
	if assert.Equal(t, http.StatusOK, resp.StatusCode) {
		body, _ := ioutil.ReadAll(resp.Body)
		var tt tagListResponse
		err := json.Unmarshal(body, &tt)
		assert.NoError(t, err)
		assert.Equal(t, 2, len(tt.Tags))
		assert.Contains(t, tt.Tags, "tag1")
		assert.Contains(t, tt.Tags, "tag2")
	}
}

//body, _ := ioutil.ReadAll(resp.Body)
//fmt.Printf("%s", body)
