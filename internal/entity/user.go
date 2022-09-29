package entity

import (
	"time"
)

type User struct {
	ID        int
	Email     string
	Salt      string
	Password  string
	Username  string
	Bio       *string
	Image     *string
	CreatedAt time.Time
	UpdatedAt *time.Time
	DeletedAt *time.Time
}
