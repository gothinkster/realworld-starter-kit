package entity

import (
	"time"
)

type User struct {
	ID        int32
	Email     string
	Salt      string
	Username  string
	Bio       *string
	Image     *string
	CreatedAt time.Time
	UpdatedAt *time.Time
	DeletedAt *time.Time
}
