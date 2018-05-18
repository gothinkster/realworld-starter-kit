package handler_test

import (
	"github.com/labstack/echo"
	"github.com/stretchr/testify/assert"
	"github.com/xesina/golang-echo-realworld-example-app/handler"
	"net/http"
	"net/http/httptest"
	"testing"
	"github.com/xesina/golang-echo-realworld-example-app/router"
	"github.com/xesina/golang-echo-realworld-example-app/utils"
	"github.com/xesina/golang-echo-realworld-example-app/router/middleware"
	"strings"
)

var (
	user1JSON = `{"user":{"username":"user1","email":"user1@realworld.io","bio":"user1 bio","image":"http://realworld.io/user1.jpg","token":"([a-zA-Z0-9-_.]{115})"}}`
)

func TestRegister(t *testing.T) {
	tearDown()
	setup()

	var (
		reqJSON = `{"user":{"username":"alice","email":"alice@realworld.io","password":"secret"}}`
		resJSON = `{"user":{"username":"alice","email":"alice@realworld.io","bio":null,"image":null,"token":"([a-zA-Z0-9-_.]{115})"}}`
	)
	e := router.New()
	req := httptest.NewRequest(echo.POST, "/api/users", strings.NewReader(reqJSON))
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)
	h := handler.New(db)

	if assert.NoError(t, h.Register(c)) {
		assert.Equal(t, http.StatusCreated, rec.Code)
		assert.Regexp(t, resJSON, rec.Body.String())
	}
}

func TestLogin(t *testing.T) {
	tearDown()
	setup()

	var (
		reqJSON = `{"user":{"email":"user1@realworld.io","password":"secret"}}`
	)
	e := router.New()
	req := httptest.NewRequest(echo.POST, "/api/users/login", strings.NewReader(reqJSON))
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)
	h := handler.New(db)

	if assert.NoError(t, h.Login(c)) {
		assert.Equal(t, http.StatusOK, rec.Code)
		assert.Regexp(t, user1JSON, rec.Body.String())
	}
}

func TestCurrentUser(t *testing.T) {
	tearDown()
	setup()
	jwtMiddleware := middleware.JWT(utils.JWTSecret)
	e := router.New()
	req := httptest.NewRequest(echo.GET, "/api/users/login", nil)
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	req.Header.Set(echo.HeaderAuthorization, authHeader(utils.GenerateJWT(1)))
	rec := httptest.NewRecorder()
	h := handler.New(db)
	c := e.NewContext(req, rec)
	err := jwtMiddleware(func(context echo.Context) error {
		return h.CurrentUser(c)
	})(c)

	if assert.NoError(t, err) {
		assert.Equal(t, http.StatusOK, rec.Code)
		assert.Regexp(t, user1JSON, rec.Body.String())
	}
}

func TestUpdateUserEmail(t *testing.T) {
	tearDown()
	setup()
	var (
		//userUpdateReq = `{"user":{"username":"user1","password":"secret",email":"user1@user1.me","bio":"user1 bio","image":"http://realworld.io/user1.jpg"}}`
		user1UpdateReq  = `{"user":{"email":"user1@user1.me"}}`
		user1UpdatedRes = `{"user":{"username":"user1","email":"user1@user1.me","bio":"user1 bio","image":"http://realworld.io/user1.jpg","token":"([a-zA-Z0-9-_.]{115})"}}`
	)
	jwtMiddleware := middleware.JWT(utils.JWTSecret)
	e := router.New()
	req := httptest.NewRequest(echo.PUT, "/api/user", strings.NewReader(user1UpdateReq))
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	req.Header.Set(echo.HeaderAuthorization, authHeader(utils.GenerateJWT(1)))
	rec := httptest.NewRecorder()
	h := handler.New(db)
	c := e.NewContext(req, rec)
	err := jwtMiddleware(func(context echo.Context) error {
		return h.UpdateUser(c)
	})(c)

	if assert.NoError(t, err) {
		assert.Equal(t, http.StatusOK, rec.Code)
		assert.Regexp(t, user1UpdatedRes, rec.Body.String())
	}
}

func TestUpdateUserMultipleFields(t *testing.T) {
	tearDown()
	setup()
	var (
		//userUpdateReq = `{"user":{"username":"user1","password":"secret",email":"user1@user1.me","bio":"user1 bio","image":"http://realworld.io/user1.jpg"}}`
		user1UpdateReq  = `{"user":{"username":"user11","email":"user11@user11.me","bio":"user11 bio"}}`
		user1UpdatedRes = `{"user":{"username":"user11","email":"user11@user11.me","bio":"user11 bio","image":"http://realworld.io/user1.jpg","token":"([a-zA-Z0-9-_.]{115})"}}`
	)
	jwtMiddleware := middleware.JWT(utils.JWTSecret)
	e := router.New()
	req := httptest.NewRequest(echo.PUT, "/api/user", strings.NewReader(user1UpdateReq))
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	req.Header.Set(echo.HeaderAuthorization, authHeader(utils.GenerateJWT(1)))
	rec := httptest.NewRecorder()
	h := handler.New(db)
	c := e.NewContext(req, rec)
	err := jwtMiddleware(func(context echo.Context) error {
		return h.UpdateUser(c)
	})(c)

	if assert.NoError(t, err) {
		assert.Equal(t, http.StatusOK, rec.Code)
		assert.Regexp(t, user1UpdatedRes, rec.Body.String())
	}
}

// user1 viewing her own profile
func TestGetProfile(t *testing.T) {
	tearDown()
	setup()
	var (
		user1ProfileRes = `{"profile":{"username":"user1","bio":"user1 bio","image":"http://realworld.io/user1.jpg","following":false}}`
	)
	jwtMiddleware := middleware.JWT(utils.JWTSecret)
	e := router.New()
	req := httptest.NewRequest(echo.GET, "/s", nil)
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	req.Header.Set(echo.HeaderAuthorization, authHeader(utils.GenerateJWT(1)))
	rec := httptest.NewRecorder()
	h := handler.New(db)
	c := e.NewContext(req, rec)
	c.SetPath("/api/profiles/:username")
	c.SetParamNames("username")
	c.SetParamValues("user1")
	err := jwtMiddleware(func(context echo.Context) error {
		return h.GetProfile(c)
	})(c)

	if assert.NoError(t, err) {
		assert.Equal(t, http.StatusOK, rec.Code)
		assert.Regexp(t, user1ProfileRes, rec.Body.String())
	}
}

// user1 trying to view non-existing profile
func TestGetInvalidProfile(t *testing.T) {
	tearDown()
	setup()
	var (
		errRes = `{"errors":{"body":"record not found"}}`
	)
	jwtMiddleware := middleware.JWT(utils.JWTSecret)
	e := router.New()
	req := httptest.NewRequest(echo.GET, "/", nil)
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	req.Header.Set(echo.HeaderAuthorization, authHeader(utils.GenerateJWT(1)))
	rec := httptest.NewRecorder()
	h := handler.New(db)
	c := e.NewContext(req, rec)
	c.SetPath("/api/profiles/:username")
	c.SetParamNames("username")
	c.SetParamValues("unknown")
	err := jwtMiddleware(func(context echo.Context) error {
		return h.GetProfile(c)
	})(c)

	if assert.NoError(t, err) {
		assert.Equal(t, http.StatusNotFound, rec.Code)
		assert.Regexp(t, errRes, rec.Body.String())
	}
}

// user2 viewing user1 profile while she following him
func TestGetProfileByFollower(t *testing.T) {
	tearDown()
	setup()
	var (
		user1ProfileRes = `{"profile":{"username":"user1","bio":"user1 bio","image":"http://realworld.io/user1.jpg","following":true}}`
	)
	jwtMiddleware := middleware.JWT(utils.JWTSecret)
	e := router.New()
	req := httptest.NewRequest(echo.GET, "/", nil)
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	req.Header.Set(echo.HeaderAuthorization, authHeader(utils.GenerateJWT(2)))
	rec := httptest.NewRecorder()
	h := handler.New(db)
	c := e.NewContext(req, rec)
	c.SetPath("/api/profiles/:username")
	c.SetParamNames("username")
	c.SetParamValues("user1")
	err := jwtMiddleware(func(context echo.Context) error {
		return h.GetProfile(c)
	})(c)

	if assert.NoError(t, err) {
		assert.Equal(t, http.StatusOK, rec.Code)
		assert.Regexp(t, user1ProfileRes, rec.Body.String())
	}
}

//user1 follows user2
func TestFollow(t *testing.T) {
	tearDown()
	setup()
	var (
		user2ProfileRes = `{"profile":{"username":"user2","bio":"user2 bio","image":"http://realworld.io/user2.jpg","following":true}}`
	)
	jwtMiddleware := middleware.JWT(utils.JWTSecret)
	e := router.New()
	req := httptest.NewRequest(echo.POST, "/", nil)
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	req.Header.Set(echo.HeaderAuthorization, authHeader(utils.GenerateJWT(1)))
	rec := httptest.NewRecorder()
	h := handler.New(db)
	c := e.NewContext(req, rec)
	c.SetPath("/api/profiles/:username/follow")
	c.SetParamNames("username")
	c.SetParamValues("user2")
	err := jwtMiddleware(func(context echo.Context) error {
		return h.Follow(c)
	})(c)
	if assert.NoError(t, err) {
		assert.Equal(t, http.StatusOK, rec.Code)
		assert.Regexp(t, user2ProfileRes, rec.Body.String())
	}
}

// user1 trying to follows non-existing unknown user
func TestFollowInvalidUser(t *testing.T) {
	tearDown()
	setup()
	var (
		user2ProfileRes = `{"errors":{"body":"record not found"}}`
	)
	jwtMiddleware := middleware.JWT(utils.JWTSecret)
	e := router.New()
	req := httptest.NewRequest(echo.POST, "/", nil)
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	req.Header.Set(echo.HeaderAuthorization, authHeader(utils.GenerateJWT(1)))
	rec := httptest.NewRecorder()
	h := handler.New(db)
	c := e.NewContext(req, rec)
	c.SetPath("/api/profiles/:username/follow")
	c.SetParamNames("username")
	c.SetParamValues("unknown")
	err := jwtMiddleware(func(context echo.Context) error {
		return h.Follow(c)
	})(c)
	if assert.NoError(t, err) {
		assert.Equal(t, http.StatusNotFound, rec.Code)
		assert.Regexp(t, user2ProfileRes, rec.Body.String())
	}
}

// user2 follows user1
func TestUnfollow(t *testing.T) {
	tearDown()
	setup()
	var (
		user1ProfileRes = `{"profile":{"username":"user1","bio":"user1 bio","image":"http://realworld.io/user1.jpg","following":false}}`
	)
	jwtMiddleware := middleware.JWT(utils.JWTSecret)
	e := router.New()
	req := httptest.NewRequest(echo.DELETE, "/", nil)
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	req.Header.Set(echo.HeaderAuthorization, authHeader(utils.GenerateJWT(2)))
	rec := httptest.NewRecorder()
	h := handler.New(db)
	c := e.NewContext(req, rec)
	c.SetPath("/api/profiles/:username/follow")
	c.SetParamNames("username")
	c.SetParamValues("user1")
	err := jwtMiddleware(func(context echo.Context) error {
		return h.Unfollow(c)
	})(c)
	if assert.NoError(t, err) {
		assert.Equal(t, http.StatusOK, rec.Code)
		assert.Regexp(t, user1ProfileRes, rec.Body.String())
	}
}
