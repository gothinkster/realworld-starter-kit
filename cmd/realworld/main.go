package main

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	_ "github.com/pavelkozlov/realworld/docs"
	"github.com/pavelkozlov/realworld/internal/user/repository"
	"github.com/pavelkozlov/realworld/internal/user/service"
	userApi "github.com/pavelkozlov/realworld/internal/user/transport/http"
	"github.com/pavelkozlov/realworld/pkg/db"
	"github.com/pavelkozlov/realworld/pkg/hash"
	"github.com/pavelkozlov/realworld/pkg/jwt"
	"github.com/swaggo/http-swagger"
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
// @BasePath  /

// @securityDefinitions.basic  BasicAuth
func main() {
	db := db.Connect()

	repo := repository.NewUserRepo(db)

	hasher := hash.NewHasher()
	jwt := jwt.NewSigner()

	userUsecase := service.NewUserService(repo, hasher, jwt)

	handlers := userApi.NewUserApi(userUsecase)

	mux := chi.NewMux()

	mux.Use(middleware.Recoverer)

	mux.Get("/swagger/*", httpSwagger.Handler(
		httpSwagger.URL("http://localhost:8080/swagger/doc.json"), //The url pointing to API definition
	))

	mux.Route("/api", func(r chi.Router) {
		// public
		r.Route("/users", func(r chi.Router) {
			r.Post("/login", handlers.Authentication)
			r.Post("/registration", handlers.Registration)
		})

		// protected
		r.Route("/user", func(r chi.Router) {
			r.Use(jwt.AuthMiddleware)
			r.Get("/", handlers.GetCurrentUser)
		})
	})

	http.ListenAndServe(":8080", mux)
}
