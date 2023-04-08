package api

import (
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"github.com/spf13/viper"
)

func GenerateJWT(id string) (string, error) {
	duration := viper.GetDuration("TOKEN_HOUR_LIFESPAN")
	secret := viper.GetString("API_SECRET")
	claims := jwt.RegisteredClaims{
		Subject:   id,
		ExpiresAt: jwt.NewNumericDate(time.Now().Add(duration)),
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(secret))
}

func GetJWTFromHeader(c *gin.Context) string {
	bearerToken := c.Request.Header.Get("Authorization")
	if len(strings.Split(bearerToken, " ")) == 2 {
		return strings.Split(bearerToken, " ")[1]
	}
	return ""

}

func GetIDFromJWT(tokenString string) (string, error) {
	secret := viper.GetString("API_SECRET")
	token, err := jwt.ParseWithClaims(tokenString, &jwt.RegisteredClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(secret), nil
	})
	if err != nil {
		return "", err
	}
	claims, ok := token.Claims.(*jwt.RegisteredClaims)
	if !ok {
		return "", err
	}
	// check if token is not expired
	if !token.Valid {
		return "", err
	}
	return claims.Subject, nil
}

func GetIDFromToken(token string) string {
	id, _ := GetIDFromJWT(token)
	return id
}

func GetIDFromHeader(c *gin.Context) string {
	tokenString := GetJWTFromHeader(c)
	id, _ := GetIDFromJWT(tokenString)
	return id
}

func TokenValid(c *gin.Context) error {
	tokenString := GetJWTFromHeader(c)
	secret := viper.GetString("API_SECRET")
	token, err := jwt.ParseWithClaims(tokenString, &jwt.RegisteredClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(secret), nil
	})
	if err != nil {
		return err
	}
	if _, ok := token.Claims.(*jwt.RegisteredClaims); ok && token.Valid {
		return nil
	}
	return err
}
