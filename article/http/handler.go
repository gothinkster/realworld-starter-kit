package http

import (
	"github.com/xesina/golang-echo-realworld-example-app/article"
)

type Handler struct {
	articleStore article.Storage
}

func NewHandler(as article.Storage) *Handler {
	return &Handler{
		articleStore: as,
	}
}
