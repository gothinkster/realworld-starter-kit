package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	_ "github.com/mattn/go-sqlite3"
)

const createUserTable = `
CREATE TABLE IF NOT EXISTS users(
	username TEXT,
	email TEXT,
	password TEXT,
	bio TEXT
)
`

const insertUser = `
INSERT OR REPLACE INTO users(username, email, password)
VALUES (?, ?, ?)
`

func CreateUserTable() {
	db, err := sql.Open("sqlite3", ".sqlite3")
	if err != nil {
		fmt.Println(err)
		return
	}
	defer db.Close()

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

func (u *User) Save(db *sql.DB) error {
	stmt, err := db.Prepare(insertUser)
	if err != nil {
		return err
	}
	defer stmt.Close()

	_, err = stmt.Exec(u.Username, u.Email, u.Password)
	if err != nil {
		return err
	}
	return nil
}

type UserJSON struct {
	User `json:"user"`
}

func UserRouter(w http.ResponseWriter, r *http.Request) {
	var err error

	switch r.Method {
	case "POST":
		err = RegisterUser(w, r)
	default:
		http.NotFound(w, r)
	}

	if err != nil {
		log.Println(err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}

func RegisterUser(w http.ResponseWriter, r *http.Request) error {
	u := UserJSON{}

	err := json.NewDecoder(r.Body).Decode(&u)
	if err != nil {
		return err
	}
	defer r.Body.Close()

	db, err := sql.Open("sqlite3", ".sqlite3")
	if err != nil {
		return err
	}
	defer db.Close()

	err = u.Save(db)
	if err != nil {
		return err
	}

	fmt.Fprint(w, json.NewEncoder(w).Encode(u))
	return nil
}
