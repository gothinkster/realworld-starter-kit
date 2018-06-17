package http

import (
	"github.com/xesina/golang-echo-realworld-example-app/user"
)

type Handler struct {
	userStore user.Storage
}

func NewHandler(us user.Storage) *Handler {
	return &Handler{
		userStore: us,
	}
}
