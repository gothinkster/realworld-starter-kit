package models

import (
	"fmt"
	"time"

	"golang.org/x/crypto/bcrypt"
)

type UserStorer interface {
	CreateUser(*User) error
}

type User struct {
	ID        int
	CreatedAt time.Time
	Username  string
	Email     string
	Password  string
	Bio       string
	Image     string
}

func (u *User) EncryptPassword() {
	if u.Password != "" {
		hash, _ := bcrypt.GenerateFromPassword([]byte(u.Password), bcrypt.DefaultCost)
		u.Password = string(hash)
	}
}

func NewUser(email, username, password string) *User {
	return &User{
		Email:    email,
		Username: username,
		Password: password,
	}
}

func (db *DB) CreateUser(user *User) error {
	u := User{}

	db.Find(&u, "email = ?", user.Email)
	if u != (User{}) {
		return fmt.Errorf("Email already exisits")
	}

	db.Find(&u, "username = ?", user.Username)
	if u != (User{}) {
		return fmt.Errorf("Username already exisits")
	}

	db.Create(user)

	return nil
}
