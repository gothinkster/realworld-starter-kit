package user

import "net/http"

type User struct {
	ID       int
	Email    string
	Password string
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

type Token struct {
	ID     int
	UserID int
	Token  string
}

type Profile struct {
	ID        int
	UserID    int
	Username  string
	Bio       string
	Image     string
	Following bool
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
