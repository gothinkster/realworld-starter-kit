package api

import (
	"github.com/pavelkozlov/realworld/internal/responses"
	"github.com/pavelkozlov/realworld/internal/user"
	"net/http"
)

type api struct {
}

func (a api) Authentication(w http.ResponseWriter, r *http.Request) {
	var dest authenticationReq
	err := readAndValidate(r, &dest)
	if err != nil {
		responses.NewErrorResp(w, http.StatusUnprocessableEntity, err)
		return
	}
	type u struct {
		Email    string `json:"email"`
		Token    string `json:"token"`
		Username string `json:"username"`
		Bio      string `json:"bio"`
		Image    string `json:"image"`
	}

	responses.NewOkResp(w, &user.SingleResponse{
		User: user.AuthenticationResponse{
			Email:    dest.Email,
			Token:    "token",
			Username: dest.Email,
			Bio:      nil,
			Image:    nil,
		},
	})
}

func (a api) Registration(w http.ResponseWriter, r *http.Request) {
	//TODO implement me
	panic("implement me")
}

func (a api) GetCurrentUser(w http.ResponseWriter, r *http.Request) {
	//TODO implement me
	panic("implement me")
}

func (a api) UpdateUser(w http.ResponseWriter, r *http.Request) {
	//TODO implement me
	panic("implement me")
}

func (a api) GetProfile(w http.ResponseWriter, r *http.Request) {
	//TODO implement me
	panic("implement me")
}

func (a api) FollowUser(w http.ResponseWriter, r *http.Request) {
	//TODO implement me
	panic("implement me")
}

func (a api) UnfollowUser(w http.ResponseWriter, r *http.Request) {
	//TODO implement me
	panic("implement me")
}

func NewUserApi() user.Transport {
	return &api{}
}
