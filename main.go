package main

import (
	"log"
	"net/http"

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

	err = http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatal(err)
	}
}
