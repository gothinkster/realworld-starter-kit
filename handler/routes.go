package handler

import (
	"github.com/alpody/fiber-realworld/utils"
	"github.com/gofiber/fiber/v2"
	jwtware "github.com/gofiber/jwt/v2"
)

func (h *Handler) Register(r *fiber.App) {
	v1 := r.Group("/api")
	jwtMiddleware := jwtware.New(
		jwtware.Config{
			SigningKey: utils.JWTSecret,
			AuthScheme: "Token",
		})
	//(*v1).Use(jwtMiddleware)
	guestUsers := v1.Group("/users")
	guestUsers.Post("", h.SignUp)
	guestUsers.Post("/login", h.Login)
	user := v1.Group("/user", jwtMiddleware)
	user.Get("", h.CurrentUser)
	user.Put("", h.UpdateUser)

	profiles := v1.Group("/profiles", jwtMiddleware)
	profiles.Get("/:username", h.GetProfile)

	profiles.Post("/:username/follow", h.Follow)
	profiles.Delete("/:username/follow", h.Unfollow)

	articlesJWTMiddleware := jwtware.New(
		jwtware.Config{
			SigningKey: utils.JWTSecret,
			AuthScheme: "Token",
			Filter: func(c *fiber.Ctx) bool {
				if c.Method() == "GET" && c.Path() != "/api/articles/feed" {
					return true
				}
				return false
			},
		})
	articles := v1.Group("/articles", articlesJWTMiddleware)
	articles.Post("", h.CreateArticle)
	articles.Get("/feed", h.Feed)
	articles.Put("/:slug", h.UpdateArticle)
	articles.Delete("/:slug", h.DeleteArticle)
	articles.Post("/:slug/comments", h.AddComment)
	articles.Delete("/:slug/comments/:id", h.DeleteComment)
	articles.Post("/:slug/favorite", h.Favorite)
	articles.Delete("/:slug/favorite", h.Unfavorite)
	articles.Get("", h.Articles)
	articles.Get("/:slug", h.GetArticle)
	articles.Get("/:slug/comments", h.GetComments)

	tags := v1.Group("/tags")
	tags.Get("", h.Tags)
}
