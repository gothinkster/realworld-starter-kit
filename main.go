package main

import (
	"github.com/go-chi/chi/v5"
	"github.com/pavelkozlov/realworld/internal/user/transport/http"
	"net/http"
)

func main() {

	a := api.NewUserApi()
	r := chi.NewRouter()

	r.Use(func(handler http.Handler) http.Handler {
		return http.HandlerFunc(func(writer http.ResponseWriter, request *http.Request) {
			writer.Header().Set("Content-Type", "application/json")
			handler.ServeHTTP(writer, request)
		})
	})

	r.Post("/", a.Authentication)
	http.ListenAndServe(":3000", r)
}
