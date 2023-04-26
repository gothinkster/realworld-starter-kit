package api

import (
	"errors"

	"github.com/jackc/pgconn"
	"github.com/jackc/pgx/v4"
)

var (
	ErrUsernameAlreadyTaken = errors.New("username already taken")
	ErrEmailAlreadyTaken    = errors.New("email already taken")
	ErrAccessForbidden      = errors.New("access forbidden")
	ErrUserNotFound         = errors.New("user not found")
)

type Error struct {
	Errors map[string]interface{} `json:"errors"`
}

func NewValidationError(err error) *Error {
	e := Error{}
	e.Errors = make(map[string]interface{})
	e.Errors["body"] = err.Error()
	return &e
}

func NewError(err error) *Error {
	e := Error{}
	e.Errors = make(map[string]interface{})
	e.Errors["message"] = err.Error()
	return &e
}

func convertToApiErr(err error) error {
	var pgErr *pgconn.PgError
	if errors.As(err, &pgErr) {
		switch pgErr.ConstraintName {
		case "users_username_key":
			return ErrUsernameAlreadyTaken
		case "users_email_key":
			return ErrEmailAlreadyTaken
		}
	}
	return nil
}

func Nullable[T any](row *T, err error) (*T, error) {
	if err == nil {
		return row, nil
	}

	if err == pgx.ErrNoRows {
		return nil, nil
	}

	return nil, err
}

func NullableList[T any](rows []*T, err error) ([]*T, error) {
	if err == nil {
		return rows, nil
	}

	if err == pgx.ErrNoRows {
		return nil, nil
	}

	return nil, err
}

func NullableID(row string, err error) (string, error) {
	if err == nil {
		return row, nil
	}

	if err == pgx.ErrNoRows {
		return "", nil
	}

	return "", err
}
