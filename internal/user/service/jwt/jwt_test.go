package jwt

import (
	"fmt"
	"github.com/stretchr/testify/assert"
	"testing"
)

const (
	email       = "test@example.com"
	id          = 10
	brokenToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
)

func TestJWT(t *testing.T) {
	claims := Claims{
		Email: email,
		Id:    id,
	}

	signerStruct := NewSigner()
	jwt, err := signerStruct.CreateJWT(claims)
	fmt.Println(jwt)
	assert.Nil(t, err)

	parsedToken, err := signerStruct.ParseJWT(jwt)
	assert.Nil(t, err)

	assert.Equal(t, claims.Email, parsedToken.Email)
	assert.Equal(t, claims.Id, parsedToken.Id)
}

func TestSigner_ParseJWT(t *testing.T) {
	signerStruct := NewSigner()
	_, err := signerStruct.ParseJWT("brokenToken")
	assert.NotNil(t, err)

	_, err = signerStruct.ParseJWT(brokenToken)
	assert.NotNil(t, err)
}
