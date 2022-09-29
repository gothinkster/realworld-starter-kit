package service

import (
	"context"
	"fmt"
	"github.com/pavelkozlov/realworld/internal/entity"
)

type service struct {
	repo   userRepo
	hasher hasher
}

func (s service) Authenticate(ctx context.Context, email, password string) (entity.User, error) {
	// find user by email
	user, err := s.repo.FindUserByEmail(ctx, email)
	if err != nil {
		return entity.User{}, fmt.Errorf("can not find user by email: %w", err)
	}
	// salt user password
	incomeHash := s.hasher.CreateHashFromPasswordAndSalt(password, user.Salt)
	//compare with password in db
	if incomeHash != user.Password {
		return entity.User{}, fmt.Errorf("user password mismatch")
	}
	//create access and refresh tokens
	return entity.User{
		Email: email,
	}, nil
}

func NewUserService() *service {
	return &service{}
}
