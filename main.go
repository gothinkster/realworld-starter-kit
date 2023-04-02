package main

import (
	"fmt"
	"os"

	"github.com/aliml92/realworld-gin-sqlc/api"
	"github.com/aliml92/realworld-gin-sqlc/config"
	db "github.com/aliml92/realworld-gin-sqlc/db/sqlc"
	"go.uber.org/zap"
)

// @produce	application/json
// @consumes application/json

// @securityDefinitions.apiKey  Bearer
// @in header
// @name Authorization
func main() {
	env := os.Getenv("ENVIRONMENT")
	if env == "" {
		env = "dev"
	}

	logger, _ := zap.NewDevelopment()
	defer logger.Sync() // flushes buffer, if any
	log := logger.Sugar()

	config := config.LoadConfig(env, ".")

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
	if err := server.Start(addr); err != nil {
		log.Fatal(err)
	}
}
