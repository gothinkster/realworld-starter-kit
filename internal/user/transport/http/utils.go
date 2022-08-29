package api

import (
	"github.com/go-playground/validator/v10"
	jsoniter "github.com/json-iterator/go"
	"net/http"
)

type validate interface {
	validate(validator validator.Validate) error
}

func readAndValidate(r *http.Request, dest validate, validator validator.Validate) error {

	decoder := jsoniter.NewDecoder(r.Body)
	err := decoder.Decode(dest)
	if err != nil {
		return err
	}

	if err = dest.validate(validator); err != nil {
		return err
	}

	return nil
}
