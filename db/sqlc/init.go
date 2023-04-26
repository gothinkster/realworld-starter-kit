package db

import (
	"context"
	"fmt"
	"log"
	"strings"

	"github.com/aliml92/realworld-gin-sqlc/config"
	"github.com/golang-migrate/migrate/v4"
	_ "github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"

	"github.com/jackc/pgx/v4"
	"github.com/ory/dockertest/v3"
	"github.com/ory/dockertest/v3/docker"
)

func InitTestDB(config *config.Config) {
	pool, err := dockertest.NewPool("")
	if err != nil {
		log.Fatalf("could not connect to docker: %s", err)
	}
	err = pool.Client.Ping()
	if err != nil {
		log.Fatalf("could not ping docker: %s", err)
	}

	dbResource, err := pool.RunWithOptions(&dockertest.RunOptions{
		Repository: "postgres",
		Tag:        "11",
		Env: []string{
			"POSTGRES_PASSWORD=" + config.DBPassword,
			"POSTGRES_USER=" + config.DBUsername,
			"POSTGRES_DB=" + config.DBName,
			"listen_addresses = '*'",
		},
	}, func(c *docker.HostConfig) {
		c.AutoRemove = true
		c.RestartPolicy = docker.RestartPolicy{Name: "no"}
	}) 
	if err != nil {
		log.Fatalf("could not start resource: %s", err)
	}

	hostAndPort := dbResource.GetHostPort("5432/tcp")
	newHostAndPort := strings.Split(hostAndPort, ":")
	config.DBHost = newHostAndPort[0]
	config.DBPort = newHostAndPort[1]
	dbResource.Expire(120)
}

func Connect(config config.Config) *pgx.Conn {
	conn, err := pgx.Connect(context.Background(), config.DBUrl)
	if err != nil {
		log.Fatalf("Unable to connect to database: %v\n", err)
	}
	return conn
}

func Close(conn *pgx.Conn) {
	err := conn.Close(context.Background())
	if err != nil {
		log.Fatalf("Unable to close connection: %v\n", err)
	}
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
		log.Fatalf("unable to create migration: %v\n", err)
	}

	if config.DBRecreate {
		if err := m.Down(); err != nil {
			if err != migrate.ErrNoChange {
				log.Fatalf("unable to drop database: %v\n", err)
			}
		}
	}

	if err := m.Up(); err != nil && err != migrate.ErrNoChange {
		log.Fatalf("unable to migrate database: %v\n", err)
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
		log.Fatalf("unable to create migration: %v\n", err)
	}
	if err := m.Down(); err != nil {
		if err != migrate.ErrNoChange {
			log.Fatalf("unable to drop database: %v\n", err)
		}
	}
}
