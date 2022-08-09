package api

import (
	"github.com/pavelkozlov/realworld/pkg/validator"
)

type authenticationReq struct {
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required"`
}

type registrationReq struct {
	Username string `json:"username" validate:"required"`
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required"`
}

func (r authenticationReq) validate() error {
	v := validator.GetValidator()
	return v.Struct(&r)
}

func (r registrationReq) validate() error {
	v := validator.GetValidator()
	return v.Struct(&r)
}
