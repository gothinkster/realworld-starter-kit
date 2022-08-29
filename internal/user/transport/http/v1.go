package api

import (
	"github.com/pavelkozlov/realworld/internal/responses"
	"github.com/pavelkozlov/realworld/internal/user"
	"net/http"
)

type api struct {
	userService user.Service
}

func (a api) Authentication(w http.ResponseWriter, r *http.Request) {
	var dest AuthenticationRequest
	err := readAndValidate(r, &dest)
	if err != nil {
		responses.NewErrorResp(w, http.StatusUnprocessableEntity, err)
		return
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

func NewUserApi(userService user.Service) user.Transport {
	return &api{
		userService: userService,
	}
}
