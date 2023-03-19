package api

import (
	"errors"
	"net/http"

	db "github.com/aliml92/realworld-gin-sqlc/db/sqlc"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

var (
	ErrUsernameAlreadyTaken = errors.New("username already taken")
	ErrEmailAlreadyTaken    = errors.New("email already taken")
	ErrNotFound			    = errors.New("not found")
)

type userRegisterReq struct {
	User struct {
		Username string `json:"username" binding:"required"`
		Email    string `json:"email" binding:"required,email"`
		Password string `json:"password" binding:"required"`
	} `json:"user" binding:"required"`
}

func (r *userRegisterReq) bind(c *gin.Context, p *db.CreateUserParams) error {
	if err := c.ShouldBindJSON(r); err != nil {
		return err
	}
	p.Username = r.User.Username
	p.Email = r.User.Email
	hashed, err := bcrypt.GenerateFromPassword([]byte(r.User.Password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	p.Password = string(hashed)
	return nil
}

type userResponse struct {
	User struct {
		Username string  `json:"username"`
		Email    string  `json:"email"`
		Bio      *string `json:"bio"`
		Image    *string `json:"image"`
		Token    string  `json:"token"`
	} `json:"user"`
}

func newUserResponse(user *db.User) *userResponse {
	var bio, image string
	resp := new(userResponse)
	resp.User.Username = user.Username
	resp.User.Email = user.Email
	if user.Bio.Valid {
		bio = user.Bio.String
		resp.User.Bio = &bio
	}
	if user.Image.Valid {
		image = user.Image.String
		resp.User.Image = &image
	}
	token, _ := GenerateJWT(user.ID.String())
	resp.User.Token = token
	return resp
}

func (s *Server) RegisterUser(c *gin.Context){
	var (
		req userRegisterReq
		p  db.CreateUserParams
	)
	if err := req.bind(c, &p); err != nil {
		c.JSON(http.StatusUnprocessableEntity, NewError(err))
		return
	}
	user, err := s.store.CreateUser(c, p)
	if err != nil {
		if constraintErr(err) != nil {
			c.JSON(http.StatusUnprocessableEntity, constraintErr(err))
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	// return user and token	
	c.JSON(http.StatusCreated, newUserResponse(user))
}

type userLoginReq struct {
	User struct {
		Email    string `json:"email" binding:"required,email"`
		Password string `json:"password" binding:"required"`
	} `json:"user"`
}

func (s *Server) LoginUser(c *gin.Context) {
	var req userLoginReq
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusUnprocessableEntity, NewError(err))
		return
	}
	u, err := Nullable(s.store.GetUserByEmail(c.Request.Context(), req.User.Email))
	if err != nil {
		c.JSON(http.StatusInternalServerError, NewError(err))
		return
	}
	if u == nil {
		c.JSON(http.StatusForbidden, NewError(errors.New("access forbidden")))
		return
	}
	if err := bcrypt.CompareHashAndPassword([]byte(u.Password), []byte(req.User.Password)); err != nil {
		c.JSON(http.StatusForbidden, NewError(errors.New("access forbidden")))
		return
	}

	c.JSON(http.StatusOK, newUserResponse(u))
}


