package handlers

import (
	"log"
	"net/http"

	"github.com/jinzhu/gorm"
)

type Handler struct {
	DB     *gorm.DB
	Logger *log.Logger
}

func New(dialect, dbName string, logger *log.Logger) *Handler {
	db, err := gorm.Open(dialect, dbName)
	if err != nil {
		logger.Fatal(err)
	}

	return &Handler{DB: db, Logger: logger}
}

func (h *Handler) Users(w http.ResponseWriter, r *http.Request) {
	var err error
	h.Logger.Println(r.Method, r.URL.Path)

	switch r.Method {
	case "POST":
		//err = RegisterUser(w, r)
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

func Login(w http.ResponseWriter, r *http.Request) {
	h.Logger.Println(r.Method, r.URL.Path)

	switch r.Method {
	case "POST":
		// TODO:
		// Get token and user
		// Return user
	default:
		http.NotFound(w, r)
	}
}
