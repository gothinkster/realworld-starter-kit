package models

import (
	"github.com/jinzhu/gorm"
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
