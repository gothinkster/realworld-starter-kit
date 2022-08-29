package api

import (
	"github.com/go-playground/validator/v10"
)

type authenticationRequest struct {
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required"`
}

type registrationRequest struct {
	Username string `json:"username" validate:"required"`
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required"`
}

func (r authenticationRequest) validate(v validator.Validate) error {
	return v.Struct(&r)
}

func (r registrationRequest) validate(v validator.Validate) error {
	return v.Struct(&r)
}
