package handler

import (
	"log"
	"os"
	"testing"

	"encoding/json"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
	"github.com/labstack/echo/v4"
	"github.com/xesina/golang-echo-realworld-example-app/article"
	"github.com/xesina/golang-echo-realworld-example-app/db"
	"github.com/xesina/golang-echo-realworld-example-app/model"
	"github.com/xesina/golang-echo-realworld-example-app/router"
	"github.com/xesina/golang-echo-realworld-example-app/store"
	"github.com/xesina/golang-echo-realworld-example-app/user"
)

var (
	d  *gorm.DB
	us user.Store
	as article.Store
	h  *Handler
	e  *echo.Echo
)

func TestMain(m *testing.M) {
	setup()
	code := m.Run()
	tearDown()
	os.Exit(code)
}

func authHeader(token string) string {
	return "Token " + token
}

func setup() {
	d = db.TestDB()
	db.AutoMigrate(d)
	us = store.NewUserStore(d)
	as = store.NewArticleStore(d)
	h = NewHandler(us, as)
	e = router.New()
	loadFixtures()
}

func tearDown() {
	_ = d.Close()
	if err := db.DropTestDB(); err != nil {
		log.Fatal(err)
	}
}

func responseMap(b []byte, key string) map[string]interface{} {
	var m map[string]interface{}
	json.Unmarshal(b, &m)
	return m[key].(map[string]interface{})
}

func loadFixtures() error {
	u1bio := "user1 bio"
	u1image := "http://realworld.io/user1.jpg"
	u1 := model.User{
		Username: "user1",
		Email:    "user1@realworld.io",
		Bio:      &u1bio,
		Image:    &u1image,
	}
	u1.Password, _ = u1.HashPassword("secret")
	if err := us.Create(&u1); err != nil {
		return err
	}

	u2bio := "user2 bio"
	u2image := "http://realworld.io/user2.jpg"
	u2 := model.User{
		Username: "user2",
		Email:    "user2@realworld.io",
		Bio:      &u2bio,
		Image:    &u2image,
	}
	u2.Password, _ = u2.HashPassword("secret")
	if err := us.Create(&u2); err != nil {
		return err
	}
	us.AddFollower(&u2, u1.ID)

	a := model.Article{
		Slug:        "article1-slug",
		Title:       "article1 title",
		Description: "article1 description",
		Body:        "article1 body",
		AuthorID:    1,
		Tags: []model.Tag{
			{
				Tag: "tag1",
			},
			{
				Tag: "tag2",
			},
		},
	}
	as.CreateArticle(&a)
	as.AddComment(&a, &model.Comment{
		Body:      "article1 comment1",
		ArticleID: 1,
		UserID:    1,
	})

	a2 := model.Article{
		Slug:        "article2-slug",
		Title:       "article2 title",
		Description: "article2 description",
		Body:        "article2 body",
		AuthorID:    2,
		Favorites: []model.User{
			u1,
		},
		Tags: []model.Tag{
			{
				Tag: "tag1",
			},
		},
	}
	as.CreateArticle(&a2)
	as.AddComment(&a2, &model.Comment{
		Body:      "article2 comment1 by user1",
		ArticleID: 2,
		UserID:    1,
	})
	as.AddFavorite(&a2, 1)

	return nil
}
