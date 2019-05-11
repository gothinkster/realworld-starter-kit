package handler

import (
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/labstack/echo/v4"
	"github.com/stretchr/testify/assert"
	"github.com/xesina/golang-echo-realworld-example-app/router/middleware"
	"github.com/xesina/golang-echo-realworld-example-app/utils"
)

func TestSignUpCaseSuccess(t *testing.T) {
	tearDown()
	setup()
	var (
		reqJSON = `{"user":{"username":"alice","email":"alice@realworld.io","password":"secret"}}`
	)
	req := httptest.NewRequest(echo.POST, "/api/users", strings.NewReader(reqJSON))
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)
	assert.NoError(t, h.SignUp(c))
	if assert.Equal(t, http.StatusCreated, rec.Code) {
		m := responseMap(rec.Body.Bytes(), "user")
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
	req := httptest.NewRequest(echo.POST, "/api/users/login", strings.NewReader(reqJSON))
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)
	assert.NoError(t, h.Login(c))
	if assert.Equal(t, http.StatusOK, rec.Code) {
		m := responseMap(rec.Body.Bytes(), "user")
		assert.Equal(t, "user1", m["username"])
		assert.Equal(t, "user1@realworld.io", m["email"])
		assert.NotEmpty(t, m["token"])
	}
}

func TestLoginCaseFailed(t *testing.T) {
	tearDown()
	setup()
	var (
		reqJSON = `{"user":{"email":"userx@realworld.io","password":"secret"}}`
	)
	req := httptest.NewRequest(echo.POST, "/api/users/login", strings.NewReader(reqJSON))
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)
	assert.NoError(t, h.Login(c))
	assert.Equal(t, http.StatusForbidden, rec.Code)
}

func TestCurrentUserCaseSuccess(t *testing.T) {
	tearDown()
	setup()
	jwtMiddleware := middleware.JWT(utils.JWTSecret)
	req := httptest.NewRequest(echo.GET, "/api/users/login", nil)
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	req.Header.Set(echo.HeaderAuthorization, authHeader(utils.GenerateJWT(1)))
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)
	err := jwtMiddleware(func(context echo.Context) error {
		return h.CurrentUser(c)
	})(c)
	assert.NoError(t, err)
	if assert.Equal(t, http.StatusOK, rec.Code) {
		m := responseMap(rec.Body.Bytes(), "user")
		assert.Equal(t, "user1", m["username"])
		assert.Equal(t, "user1@realworld.io", m["email"])
		assert.NotEmpty(t, m["token"])
	}
}

func TestCurrentUserCaseInvalid(t *testing.T) {
	tearDown()
	setup()
	jwtMiddleware := middleware.JWT(utils.JWTSecret)
	req := httptest.NewRequest(echo.GET, "/api/users/login", nil)
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	req.Header.Set(echo.HeaderAuthorization, authHeader(utils.GenerateJWT(100)))
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)
	err := jwtMiddleware(func(context echo.Context) error {
		return h.CurrentUser(c)
	})(c)
	assert.NoError(t, err)
	assert.Equal(t, http.StatusNotFound, rec.Code)
}

func TestUpdateUserEmail(t *testing.T) {
	tearDown()
	setup()
	var (
		user1UpdateReq = `{"user":{"email":"user1@user1.me"}}`
	)
	jwtMiddleware := middleware.JWT(utils.JWTSecret)
	req := httptest.NewRequest(echo.PUT, "/api/user", strings.NewReader(user1UpdateReq))
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	req.Header.Set(echo.HeaderAuthorization, authHeader(utils.GenerateJWT(1)))
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)
	err := jwtMiddleware(func(context echo.Context) error {
		return h.UpdateUser(c)
	})(c)
	assert.NoError(t, err)
	if assert.Equal(t, http.StatusOK, rec.Code) {
		m := responseMap(rec.Body.Bytes(), "user")
		assert.Equal(t, "user1", m["username"])
		assert.Equal(t, "user1@user1.me", m["email"])
		assert.NotEmpty(t, m["token"])
	}
}

func TestUpdateUserMultipleFields(t *testing.T) {
	tearDown()
	setup()
	var (
		user1UpdateReq = `{"user":{"username":"user11","email":"user11@user11.me","bio":"user11 bio"}}`
	)
	jwtMiddleware := middleware.JWT(utils.JWTSecret)
	req := httptest.NewRequest(echo.PUT, "/api/user", strings.NewReader(user1UpdateReq))
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	req.Header.Set(echo.HeaderAuthorization, authHeader(utils.GenerateJWT(1)))
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)
	err := jwtMiddleware(func(context echo.Context) error {
		return h.UpdateUser(c)
	})(c)
	assert.NoError(t, err)
	if assert.Equal(t, http.StatusOK, rec.Code) {
		m := responseMap(rec.Body.Bytes(), "user")
		assert.Equal(t, "user11", m["username"])
		assert.Equal(t, "user11@user11.me", m["email"])
		assert.Equal(t, "user11 bio", m["bio"])
		assert.NotEmpty(t, m["token"])
	}
}

func TestGetProfileCaseSuccess(t *testing.T) {
	tearDown()
	setup()
	jwtMiddleware := middleware.JWT(utils.JWTSecret)
	req := httptest.NewRequest(echo.GET, "/api/profiles/:username", nil)
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	req.Header.Set(echo.HeaderAuthorization, authHeader(utils.GenerateJWT(1)))
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)
	c.SetPath("/api/profiles/:username")
	c.SetParamNames("username")
	c.SetParamValues("user1")
	err := jwtMiddleware(func(context echo.Context) error {
		return h.GetProfile(c)
	})(c)
	assert.NoError(t, err)
	if assert.Equal(t, http.StatusOK, rec.Code) {
		m := responseMap(rec.Body.Bytes(), "profile")
		assert.Equal(t, "user1", m["username"])
		assert.Equal(t, "user1 bio", m["bio"])
		assert.Equal(t, "http://realworld.io/user1.jpg", m["image"])
		assert.Equal(t, false, m["following"])
	}
}

func TestGetProfileCaseNotFound(t *testing.T) {
	tearDown()
	setup()
	jwtMiddleware := middleware.JWT(utils.JWTSecret)
	req := httptest.NewRequest(echo.GET, "/api/profiles/:username", nil)
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	req.Header.Set(echo.HeaderAuthorization, authHeader(utils.GenerateJWT(1)))
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)
	c.SetPath("/api/profiles/:username")
	c.SetParamNames("username")
	c.SetParamValues("userx")
	err := jwtMiddleware(func(context echo.Context) error {
		return h.GetProfile(c)
	})(c)
	assert.NoError(t, err)
	assert.Equal(t, http.StatusNotFound, rec.Code)
}

func TestFollowCaseSuccess(t *testing.T) {
	tearDown()
	setup()
	jwtMiddleware := middleware.JWT(utils.JWTSecret)
	req := httptest.NewRequest(echo.POST, "/", nil)
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	req.Header.Set(echo.HeaderAuthorization, authHeader(utils.GenerateJWT(1)))
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)
	c.SetPath("/api/profiles/:username/follow")
	c.SetParamNames("username")
	c.SetParamValues("user2")
	err := jwtMiddleware(func(context echo.Context) error {
		return h.Follow(c)
	})(c)
	assert.NoError(t, err)
	if assert.Equal(t, http.StatusOK, rec.Code) {
		m := responseMap(rec.Body.Bytes(), "profile")
		assert.Equal(t, "user2", m["username"])
		assert.Equal(t, "user2 bio", m["bio"])
		assert.Equal(t, "http://realworld.io/user2.jpg", m["image"])
		assert.Equal(t, true, m["following"])
	}
}

func TestFollowCaseInvalidUser(t *testing.T) {
	tearDown()
	setup()
	jwtMiddleware := middleware.JWT(utils.JWTSecret)
	req := httptest.NewRequest(echo.POST, "/", nil)
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	req.Header.Set(echo.HeaderAuthorization, authHeader(utils.GenerateJWT(1)))
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)
	c.SetPath("/api/profiles/:username/follow")
	c.SetParamNames("username")
	c.SetParamValues("userx")
	err := jwtMiddleware(func(context echo.Context) error {
		return h.Follow(c)
	})(c)
	assert.NoError(t, err)
	assert.Equal(t, http.StatusNotFound, rec.Code)
}

func TestUnfollow(t *testing.T) {
	tearDown()
	setup()
	jwtMiddleware := middleware.JWT(utils.JWTSecret)
	req := httptest.NewRequest(echo.DELETE, "/api/profiles/:username/follow", nil)
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	req.Header.Set(echo.HeaderAuthorization, authHeader(utils.GenerateJWT(1)))
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)
	c.SetPath("/api/profiles/:username/follow")
	c.SetParamNames("username")
	c.SetParamValues("user2")
	err := jwtMiddleware(func(context echo.Context) error {
		return h.Unfollow(c)
	})(c)
	assert.NoError(t, err)
	if assert.Equal(t, http.StatusOK, rec.Code) {
		m := responseMap(rec.Body.Bytes(), "profile")
		assert.Equal(t, "user2", m["username"])
		assert.Equal(t, "user2 bio", m["bio"])
		assert.Equal(t, "http://realworld.io/user2.jpg", m["image"])
		assert.Equal(t, false, m["following"])
	}
}
