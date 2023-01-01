package db

import (
	_ "github.com/jackc/pgx/stdlib"
	"github.com/jmoiron/sqlx"
	"log"
)

type DB struct {
	*sqlx.DB
}

func Connect() *DB {
	db, err := sqlx.Open("pgx", "postgres://admin:admin@localhost:5432/conduit")
	if err != nil {
		log.Fatalln(err)
	}
	if err = db.Ping(); err != nil {
		log.Fatalln(err)
	}
	return &DB{db}
}
