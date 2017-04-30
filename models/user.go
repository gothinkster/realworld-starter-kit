package models

import (
	"time"

	"github.com/jinzhu/gorm"
)

type User struct {
	ID        int
	CreatedAt time.Time
	Username  string
	Email     string
	Password  string
	Bio       string
	Image     string
}

func NewUser(email, username, password string) *User {
	return &User{
		Email:    email,
		Username: username,
		Password: password,
	}
}

func (u *User) Save(db *gorm.DB) {
	db.Save(u)
}
