package api

import (
	"net/http"

	"github.com/go-playground/validator/v10"
	"github.com/pavelkozlov/realworld/pkg/utils"
)

type api struct {
	userService userService
	validator   *validator.Validate
}

// Authentication godoc
// @Summary      Authentication
// @Description  Allow user to get access token
// @Tags         user
// @Accept       json
// @Produce      json
// @Param        authenticationRequest   body      authenticationRequest  true  "authenticationRequest"
// @Success      200  {object}  authResponse
// @Failure      422  {object}  utils.errorWrapper
// @Failure      500  {object}  utils.errorWrapper
// @Router       /api/users/login [post]
func (a api) Authentication(w http.ResponseWriter, r *http.Request) {

	var dest authenticationRequest

	err := readAndValidate(r, &dest, *a.validator)
	if err != nil {
		utils.ErrResp(w, http.StatusUnprocessableEntity, err)
		return
	}

	user, err := a.userService.Authenticate(r.Context(), dest.Email, dest.Password)
	if err != nil {
		utils.ErrResp(w, http.StatusInternalServerError, err)
		return
	}

	utils.Resp(w, &authResponse{
		User: userResponse{
			Email:    user.Email,
			Token:    user.Token,
			Username: user.Username,
			Bio:      user.Bio,
			Image:    user.Image,
		},
	})
}

// Registration godoc
// @Summary      Registration
// @Description  Allow user create a new account
// @Tags         user
// @Accept       json
// @Produce      json
// @Param        registrationRequest   body      registrationRequest  true  "registrationRequest"
// @Success      200  {object}  authResponse
// @Failure      422  {object}  utils.errorWrapper
// @Failure      500  {object}  utils.errorWrapper
// @Router       /api/users/registration [post]
func (a api) Registration(w http.ResponseWriter, r *http.Request) {

	var dest registrationRequest

	err := readAndValidate(r, &dest, *a.validator)
	if err != nil {
		utils.ErrResp(w, http.StatusUnprocessableEntity, err)
		return
	}

	user, err := a.userService.Register(r.Context(), dest.Email, dest.Password, dest.Username)
	if err != nil {
		utils.ErrResp(w, http.StatusInternalServerError, err)
		return
	}

	utils.Resp(w, &authResponse{
		User: userResponse{
			Email:    user.Email,
			Token:    user.Token,
			Username: user.Username,
			Bio:      user.Bio,
			Image:    user.Image,
		},
	})
}

// GetCurrentUser godoc
// @Summary      Get Current User
// @Description  Returns a User that's the current user
// @Tags         user
// @Accept       json
// @Produce      json
// @Param Authorization header string true "With the bearer started"
// @Success      200  {object}  profileResponse
// @Failure      401  {object}  utils.errorWrapper
// @Failure      500  {object}  utils.errorWrapper
// @Router       /api/user [get]
func (a api) GetCurrentUser(w http.ResponseWriter, r *http.Request) {
	user, err := a.userService.GetCurrentUser(r.Context())
	if err != nil {
		utils.ErrResp(w, 500, err)
		return
	}
	utils.Resp(w, &profileResponse{
		Profile: profile{
			Username:  user.Username,
			Bio:       user.Bio,
			Image:     user.Image,
			Following: false,
		},
	})

}

// UpdateUser godoc
// @Summary      Update Current User
// @Description  Returns User that's the current user
// @Tags         user
// @Accept       json
// @Produce      json
// @Param        updateUserRequest   body      updateUserRequest  true  "updateUserRequest"
// @Param Authorization header string true "With the bearer started"
// @Success      200  {object}  profileResponse
// @Failure      401  {object}  utils.errorWrapper
// @Failure      500  {object}  utils.errorWrapper
// @Router       /api/user [put]
func (a api) UpdateUser(w http.ResponseWriter, r *http.Request) {
	var dest updateUserRequest

	err := readAndValidate(r, &dest, *a.validator)
	if err != nil {
		utils.ErrResp(w, http.StatusUnprocessableEntity, err)
		return
	}

	forUpdate := make(map[string]any, 5)
	if dest.Username != nil {
		forUpdate["username"] = *dest.Username
	}
	if dest.Password != nil {
		forUpdate["password"] = *dest.Password
	}
	if dest.Email != nil {
		forUpdate["email"] = *dest.Email
	}
	if dest.Image != nil {
		forUpdate["image"] = *dest.Image
	}
	if dest.Bio != nil {
		forUpdate["bio"] = *dest.Bio
	}

	user, err := a.userService.UpdateUser(r.Context(), forUpdate)
	if err != nil {
		utils.ErrResp(w, http.StatusInternalServerError, err)
		return
	}
	utils.Resp(w, profileResponse{
		Profile: profile{
			Username:  user.Username,
			Bio:       user.Bio,
			Image:     user.Image,
			Following: false,
		},
	})
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
