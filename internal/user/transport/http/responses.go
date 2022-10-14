package api

import (
	"encoding/json"
	jsoniter "github.com/json-iterator/go"
	"net/http"
)

type singleResponse struct {
	User authenticationResponse `json:"user"`
}

type authenticationResponse struct {
	Email    string `json:"email"`
	Token    string `json:"token"`
	Username string `json:"username"`
	Bio      string `json:"bio,omitempty"`
	Image    string `json:"image,omitempty"`
}

type errorWrapper struct {
	Errors errors `json:"errors"`
}

type errors struct {
	Body []string `json:"body"`
}

func newErrorResp(w http.ResponseWriter, code int, err error) {
	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(code)
	encoder := jsoniter.NewEncoder(w)
	_ = encoder.Encode(errorWrapper{
		errors{Body: []string{err.Error()}},
	})
}

func newOkResp(w http.ResponseWriter, data any) {
	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	encoder := json.NewEncoder(w)
	_ = encoder.Encode(data)
}
