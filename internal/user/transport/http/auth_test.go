package api

import (
	"bytes"
	"github.com/golang/mock/gomock"
	jsoniter "github.com/json-iterator/go"
	"github.com/pavelkozlov/realworld/internal/user"
	"github.com/pavelkozlov/realworld/internal/user/mock"
	"github.com/stretchr/testify/assert"
	"io"
	"net/http"
	"net/http/httptest"
	"testing"
)

type testAuthenticationTestCase struct {
	body         io.Reader
	expectedCode int
	before       func(service *mock.MockService)
}

var (
	validAuthReq = AuthenticationRequest{
		Email:    "test@test.ru",
		Password: "123456",
	}
	invalidEmailAuthReq = AuthenticationRequest{
		Email:    "test",
		Password: "test",
	}
	emptyEmailAuthReq = AuthenticationRequest{
		Password: "test",
	}
	emptyPasswordAuthReq = AuthenticationRequest{
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
		func(service *mock.MockService) {
			service.EXPECT().Authentication(gomock.Any()).Return(user.AuthenticationResponse{}, nil)
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
	apiStruct := api{}
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	service := mock.NewMockService(ctrl)

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
