package auth

import (
	"fmt"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/dgrijalva/jwt-go"
)

var secret = []byte(os.Getenv("JWT_SECRET"))

// Claims contains standard fields of claims and contains
// username to identify the user on request
type Claims struct {
	jwt.StandardClaims
	Username string
}

// NewClaims creates custom claims given standard claim and username
func NewClaims(claims jwt.StandardClaims, username string) *Claims {
	return &Claims{claims, username}
}

// Tokener is how the handlers will interface with tokens
type Tokener interface {
	NewToken(string) string
	CheckRequest(*http.Request) (*Claims, error)
}

// JWT holds the standard claims and has method
// that follow the Authoizor interface
type JWT struct {
	Claims jwt.StandardClaims
}

// NewJWT creates a new manager holding the standard claims for all tokens
func NewJWT() *JWT {
	return &JWT{
		Claims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(24 * time.Hour).Unix(),
			Issuer:    "Conduit",
		},
	}
}

// NewToken creates a new JWT with a 24 hour expire date
// and with the user's username in the claims
func (j *JWT) NewToken(username string) string {
	claims := NewClaims(j.Claims, username)
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	ss, _ := token.SignedString([]byte(secret))
	return ss
}

// validateToken ensures that the tokenString provided is valid
// then returns the claims
func validateToken(tokenString string) (*Claims, error) {
	token, err := jwt.ParseWithClaims(tokenString, &Claims{}, func(token *jwt.Token) (interface{}, error) {
		_, ok := token.Method.(*jwt.SigningMethodHMAC)
		if !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}
		return secret, nil
	})

	if err != nil {
		return nil, err
	}

	claims, ok := token.Claims.(*Claims)
	if !ok || !token.Valid {
		return nil, fmt.Errorf("Token not valid")
	}

	return claims, nil
}

// CheckRequest ensures that the JWT provided in the header of
// the request is valid, and then returns claims
func (JWT) CheckRequest(r *http.Request) (*Claims, error) {
	auth := r.Header.Get("Authorization")
	if auth == "" {
		return nil, fmt.Errorf("Authorization header is empty")
	}

	token := strings.TrimPrefix(auth, "Token ")

	claims, err := validateToken(token)
	if err != nil {
		return nil, err
	}
	return claims, nil
}
