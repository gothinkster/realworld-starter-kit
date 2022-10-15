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
	"github.com/swaggo/http-swagger"
	_ "github.com/pavelkozlov/realworld/docs"
)

// @title           Real world API
// @version         1.0
// @description     This is a sample server.

// @contact.name   Developer
// @contact.url    https://github.com/pavelkozlov
// @contact.email  it.pavelkozlov@gmail.com

// @license.name  Apache 2.0
// @license.url   http://www.apache.org/licenses/LICENSE-2.0.html

// @host      localhost:8080
// @BasePath  /api/v1

// @securityDefinitions.basic  BasicAuth
func main() {
	db := db.Connect()

	repo := repository.NewUserRepo(db)

	hasher := hash.NewHasher()
	jwt := jwt.NewSigner()

	userUsecase := service.NewUserService(repo, hasher, jwt)

	handlers := userApi.NewUserApi(userUsecase)

	mux := chi.NewMux()
	mux.Post("/", handlers.Authentication)

	mux.Get("/swagger/*", httpSwagger.Handler(
		httpSwagger.URL("http://localhost:8080/swagger/doc.json"), //The url pointing to API definition
	))

	http.ListenAndServe(":8080", mux)
}
