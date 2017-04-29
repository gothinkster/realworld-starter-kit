package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/JackyChiu/realworld-starter-kit/auth"
	"github.com/JackyChiu/realworld-starter-kit/models"
)

type User struct {
	Username string `json:"username"`
	Email    string `json:"email"`
	Bio      string `json:"bio"`
	Image    string `json:"image"`
	Token    string `json:"token"`
}

type UserReq struct {
	models.User `json:"user"`
}

type UserRes struct {
	User `json:"user"`
}

func (h *Handler) RegisterUser(w http.ResponseWriter, r *http.Request) {
	var u UserReq

	err := json.NewDecoder(r.Body).Decode(&u)
	if err != nil {
		return
	}
	defer r.Body.Close()

	h.DB.Save(&u.User)

	res := UserRes{
		User{
			u.Username,
			u.Email,
			u.Bio,
			u.Image,
			auth.NewToken(u.Username),
		},
	}

	json.NewEncoder(w).Encode(res)
}
