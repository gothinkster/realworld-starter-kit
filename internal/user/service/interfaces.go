package service

import (
	"context"
	"github.com/pavelkozlov/realworld/internal/entity"
)

type userRepo interface {
	FindUserByEmail(ctx context.Context, email string) (entity.User, error)
}

type hasher interface {
	CreateHashFromPasswordAndSalt(password string, salt string) string
	CreateHashFromPassword(password string) (hash string, salt string, err error)
}
