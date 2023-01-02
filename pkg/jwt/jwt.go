package jwt

import (
	"context"
	"errors"
	"fmt"
	"net/http"
	"strings"
	"time"

	"github.com/golang-jwt/jwt/v4"
	"github.com/pavelkozlov/realworld/pkg/utils"
)

const (
	mySigningKey = "secret-key"
)

type signer struct {
}

func NewSigner() *signer {
	return &signer{}
}

type Claims struct {
	Email string `json:"email"`
	Id    int    `json:"id"`
}

type jwtClaims struct {
	Claims
	jwt.RegisteredClaims
}

func (s signer) AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		token := r.Header.Get("Authorization")
		if token == "" {
			utils.ErrResp(w, http.StatusUnauthorized, errors.New("invalid token"))
			return
		}

		t := strings.Split(token, " ")
		if len(t) != 2 || t[0] != "Bearer" {
			utils.ErrResp(w, http.StatusUnauthorized, errors.New("invalid token"))
			return
		}

		claims, err := s.ParseJWT(t[1])
		if err != nil {
			utils.ErrResp(w, http.StatusUnauthorized, err)
			return
		}

		ctx := s.WithValue(r.Context(), claims)

		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

func (s *signer) WithValue(ctx context.Context, claims Claims) context.Context {
	return context.WithValue(ctx, s, claims)
}

func (s *signer) FromContext(ctx context.Context) (Claims, error) {
	val := ctx.Value(s)
	claims, ok := val.(Claims)
	if !ok {
		return claims, errors.New("can not find user in context")
	}
	return claims, nil
}

func (s signer) CreateJWT(incomeClaims Claims) (string, error) {

	claims := jwtClaims{
		Claims{Email: incomeClaims.Email, Id: incomeClaims.Id},
		jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(24 * time.Hour)),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	signedString, err := token.SignedString([]byte(mySigningKey))
	if err != nil {
		return "", err
	}

	return signedString, nil
}

func (s signer) ParseJWT(tokenString string) (Claims, error) {
	token, err := jwt.ParseWithClaims(tokenString, &jwtClaims{}, func(token *jwt.Token) (interface{}, error) {

		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}

		return []byte(mySigningKey), nil
	})

	if err != nil {
		return Claims{}, err
	}

	if !token.Valid {
		return Claims{}, fmt.Errorf("invalid token")
	}

	claims, ok := token.Claims.(*jwtClaims)
	if !ok {
		return Claims{}, fmt.Errorf("can not parse claims")
	}

	return Claims{Email: claims.Email, Id: claims.Id}, nil
}
