package repository

import (
	"context"
	"fmt"
	"testing"

	"github.com/golang/mock/gomock"
	"github.com/pavelkozlov/realworld/internal/user/repository/mock"
	"github.com/stretchr/testify/assert"
)

type testCase struct {
	before        func(hasher *mock.Mockdatabase)
	dest          []user
	expectedError error
}

var testCases = []testCase{
	{
		before: func(db *mock.Mockdatabase) {
			db.EXPECT().SelectContext(context.Background(), gomock.Any(), gomock.Any(), gomock.Any()).Return(nil)
		},
		dest:          []user{},
		expectedError: fmt.Errorf("db find by email: not found"),
	},
	{
		before: func(db *mock.Mockdatabase) {
			db.EXPECT().SelectContext(context.Background(), gomock.Any(), gomock.Any(), gomock.Any()).Return(fmt.Errorf("internalError"))
		},
		dest:          []user{},
		expectedError: fmt.Errorf("db find by email err: internalError"),
	},
}

func TestFindUserByEmail(t *testing.T) {
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	db := mock.NewMockdatabase(ctrl)

	repo := NewUserRepo(db)

	ctx := context.Background()

	for _, val := range testCases {
		val.before(db)
		_, err := repo.FindUserByEmail(ctx, "email")
		assert.Equal(t, err, val.expectedError)
	}
}
