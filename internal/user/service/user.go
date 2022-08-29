package service

import "github.com/pavelkozlov/realworld/internal/user"

type service struct {
}

//type

func (s service) Authentication(request user.AuthenticationRequest) (user.AuthenticationResponse, error) {
	return user.AuthenticationResponse{
		Email:    request.Email,
		Token:    "token",
		Username: "kekeke",
	}, nil
}

// generate: mockgen -source=foo.go [other options]
func NewUserService() user.Service {
	return &service{}
}
