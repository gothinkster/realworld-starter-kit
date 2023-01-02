package repository

import (
	"context"
	"database/sql"
)

type database interface {
	SelectContext(ctx context.Context, dest interface{}, query string, args ...interface{}) error
	MustExec(query string, args ...interface{}) sql.Result
	QueryRow(query string, args ...any) *sql.Row
}
