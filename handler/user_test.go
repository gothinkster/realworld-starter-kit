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
	userJSON = `{"user":{"username":"alice","email":"alice@realworld.io","password":"secret"}}`
)

type Validator struct {
	validator *validator.Validate
}

func (v *Validator) Validate(i interface{}) error {
	return v.validator.Struct(i)
}

func TestRegister(t *testing.T) {
	e := echo.New()
	e.Validator = &Validator{validator: validator.New()}
	req := httptest.NewRequest(echo.POST, "/api/users", strings.NewReader(userJSON))
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)
	h := handler.New(db)

	if assert.NoError(t, h.Register(c)) {
		assert.Equal(t, http.StatusCreated, rec.Code)
		//assert.Equal(t, userJSON, rec.Body.String())
	}
}
