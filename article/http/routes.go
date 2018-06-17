package http

import (
	"github.com/labstack/echo"
	"github.com/xesina/golang-echo-realworld-example-app/router/middleware"
	"github.com/xesina/golang-echo-realworld-example-app/utils"
)

func (h *Handler) Register(v1 *echo.Group) {
	articles := v1.Group("/articles", middleware.JWTWithConfig(
		middleware.JWTConfig{
			Skipper: func(c echo.Context) bool {
				if c.Request().Method == "GET" && c.Path() != "/api/articles/feed" {
					return true
				}
				return false
			},
			SigningKey: utils.JWTSecret,
		},
	))
	articles.POST("", h.CreateArticle)
	articles.GET("/feed", h.Feed)
	articles.PUT("/:slug", h.UpdateArticle)
	articles.DELETE("/:slug", h.DeleteArticle)
	articles.POST("/:slug/comments", h.AddComment)
	articles.DELETE("/:slug/comments/:id", h.DeleteComment)
	articles.POST("/:slug/favorite", h.Favorite)
	articles.DELETE("/:slug/favorite", h.Unfavorite)
	articles.GET("", h.Articles)
	articles.GET("/:slug", h.GetArticle)
	articles.GET("/:slug/comments", h.GetComments)

	tags := v1.Group("/tags")
	tags.GET("", h.Tags)
}
