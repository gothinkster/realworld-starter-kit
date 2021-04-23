package handler

import (
	"github.com/go-openapi/runtime/middleware"
	"github.com/pei0804/realworld/gen/restapi/realworld"
)

func GetGreeting(p realworld.GetGreetingParams) middleware.Responder {
	payload := *p.Name
	return realworld.NewGetGreetingOK().WithPayload(payload)
}
