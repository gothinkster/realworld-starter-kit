package service

import (
	"context"
	"github.com/pavelkozlov/realworld/internal/entity"
	"github.com/pavelkozlov/realworld/internal/user/service/jwt"
)

type userRepo interface {
	FindUserByEmail(ctx context.Context, email string) (entity.User, error)
}

type hasher interface {
	CreateHashFromPasswordAndSalt(password string, salt string) string
	CreateHashFromPassword(password string) (hash string, salt string, err error)
}

type jsonWebToken interface {
	ParseJWT(tokenString string) (jwt.Claims, error)
	CreateJWT(incomeClaims jwt.Claims) (string, error)
}
