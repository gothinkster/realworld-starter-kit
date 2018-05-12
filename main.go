package main

import (
	"github.com/xesina/golang-echo-realworld-example-app/database"
	"github.com/xesina/golang-echo-realworld-example-app/handler"
	"github.com/xesina/golang-echo-realworld-example-app/router"
)

func main() {
	db := database.New()
	database.AutoMigrate(db)
	h := handler.New(db)
	r := router.New()

	r.POST("/api/users/login", h.Login)
	r.POST("/api/users", h.Register)
	r.GET("/api/user", h.CurrentUser)
	r.PUT("/api/user", h.UpdateUser)

	r.GET("/api/profiles/:username", h.GetProfile)
	r.POST("/api/profiles/:username/follow", h.Follow)
	r.DELETE("/api/profiles/:username/follow", h.Unfollow)

	r.GET("/api/articles", h.Articles)
	r.GET("/api/articles/feed", h.Feed)
	r.GET("/api/articles/:slug", h.GetArticles)
	r.POST("/api/articles", h.CreateArticle)
	r.PUT("/api/articles/:slug", h.UpdateArticle)
	r.DELETE("/api/articles/:slug", h.DeleteArticle)

	r.POST("/api/articles/:slug/comments", h.AddComment)
	r.GET("/api/articles/:slug/comments", h.GetComments)
	r.DELETE("/api/articles/:slug/comments/:id", h.DeleteComment)

	r.POST("/api/articles/:slug/favorite", h.Favorite)
	r.DELETE("/api/articles/:slug/favorite", h.Unfavorite)

	r.GET("/api/tags", h.Tags)

	r.Logger.Fatal(r.Start("127.0.0.1:1323"))
}
