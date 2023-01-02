package api

import (
	"context"
	"github.com/pavelkozlov/realworld/internal/entity"
)

type userService interface {
	Authenticate(ctx context.Context, email, password string) (entity.User, error)
	Register(ctx context.Context, email, password, username string) (entity.User, error)
}
