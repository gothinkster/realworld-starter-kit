package db

import (
	// _ "github.com/lib/pq"
	_ "github.com/jackc/pgx/stdlib"
	"github.com/jmoiron/sqlx"
	"log"
)

type DB struct {
	*sqlx.DB
}

func Connect() *DB {
	// db, err := sqlx.Open("postgres", "postgres://admin:admin@localhost:5432/realworld?sslmode=disable")
	db, err := sqlx.Open("pgx", "postgres://admin:admin@localhost:5432/realworld")
	if err != nil {
		log.Fatalln(err)
	}
	if err = db.Ping(); err != nil {
		log.Fatalln(err)
	}
	return &DB{db}
}
