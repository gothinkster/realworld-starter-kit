// Code generated by MockGen. DO NOT EDIT.
// Source: ./interfaces.go

// Package mock is a generated GoMock package.
package mock

import (
	context "context"
	reflect "reflect"

	gomock "github.com/golang/mock/gomock"
	entity "github.com/pavelkozlov/realworld/internal/entity"
)

// MockuserService is a mock of userService interface.
type MockuserService struct {
	ctrl     *gomock.Controller
	recorder *MockuserServiceMockRecorder
}

// MockuserServiceMockRecorder is the mock recorder for MockuserService.
type MockuserServiceMockRecorder struct {
	mock *MockuserService
}

// NewMockuserService creates a new mock instance.
func NewMockuserService(ctrl *gomock.Controller) *MockuserService {
	mock := &MockuserService{ctrl: ctrl}
	mock.recorder = &MockuserServiceMockRecorder{mock}
	return mock
}

// EXPECT returns an object that allows the caller to indicate expected use.
func (m *MockuserService) EXPECT() *MockuserServiceMockRecorder {
	return m.recorder
}

// Authenticate mocks base method.
func (m *MockuserService) Authenticate(ctx context.Context, email, password string) (entity.User, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "Authenticate", ctx, email, password)
	ret0, _ := ret[0].(entity.User)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// Authenticate indicates an expected call of Authenticate.
func (mr *MockuserServiceMockRecorder) Authenticate(ctx, email, password interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "Authenticate", reflect.TypeOf((*MockuserService)(nil).Authenticate), ctx, email, password)
}
