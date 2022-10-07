package service

import (
	"context"
	"fmt"
	"github.com/golang/mock/gomock"
	"github.com/pavelkozlov/realworld/internal/entity"
	"github.com/pavelkozlov/realworld/internal/user/service/jwt"
	"github.com/pavelkozlov/realworld/internal/user/service/mock"
	"github.com/stretchr/testify/assert"
	"testing"
)

type testCase struct {
	before        func(hasher *mock.Mockhasher, repo *mock.MockuserRepo, token *mock.MockjsonWebToken)
	expectedUser  entity.User
	expectedError error
	inputEmail    string
	inputPassword string
}

var testCases = []testCase{
	{
		expectedUser:  entity.User{},
		expectedError: invalidCredentials,
		before: func(hahser *mock.Mockhasher, repo *mock.MockuserRepo, token *mock.MockjsonWebToken) {
			repo.EXPECT().FindUserByEmail(gomock.Any(), "test@example.com").Return(entity.User{}, fmt.Errorf("internal error"))
		},
		inputEmail:    "test@example.com",
		inputPassword: "",
	},
	{
		expectedUser:  entity.User{},
		expectedError: invalidCredentials,
		before: func(hahser *mock.Mockhasher, repo *mock.MockuserRepo, token *mock.MockjsonWebToken) {
			repo.EXPECT().FindUserByEmail(gomock.Any(), "test@example.com").Return(entity.User{Password: "123456", Salt: "654321"}, nil)
			hahser.EXPECT().CreateHashFromPasswordAndSalt("qwerty123456789", "654321").Return("12345")
		},
		inputEmail:    "test@example.com",
		inputPassword: "qwerty123456789",
	},
	{
		expectedUser:  entity.User{},
		expectedError: internalError,
		before: func(hahser *mock.Mockhasher, repo *mock.MockuserRepo, token *mock.MockjsonWebToken) {
			repo.EXPECT().FindUserByEmail(gomock.Any(), "test@example.com").Return(entity.User{ID: 1, Password: "123456", Salt: "654321", Email: "test@example.com"}, nil)
			hahser.EXPECT().CreateHashFromPasswordAndSalt("qwerty123456789", "654321").Return("123456")
			token.EXPECT().CreateJWT(jwt.Claims{Email: "test@example.com", Id: 1}).Return("secretToken", internalError)
		},
		inputEmail:    "test@example.com",
		inputPassword: "qwerty123456789",
	},
	{
		expectedUser:  entity.User{ID: 1, Salt: "654321", Email: "test@example.com", Token: "secretToken"},
		expectedError: nil,
		before: func(hahser *mock.Mockhasher, repo *mock.MockuserRepo, token *mock.MockjsonWebToken) {
			repo.EXPECT().FindUserByEmail(gomock.Any(), "test@example.com").Return(entity.User{ID: 1, Password: "123456", Salt: "654321", Email: "test@example.com"}, nil)
			hahser.EXPECT().CreateHashFromPasswordAndSalt("qwerty123456789", "654321").Return("123456")
			token.EXPECT().CreateJWT(jwt.Claims{Email: "test@example.com", Id: 1}).Return("secretToken", nil)
		},
		inputEmail:    "test@example.com",
		inputPassword: "qwerty123456789",
	},
}

func TestNewUserService(t *testing.T) {

	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	mockedJwt := mock.NewMockjsonWebToken(ctrl)
	mockedHasher := mock.NewMockhasher(ctrl)
	mockedRepo := mock.NewMockuserRepo(ctrl)

	s := NewUserService(mockedRepo, mockedHasher, mockedJwt)
	for _, val := range testCases {
		val.before(mockedHasher, mockedRepo, mockedJwt)
		user, err := s.Authenticate(context.Background(), val.inputEmail, val.inputPassword)
		assert.Equal(t, err, val.expectedError)
		assert.Equal(t, user, val.expectedUser)
	}
}
