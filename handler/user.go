package handler

import (
	"fmt"
	"github.com/alpody/fiber-realworld/model"
	"github.com/alpody/fiber-realworld/utils"
	jwtware "github.com/form3tech-oss/jwt-go"
	"github.com/gofiber/fiber/v2"
	"net/http"
)

// SignUp godoc
// @Summary Register a new user
// @Description Register a new user
// @ID sign-up
// @Tags user
// @Accept json
// @Produce json
// @Param user body userRegisterRequest true "User info for registration"
// @Success 201 {object} userResponse
// @Failure 400 {object} utils.Error
// @Failure 404 {objects} utils.Error
// @Failure 500 {objects} utils.Error
// @Router /users [post]
func (h *Handler) SignUp(c *fiber.Ctx) error {
	var u model.User
	req := &userRegisterRequest{}
	if err := req.bind(c, &u, h.validator); err != nil {
		return c.Status(http.StatusUnprocessableEntity).JSON(utils.NewError(err))
	}
	if err := h.userStore.Create(&u); err != nil {
		return c.Status(http.StatusUnprocessableEntity).JSON(utils.NewError(err))
	}

	return c.Status(http.StatusCreated).JSON(newUserResponse(&u))
}

// Login godoc
// @Summary Login for existing user
// @Description Login for existing user
// @ID login
// @Tags user
// @Accept json
// @Produce json
// @Param user body userLoginRequest true "Credentials to use"
// @Success 200 {object} userResponse
// @Failure 400 {object} utils.Error
// @Failure 401 {object} utils.Error
// @Failure 422 {object} utils.Error
// @Failure 404 {object} utils.Error
// @Failure 500 {object} utils.Error
// @Router /users/login [post]
func (h *Handler) Login(c *fiber.Ctx) error {
	req := &userLoginRequest{}
	if err := req.bind(c, h.validator); err != nil {
		return c.Status(http.StatusUnprocessableEntity).JSON(utils.NewError(err))
	}
	u, err := h.userStore.GetByEmail(req.User.Email)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(utils.NewError(err))
	}
	if u == nil {
		return c.Status(http.StatusForbidden).JSON(utils.AccessForbidden())
	}
	if !u.CheckPassword(req.User.Password) {
		fmt.Printf("wrong password %v", err)
		return c.Status(http.StatusForbidden).JSON(utils.AccessForbidden())
	}
	return c.Status(http.StatusOK).JSON(newUserResponse(u))
}

// CurrentUser godoc
// @Summary Get the current user
// @Description Gets the currently logged-in user
// @ID current-user
// @Tags user
// @Accept json
// @Produce json
// @Param user body userLoginRequest true "Credentials to use"
// @Success 200 {object} userResponse
// @Failure 400 {object} utils.Error
// @Failure 401 {object} utils.Error
// @Failure 422 {object} utils.Error
// @Failure 404 {object} utils.Error
// @Failure 500 {object} utils.Error
// @Security ApiKeyAuth
// @Router /user [get]
func (h *Handler) CurrentUser(c *fiber.Ctx) error {
	u, err := h.userStore.GetByID(userIDFromToken(c))
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(utils.NewError(err))
	}
	if u == nil {
		return c.Status(http.StatusNotFound).JSON(utils.NotFound())
	}
	return c.Status(http.StatusOK).JSON(newUserResponse(u))
}

// UpdateUser godoc
// @Summary Update current user
// @Description Update user information for current user
// @ID update-user
// @Tags user
// @Accept json
// @Produce json
// @Param user body userUpdateRequest true "User details to update. At least **one** field is required."
// @Success 200 {object} userResponse
// @Failure 400 {object} utils.Error
// @Failure 401 {object} utils.Error
// @Failure 422 {object} utils.Error
// @Failure 404 {object} utils.Error
// @Failure 500 {object} utils.Error
// @Security ApiKeyAuth
// @Router /user [get]
func (h *Handler) UpdateUser(c *fiber.Ctx) error {
	u, err := h.userStore.GetByID(userIDFromToken(c))
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(utils.NewError(err))
	}
	if u == nil {
		return c.Status(http.StatusNotFound).JSON(utils.NotFound())
	}
	req := newUserUpdateRequest()
	req.populate(u)
	if err := req.bind(c, u, h.validator); err != nil {
		return c.Status(http.StatusUnprocessableEntity).JSON(utils.NewError(err))
	}
	if err := h.userStore.Update(u); err != nil {
		return c.Status(http.StatusUnprocessableEntity).JSON(utils.NewError(err))
	}
	return c.Status(http.StatusOK).JSON(newUserResponse(u))
}

// GetProfile godoc
// @Summary Get a profile
// @Description Get a profile of a user of the system. Auth is optional
// @ID get-profile
// @Tags profile
// @Accept json
// @Produce json
// @Param username path string true "Username of the profile to get"
// @Success 200 {object} userResponse
// @Failure 400 {object} utils.Error
// @Failure 401 {object} utils.Error
// @Failure 422 {object} utils.Error
// @Failure 404 {object} utils.Error
// @Failure 500 {object} utils.Error
// @Security ApiKeyAuth
// @Router /profiles/{username} [get]
func (h *Handler) GetProfile(c *fiber.Ctx) error {
	username := c.Params("username")
	u, err := h.userStore.GetByUsername(username)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(utils.NewError(err))
	}
	if u == nil {
		return c.Status(http.StatusNotFound).JSON(utils.NotFound())
	}
	return c.Status(http.StatusOK).JSON(newProfileResponse(h.userStore, userIDFromToken(c), u))
}

// Follow godoc
// @Summary Follow a user
// @Description Follow a user by username
// @ID follow
// @Tags follow
// @Accept  json
// @Produce  json
// @Param username path string true "Username of the profile you want to follow"
// @Success 200 {object} profileResponse
// @Failure 400 {object} utils.Error
// @Failure 401 {object} utils.Error
// @Failure 422 {object} utils.Error
// @Failure 404 {object} utils.Error
// @Failure 500 {object} utils.Error
// @Security ApiKeyAuth
// @Router /profiles/{username}/follow [post]
func (h *Handler) Follow(c *fiber.Ctx) error {
	followerID := userIDFromToken(c)
	username := c.Params("username")
	u, err := h.userStore.GetByUsername(username)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(utils.NewError(err))
	}
	if u == nil {
		return c.Status(http.StatusNotFound).JSON(utils.NotFound())
	}
	if err := h.userStore.AddFollower(u, followerID); err != nil {
		return c.Status(http.StatusUnprocessableEntity).JSON(utils.NewError(err))
	}
	return c.Status(http.StatusOK).JSON(newProfileResponse(h.userStore, userIDFromToken(c), u))
}

// Unfollow godoc
// @Summary Unfollow a user
// @Description Unfollow a user by username
// @ID unfollow
// @Tags follow
// @Accept  json
// @Produce  json
// @Param username path string true "Username of the profile you want to unfollow"
// @Success 201 {object} userResponse
// @Failure 400 {object} utils.Error
// @Failure 401 {object} utils.Error
// @Failure 422 {object} utils.Error
// @Failure 404 {object} utils.Error
// @Failure 500 {object} utils.Error
// @Security ApiKeyAuth
// @Router /profiles/{username}/follow [delete]
func (h *Handler) Unfollow(c *fiber.Ctx) error {
	followerID := userIDFromToken(c)
	username := c.Params("username")
	u, err := h.userStore.GetByUsername(username)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(utils.NewError(err))
	}
	if u == nil {
		return c.Status(http.StatusNotFound).JSON(utils.NotFound())
	}
	if err := h.userStore.RemoveFollower(u, followerID); err != nil {
		return c.Status(http.StatusUnprocessableEntity).JSON(utils.NewError(err))
	}
	return c.Status(http.StatusOK).JSON(newProfileResponse(h.userStore, userIDFromToken(c), u))
}

func userIDFromToken(c *fiber.Ctx) uint {
	var user *jwtware.Token
	l := c.Locals("user")
	if l == nil {
		return 0
	}
	user = l.(*jwtware.Token)
	id := uint(((user.Claims.(jwtware.MapClaims)["id"]).(float64)))
	return id
}
