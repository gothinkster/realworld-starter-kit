package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/JackyChiu/realworld-starter-kit/auth"
	"github.com/jinzhu/gorm"
)

var db *gorm.DB

func main() {
	var err error
	db, err = gorm.Open("sqlite3", "conduit.db")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	InitUserTable(db)

	http.HandleFunc("/api/users", UserRouter)
	http.HandleFunc("/api/users/login", auth.ValidateJWT(someFunc))

	err = http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatal(err)
	}
}

func someFunc(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "hello")
}
