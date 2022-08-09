package validator

import "github.com/go-playground/validator/v10"

var v *validator.Validate

func GetValidator() *validator.Validate {
	if v == nil {
		v = validator.New()
	}
	return v
}
