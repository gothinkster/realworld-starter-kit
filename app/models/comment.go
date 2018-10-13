package models

import (
	"gopkg.in/gorp.v2"
	"time"
)

type Comment struct {
	ID        int
	Body      string
	ArticleID int
	UserID    int
	CreatedAt time.Time
	UpdatedAt time.Time

	// Transient
	User    User
	Article Article
}

func (i *Comment) PreInsert(s gorp.SqlExecutor) error {
	i.CreatedAt = time.Now()
	i.UpdatedAt = i.CreatedAt
	return nil
}

func (i *Comment) PreUpdate(s gorp.SqlExecutor) error {
	i.UpdatedAt = time.Now()
	return nil
}
