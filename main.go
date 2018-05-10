package main

import (
	"fmt"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	"github.com/labstack/gommon/log"
	"github.com/xesina/golang-echo-realworld-example-app/handler"
	"github.com/xesina/golang-echo-realworld-example-app/models"
	"gopkg.in/go-playground/validator.v9"
	"net/http"
)

type Validator struct {
	validator *validator.Validate
}

func (v *Validator) Validate(i interface{}) error {
	return v.validator.Struct(i)
}

func main() {
	db := getDB()
	AutoMigrate(db)
	e := echo.New()
	e.Logger.SetLevel(log.DEBUG)
	e.Use(middleware.Logger())
	e.Validator = &Validator{validator: validator.New()}
	h := handler.New(db)
	e.POST("/api/users/login", func(c echo.Context) error {
		return c.JSON(http.StatusOK, "login user")
	})
	e.POST("/api/users", h.Register)
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

func getDB() *gorm.DB {
	db, err := gorm.Open("sqlite3", "./realworld.db")
	if err != nil {
		fmt.Println("db err: ", err)
	}
	db.DB().SetMaxIdleConns(3)
	db.LogMode(true)
	return db
}

func AutoMigrate(db *gorm.DB) {
	db.AutoMigrate(&models.User{})
}
