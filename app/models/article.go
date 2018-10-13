package models

import (
	"gopkg.in/gorp.v2"
	"time"
)

type Article struct {
	ID             int
	Slug           string
	Title          string
	Description    string
	Body           string
	UserID         int
	FavoritesCount int
	CreatedAt      time.Time
	UpdatedAt      time.Time

	// Transient
	User User
}

func (i *Article) PreInsert(s gorp.SqlExecutor) error {
	i.CreatedAt = time.Now()
	i.UpdatedAt = i.CreatedAt
	return nil
}

func (i *Article) PreUpdate(s gorp.SqlExecutor) error {
	i.UpdatedAt = time.Now()
	return nil
}
