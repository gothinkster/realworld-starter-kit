package service

import (
	"context"
	"github.com/pavelkozlov/realworld/internal/entity"
	"github.com/pavelkozlov/realworld/internal/user/service/jwt"
)

type service struct {
	repo   userRepo
	hasher hasher
	jwt    jsonWebToken
}

func (s service) Authenticate(ctx context.Context, email, password string) (entity.User, error) {
	// find user by email
	user, err := s.repo.FindUserByEmail(ctx, email)
	if err != nil {
		return entity.User{}, invalidCredentials
	}
	// salt user password
	incomeHash := s.hasher.CreateHashFromPasswordAndSalt(password, user.Salt)
	//compare with password in db
	if incomeHash != user.Password {
		return entity.User{}, invalidCredentials
	}
	user.Password = ""
	//create access and refresh tokens
	token, err := s.jwt.CreateJWT(jwt.Claims{
		Email: user.Email,
		Id:    user.ID,
	})
	if err != nil {
		return entity.User{}, internalError
	}

	user.Token = token

	return user, nil
}

func NewUserService() *service {
	return &service{}
}
