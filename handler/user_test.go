package handler_test

import (
	"github.com/labstack/echo"
	"github.com/stretchr/testify/assert"
	"github.com/xesina/golang-echo-realworld-example-app/handler"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
	"github.com/xesina/golang-echo-realworld-example-app/router"
	"github.com/xesina/golang-echo-realworld-example-app/utils"
	"github.com/xesina/golang-echo-realworld-example-app/router/middleware"
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