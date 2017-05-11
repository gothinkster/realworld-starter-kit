package handlers

import (
	"log"
	"net/http"

	"github.com/JackyChiu/realworld-starter-kit/auth"
	"github.com/JackyChiu/realworld-starter-kit/models"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
)

type Handler struct {
	DB     models.Datastorer
	JWT    auth.Tokener
	Logger *log.Logger
}

func New(db *models.DB, jwt *auth.JWT, logger *log.Logger) *Handler {
	return &Handler{db, jwt, logger}
}

func (h *Handler) UsersHandler(w http.ResponseWriter, r *http.Request) {
	h.Logger.Println(r.Method, r.URL.Path)

	switch r.Method {
	case "POST":
		h.RegisterUser(w, r)
	case "GET":
		// TODO:
		// Check auth
		// Get current users
	case "PUT":
		// TODO:
		// Check auth
		// Update user
	default:
		http.NotFound(w, r)
	}
}

func (h *Handler) LoginHandler(w http.ResponseWriter, r *http.Request) {
	h.Logger.Println(r.Method, r.URL.Path)

	switch r.Method {
	case "POST":
		h.LoginUser(w, r)
	default:
		http.NotFound(w, r)
	}
}
