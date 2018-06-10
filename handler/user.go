package handler

import (
	"net/http"

	"github.com/labstack/echo"
	"github.com/xesina/golang-echo-realworld-example-app/models"
	"github.com/xesina/golang-echo-realworld-example-app/utils"
)

func (h *Handler) Register(c echo.Context) error {
	var u models.User
	req := &userRegisterRequest{}
	if err := req.bind(c, &u); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, utils.NewError(err))
	}
	if err := h.db.Create(&u).Error; err != nil {
		return c.JSON(http.StatusUnprocessableEntity, utils.NewError(err))
	}
	return c.JSON(http.StatusCreated, newUserResponse(&u))
}

func (h *Handler) Login(c echo.Context) error {
	var u models.User
	req := &userLoginRequest{}
	if err := req.bind(c, &u); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, utils.NewError(err))
	}
	if err := h.db.Where(&models.User{Email: u.Email}).First(&u).Error; err != nil {
		//TODO: Return appropriate error
		return c.JSON(http.StatusForbidden, utils.NewError(err))
	}
	if err := u.CheckPassword(req.User.Password); err != nil {
		//TODO: Return appropriate error
		return c.JSON(http.StatusForbidden, utils.NewError(err))
	}
	return c.JSON(http.StatusOK, newUserResponse(&u))
}

func (h *Handler) CurrentUser(c echo.Context) error {
	var u models.User
	if err := h.db.First(&u, userIDFromToken(c)).Error; err != nil {
		return c.JSON(http.StatusUnprocessableEntity, utils.NewError(err))
	}
	return c.JSON(http.StatusOK, newUserResponse(&u))
}

func (h *Handler) UpdateUser(c echo.Context) error {
	var u models.User
	h.db.First(&u, userIDFromToken(c))
	req := newUserUpdateRequest()
	req.populate(&u)
	if err := req.bind(c, &u); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, utils.NewError(err))
	}
	if err := h.db.Model(&u).Update(&u).Error; err != nil {
		return c.JSON(http.StatusUnprocessableEntity, utils.NewError(err))
	}
	return c.JSON(http.StatusOK, newUserResponse(&u))
}

func (h *Handler) GetProfile(c echo.Context) error {
	username := c.Param("username")
	var u models.User
	if err := h.db.Where(&models.User{Username: username}).Preload("Followers").First(&u).Error; err != nil {
		return c.JSON(http.StatusNotFound, utils.NewError(err))
	}
	return c.JSON(http.StatusOK, newProfileResponse(c, &u))
}

func (h *Handler) Follow(c echo.Context) error {
	var u models.User
	username := c.Param("username")
	followerID := userIDFromToken(c)
	if err := h.db.Where(&models.User{Username: username}).First(&u).Error; err != nil {
		return c.JSON(http.StatusNotFound, utils.NewError(err))
	}
	if err := h.db.Model(&u).Association("Followers").Append(&models.Follow{FollowerID: followerID, FollowingID: u.ID}).Error; err != nil {
		return c.JSON(http.StatusUnprocessableEntity, utils.NewError(err))
	}
	return c.JSON(http.StatusOK, newProfileResponse(c, &u))
}
func (h *Handler) Unfollow(c echo.Context) error {
	var u models.User
	username := c.Param("username")
	followerID := userIDFromToken(c)
	if err := h.db.Where(&models.User{Username: username}).First(&u).Error; err != nil {
		return c.JSON(http.StatusNotFound, utils.NewError(err))
	}

	f := models.Follow{
		FollowerID:  followerID,
		FollowingID: u.ID,
	}
	if err := h.db.Model(&u).Association("Followers").Find(&f).Error; err != nil {
		return c.JSON(http.StatusNotFound, utils.NewError(err))
	}

	if err := h.db.Delete(f).Error; err != nil {
		return c.JSON(http.StatusUnprocessableEntity, utils.NewError(err))
	}

	return c.JSON(http.StatusOK, newProfileResponse(c, &u))
}

func userIDFromToken(c echo.Context) uint {
	id, ok := c.Get("user").(uint)
	if !ok {
		return 0
	}
	return id
}
