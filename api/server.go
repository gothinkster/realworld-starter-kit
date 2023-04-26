package api

import (
	"fmt"

	"github.com/gin-gonic/gin"
	swaggerfiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"

	"github.com/aliml92/realworld-gin-sqlc/config"
	db "github.com/aliml92/realworld-gin-sqlc/db/sqlc"
	"github.com/aliml92/realworld-gin-sqlc/docs"
	"github.com/aliml92/realworld-gin-sqlc/logger"
)

type Server struct {
	config config.Config
	router *gin.Engine
	store  db.Store
	log    logger.Logger
}

func NewServer(config config.Config, store db.Store, log logger.Logger) *Server {
	var engine *gin.Engine
	if config.Environment == "test" {
		engine = gin.New()
	} else {
		engine = gin.Default()
	}
	server := &Server{
		config: config,
		router: engine,
		store:  store,
		log:    log,
	}
	return server
}

func (s *Server) MountHandlers() {
	api := s.router.Group("/api")
	api.POST("/users", s.RegisterUser)
	api.POST("/users/login", s.LoginUser)

	user := api.Group("/user")
	user.Use(AuthMiddleware())
	user.GET("", s.GetCurrentUser)
	user.PUT("", s.UpdateUser)

	profiles := api.Group("/profiles")
	profiles.Use(AuthMiddleware())
	profiles.GET("/:username", s.GetProfile)
	profiles.POST("/:username/follow", s.FollowUser)
	profiles.DELETE("/:username/follow", s.UnfollowUser)

	articles := api.Group("/articles")
	articles.GET("", s.ListArticles)
	articles.GET("/:slug", s.GetArticle)
	articles.GET("/:slug/comments", s.GetComments)
	articles.Use(AuthMiddleware())
	articles.POST("", s.CreateArticle)
	articles.GET("/feed", s.FeedArticles)
	articles.PUT("/:slug", s.UpdateArticle)
	articles.DELETE("/:slug", s.DeleteArticle)
	articles.POST("/:slug/comments", s.AddComment)
	articles.DELETE("/:slug/comments/:id", s.DeleteComment)
	articles.POST("/:slug/favorite", s.FavoriteArticle)
	articles.DELETE("/:slug/favorite", s.UnfavoriteArticle)

	tags := api.Group("/tags")
	tags.GET("", s.GetTags)
}

func (s *Server) MountSwaggerHandlers() {
	docs.SwaggerInfo.Version = "0.0.1"
	docs.SwaggerInfo.Host = fmt.Sprintf("%s:%s", s.config.Host, s.config.Port)
	docs.SwaggerInfo.BasePath = "/api"
	docs.SwaggerInfo.Schemes = []string{"http"}
	docs.SwaggerInfo.Title = "Conduit API"
	docs.SwaggerInfo.Description = "Conduit API Documentation"
	s.router.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerfiles.Handler))
}

func (s *Server) Start(addr string) error {
	return s.router.Run(addr)
}

func (s *Server) findUniqueSlug(c *gin.Context, title string) (string, error) {
	var (
		found      bool
		uniqueSlug string
	)
	for !found {
		uniqueSlug = createUniqueSlug(title)
		articleID, err := NullableID(s.store.GetArticleIDBySlug(c, uniqueSlug))
		if err != nil {
			return "", err
		}
		if articleID == "" {
			found = true
		}
	}
	return uniqueSlug, nil
}
