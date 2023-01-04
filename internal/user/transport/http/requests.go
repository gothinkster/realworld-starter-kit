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

type updateUserRequest struct {
	Username *string `json:"username"`
	Email    *string `json:"email" validate:"omitempty,email"`
	Password *string `json:"password"`
	Image    *string `json:"image"`
	Bio      *string `json:"bio"`
}

func (r updateUserRequest) validate(v validator.Validate) error {
	return v.Struct(&r)
}

func (r authenticationRequest) validate(v validator.Validate) error {
	return v.Struct(&r)
}

func (r registrationRequest) validate(v validator.Validate) error {
	return v.Struct(&r)
}
