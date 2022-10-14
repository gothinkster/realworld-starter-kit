package main

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/pavelkozlov/realworld/internal/user/repository"
	"github.com/pavelkozlov/realworld/internal/user/service"
	"github.com/pavelkozlov/realworld/internal/user/service/hash"
	"github.com/pavelkozlov/realworld/internal/user/service/jwt"
	userApi "github.com/pavelkozlov/realworld/internal/user/transport/http"
	"github.com/pavelkozlov/realworld/pkg/db"
)

func main() {
	db := db.Connect()

	repo := repository.NewUserRepo(db)

	hasher := hash.NewHasher()
	jwt := jwt.NewSigner()

	userUsecase := service.NewUserService(repo, hasher, jwt)

	handlers := userApi.NewUserApi(userUsecase)

	mux := chi.NewMux()
	mux.Post("/", handlers.Authentication)

	http.ListenAndServe(":8080", mux)
}
