package api

import (
	"database/sql"
	"errors"

	"github.com/lib/pq"
)

type Error struct {
	Errors map[string]interface{} `json:"errors"`
}

func NewError(err error) *Error {
	e := Error{}
	e.Errors = make(map[string]interface{})
	e.Errors["body"] = err.Error()
	return &e
}

func constraintErr(err error) *Error {
	var pqErr *pq.Error
	if errors.As(err, &pqErr) {
		switch pqErr.Constraint {
		case "users_username_key":
			return NewError(ErrUsernameAlreadyTaken)
		case "users_email_key":
			return NewError(ErrEmailAlreadyTaken)
		}
	}
	return nil
}

func Nullable[T any](row *T, err error) (*T, error) {
	if err == nil {
		return row, nil
	}

	if err == sql.ErrNoRows {
		return nil, nil
	}

	return nil, err
}
