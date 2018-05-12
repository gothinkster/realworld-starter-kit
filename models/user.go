package models

import (
	"errors"
	"github.com/jinzhu/gorm"
	"golang.org/x/crypto/bcrypt"
)

type User struct {
	gorm.Model
	Username string `gorm:"unique_index;not null"`
	Email    string `gorm:"unique_index;not null"`
	Password string `gorm:"not null"`
	Bio      *string
	Image    *string
}

func (u *User) HashPassword(p string) error {
	if len(p) == 0 {
		return errors.New("password should not be empty!")
	}
	bytePassword := []byte(p)
	passwordHash, _ := bcrypt.GenerateFromPassword(bytePassword, bcrypt.DefaultCost)
	u.Password = string(passwordHash)
	return nil
}

func (u *User) CheckPassword(p string) error {
	bytePassword := []byte(p)
	byteHashedPassword := []byte(u.Password)
	return bcrypt.CompareHashAndPassword(byteHashedPassword, bytePassword)
}
