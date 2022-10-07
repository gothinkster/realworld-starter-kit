//go:generate mockgen  -destination=./mock/mocks.go -package=mock -mock_names=Service=MockService -source=./interfaces.go

package api

import (
	"context"
	"github.com/pavelkozlov/realworld/internal/entity"
)

type userService interface {
	Authenticate(ctx context.Context, email, password string) (entity.User, error)
}
