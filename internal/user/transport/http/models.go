package api

import (
	"github.com/pavelkozlov/realworld/pkg/validator"
)

type AuthenticationRequest struct {
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required"`
}

type RegistrationRequest struct {
	Username string `json:"username" validate:"required"`
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required"`
}

func (r AuthenticationRequest) validate() error {
	v := validator.GetValidator()
	return v.Struct(&r)
}

func (r RegistrationRequest) validate() error {
	v := validator.GetValidator()
	return v.Struct(&r)
}
