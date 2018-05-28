package models

import (
	"errors"

	"github.com/jinzhu/gorm"
	"golang.org/x/crypto/bcrypt"
)

type User struct {
	gorm.Model
	Username   string `gorm:"unique_index;not null"`
	Email      string `gorm:"unique_index;not null"`
	Password   string `gorm:"not null"`
	Bio        *string
	Image      *string
	Followers  []Follow  `gorm:"foreignkey:FollowingID"`
	Followings []Follow  `gorm:"foreignkey:FollowerID"`
	Favorites  []Article `gorm:"many2many:favorites;"`
}

type Follow struct {
	Follower    User
	FollowerID  uint `gorm:"primary_key" sql:"type:int not null"`
	Following   User
	FollowingID uint `gorm:"primary_key" sql:"type:int not null"`
}

func (u *User) HashPassword(p string) error {
	if len(p) == 0 {
		return errors.New("password should not be empty")
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

// FollowedBy Followings should be pre loaded
func (u *User) FollowedBy(id uint) bool {
	if u.Followers == nil {
		return false
	}
	for _, f := range u.Followers {
		if f.FollowerID == id {
			return true
		}
	}
	return false
}
