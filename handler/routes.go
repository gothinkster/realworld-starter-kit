package handler

import (
	"github.com/labstack/echo"
	"github.com/xesina/golang-echo-realworld-example-app/router/middleware"
)

func (h *Handler) RegisterRoutes(e *echo.Echo) {
	jwtMiddleware := middleware.JWT(JWTSecret)

	v1 := e.Group("/api")
	guestUsers := v1.Group("/users")
	guestUsers.POST("", h.Register)
	guestUsers.POST("/login", h.Login)

	user := v1.Group("/user", jwtMiddleware)
	user.GET("", h.CurrentUser)
	user.PUT("", h.UpdateUser)

	profiles := v1.Group("/profiles", jwtMiddleware)
	profiles.GET("/:username", h.GetProfile)
	profiles.POST("/:username/follow", h.Follow)
	profiles.DELETE("/:username/follow", h.Unfollow)

	articles := v1.Group("/articles", middleware.JWTWithConfig(
		middleware.JWTConfig{
			Skipper: func(c echo.Context) bool {
				if c.Request().Method == "GET" && c.Path() != "/api/articles/feed" {
					return true
				}
				return false
			},
			SigningKey: JWTSecret,
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
	articles.GET("/:slug", h.GetArticles)
	articles.GET("/:slug/comments", h.GetComments)

	tags := v1.Group("/tags")
	tags.GET("", h.Tags)
}
