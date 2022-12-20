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
	database
	builder squirrel.StatementBuilderType
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

func NewUserRepo(db database) *repo {
	return &repo{
		database: db,
		builder:  squirrel.StatementBuilder.PlaceholderFormat(squirrel.Dollar),
	}
}

func (r repo) CreateUser(ctx context.Context, user entity.User) (entity.User, error){
	query := r.builder.Insert(userDbName).Columns(
		"email",
		"salt",
		"password",
		"username",
	).Values(
		user.Email,
		user.Salt,
		user.Password,
		user.Username,
	)

	q, args := query.MustSql()
	q += " RETURNING id"

	var id int
	
	row := r.database.QueryRow(q,args...)
	if err:=row.Err();err != nil {
		return entity.User{},err
	}

	if err := row.Scan(&id); err != nil {
		return entity.User{},err
	}

	user.ID = id
	
	return user, nil
}

func (r repo) FindUserByEmail(ctx context.Context, email string) (entity.User, error) {

	query := r.builder.Select(
		"id",
		"email",
		"salt",
		"password",
		"username",
		"image",
		"bio",
	).From(userDbName).Where(squirrel.Eq{
		"email": email,
	}).Limit(1)

	q, args, err := query.ToSql()
	if err != nil {
		return entity.User{}, err
	}

	dest := make([]user, 0, 1)

	err = r.SelectContext(ctx, &dest, q, args...)
	if err != nil {
		return entity.User{}, fmt.Errorf("db find by email err: %+v", err)
	}

	if len(dest) < 1 {
		return entity.User{}, fmt.Errorf("db find by email: not found")
	}

	return entity.User{
		ID:       dest[0].Id,
		Email:    dest[0].Email,
		Salt:     dest[0].Salt,
		Password: dest[0].Password,
		Username: dest[0].Username,
		Bio:      dest[0].Bio.String,
		Image:    dest[0].Image.String,
	}, nil
}
