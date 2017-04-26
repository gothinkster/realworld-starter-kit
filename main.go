package main

import (
	"log"
	"net/http"
)

func main() {
	// TODO: Creation of tables in proper place
	CreateUserTable()

	http.HandleFunc("/api/users", UserRouter)

	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatal(err)
	}
}
