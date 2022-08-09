package api

import (
	"bytes"
	jsoniter "github.com/json-iterator/go"
	"github.com/stretchr/testify/assert"
	"io"
	"net/http"
	"net/http/httptest"
	"testing"
)

type testAuthenticationTestCase struct {
	body         io.Reader
	expectedCode int
}

var (
	validAuthReq = authenticationReq{
		Email:    "test@test.ru",
		Password: "123456",
	}
	invalidEmailAuthReq = authenticationReq{
		Email:    "test",
		Password: "test",
	}
	emptyEmailAuthReq = authenticationReq{
		Password: "test",
	}
	emptyPasswordAuthReq = authenticationReq{
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
	},
	{
		bytes.NewBuffer(validAuthReqBytes),
		200,
	},
	{
		bytes.NewBuffer(invalidEmailAuthReqBytes),
		422,
	},
	{
		bytes.NewBuffer(emptyEmailAuthReqBytes),
		422,
	},
	{
		bytes.NewBuffer(emptyPasswordAuthReqBytes),
		422,
	},
}

func TestApi_Authentication(t *testing.T) {
	apiStruct := api{}

	for _, test := range testAuthenticationTestCases {
		req := httptest.NewRequest(http.MethodPost, "/", test.body)
		w := httptest.NewRecorder()
		apiStruct.Authentication(w, req)

		res := w.Result()
		assert.Equal(t, test.expectedCode, res.StatusCode)
	}

}
