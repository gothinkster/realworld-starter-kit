package controllers

import (
	"github.com/revel/revel"
)

type TagController struct {
	ApplicationController
}

type TagJSON struct {
	Tags []string `json:"tags"`
}

func (c TagController) Index() revel.Result {
	return c.Todo()
}
