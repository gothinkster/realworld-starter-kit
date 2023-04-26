package main

import (
	"fmt"
	"os"
	"time"

	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"

	"github.com/aliml92/realworld-gin-sqlc/api"
	conf "github.com/aliml92/realworld-gin-sqlc/config"
	db "github.com/aliml92/realworld-gin-sqlc/db/sqlc"
	"github.com/aliml92/realworld-gin-sqlc/logger"
)

// @produce	application/json
// @consumes application/json

// @securityDefinitions.apiKey  Bearer
// @in header
// @name Authorization
func main() {
	var (
		log    logger.Logger
		config conf.Config
	)
	env := os.Getenv("ENVIRONMENT")
	if env == "" || env == "dev" {

		// set up logger for dev
		env = "dev"
		logger, _ := zap.NewDevelopment()
		defer logger.Sync()
		log = logger.Sugar()
		config = conf.LoadConfig(env, "./env")

	} else if env == "test" {

		// set up logger for test
		atom := zap.NewAtomicLevel()
		atom.SetLevel(zapcore.ErrorLevel)
		zapConfig := zap.NewDevelopmentConfig()
		zapConfig.EncoderConfig.EncodeLevel = zapcore.CapitalColorLevelEncoder
		zapConfig.Level = atom
		logger, _ := zapConfig.Build()
		defer logger.Sync()
		log = logger.Sugar()

		config = conf.LoadConfig(env, "./env")

		// set up test db
		db.InitTestDB(&config)
		// wait for db container to be ready
		time.Sleep(5 * time.Second)

	} else {

		// set up logger for prod, yet to be refined
		logger, _ := zap.NewProduction()
		defer logger.Sync()
		log = logger.Sugar()
		config = conf.LoadConfig(env, "./env")
	}
	config.DBUrl = fmt.Sprintf("postgres://%s:%s@%s:%s/%s?sslmode=disable",
		config.DBUsername,
		config.DBPassword,
		config.DBHost,
		config.DBPort,
		config.DBName,
	)

	dbConn := db.Connect(config)
	defer db.Close(dbConn)

	fmt.Printf("config: %v\n", config)
	db.AutoMigrate(config)

	store := db.NewConduitStore(dbConn)

	server := api.NewServer(
		config,
		store,
		log,
	)

	server.MountHandlers()
	server.MountSwaggerHandlers()

	addr := fmt.Sprintf(":%s", config.Port)
	if err := server.Start(addr); err != nil {
		log.Fatalf("failed to start server: %v", err)
	}
}
