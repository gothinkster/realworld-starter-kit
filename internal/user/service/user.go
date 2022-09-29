package service

import (
	"context"
	"fmt"
	"github.com/pavelkozlov/realworld/internal/entity"
)

type service struct {
	repo userRepo
}

func (s service) Authenticate(ctx context.Context, email, password string) (entity.User, error) {
	// find user by email
	_, err := s.repo.FindUserByEmail(ctx, email)
	if err != nil {
		return entity.User{}, fmt.Errorf("can not find user by email: %w", err)
	}
	// salt user password
	// compare with password in db
	// create access and refresh tokens
	return entity.User{
		Email: email,
	}, nil
}

func NewUserService() *service {
	return &service{}
}
