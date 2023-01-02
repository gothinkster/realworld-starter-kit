package utils

import (
	"net/http"

	jsoniter "github.com/json-iterator/go"
)

type errorWrapper struct {
	Errors errors `json:"errors"`
}

type errors struct {
	Body []string `json:"body"`
}

func ErrResp(w http.ResponseWriter, code int, err error) {
	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(code)
	encoder := jsoniter.NewEncoder(w)
	_ = encoder.Encode(errorWrapper{
		errors{Body: []string{err.Error()}},
	})
}

func Resp(w http.ResponseWriter, data any) {
	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	encoder := jsoniter.NewEncoder(w)
	_ = encoder.Encode(data)
}
