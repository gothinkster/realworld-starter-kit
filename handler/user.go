package handler

import (
	"github.com/labstack/echo"
	"github.com/xesina/golang-echo-realworld-example-app/models"
	"net/http"
)

func (h *Handler) Register(c echo.Context) error {
	var u models.User
	req := &userRegisterRequest{}
	if err := req.bind(c, &u); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, NewError(err))
	}
	if err := h.db.Create(&u).Error; err != nil {
		return c.JSON(http.StatusUnprocessableEntity, NewError(err))
	}
	return c.JSON(http.StatusCreated, newUserResponse(&u))
}

func (h *Handler) Login(c echo.Context) error {
	var u models.User
	req := &userLoginRequest{}
	if err := req.bind(c, &u); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, NewError(err))
	}
	if err := h.db.Where(&models.User{Email: u.Email}).First(&u).Error; err != nil {
		//TODO: Return appropriate error
		return c.JSON(http.StatusForbidden, NewError(err))
	}
	if err := u.CheckPassword(req.User.Password); err != nil {
		//TODO: Return appropriate error
		return c.JSON(http.StatusForbidden, NewError(err))
	}
	return c.JSON(http.StatusOK, newUserResponse(&u))
}

func (h *Handler) CurrentUser(c echo.Context) error {
	var u models.User
	if err := h.db.First(&u, userIDFromToken(c)).Error; err != nil {
		return c.JSON(http.StatusUnprocessableEntity, NewError(err))
	}
	return c.JSON(http.StatusOK, newUserResponse(&u))
}

func (h *Handler) UpdateUser(c echo.Context) error {
	var u models.User
	h.db.First(&u, userIDFromToken(c))
	req := newUserUpdateRequest()
	req.populate(&u)
	if err := req.bind(c, &u); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, NewError(err))
	}
	if err := h.db.Model(&u).Update(&u).Error; err != nil {
		return c.JSON(http.StatusUnprocessableEntity, NewError(err))
	}
	return c.JSON(http.StatusOK, newUserResponse(&u))
}

func (h *Handler) GetProfile(c echo.Context) error {
	return c.JSON(http.StatusOK, "Get Profile")
}
func (h *Handler) Follow(c echo.Context) error {
	return c.JSON(http.StatusOK, "Follow user")
}
func (h *Handler) Unfollow(c echo.Context) error {
	return c.JSON(http.StatusOK, "Unfollow user")
}

func userIDFromToken(c echo.Context) uint {
	id := c.Get("user").(uint)
	return id
}
