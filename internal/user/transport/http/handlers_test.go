package api

import (
	"bytes"
	"context"
	"github.com/golang/mock/gomock"
	jsoniter "github.com/json-iterator/go"
	"github.com/pavelkozlov/realworld/internal/entity"
	"github.com/pavelkozlov/realworld/internal/user/transport/http/mock"
	"github.com/stretchr/testify/assert"
	"io"
	"net/http"
	"net/http/httptest"
	"testing"
)

type testAuthenticationTestCase struct {
	body         io.Reader
	expectedCode int
	before       func(service *mock.MockuserService)
}

var (
	validAuthReq = authenticationRequest{
		Email:    "test@test.ru",
		Password: "123456",
	}
	invalidEmailAuthReq = authenticationRequest{
		Email:    "test",
		Password: "test",
	}
	emptyEmailAuthReq = authenticationRequest{
		Password: "test",
	}
	emptyPasswordAuthReq = authenticationRequest{
		Email: "test",
	}
	validAuthReqBytes, _         = jsoniter.Marshal(&validAuthReq)
	invalidEmailAuthReqBytes, _  = jsoniter.Marshal(&invalidEmailAuthReq)
	emptyEmailAuthReqBytes, _    = jsoniter.Marshal(&emptyEmailAuthReq)
	emptyPasswordAuthReqBytes, _ = jsoniter.Marshal(&emptyPasswordAuthReq)
)

var testAuthenticationTestCases = []testAuthenticationTestCase{
	{
		nil,
		422,
		nil,
	},
	{
		bytes.NewBuffer(validAuthReqBytes),
		200,
		func(service *mock.MockuserService) {
			service.EXPECT().Authenticate(context.Background(), "test@test.ru", "123456").Return(entity.User{}, nil)
		},
	},
	{
		bytes.NewBuffer(invalidEmailAuthReqBytes),
		422,
		nil,
	},
	{
		bytes.NewBuffer(emptyEmailAuthReqBytes),
		422,
		nil,
	},
	{
		bytes.NewBuffer(emptyPasswordAuthReqBytes),
		422,
		nil,
	},
}

func TestApi_Authentication(t *testing.T) {

	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	service := mock.NewMockuserService(ctrl)
	apiStruct := NewUserApi(service)

	for _, test := range testAuthenticationTestCases {

		if test.before != nil {
			test.before(service)
		}

		req := httptest.NewRequest(http.MethodPost, "/", test.body)
		w := httptest.NewRecorder()
		apiStruct.Authentication(w, req)

		res := w.Result()
		assert.Equal(t, test.expectedCode, res.StatusCode)
	}

}
