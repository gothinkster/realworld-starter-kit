package controllers

import (
	"github.com/revel/revel"
)

type FavoriteController struct {
	ApplicationController
}

func (c FavoriteController) Create() revel.Result {
	return c.Todo()
}
func (c FavoriteController) Delete() revel.Result {
	return c.Todo()
}
