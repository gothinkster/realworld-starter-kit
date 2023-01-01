package repository

import (
	"context"
	"database/sql"
	"fmt"
	"time"

	"github.com/Masterminds/squirrel"
	"github.com/pavelkozlov/realworld/internal/entity"
)

const (
	userDbName = "\"user\""
)

type repo struct {
	database
	builder squirrel.StatementBuilderType
}

type user struct {
	Id        int            `db:"id"`
	Email     string         `db:"email"`
	Salt      string         `db:"salt"`
	Password  string         `db:"password"`
	Username  string         `db:"username"`
	Image     sql.NullString `db:"image"`
	Bio       sql.NullString `db:"bio"`
	CreatedAt time.Time      `db:"created_at"`
	UpdatedAt sql.NullTime   `db:"updated_at"`
	DeletedAt sql.NullTime   `db:"deleted_at"`
}

func NewUserRepo(db database) *repo {
	return &repo{
		database: db,
		builder:  squirrel.StatementBuilder.PlaceholderFormat(squirrel.Dollar),
	}
}

func (r repo) Save(ctx context.Context, clauses map[string]any) (int, error) {

	var (
		q    string
		args []any
	)

	if id, ok := clauses["id"]; ok {
		delete(clauses, "id")
		query := r.builder.Update(userDbName).SetMap(clauses).Where(squirrel.Eq{"id": id})
		q, args = query.MustSql()
	} else {
		query := r.builder.Insert(userDbName).SetMap(clauses)
		q, args = query.MustSql()
		q += " RETURNING id"
	}

	var id int
	row := r.database.QueryRow(q, args...)
	if err := row.Err(); err != nil {
		return 0, err
	}

	if err := row.Scan(&id); err != nil {
		return 0, err
	}

	return id, nil
}

func (r repo) Find(ctx context.Context, pred map[string]any) ([]entity.User, error) {

	query := r.builder.Select(
		"id",
		"email",
		"salt",
		"password",
		"username",
		"image",
		"bio",
		"created_at",
		"updated_at",
		"deleted_at",
	).From(userDbName).Where(pred).OrderByClause("created_at DESC")

	q, args, err := query.ToSql()
	if err != nil {
		return []entity.User{}, err
	}

	dest := make([]user, 0)
	err = r.SelectContext(ctx, &dest, q, args...)
	if err != nil {
		return []entity.User{}, fmt.Errorf("db find by email err: %+v", err)
	}

	users := make([]entity.User, 0, len(dest))
	for _, val := range dest {
		user := entity.User{
			ID:        val.Id,
			Email:     val.Email,
			Salt:      val.Salt,
			Password:  val.Password,
			Username:  val.Username,
			Bio:       val.Bio.String,
			Image:     val.Image.String,
			CreatedAt: val.CreatedAt,
			UpdatedAt: nil,
			DeletedAt: nil,
		}
		if val.UpdatedAt.Valid {
			user.UpdatedAt = &val.UpdatedAt.Time
		}
		if val.DeletedAt.Valid {
			user.DeletedAt = &val.DeletedAt.Time
		}
		users = append(users, user)
	}

	return users, nil
}
