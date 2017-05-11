package main

import (
	"log"
	"net/http"
	"os"

	"github.com/JackyChiu/realworld-starter-kit/auth"
	"github.com/JackyChiu/realworld-starter-kit/handlers"
	"github.com/JackyChiu/realworld-starter-kit/models"
)

const (
	DATABASE string = "conduit.db"
	DIALECT  string = "sqlite3"
	PORT     string = ":8080"
)

func main() {
	logger := log.New(os.Stdout, "", log.LstdFlags|log.Lshortfile)

	db, err := models.NewDB(DIALECT, DATABASE)
	if err != nil {
		logger.Fatal(err)
	}

	db.InitSchema()

	j := auth.NewJWT()
	h := handlers.New(db, j, logger)

	http.HandleFunc("/api/users", h.UsersHandler)
	http.HandleFunc("/api/users/login", h.LoginHandler)
	http.HandleFunc("/api/articles", h.ArticlesHandler)
	http.HandleFunc("/api/articles/", h.ArticlesHandler)

	err = http.ListenAndServe(PORT, nil)
	if err != nil {
		logger.Fatal(err)
	}
}
