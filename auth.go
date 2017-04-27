package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
)

type User struct {
	gorm.Model `json:"-"`
	Username   string `json:"username"`
	Email      string `json:"email"`
	Password   string `json:"password"`
	Bio        string `json:"bio"`
}

type UserJSON struct {
	User `json:"user"`
}

func UserRouter(w http.ResponseWriter, r *http.Request) {
	var err error
	log.Println(r.Method, r.URL.Path)

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

	db.AutoMigrate(&User{})
	db.Create(&u.User)

	fmt.Fprint(w, json.NewEncoder(w).Encode(u))
	return nil
}
