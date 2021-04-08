package utils

import (
	"fmt"
	"github.com/go-playground/validator/v10"
)

type Error struct {
	Errors map[string]interface{} `json:"errors"`
}

//add switch other variant
func NewError(err error) Error {
	e := Error{}
	e.Errors = make(map[string]interface{})
	switch v := err.(type) {
	default:
		e.Errors["body"] = v.Error()
	}
	return e
}

func NewValidatorError(err error) Error {
	e := Error{}
	e.Errors = make(map[string]interface{})
	errs := err.(validator.ValidationErrors)
	for _, v := range errs {
		e.Errors[v.Field()] = fmt.Sprintf("%v", v.Tag())
	}
	return e
}

func AccessForbidden() Error {
	e := Error{}
	e.Errors = make(map[string]interface{})
	e.Errors["body"] = "access forbidden"
	return e
}

func NotFound() Error {
	e := Error{}
	e.Errors = make(map[string]interface{})
	e.Errors["body"] = "resource not found"
	return e
}
