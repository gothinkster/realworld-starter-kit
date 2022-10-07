package repository

import (
	"context"
	"database/sql"
	"fmt"
	"github.com/Masterminds/squirrel"
	"github.com/pavelkozlov/realworld/internal/entity"
)

const (
	userDbName = "\"user\""
)

type repo struct {
	db      database
	builder squirrel.StatementBuilderType
}

func NewUserRepo(db database) *repo {
	return &repo{
		db:      db,
		builder: squirrel.StatementBuilder.PlaceholderFormat(squirrel.Dollar),
	}
}

func (r repo) FindUserByEmail(ctx context.Context, email string) (entity.User, error) {

	query := r.builder.Select("id", "email", "salt").From(userDbName).Where(squirrel.Eq{
		"email": email,
	}).Limit(1)

	q, args, err := query.ToSql()
	if err != nil {
		return entity.User{}, err
	}

	type user struct {
		Id       int            `db:"id"`
		Email    string         `db:"email"`
		Salt     string         `db:"salt"`
		Password string         `db:"password"`
		Username string         `db:"username"`
		Image    sql.NullString `db:"image"`
		Bio      sql.NullString `db:"bio"`
	}

	userModel := new(user)

	err = r.db.Get(userModel, q, args...)
	if err != nil {
		return entity.User{}, fmt.Errorf("GET: %+v", err)
	}

	return entity.User{
		ID:       userModel.Id,
		Email:    userModel.Email,
		Salt:     userModel.Salt,
		Password: userModel.Password,
		Username: userModel.Username,
		Bio:      userModel.Bio.String,
		Image:    userModel.Image.String,
	}, nil
}
