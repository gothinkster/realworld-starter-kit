package models

import (
	"github.com/jinzhu/gorm"
	"golang.org/x/crypto/bcrypt"
	"errors"
)

type User struct {
	gorm.Model
	Username string `gorm:"unique_index;not null"`
	Email    string `gorm:"unique_index;not null"`
	Password string `gorm:"not null"`
	Bio      *string
	Image    *string
}

func (u *User) hashPassword(p string) error {
	if len(p) == 0 {
		return errors.New("password should not be empty!")
	}
	bytePassword := []byte(p)
	passwordHash, _ := bcrypt.GenerateFromPassword(bytePassword, bcrypt.DefaultCost)
	u.Password = string(passwordHash)
	return nil
}
