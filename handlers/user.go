package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/JackyChiu/realworld-starter-kit/auth"
)

func RegisterUser(w http.ResponseWriter, r *http.Request) error {
	u := UserJSON{}

	err := json.NewDecoder(r.Body).Decode(&u)
	if err != nil {
		return err
	}
	defer r.Body.Close()

	db.Save(&u.User)
	u.Token = auth.NewToken(u.Username)

	json.NewEncoder(w).Encode(u)
	return nil
}
