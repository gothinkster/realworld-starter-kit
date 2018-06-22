package user

import (
	"github.com/xesina/golang-echo-realworld-example-app/model"
)

type Store interface {
	GetByID(uint) (*model.User, error)
	GetByEmail(string) (*model.User, error)
	GetByUsername(string) (*model.User, error)
	Create(*model.User) error
	Update(*model.User) error
	AddFollower(user *model.User, followerID uint) error
	RemoveFollower(user *model.User, followerID uint) error
	IsFollower(userID, followerID uint) (bool, error)
}
