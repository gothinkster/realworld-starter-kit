package api

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/brianvoe/gofakeit/v6"
	"github.com/gin-gonic/gin"
	"github.com/golang/mock/gomock"
	"github.com/google/go-cmp/cmp"
	"github.com/google/go-cmp/cmp/cmpopts"
	"github.com/jackc/pgconn"
	"github.com/jackc/pgx/v4"
	"github.com/stretchr/testify/require"
	"golang.org/x/crypto/bcrypt"

	mockdb "github.com/aliml92/realworld-gin-sqlc/db/mock"
	db "github.com/aliml92/realworld-gin-sqlc/db/sqlc"
)

func TestRegisterUser(t *testing.T) {
	user, password := randomUser(t)

	testCases := []struct {
		name          string
		body          gin.H
		buildStubs    func(store *mockdb.MockStore)
		checkResponse func(recorder *httptest.ResponseRecorder)
	}{
		{
			name: "OK",
			body: gin.H{
				"user": gin.H{
					"username": user.Username,
					"email":    user.Email,
					"password": password,
				},
			},
			buildStubs: func(store *mockdb.MockStore) {
				arg := db.CreateUserParams{
					ID:       user.ID,
					Username: user.Username,
					Email:    user.Email,
				}
				store.EXPECT().
					CreateUser(gomock.Any(), CreateUserParamsMatcher(arg, password)).
					Times(1).
					Return(user, nil)
			},
			checkResponse: func(recorder *httptest.ResponseRecorder) {
				require.Equal(t, http.StatusCreated, recorder.Code)
				requireBodyMatchUser(t, user, recorder.Body)
			},
		},
		{
			"BadRequestBody",
			gin.H{},
			func(store *mockdb.MockStore) {},
			func(recorder *httptest.ResponseRecorder) {
				require.Equal(t, http.StatusUnprocessableEntity, recorder.Code)
			},
		},
		{
			"DuplicateUsername",
			gin.H{
				"user": gin.H{
					"username": user.Username,
					"email":    user.Email,
					"password": password,
				},
			},
			func(store *mockdb.MockStore) {
				store.EXPECT().
					CreateUser(gomock.Any(), gomock.Any()).
					Times(1).
					Return(nil, &pgconn.PgError{ConstraintName: "users_username_key"})
			},
			func(recorder *httptest.ResponseRecorder) {
				require.Equal(t, http.StatusUnprocessableEntity, recorder.Code)
			},
		},
		{
			"DuplicateEmail",
			gin.H{
				"user": gin.H{
					"username": user.Username,
					"email":    user.Email,
					"password": password,
				},
			},
			func(store *mockdb.MockStore) {
				store.EXPECT().
					CreateUser(gomock.Any(), gomock.Any()).
					Times(1).
					Return(nil, &pgconn.PgError{ConstraintName: "users_email_key"})
			},
			func(recorder *httptest.ResponseRecorder) {
				require.Equal(t, http.StatusUnprocessableEntity, recorder.Code)
			},
		},
		{
			"InternalError",
			gin.H{
				"user": gin.H{
					"username": user.Username,
					"email":    user.Email,
					"password": password,
				},
			},
			func(store *mockdb.MockStore) {
				store.EXPECT().
					CreateUser(gomock.Any(), gomock.Any()).
					Times(1).
					Return(nil, fmt.Errorf("internal error"))
			},
			func(recorder *httptest.ResponseRecorder) {
				require.Equal(t, http.StatusInternalServerError, recorder.Code)
			},
		},
	}

	for _, testCase := range testCases {
		t.Run(testCase.name, func(t *testing.T) {
			ctrl := gomock.NewController(t)
			defer ctrl.Finish()

			store := mockdb.NewMockStore(ctrl)
			testCase.buildStubs(store)

			server := newTestServer(t, store)
			recorder := httptest.NewRecorder()

			data, err := json.Marshal(testCase.body)
			require.NoError(t, err)

			url := "/api/users"
			request, err := http.NewRequest(http.MethodPost, url, bytes.NewBuffer(data))
			require.NoError(t, err)

			server.router.ServeHTTP(recorder, request)
			testCase.checkResponse(recorder)

		})
	}
}

func TestLoginUser(t *testing.T) {
	user, password := randomUser(t)

	testCases := []struct {
		name          string
		body          gin.H
		buildStubs    func(store *mockdb.MockStore)
		checkResponse func(recorder *httptest.ResponseRecorder)
	}{
		{
			"OK",
			gin.H{
				"user": gin.H{
					"email":    user.Email,
					"password": password,
				},
			},
			func(store *mockdb.MockStore) {
				store.EXPECT().
					GetUserByEmail(gomock.Any(), user.Email).
					Times(1).
					Return(user, nil)
			},
			func(recorder *httptest.ResponseRecorder) {
				require.Equal(t, http.StatusOK, recorder.Code)
				requireBodyMatchUser(t, user, recorder.Body)
			},
		},
		{
			"BadRequestBody",
			gin.H{},
			func(store *mockdb.MockStore) {},
			func(recorder *httptest.ResponseRecorder) {
				require.Equal(t, http.StatusUnprocessableEntity, recorder.Code)
			},
		},
		{
			"UserNotFound",
			gin.H{
				"user": gin.H{
					"email":    user.Email,
					"password": password,
				},
			},
			func(store *mockdb.MockStore) {
				store.EXPECT().
					GetUserByEmail(gomock.Any(), gomock.Any()).
					Times(1).
					Return(nil, pgx.ErrNoRows)
			},
			func(recorder *httptest.ResponseRecorder) {
				require.Equal(t, http.StatusForbidden, recorder.Code)
			},
		},
		{
			"WrongPassword",
			gin.H{
				"user": gin.H{
					"email":    user.Email,
					"password": "wrong_password",
				},
			},
			func(store *mockdb.MockStore) {
				store.EXPECT().
					GetUserByEmail(gomock.Any(), user.Email).
					Times(1).
					Return(user, nil)
			},
			func(recorder *httptest.ResponseRecorder) {
				require.Equal(t, http.StatusForbidden, recorder.Code)
			},
		},
		{
			"InternalError",
			gin.H{
				"user": gin.H{
					"username": user.Username,
					"email":    user.Email,
					"password": password,
				},
			},
			func(store *mockdb.MockStore) {
				store.EXPECT().
					GetUserByEmail(gomock.Any(), gomock.Any()).
					Times(1).
					Return(nil, fmt.Errorf("internal error"))
			},
			func(recorder *httptest.ResponseRecorder) {
				require.Equal(t, http.StatusInternalServerError, recorder.Code)
			},
		},
	}

	for _, testCase := range testCases {
		t.Run(testCase.name, func(t *testing.T) {
			ctrl := gomock.NewController(t)
			defer ctrl.Finish()

			store := mockdb.NewMockStore(ctrl)
			testCase.buildStubs(store)

			server := newTestServer(t, store)
			recorder := httptest.NewRecorder()

			data, err := json.Marshal(testCase.body)
			require.NoError(t, err)

			url := "/api/users/login"
			request, err := http.NewRequest(http.MethodPost, url, bytes.NewBuffer(data))
			require.NoError(t, err)

			server.router.ServeHTTP(recorder, request)
			testCase.checkResponse(recorder)

		})
	}
}

func TestGetCurrentUser(t *testing.T) {
	user, _ := randomUser(t)
	token, _ := GenerateJWT(user.ID)

	testCases := []struct {
		name          string
		buildStubs    func(store *mockdb.MockStore)
		checkResponse func(recorder *httptest.ResponseRecorder)
	}{
		{
			"OK",
			func(store *mockdb.MockStore) {
				store.EXPECT().
					GetUser(gomock.Any(), user.ID).
					Times(1).
					Return(user, nil)
			},
			func(recorder *httptest.ResponseRecorder) {
				require.Equal(t, http.StatusOK, recorder.Code)
				requireBodyMatchUser(t, user, recorder.Body)
			},
		},
		{
			"UserNotFound",
			func(store *mockdb.MockStore) {
				store.EXPECT().
					GetUser(gomock.Any(), user.ID).
					Times(1).
					Return(nil, pgx.ErrNoRows)
			},
			func(recorder *httptest.ResponseRecorder) {
				require.Equal(t, http.StatusNotFound, recorder.Code)
			},
		},
		{
			"InternalError",
			func(store *mockdb.MockStore) {
				store.EXPECT().
					GetUser(gomock.Any(), user.ID).
					Times(1).
					Return(nil, fmt.Errorf("internal error"))
			},
			func(recorder *httptest.ResponseRecorder) {
				require.Equal(t, http.StatusInternalServerError, recorder.Code)
			},
		},
	}

	for _, testCase := range testCases {
		t.Run(testCase.name, func(t *testing.T) {
			ctrl := gomock.NewController(t)
			defer ctrl.Finish()

			store := mockdb.NewMockStore(ctrl)
			testCase.buildStubs(store)

			server := newTestServer(t, store)
			recorder := httptest.NewRecorder()

			url := "/api/user"
			request, err := http.NewRequest(http.MethodGet, url, nil)
			require.NoError(t, err)
			request.Header.Set("Authorization", fmt.Sprintf("Bearer %s", token))

			server.router.ServeHTTP(recorder, request)
			testCase.checkResponse(recorder)

		})
	}
}

func TestUpdateUser(t *testing.T) {
	user, password := randomProfile(t)
	token, _ := GenerateJWT(user.ID)

	testCases := []struct {
		name          string
		body          gin.H
		buildStubs    func(store *mockdb.MockStore)
		checkResponse func(recorder *httptest.ResponseRecorder)
	}{
		{
			"OK",
			gin.H{
				"user": gin.H{
					"username": user.Username,
					"email":    user.Email,
					"password": password,
					"bio":      user.Bio,
					"image":    user.Image,
				},
			},
			func(store *mockdb.MockStore) {
				arg := db.UpdateUserParams{
					ID:       user.ID,
					Username: &user.Username,
					Email:    &user.Email,
					Password: &user.Password,
					Bio:      user.Bio,
					Image:    user.Image,
				}
				store.EXPECT().
					UpdateUser(gomock.Any(), NewUpdateUserParamsMatcher(arg, password)).
					Times(1).
					Return(user, nil)
			},
			func(recorder *httptest.ResponseRecorder) {
				require.Equal(t, http.StatusOK, recorder.Code)
				requireBodyMatchUser(t, user, recorder.Body)
			},
		},
		{
			name: "BadRequestBody",
			body: gin.H{
				"user": "invalid",
			},
			buildStubs: func(store *mockdb.MockStore) {},
			checkResponse: func(recorder *httptest.ResponseRecorder) {
				require.Equal(t, http.StatusUnprocessableEntity, recorder.Code)
			},
		},
		{
			"UserNotFound",
			gin.H{
				"user": gin.H{
					"username": user.Username,
					"email":    user.Email,
					"password": password,
					"bio":      user.Bio,
					"image":    user.Image,
				},
			},
			func(store *mockdb.MockStore) {
				arg := db.UpdateUserParams{
					ID:       user.ID,
					Username: &user.Username,
					Email:    &user.Email,
					Password: &user.Password,
					Bio:      user.Bio,
					Image:    user.Image,
				}
				store.EXPECT().
					UpdateUser(gomock.Any(), NewUpdateUserParamsMatcher(arg, password)).
					Times(1).
					Return(nil, pgx.ErrNoRows)
			},
			func(recorder *httptest.ResponseRecorder) {
				require.Equal(t, http.StatusNotFound, recorder.Code)
			},
		},
		{
			"DuplicateUsername",
			gin.H{
				"user": gin.H{
					"username": user.Username,
					"email":    user.Email,
					"password": password,
					"bio":      user.Bio,
					"image":    user.Image,
				},
			},
			func(store *mockdb.MockStore) {
				store.EXPECT().
					UpdateUser(gomock.Any(), gomock.Any()).
					Times(1).
					Return(nil, &pgconn.PgError{ConstraintName: "users_username_key"})
			},
			func(recorder *httptest.ResponseRecorder) {
				require.Equal(t, http.StatusUnprocessableEntity, recorder.Code)
			},
		},
		{
			"DuplicateEmail",
			gin.H{
				"user": gin.H{
					"username": user.Username,
					"email":    user.Email,
					"password": password,
					"bio":      user.Bio,
					"image":    user.Image,
				},
			},
			func(store *mockdb.MockStore) {
				store.EXPECT().
					UpdateUser(gomock.Any(), gomock.Any()).
					Times(1).
					Return(nil, &pgconn.PgError{ConstraintName: "users_email_key"})
			},
			func(recorder *httptest.ResponseRecorder) {
				require.Equal(t, http.StatusUnprocessableEntity, recorder.Code)
			},
		},
		{
			"InternalError",
			gin.H{
				"user": gin.H{
					"username": user.Username,
					"email":    user.Email,
					"password": password,
					"bio":      user.Bio,
					"image":    user.Image,
				},
			},
			func(store *mockdb.MockStore) {
				store.EXPECT().
					UpdateUser(gomock.Any(), gomock.Any()).
					Times(1).
					Return(nil, fmt.Errorf("internal error"))
			},
			func(recorder *httptest.ResponseRecorder) {
				require.Equal(t, http.StatusInternalServerError, recorder.Code)
			},
		},
	}

	for _, testCase := range testCases {
		t.Run(testCase.name, func(t *testing.T) {
			ctrl := gomock.NewController(t)
			defer ctrl.Finish()

			store := mockdb.NewMockStore(ctrl)
			testCase.buildStubs(store)

			server := newTestServer(t, store)
			recorder := httptest.NewRecorder()

			data, err := json.Marshal(testCase.body)
			require.NoError(t, err)

			url := "/api/user"
			request, err := http.NewRequest(http.MethodPut, url, bytes.NewBuffer(data))
			require.NoError(t, err)
			request.Header.Set("Authorization", fmt.Sprintf("Bearer %s", token))

			server.router.ServeHTTP(recorder, request)
			testCase.checkResponse(recorder)

		})
	}
}

func TestGetProfile(t *testing.T) {
	followeeProfile, _ := randomProfile(t)
	followerID := "loggedinuserid"
	isFollowing := true // logged in user is following the profile user
	followerToken, _ := GenerateJWT(followerID)

	testCases := []struct {
		name          string
		buildStubs    func(store *mockdb.MockStore)
		checkResponse func(recorder *httptest.ResponseRecorder)
	}{
		{
			name: "OK",
			buildStubs: func(store *mockdb.MockStore) {
				arg := db.IsFollowingParams{
					FollowerID:  followerID,
					FollowingID: followeeProfile.ID,
				}
				gomock.InOrder(
					store.EXPECT().
						GetUserByUsername(gomock.Any(), followeeProfile.Username).
						Times(1).
						Return(followeeProfile, nil),
					store.EXPECT().
						IsFollowing(gomock.Any(), arg).
						Times(1).
						Return(isFollowing, nil),
				)
			},
			checkResponse: func(recorder *httptest.ResponseRecorder) {
				require.Equal(t, http.StatusOK, recorder.Code)
				requireBodyMatchProfile(t, followeeProfile, isFollowing, recorder.Body)
			},
		},
	}

	for _, testCase := range testCases {
		t.Run(testCase.name, func(t *testing.T) {
			ctrl := gomock.NewController(t)
			defer ctrl.Finish()

			store := mockdb.NewMockStore(ctrl)
			testCase.buildStubs(store)

			server := newTestServer(t, store)
			recorder := httptest.NewRecorder()

			url := "/api/profiles/" + followeeProfile.Username
			request, err := http.NewRequest(http.MethodGet, url, nil)
			require.NoError(t, err)
			request.Header.Set("Authorization", fmt.Sprintf("Bearer %s", followerToken))

			server.router.ServeHTTP(recorder, request)
			testCase.checkResponse(recorder)

		})
	}
}

func TestFollowUser(t *testing.T) {
	user, _ := randomProfile(t)
	loggedUserID := "loggedinuserid"
	loggedUserToken, _ := GenerateJWT(loggedUserID)

	testCases := []struct {
		name          string
		buildStubs    func(store *mockdb.MockStore)
		checkResponse func(recorder *httptest.ResponseRecorder)
	}{
		{
			name: "OK",
			buildStubs: func(store *mockdb.MockStore) {
				arg := db.FollowUserParams{
					FollowerID:  loggedUserID,
					FollowingID: user.ID,
				}
				gomock.InOrder(
					store.EXPECT().
						GetUserByUsername(gomock.Any(), user.Username).
						Times(1).
						Return(user, nil),
					store.EXPECT().
						FollowUser(gomock.Any(), arg).
						Times(1).
						Return(nil),
				)
			},
			checkResponse: func(recorder *httptest.ResponseRecorder) {
				require.Equal(t, http.StatusOK, recorder.Code)
				requireBodyMatchProfile(t, user, true, recorder.Body)
			},
		},
	}

	for _, testCase := range testCases {
		t.Run(testCase.name, func(t *testing.T) {
			ctrl := gomock.NewController(t)
			defer ctrl.Finish()

			store := mockdb.NewMockStore(ctrl)
			testCase.buildStubs(store)

			server := newTestServer(t, store)
			recorder := httptest.NewRecorder()

			url := "/api/profiles/" + user.Username + "/follow"
			request, err := http.NewRequest(http.MethodPost, url, nil)
			require.NoError(t, err)
			request.Header.Set("Authorization", fmt.Sprintf("Bearer %s", loggedUserToken))

			server.router.ServeHTTP(recorder, request)
			testCase.checkResponse(recorder)

		})
	}
}

func TestUnfollowUser(t *testing.T) {
	user, _ := randomProfile(t)
	loggedUserID := "loggedinuserid"
	loggedUserToken, _ := GenerateJWT(loggedUserID)

	testCases := []struct {
		name          string
		buildStubs    func(store *mockdb.MockStore)
		checkResponse func(recorder *httptest.ResponseRecorder)
	}{
		{
			name: "OK",
			buildStubs: func(store *mockdb.MockStore) {
				arg := db.UnfollowUserParams{
					FollowerID:  loggedUserID,
					FollowingID: user.ID,
				}
				gomock.InOrder(
					store.EXPECT().
						GetUserByUsername(gomock.Any(), user.Username).
						Times(1).
						Return(user, nil),
					store.EXPECT().
						UnfollowUser(gomock.Any(), arg).
						Times(1).
						Return(nil),
				)
			},
			checkResponse: func(recorder *httptest.ResponseRecorder) {
				require.Equal(t, http.StatusOK, recorder.Code)
				requireBodyMatchProfile(t, user, false, recorder.Body)
			},
		},
	}

	for _, testCase := range testCases {
		t.Run(testCase.name, func(t *testing.T) {
			ctrl := gomock.NewController(t)
			defer ctrl.Finish()

			store := mockdb.NewMockStore(ctrl)
			testCase.buildStubs(store)

			server := newTestServer(t, store)
			recorder := httptest.NewRecorder()

			url := "/api/profiles/" + user.Username + "/follow"
			request, err := http.NewRequest(http.MethodDelete, url, nil)
			require.NoError(t, err)
			request.Header.Set("Authorization", fmt.Sprintf("Bearer %s", loggedUserToken))

			server.router.ServeHTTP(recorder, request)
			testCase.checkResponse(recorder)

		})
	}
}

func TestSample(t *testing.T) {
	user, password := randomUser(t)

	testCases := []struct {
		name          string
		body          gin.H
		buildStubs    func(store *mockdb.MockStore)
		checkResponse func(recorder *httptest.ResponseRecorder)
	}{
		{
			name: "OK",
			body: gin.H{
				"user": gin.H{
					"email":    user.Email,
					"password": password,
				},
			},
			buildStubs: func(store *mockdb.MockStore) {
				store.EXPECT().
					GetUserByEmail(gomock.Any(), user.Email).
					Times(1).
					Return(user, nil)
			},
			checkResponse: func(recorder *httptest.ResponseRecorder) {
				require.Equal(t, http.StatusOK, recorder.Code)
				requireBodyMatchUser(t, user, recorder.Body)
			},
		},
	}

	for _, testCase := range testCases {
		t.Run(testCase.name, func(t *testing.T) {
			ctrl := gomock.NewController(t)
			defer ctrl.Finish()

			store := mockdb.NewMockStore(ctrl)
			testCase.buildStubs(store)

			server := newTestServer(t, store)
			recorder := httptest.NewRecorder()

			data, err := json.Marshal(testCase.body)
			require.NoError(t, err)

			url := "/api/users/login"
			request, err := http.NewRequest(http.MethodPost, url, bytes.NewBuffer(data))
			require.NoError(t, err)

			server.router.ServeHTTP(recorder, request)
			testCase.checkResponse(recorder)

		})
	}
}

func randomUser(t *testing.T) (user *db.User, password string) {
	password = "password12345"
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	require.NoError(t, err)

	user = &db.User{
		ID:       generateID(),
		Username: gofakeit.Username(),
		Email:    gofakeit.Email(),
		Password: string(hashedPassword),
	}
	return
}

func randomProfile(t *testing.T) (user *db.User, password string) {
	password = "password12345"
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	require.NoError(t, err)

	bio := gofakeit.Sentence(10)
	image := gofakeit.URL()

	user = &db.User{
		ID:       generateID(),
		Username: gofakeit.Username(),
		Email:    gofakeit.Email(),
		Password: string(hashedPassword),
		Bio:      &bio,
		Image:    &image,
	}
	return
}

func requireBodyMatchUser(t *testing.T, user *db.User, body *bytes.Buffer) {
	data, err := io.ReadAll(body)
	require.NoError(t, err)

	var gotUser userResponse
	err = json.Unmarshal(data, &gotUser)

	require.NoError(t, err)
	require.Equal(t, user.Username, gotUser.User.Username)
	require.Equal(t, user.Email, gotUser.User.Email)
	require.NotEmpty(t, gotUser.User.Token)
}

func requireBodyMatchProfile(t *testing.T, user *db.User, isFollowing bool, body *bytes.Buffer) {
	data, err := io.ReadAll(body)
	require.NoError(t, err)

	var gotUser profileResponse
	err = json.Unmarshal(data, &gotUser)

	require.NoError(t, err)
	require.Equal(t, user.Username, gotUser.Profile.Username)
	require.Equal(t, user.Bio, gotUser.Profile.Bio)
	require.Equal(t, user.Image, gotUser.Profile.Image)
	require.Equal(t, isFollowing, gotUser.Profile.Following)
}

type createUserParamsMatcher struct {
	arg      db.CreateUserParams // arg.Password is hashed
	password string              // real password

}

func (m *createUserParamsMatcher) Matches(x interface{}) bool {
	arg, ok := x.(db.CreateUserParams)
	if !ok {
		return false
	}
	err := bcrypt.CompareHashAndPassword([]byte(arg.Password), []byte(m.password))
	if err != nil {
		return false
	}
	m.arg.Password = arg.Password
	return cmp.Equal(m.arg, arg, cmpopts.IgnoreFields(db.CreateUserParams{}, "ID"))
}

func (m *createUserParamsMatcher) String() string {
	return fmt.Sprintf("matches arg %v and password %v", m.arg, m.password)
}

func CreateUserParamsMatcher(arg db.CreateUserParams, password string) gomock.Matcher {
	return &createUserParamsMatcher{
		arg:      arg,
		password: password,
	}
}

type updateUserParamsMatcher struct {
	arg      db.UpdateUserParams // arg.Password is hashed
	password string              // real password
}

func NewUpdateUserParamsMatcher(arg db.UpdateUserParams, password string) gomock.Matcher {
	return &updateUserParamsMatcher{
		arg:      arg,
		password: password,
	}
}

func (m *updateUserParamsMatcher) Matches(x interface{}) bool {
	arg, ok := x.(db.UpdateUserParams)
	if !ok {
		return false
	}
	err := bcrypt.CompareHashAndPassword([]byte(*arg.Password), []byte(m.password))
	if err != nil {
		return false
	}
	m.arg.Password = arg.Password
	return cmp.Equal(m.arg, arg)
}

func (m *updateUserParamsMatcher) String() string {
	return fmt.Sprintf("matches arg %v", m.arg)
}
