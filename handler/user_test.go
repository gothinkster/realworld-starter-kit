package handler_test

import (
	"github.com/labstack/echo"
	"github.com/stretchr/testify/assert"
	"github.com/xesina/golang-echo-realworld-example-app/handler"
	"gopkg.in/go-playground/validator.v9"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
)

var (
	userJSON = `{"user":{"username":"alice","email":"alice@realworld.io", "bio":"", "image":"","token":"secret"}}`
)

type Validator struct {
	validator *validator.Validate
}

func (v *Validator) Validate(i interface{}) error {
	return v.validator.Struct(i)
}

func TestRegister(t *testing.T) {
	var (
		reqJSON = `{"user":{"username":"alice","email":"alice@realworld.io","password":"secret"}}`
		resJSON = `{"user":{"username":"alice","email":"alice@realworld.io","bio":null,"image":null,"token":"([a-zA-Z0-9-_.]{115})"}}`
	)
	e := echo.New()
	e.Validator = &Validator{validator: validator.New()}
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
