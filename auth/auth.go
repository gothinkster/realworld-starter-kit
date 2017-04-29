package auth

import (
	"fmt"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/dgrijalva/jwt-go"
)

// Claims contains standard fields of claims and contains
// username to identify the user on request
type Claims struct {
	jwt.StandardClaims
	Username string
}

var secret = os.Getenv("JWT_SECRET")

// NewToken creates a new JWT with a 24 hour expire date
// and with the user's username in the claims
func NewToken(username string) string {
	claims := Claims{
		jwt.StandardClaims{
			ExpiresAt: time.Now().Add(24 * time.Hour).Unix(),
			Issuer:    "conduit",
		},
		username,
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	ss, _ := token.SignedString([]byte(secret))
	return ss
}

// validateToken ensures that the token provided is valid
func validateToken(tokenString string) (*Claims, error) {
	token, err := jwt.ParseWithClaims(tokenString, &Claims{}, func(token *jwt.Token) (interface{}, error) {
		_, ok := token.Method.(*jwt.SigningMethodHMAC)
		if !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(secret), nil
	})

	if err != nil {
		return nil, err
	}

	claim, ok := token.Claims.(*Claims)
	if !ok || !token.Valid {
		return nil, fmt.Errorf("Token not valid")
	}

	return claim, nil
}

// Authorize ensures that the JWT provided in the header of
// the request is valid, and then returns claims
func Authorize(r *http.Request) (*Claims, error) {
	auth := r.Header.Get("Authorization")
	if auth == "" {
		return nil, fmt.Errorf("Authorization header is empty")
	}

	token := strings.TrimPrefix(auth, "Bearer ")

	claims, err := validateToken(token)
	if err != nil {
		return nil, err
	}
	return claims, nil
}
