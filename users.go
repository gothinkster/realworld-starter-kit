package main

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/JackyChiu/realworld-starter-kit/auth"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
)

// User is the model and json repersentation of a user
type User struct {
	gorm.Model `json:"-"`
	Username   string `json:"username"`
	Email      string `json:"email"`
	Password   string `json:"password"`
	Bio        string `json:"bio"`
	Image      string `json:"image"`
	Token      string `json:"token" gorm:"-"`
}

// UserJSON is composed of a user and is used
// for decoding and encoding users as json
type UserJSON struct {
	User `json:"user"`
}

func InitUserTable(db *gorm.DB) {
	db.AutoMigrate(&User{})
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

	db.Save(&u.User)
	u.Token = auth.NewToken(u.Username)

	json.NewEncoder(w).Encode(u)
	return nil
}
