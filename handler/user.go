package handler

import (
	"github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo"
	"net/http"
	"time"
	"github.com/xesina/golang-echo-realworld-example-app/models"
)

type registerReq struct {
	User struct {
		Username string `json:"username" validate:"required"`
		Email    string `json:"email" validate:"required,email"`
		Password string `json:"password" validate:"required"`
	} `json:"user"`
}

type registerRes struct {
	User struct {
		Username string  `json:"username"`
		Email    string  `json:"email"`
		Bio      *string `json:"bio"`
		Image    *string `json:"image"`
		Token    string  `json:"token"`
	} `json:"user"`
}

func (h *Handler) Register(c echo.Context) error {
	req := &registerReq{}
	if err := c.Bind(req); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, NewError(err))
	}
	if err := c.Validate(req); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, NewValidatorError(err))
	}
	u := new(models.User)
	u.Username = req.User.Username
	u.Email = req.User.Email
	u.Password = req.User.Password
	if err := h.db.Create(u).Error; err != nil {
		return c.JSON(http.StatusUnprocessableEntity, NewError(err))
	}
	res := new(registerRes)
	res.User.Username = u.Username
	res.User.Email = u.Email
	res.User.Bio = u.Bio
	res.User.Image = u.Image
	res.User.Token = generateJWT(u.ID)

	return c.JSON(http.StatusCreated, res)
}

func (h *Handler) Login(c echo.Context) error {
	return c.JSON(http.StatusOK, "login user")
}

func (h *Handler) CurrentUser(c echo.Context) error {
	return c.JSON(http.StatusOK, "get current user")
}

func (h *Handler) UpdateUser(c echo.Context) error {
	return c.JSON(http.StatusOK, "update user")
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

var secret = []byte("!!SECRET!!")

func generateJWT(id uint) string {
	token := jwt.New(jwt.SigningMethodHS256)
	claims := token.Claims.(jwt.MapClaims)
	claims["id"] = id
	claims["exp"] = time.Now().Add(time.Hour * 72).Unix()
	t, _ := token.SignedString(secret)
	return t
}
