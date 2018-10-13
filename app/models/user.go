package models

import (
	"gopkg.in/gorp.v2"
	"time"
)

type User struct {
	ID             int
	CreatedAt      time.Time
	UpdatedAt      time.Time
	Username       string
	Email          string
	Bio            string
	Image          string
	HashedPassword []byte

	// Transient
	Password string
}

func (i *User) PreInsert(s gorp.SqlExecutor) error {
	i.CreatedAt = time.Now()
	i.UpdatedAt = i.CreatedAt
	return nil
}

func (i *User) PreUpdate(s gorp.SqlExecutor) error {
	i.UpdatedAt = time.Now()
	return nil
}
