//go:generate mockgen  -destination=./mock/userService.go -package=mock -mock_names=Service=MockService -source=./interfaces.go

package api

import (
	"github.com/pavelkozlov/realworld/internal/entity"
)

type userService interface {
	Authenticate(email, password string) (entity.User, error)
}
