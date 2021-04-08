package handler

import (
	"github.com/alpody/fiber-realworld/article"
	"github.com/alpody/fiber-realworld/user"
)

type Handler struct {
	userStore    user.Store
	articleStore article.Store
	validator    *Validator
}

func NewHandler(us user.Store, as article.Store) *Handler {
	v := NewValidator()
	return &Handler{
		userStore:    us,
		articleStore: as,
		validator:    v,
	}
}
