package http

import (
	"github.com/labstack/echo"
	"github.com/xesina/golang-echo-realworld-example-app/user"
	"github.com/xesina/golang-echo-realworld-example-app/utils"
	"net/http"
)

func (h *Handler) mustGetUserByID(c echo.Context, id uint) (*user.User, error) {
	u, err := h.userStore.GetByID(id)
	if err != nil {
		return nil, c.JSON(http.StatusInternalServerError, utils.NewError(err))
	}
	if u == nil {
		return nil, c.JSON(http.StatusNotFound, nil)
	}
	return u, nil
}

func (h *Handler) mustGetUserByUsername(c echo.Context, username string) (*user.User, error) {
	u, err := h.userStore.GetByUsername(username)
	if err != nil {
		return nil, c.JSON(http.StatusInternalServerError, utils.NewError(err))
	}
	if u == nil {
		return nil, c.JSON(http.StatusNotFound, nil)
	}
	return u, nil
}

func (h *Handler) SignUp(c echo.Context) error {
	var u user.User
	req := &userRegisterRequest{}
	if err := req.bind(c, &u); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, utils.NewError(err))
	}
	if err := h.userStore.Create(&u); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, utils.NewError(err))
	}
	return c.JSON(http.StatusCreated, newUserResponse(&u))
}

func (h *Handler) Login(c echo.Context) error {
	req := &userLoginRequest{}
	if err := req.bind(c); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, utils.NewError(err))
	}
	u, err := h.userStore.GetByEmail(req.User.Email)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, utils.NewError(err))
	}
	if u == nil {
		return c.JSON(http.StatusForbidden, utils.NewError(err))
	}
	if !u.CheckPassword(req.User.Password) {
		return c.JSON(http.StatusForbidden, utils.AccessForbidden())
	}
	return c.JSON(http.StatusOK, newUserResponse(u))
}

func (h *Handler) CurrentUser(c echo.Context) error {
	u, err := h.mustGetUserByID(c, userIDFromToken(c))
	if err != nil {
		return err
	}
	return c.JSON(http.StatusOK, newUserResponse(u))
}

func (h *Handler) UpdateUser(c echo.Context) error {
	u, err := h.mustGetUserByID(c, userIDFromToken(c))
	if err != nil {
		return err
	}
	req := newUserUpdateRequest()
	req.populate(u)
	if err := req.bind(c, u); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, utils.NewError(err))
	}
	if err := h.userStore.Update(u); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, utils.NewError(err))
	}
	return c.JSON(http.StatusOK, newUserResponse(u))
}

func (h *Handler) GetProfile(c echo.Context) error {
	username := c.Param("username")
	u, err := h.mustGetUserByUsername(c, username)
	if err != nil {
		return err
	}
	return c.JSON(http.StatusOK, newProfileResponse(c, u))
}

func (h *Handler) Follow(c echo.Context) error {
	followerID := userIDFromToken(c)
	username := c.Param("username")
	u, err := h.mustGetUserByUsername(c, username)
	if err != nil {
		return err
	}
	if err := h.userStore.AddFollower(u, followerID); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, utils.NewError(err))
	}
	return c.JSON(http.StatusOK, newProfileResponse(c, u))
}
func (h *Handler) Unfollow(c echo.Context) error {
	followerID := userIDFromToken(c)
	username := c.Param("username")
	u, err := h.mustGetUserByUsername(c, username)
	if err != nil {
		return err
	}
	if err := h.userStore.RemoveFollower(u, followerID); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, utils.NewError(err))
	}
	return c.JSON(http.StatusOK, newProfileResponse(c, u))
}
func userIDFromToken(c echo.Context) uint {
	id, ok := c.Get("user").(uint)
	if !ok {
		return 0
	}
	return id
}
