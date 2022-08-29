//go:generate mockgen  -destination=./mock/user.go -package=mock -mock_names=Service=MockService -source=./user.go

package user

import (
	"github.com/pavelkozlov/realworld/pkg/validator"
	"net/http"
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

type SingleResponse struct {
	User AuthenticationResponse `json:"user"`
}
type AuthenticationResponse struct {
	Email    string  `json:"email"`
	Token    string  `json:"token"`
	Username string  `json:"username"`
	Bio      *string `json:"bio,omitempty"`
	Image    *string `json:"image,omitempty"`
}

type Transport interface {
	Authentication(w http.ResponseWriter, r *http.Request)
	Registration(w http.ResponseWriter, r *http.Request)
	GetCurrentUser(w http.ResponseWriter, r *http.Request)
	UpdateUser(w http.ResponseWriter, r *http.Request)
	GetProfile(w http.ResponseWriter, r *http.Request)
	FollowUser(w http.ResponseWriter, r *http.Request)
	UnfollowUser(w http.ResponseWriter, r *http.Request)
}

type Service interface {
	Authentication(request AuthenticationRequest) (AuthenticationResponse, error)
}
