package handler

import (
	"github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo"
	"github.com/xesina/golang-echo-realworld-example-app/models"
	"net/http"
	"time"
)

var JWTSecret = []byte("!!SECRET!!")

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

type loginReq struct {
	User struct {
		Email    string `json:"email" validate:"required,email"`
		Password string `json:"password" validate:"required"`
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
	if err := u.HashPassword(req.User.Password); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, NewError(err))
	}
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
	req := &loginReq{}
	if err := c.Bind(req); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, NewError(err))
	}
	if err := c.Validate(req); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, NewValidatorError(err))
	}
	var u models.User
	if err := h.db.Where(&models.User{Email: req.User.Email}).First(&u).Error; err != nil {
		//TODO: Return appropriate error
		return c.JSON(http.StatusForbidden, NewError(err))
	}
	if err := u.CheckPassword(req.User.Password); err != nil {
		//TODO: Return appropriate error
		return c.JSON(http.StatusForbidden, NewError(err))
	}

	res := new(registerRes)
	res.User.Username = u.Username
	res.User.Email = u.Email
	res.User.Bio = u.Bio
	res.User.Image = u.Image
	res.User.Token = generateJWT(u.ID)

	return c.JSON(http.StatusOK, res)
}

func (h *Handler) CurrentUser(c echo.Context) error {
	userIDFromToken(c)
	return c.JSON(http.StatusOK, userIDFromToken(c))
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

func generateJWT(id uint) string {
	token := jwt.New(jwt.SigningMethodHS256)
	claims := token.Claims.(jwt.MapClaims)
	claims["id"] = id
	claims["exp"] = time.Now().Add(time.Hour * 72).Unix()
	t, _ := token.SignedString(JWTSecret)
	return t
}

func userIDFromToken(c echo.Context) uint {
	id := c.Get("user").(uint)
	return id
}
