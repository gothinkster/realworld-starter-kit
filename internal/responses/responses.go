package responses

import (
	"encoding/json"
	jsoniter "github.com/json-iterator/go"
	"net/http"
)

type ErrorWrapper struct {
	Errors Errors `json:"errors"`
}

type Errors struct {
	Body []string `json:"body"`
}

func NewErrorResp(w http.ResponseWriter, code int, err error) error {
	w.WriteHeader(code)
	encoder := jsoniter.NewEncoder(w)
	return encoder.Encode(ErrorWrapper{
		Errors{Body: []string{err.Error()}},
	})
}

func NewOkResp(w http.ResponseWriter, data any) error {
	w.WriteHeader(http.StatusOK)
	encoder := json.NewEncoder(w)
	return encoder.Encode(data)
}
