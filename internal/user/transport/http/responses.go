package api

import (
	"encoding/json"
	jsoniter "github.com/json-iterator/go"
	"net/http"
)

type profileResponse struct {
	Profile profile `json:"profile"`
}

type profile struct {
	Username  string `json:"username"`
	Bio       string `json:"bio"`
	Image     string `json:"image"`
	Following bool   `json:"following"`
}

type authResponse struct {
	User userResponse `json:"user"`
}

type userResponse struct {
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

func errResp(w http.ResponseWriter, code int, err error) {
	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(code)
	encoder := jsoniter.NewEncoder(w)
	_ = encoder.Encode(errorWrapper{
		errors{Body: []string{err.Error()}},
	})
}

func resp(w http.ResponseWriter, data any) {
	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	encoder := json.NewEncoder(w)
	_ = encoder.Encode(data)
}
