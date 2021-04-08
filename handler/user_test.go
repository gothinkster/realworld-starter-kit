package handler

import (
	//"fmt"
	"github.com/alpody/fiber-realworld/utils"
	_ "github.com/gofiber/fiber/v2"
	"github.com/stretchr/testify/assert"
	"io/ioutil"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
)

func TestSignUpCaseSuccess(t *testing.T) {
	tearDown()
	setup()
	var (
		reqJSON = `{"user":{"username":"alice","email":"alice@realworld.io","password":"secret"}}`
	)
	req := httptest.NewRequest(http.MethodPost, "/api/users", strings.NewReader(reqJSON))
	req.Header.Set("Content-type", "application/json")
	h.Register(e)
	resp, _ := e.Test(req, -1)
	if assert.Equal(t, http.StatusCreated, resp.StatusCode) {
		body, _ := ioutil.ReadAll(resp.Body)
		m := responseMap(body, "user")
		assert.Equal(t, "alice", m["username"])
		assert.Equal(t, "alice@realworld.io", m["email"])
		assert.Nil(t, m["bio"])
		assert.Nil(t, m["image"])
		assert.NotEmpty(t, m["token"])
	}
}

func TestLoginCaseSuccess(t *testing.T) {
	tearDown()
	setup()
	var (
		reqJSON = `{"user":{"email":"user1@realworld.io","password":"secret"}}`
	)
	req := httptest.NewRequest(http.MethodPost, "/api/users/login", strings.NewReader(reqJSON))
	req.Header.Set("Content-type", "application/json")
	h.Register(e)
	resp, _ := e.Test(req, -1)
	if assert.Equal(t, http.StatusOK, resp.StatusCode) {
		body, _ := ioutil.ReadAll(resp.Body)
		m := responseMap(body, "user")
		assert.Equal(t, "user1", m["username"])
		assert.Equal(t, "user1@realworld.io", m["email"])
	}
}

func TestLoginCaseFailed(t *testing.T) {
	tearDown()
	setup()
	var (
		reqJSON = `{"user":{"email":"userx@realworld.io","password":"secret"}}`
	)
	req := httptest.NewRequest(http.MethodPost, "/api/users/login", strings.NewReader(reqJSON))
	req.Header.Set("Content-type", "application/json")
	h.Register(e)
	resp, err := e.Test(req, -1)
	assert.NoError(t, err)
	assert.Equal(t, http.StatusForbidden, resp.StatusCode)
}
func TestCurrentUserCaseSuccess(t *testing.T) {
	tearDown()
	setup()
	req := httptest.NewRequest(http.MethodGet, "/api/user", nil)
	req.Header.Set("Content-type", "application/json")
	req.Header.Set("Authorization", authHeader(utils.GenerateJWT(1)))
	h.Register(e)
	resp, err := e.Test(req, -1)
	assert.NoError(t, err)
	if assert.Equal(t, http.StatusOK, resp.StatusCode) {
		body, _ := ioutil.ReadAll(resp.Body)
		m := responseMap(body, "user")
		assert.Equal(t, "user1", m["username"])
		assert.Equal(t, "user1@realworld.io", m["email"])
		assert.NotEmpty(t, m["token"])
	}
}
func TestCurrentUserCaseInvalid(t *testing.T) {
	tearDown()
	setup()
	req := httptest.NewRequest(http.MethodGet, "/api/user", nil)
	req.Header.Set("Content-type", "application/json")
	req.Header.Set("Authorization", authHeader(utils.GenerateJWT(100)))
	h.Register(e)
	resp, err := e.Test(req, -1)
	assert.NoError(t, err)
	assert.Equal(t, http.StatusNotFound, resp.StatusCode)
}

func TestUpdateUserEmail(t *testing.T) {
	tearDown()
	setup()
	var (
		user1UpdateReq = `{"user":{"email":"user1@user1.me"}}`
	)
	req := httptest.NewRequest(http.MethodPut, "/api/user", strings.NewReader(user1UpdateReq))
	req.Header.Set("Content-type", "application/json")
	req.Header.Set("Authorization", authHeader(utils.GenerateJWT(1)))
	h.Register(e)
	resp, err := e.Test(req, -1)
	assert.NoError(t, err)

	if assert.Equal(t, http.StatusOK, resp.StatusCode) {
		body, _ := ioutil.ReadAll(resp.Body)
		m := responseMap(body, "user")
		assert.Equal(t, "user1", m["username"])
		assert.Equal(t, "user1@user1.me", m["email"])
		assert.NotEmpty(t, m["token"])
	}
}

func TestUpdateUserMultipleField(t *testing.T) {
	tearDown()
	setup()
	var (
		user1UpdateReq = `{"user":{"username":"user11", "email":"user11@user11.me", "bio":"user11 bio"}}`
	)
	req := httptest.NewRequest(http.MethodPut, "/api/user", strings.NewReader(user1UpdateReq))
	req.Header.Set("Content-type", "application/json")
	req.Header.Set("Authorization", authHeader(utils.GenerateJWT(1)))
	h.Register(e)
	resp, err := e.Test(req, -1)
	assert.NoError(t, err)

	if assert.Equal(t, http.StatusOK, resp.StatusCode) {
		body, _ := ioutil.ReadAll(resp.Body)
		m := responseMap(body, "user")
		assert.Equal(t, "user11", m["username"])
		assert.Equal(t, "user11@user11.me", m["email"])
		assert.Equal(t, "user11 bio", m["bio"])
		assert.NotEmpty(t, m["token"])
	}
}

func TestGetProfileCaseSuccess(t *testing.T) {
	tearDown()
	setup()
	username := "user1"
	url := "/api/profiles/" + username
	req := httptest.NewRequest(http.MethodGet, url, nil)
	req.Header.Set("Content-type", "application/json")
	req.Header.Set("Authorization", authHeader(utils.GenerateJWT(1)))
	h.Register(e)

	resp, err := e.Test(req, -1)
	assert.NoError(t, err)

	if assert.Equal(t, http.StatusOK, resp.StatusCode) {
		body, _ := ioutil.ReadAll(resp.Body)
		m := responseMap(body, "profile")
		assert.Equal(t, "user1", m["username"])
		assert.Equal(t, "user1 bio", m["bio"])
		assert.Equal(t, "http://realworld.io/user1.jpg", m["image"])
		assert.Equal(t, false, m["following"])
	}
}

func TestGetProfileCaseNotFound(t *testing.T) {
	tearDown()
	setup()
	username := "userx"
	url := "/api/profiles/" + username
	req := httptest.NewRequest(http.MethodGet, url, nil)
	req.Header.Set("Content-type", "application/json")
	req.Header.Set("Authorization", authHeader(utils.GenerateJWT(1)))
	h.Register(e)

	resp, err := e.Test(req, -1)
	assert.NoError(t, err)

	assert.Equal(t, http.StatusNotFound, resp.StatusCode)
}

func TestFollowCaseSuccess(t *testing.T) {
	tearDown()
	setup()
	username := "user2"
	url := "/api/profiles/" + username + "/follow"
	req := httptest.NewRequest(http.MethodPost, url, nil)
	req.Header.Set("Content-type", "application/json")
	req.Header.Set("Authorization", authHeader(utils.GenerateJWT(1)))
	h.Register(e)

	resp, err := e.Test(req, -1)
	assert.NoError(t, err)

	if assert.Equal(t, http.StatusOK, resp.StatusCode) {
		body, _ := ioutil.ReadAll(resp.Body)
		m := responseMap(body, "profile")
		assert.Equal(t, "user2", m["username"])
		assert.Equal(t, "user2 bio", m["bio"])
		assert.Equal(t, "http://realworld.io/user2.jpg", m["image"])
		assert.Equal(t, true, m["following"])
	}

}

func TestFollowCaseInvalidUser(t *testing.T) {
	tearDown()
	setup()
	username := "userx"
	url := "/api/profiles/" + username + "/follow"
	req := httptest.NewRequest(http.MethodPost, url, nil)
	req.Header.Set("Content-type", "application/json")
	req.Header.Set("Authorization", authHeader(utils.GenerateJWT(1)))
	h.Register(e)

	resp, err := e.Test(req, -1)
	assert.NoError(t, err)

	assert.Equal(t, http.StatusNotFound, resp.StatusCode)

}

func TestUnFollow(t *testing.T) {
	tearDown()
	setup()
	username := "user2"
	url := "/api/profiles/" + username + "/follow"
	req := httptest.NewRequest(http.MethodDelete, url, nil)
	req.Header.Set("Content-type", "application/json")
	req.Header.Set("Authorization", authHeader(utils.GenerateJWT(1)))
	h.Register(e)

	resp, err := e.Test(req, -1)
	assert.NoError(t, err)

	if assert.Equal(t, http.StatusOK, resp.StatusCode) {
		body, _ := ioutil.ReadAll(resp.Body)
		m := responseMap(body, "profile")
		assert.Equal(t, "user2", m["username"])
		assert.Equal(t, "user2 bio", m["bio"])
		assert.Equal(t, "http://realworld.io/user2.jpg", m["image"])
		assert.Equal(t, false, m["following"])
	}

}
