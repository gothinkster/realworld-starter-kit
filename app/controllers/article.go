package controllers

import (
	"github.com/revel/revel"
)

type ArticleController struct {
	ApplicationController
}

type Article struct {
	Slug           string   `json:"slug"`
	Title          string   `json:"title"`
	Description    string   `json:"description"`
	Body           string   `json:"body"`
	Favorited      bool     `json:"favorited"`
	FavoritesCount int      `json:"favoritesCount"`
	TagList        []string `json:"tagList"`
	CreatedAt      string   `json:"createdAt"`
	UpdatedAt      string   `json:"updatedAt"`
	Author         Author   `json:"user"`
}

type Author struct {
	Username  string `json:"username"`
	Bio       string `json:"bio"`
	Image     string `json:"image"`
	Following bool   `json:"following"`
}

type ArticleJSON struct {
	Article `json:"article"`
}

type ArticlesJSON struct {
	Articles      []Article `json:"articles"`
	ArticlesCount int       `json:"articlesCount"`
}

func (c ArticleController) Index() revel.Result {
	return c.Todo()
}
func (c ArticleController) Create() revel.Result {
	return c.Todo()
}
func (c ArticleController) Read() revel.Result {
	return c.Todo()
}
func (c ArticleController) Update() revel.Result {
	return c.Todo()
}
func (c ArticleController) Delete() revel.Result {
	return c.Todo()
}
