package service

import (
	"errors"
)

var (
	invalidCredentials = errors.New("invalid credentials")
	internalError      = errors.New("internal error")
)
