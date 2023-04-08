package db

import (
	"context"
	"database/sql"
	"fmt"
	"log"
	"os"

	"github.com/aliml92/realworld-gin-sqlc/config"
	"github.com/golang-migrate/migrate/v4"
	_ "github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"

	"github.com/jackc/pgx/v4"
)

func ConnectTemp(config config.Config) *pgx.Conn {
	conn, err := pgx.Connect(context.Background(), config.DBUrl)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to connect to database: %v\n", err)
		os.Exit(1)
	}
	return conn
}

func CloseTemp(conn *pgx.Conn) {
	err := conn.Close(context.Background())
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to close connection: %v\n", err)
		os.Exit(1)
	}
}

func Connect(config config.Config) *sql.DB {

	dsn := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		config.DBHost,
		config.DBPort,
		config.DBUsername,
		config.DBPassword,
		config.DBName,
	)

	db, err := sql.Open("pgx", dsn)
	if err != nil {
		log.Fatalln(err)
	}

	if err := db.Ping(); err != nil {
		log.Fatalln(err)
	}
	return db
}

func Close(db *sql.DB) {
	db.Close()
}

func AutoMigrate(config config.Config) {

	path := fmt.Sprintf("file://%s", config.MigrationPath)
	dsn := fmt.Sprintf("postgres://%s:%s@%s:%s/%s?sslmode=disable",
		config.DBUsername,
		config.DBPassword,
		config.DBHost,
		config.DBPort,
		config.DBName,
	)

	m, err := migrate.New(path, dsn)
	if err != nil {
		log.Fatal(err)
	}

	if config.DBRecreate {
		if err := m.Down(); err != nil {
			if err != migrate.ErrNoChange {
				log.Fatal(err)
			}
		}
	}

	if err := m.Up(); err != nil && err != migrate.ErrNoChange {
		log.Fatal(err)
	}
}

func Drop(config config.Config) {
	path := fmt.Sprintf("file://%s", config.MigrationPath)
	dsn := fmt.Sprintf("postgres://%s:%s@%s:%s/%s?sslmode=disable",
		config.DBUsername,
		config.DBPassword,
		config.DBHost,
		config.DBPort,
		config.DBName,
	)

	m, err := migrate.New(path, dsn)
	if err != nil {
		log.Fatal(err)
	}
	if err := m.Down(); err != nil {
		if err != migrate.ErrNoChange {
			log.Fatal(err)
		}
	}
}
