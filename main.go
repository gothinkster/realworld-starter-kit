package main

import (
	"log"
	"net/http"
	"os"

	"github.com/JackyChiu/realworld-starter-kit/handlers"
	"github.com/JackyChiu/realworld-starter-kit/models"
)

const (
	DATABASE string = "conduit.db"
	DIALECT  string = "sqlite3"
)

func main() {
	logger := log.New(os.Stdout, "", log.LstdFlags|log.Lshortfile)
	h := handlers.New(DIALECT, DATABASE, logger)

	models.Init(h.DB)

	http.HandleFunc("/api/users", h.Users)

	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatal(err)
	}
}
