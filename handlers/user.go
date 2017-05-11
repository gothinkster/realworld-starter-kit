package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/JackyChiu/realworld-starter-kit/models"
)

type User struct {
	Username string `json:"username"`
	Email    string `json:"email"`
	Token    string `json:"token"`
	Bio      string `json:"bio"`
	Image    string `json:"image"`
}

type UserJSON struct {
	User *User `json:"user"`
}

func (h *Handler) RegisterUser(w http.ResponseWriter, r *http.Request) {
	body := struct {
		User struct {
			Username string `json:"username"`
			Email    string `json:"email"`
			Password string `json:"password"`
		} `json:"user"`
	}{}
	u := &body.User

	err := json.NewDecoder(r.Body).Decode(&body)
	if err != nil {
		h.Logger.Println(err)
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}
	defer r.Body.Close()

	m, err := models.NewUser(u.Email, u.Username, u.Password)
	if err != nil {
		h.Logger.Println(err)
		// TODO: Error JSON
		http.Error(w, err.Error(), http.StatusUnprocessableEntity)
		return
	}

	err = h.DB.CreateUser(m)
	if err != nil {
		h.Logger.Println(err)
		// TODO: Error JSON
		http.Error(w, err.Error(), http.StatusUnprocessableEntity)
		return
	}

	res := &UserJSON{
		&User{
			Username: m.Username,
			Email:    m.Email,
			Token:    h.JWT.NewToken(m.Username),
		},
	}
	json.NewEncoder(w).Encode(res)
}
func (h *Handler) LoginUser(w http.ResponseWriter, r *http.Request) {
	body := struct {
		User struct {
			Email    string `json:"email"`
			Password string `json:"password"`
		} `json:"user"`
	}{}
	u := &body.User

	err := json.NewDecoder(r.Body).Decode(&body)
	if err != nil {
		h.Logger.Println(err)
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}
	defer r.Body.Close()

	m, err := h.DB.FindUserByEmail(u.Email)
	if err != nil {
		h.Logger.Println(err)
		// TODO: Error JSON
		http.Error(w, err.Error(), http.StatusUnprocessableEntity)
		return
	}

	match := m.MatchPassword(u.Password)
	if !match {
		// TODO: Error JSON
		http.Error(w, err.Error(), http.StatusUnprocessableEntity)
		return
	}

	res := &UserJSON{
		&User{
			Username: m.Username,
			Email:    m.Email,
			Token:    h.JWT.NewToken(m.Username),
			Bio:      m.Bio,
			Image:    m.Image,
		},
	}
	json.NewEncoder(w).Encode(res)
}
