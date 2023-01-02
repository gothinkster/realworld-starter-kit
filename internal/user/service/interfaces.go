package service

import (
	"context"
	"github.com/pavelkozlov/realworld/internal/entity"
	"github.com/pavelkozlov/realworld/pkg/jwt"
)

type userRepo interface {
	Find(ctx context.Context, pred map[string]any) ([]entity.User, error)
	Save(ctx context.Context, clauses map[string]any) (int, error)
}

type hasher interface {
	CreateHashFromPasswordAndSalt(password string, salt string) string
	CreateHashFromPassword(password string) (hash string, salt string, err error)
	CreateSalt(n uint32) (string, error)
}

type jsonWebToken interface {
	ParseJWT(tokenString string) (jwt.Claims, error)
	CreateJWT(incomeClaims jwt.Claims) (string, error)
	FromContext(ctx context.Context) (jwt.Claims, error)
}
