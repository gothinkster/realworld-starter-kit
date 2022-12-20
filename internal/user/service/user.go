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

const (
	saltLen = 128
)

func (s service)Register(ctx context.Context, email, password, username string) (entity.User, error){
	salt, err := s.hasher.CreateSalt(saltLen)
	saltedPassword := s.hasher.CreateHashFromPasswordAndSalt(password, salt)

	user := entity.User{Email: email, Password: saltedPassword, Username: username, Salt: salt}
	if err != nil {
		return user, nil
	}

	return s.repo.CreateUser(ctx, user)
}

func (s service) Authenticate(ctx context.Context, email, password string) (entity.User, error) {
	// find user by email
	user, err := s.repo.FindUserByEmail(ctx, email)
	if err != nil {
		return entity.User{}, err
	}
	// salt user password
	incomeHash := s.hasher.CreateHashFromPasswordAndSalt(password, user.Salt)
	//compare with password in db
	if incomeHash != user.Password {
		return entity.User{}, err
	}
	user.Password = ""
	//create access and refresh tokens
	token, err := s.jwt.CreateJWT(jwt.Claims{
		Email: user.Email,
		Id:    user.ID,
	})
	if err != nil {
		return entity.User{}, err
	}

	user.Token = token

	return user, nil
}

func NewUserService(repo userRepo, hasher hasher, jwt jsonWebToken) *service {

	return &service{
		repo:   repo,
		hasher: hasher,
		jwt:    jwt,
	}
}
