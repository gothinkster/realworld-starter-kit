package api

import (
	"github.com/go-playground/validator/v10"
	"net/http"
)

type api struct {
	userService userService
	validator   *validator.Validate
}

// ShowAccount godoc
// @Summary      Authentication for user
// @Description  Allow user to get access token
// @Tags         user
// @Accept       json
// @Produce      json
// @Param        authenticationRequest   body      authenticationRequest  true  "Account ID"
// @Success      200  {object}  authenticationResponse
// @Failure      422  {object}  errorWrapper
// @Failure      500  {object}  errorWrapper
// @Router       / [post]
func (a api) Authentication(w http.ResponseWriter, r *http.Request) {

	var dest authenticationRequest

	err := readAndValidate(r, &dest, *a.validator)
	if err != nil {
		newErrorResp(w, http.StatusUnprocessableEntity, err)
		return
	}

	user, err := a.userService.Authenticate(r.Context(), dest.Email, dest.Password)
	if err != nil {
		newErrorResp(w, http.StatusInternalServerError, err)
		return
	}

	newOkResp(w, &singleResponse{
		User: authenticationResponse{
			Email:    user.Email,
			Token:    user.Token,
			Username: user.Username,
			Bio:      user.Bio,
			Image:    user.Image,
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

func NewUserApi(userService userService) api {
	return api{
		userService: userService,
		validator:   validator.New(),
	}
}
