package controllers

import (
	"github.com/revel/revel"
)

type UserController struct {
	ApplicationController
}

type User struct {
	Username string `json:"username"`
	Email    string `json:"email"`
	Token    string `json:"token"`
	Bio      string `json:"bio"`
	Image    string `json:"image"`
}

type UserJSON struct {
	User `json:"user"`
}

func (c UserController) Create() revel.Result {
	return c.Todo()
}
func (c UserController) Read() revel.Result {
	return c.Todo()
}
func (c UserController) Update() revel.Result {
	return c.Todo()
}
func (c UserController) Login() revel.Result {
	return c.Todo()
}
