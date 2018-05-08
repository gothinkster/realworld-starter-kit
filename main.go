package main

import (
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	"github.com/labstack/gommon/log"
	"net/http"
)

func main() {
	e := echo.New()
	e.Logger.SetLevel(log.DEBUG)
	e.Use(middleware.Logger())

	e.POST("/api/users/login", func(c echo.Context) error {
		return c.JSON(http.StatusOK, "login")
	})
	e.POST("/api/users", func(c echo.Context) error {
		return c.JSON(http.StatusOK, "register user")
	})
	e.GET("/api/user", func(c echo.Context) error {
		return c.JSON(http.StatusOK, "get current user")
	})
	e.PUT("/api/user", func(c echo.Context) error {
		return c.JSON(http.StatusOK, "update user")
	})

	e.GET("/api/profiles/:username", func(c echo.Context) error {
		return c.JSON(http.StatusOK, "Get Profile")
	})
	e.POST("/api/profiles/:username/follow", func(c echo.Context) error {
		return c.JSON(http.StatusOK, "Follow user")
	})
	e.DELETE("/api/profiles/:username/follow", func(c echo.Context) error {
		return c.JSON(http.StatusOK, "Unfollow user")
	})

	e.GET("/api/articles", func(c echo.Context) error {
		return c.JSON(http.StatusOK, "Returns most recent articles globally by default, provide tag, author or favorited query parameter to filter results")
	})
	e.GET("/api/articles/feed", func(c echo.Context) error {
		return c.JSON(http.StatusOK, "Feed Articles")
	})
	e.GET("/api/articles/:slug", func(c echo.Context) error {
		return c.JSON(http.StatusOK, "get articles")
	})
	e.POST("/api/articles", func(c echo.Context) error {
		return c.JSON(http.StatusOK, "create article")
	})
	e.PUT("/api/articles/:slug", func(c echo.Context) error {
		return c.JSON(http.StatusOK, "update article")
	})
	e.DELETE("/api/articles/:slug", func(c echo.Context) error {
		return c.JSON(http.StatusOK, "delete article")
	})

	e.POST("/api/articles/:slug/comments", func(c echo.Context) error {
		return c.JSON(http.StatusOK, "add Comments to an Article")
	})
	e.GET("/api/articles/:slug/comments", func(c echo.Context) error {
		return c.JSON(http.StatusOK, "Get Comments from an Article")
	})
	e.DELETE("/api/articles/:slug/comments/:id", func(c echo.Context) error {
		return c.JSON(http.StatusOK, "delete Comment")
	})

	e.POST("/api/articles/:slug/favorite", func(c echo.Context) error {
		return c.JSON(http.StatusOK, "favorite article")
	})
	e.DELETE("/api/articles/:slug/favorite", func(c echo.Context) error {
		return c.JSON(http.StatusOK, "unfavorite Article")
	})

	e.GET("/api/tags", func(c echo.Context) error {
		return c.JSON(http.StatusOK, "get tags")
	})

	e.Logger.Fatal(e.Start(":1323"))
}
