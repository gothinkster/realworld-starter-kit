package main

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"syscall"
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
	
	// add graceful shutdown
	srv := &http.Server{
		Addr:    addr,
		Handler: server.Router(),
	}

	go func() {
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("listen: %s\n", err)
		}
	}()
	
		// Wait for interrupt signal to gracefully shutdown the server with
	// a timeout of 5 seconds.
	quit := make(chan os.Signal, 1)
	// kill (no param) default send syscall.SIGTERM
	// kill -2 is syscall.SIGINT
	// kill -9 is syscall.SIGKILL but can't be catch, so don't need add it
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit
	log.Info("Shutdown Server ...")

	// The context is used to inform the server it has 5 seconds to finish
	// the request it is currently handling
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	if err := srv.Shutdown(ctx); err != nil {
		log.Fatal("Server forced to shutdown: ", err)
	}

	log.Info("Server exiting")
}
