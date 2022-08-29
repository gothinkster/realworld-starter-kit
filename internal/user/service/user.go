package service

import (
	"github.com/pavelkozlov/realworld/internal/user/entity"
)

type service struct {
}

func (s service) Authenticate(email, password string) (entity.User, error) {
	return entity.User{
		Email: email,
	}, nil
}

func NewUserService() *service {
	return &service{}
}
