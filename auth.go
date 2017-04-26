package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"

	_ "github.com/mattn/go-sqlite3"
)

const createUserTable = `
CREATE TABLE IF NOT EXISTS Users(
	username TEXT
	email TEXT
	password TEXT
)
`

func CreateUserTable() {
	db, err := sql.Open("sqlite3", "data.db")
	defer db.Close()
	if err != nil {
		fmt.Println(err)
		return
	}

	_, err = db.Exec(createUserTable)
	if err != nil {
		fmt.Println(err)
		return
	}
}

type User struct {
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
	Bio      string `json:"bio"`
}

type UserReqBody struct {
	User `json:"user"`
}

func RegisterUser(w http.ResponseWriter, r *http.Request) {
	user := UserReqBody{}

	err := json.NewDecoder(r.Body).Decode(&user)
	defer r.Body.Close()
	if err != nil {
		fmt.Println(err)
		return
	}

	fmt.Println(user)
}
