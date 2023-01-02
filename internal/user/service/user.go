package service

import (
	"context"
	"fmt"

	"github.com/pavelkozlov/realworld/internal/entity"
	"github.com/pavelkozlov/realworld/pkg/jwt"
)

type service struct {
	repo   userRepo
	hasher hasher
	jwt    jsonWebToken
}

const (
	saltLen = 128
)

func (s service) GetCurrentUser(ctx context.Context) (entity.User, error) {
	claims, err := s.jwt.FromContext(ctx)
	if err != nil {
		return entity.User{}, err
	}

	foundUsers, err := s.repo.Find(ctx, map[string]any{"email": claims.Email, "id": claims.Id})
	if err != nil {
		return entity.User{}, nil
	}

	if len(foundUsers) == 0 {
		return entity.User{}, fmt.Errorf("user %s not found in db", claims.Email)
	}

	return foundUsers[0], nil
}

func (s service) Register(ctx context.Context, email, password, username string) (entity.User, error) {
	salt, err := s.hasher.CreateSalt(saltLen)
	saltedPassword := s.hasher.CreateHashFromPasswordAndSalt(password, salt)

	user := entity.User{Email: email, Password: saltedPassword, Username: username, Salt: salt}
	if err != nil {
		return user, nil
	}

	insertedUserId, err := s.repo.Save(ctx, map[string]any{
		"email":    user.Email,
		"password": user.Password,
		"username": user.Username,
		"salt":     user.Salt,
	})
	if err != nil {
		return user, err
	}
	user.ID = insertedUserId

	token, err := s.jwt.CreateJWT(jwt.Claims{
		Email: email,
		Id:    user.ID,
	})
	if err != nil {
		return user, nil
	}
	user.Token = token

	return user, nil
}

func (s service) Authenticate(ctx context.Context, email, password string) (entity.User, error) {
	// find user by email
	users, err := s.repo.Find(ctx, map[string]any{"email": email})
	if err != nil {
		return entity.User{}, err
	}
	user := users[0]
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
