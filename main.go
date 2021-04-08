package main

import (
	"fmt"
	"github.com/alpody/fiber-realworld/db"
	_ "github.com/alpody/fiber-realworld/docs"
	"github.com/alpody/fiber-realworld/handler"
	"github.com/alpody/fiber-realworld/router"
	"github.com/alpody/fiber-realworld/store"
	"github.com/arsmn/fiber-swagger/v2"
)

// @description Conduit API
// @title Conduit API

// @BasePath /api

// @schemes http https
// @produce application/json
// @consumes application/json

// @securityDefinitions.apikey ApiKeyAuth
// @in header
// @name Authorization

func main() {
	r := router.New()
	r.Get("/swagger/*", swagger.Handler)
	d := db.New()
	db.AutoMigrate(d)

	us := store.NewUserStore(d)
	as := store.NewArticleStore(d)

	h := handler.NewHandler(us, as)
	h.Register(r)
	err := r.Listen(":8585")
	if err != nil {
		fmt.Printf("%v", err)
	}
}
