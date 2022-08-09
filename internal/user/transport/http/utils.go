package api

import (
	jsoniter "github.com/json-iterator/go"
	"net/http"
)

type validate interface {
	validate() error
}

func readAndValidate(r *http.Request, dest validate) error {

	decoder := jsoniter.NewDecoder(r.Body)
	err := decoder.Decode(dest)
	if err != nil {
		return err
	}

	if err = dest.validate(); err != nil {
		return err
	}

	return nil
}
