package api

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/http/httptest"
	"os"
	"strings"
	"testing"

	"github.com/aliml92/realworld-gin-sqlc/config"
	db "github.com/aliml92/realworld-gin-sqlc/db/sqlc"
	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v4"
	"github.com/stretchr/testify/assert"
)

var (
	conf   config.Config
	dbConn *pgx.Conn
	router *gin.Engine
	server *Server
)

func TestMain(m *testing.M) {
	gin.SetMode(gin.TestMode)
	setup()
	code := m.Run()
	teardown()
	os.Exit(code)
}

func setup() {

	conf = config.LoadConfig("test", ".")
	conf.DBUrl = fmt.Sprintf("postgres://%s:%s@%s:%s/%s?sslmode=disable",
		conf.DBUsername,
		conf.DBPassword,
		conf.DBHost,
		conf.DBPort,
		conf.DBNameTest,
	)
	dbConn = db.ConnectTemp(conf)
	db.AutoMigrate(conf)

	store := db.NewConduitStore(dbConn)
	router = gin.Default()
	server = &Server{
		config: conf,
		store:  store,
		router: router,
		log:    nil,
	}
}

func teardown() {
	defer db.CloseTemp(dbConn)
	db.Drop(conf)
}

func TestRegister(t *testing.T) {
	request := userRegisterReq{
		User: struct {
			Username string `json:"username" binding:"required"`
			Email    string `json:"email" binding:"required,email"`
			Password string `json:"password" binding:"required"`
		}{
			Username: "testuser",
			Email:    "test@mail.com",
			Password: "testpassword123",
		},
	}

	jsonRequest, err := json.Marshal(request)
	assert.Nil(t, err)
	server.router.POST("/api/users", server.RegisterUser)
	req := httptest.NewRequest(http.MethodPost, "/api/users", strings.NewReader(string(jsonRequest)))
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusCreated, w.Code)
	var response userResponse
	err = json.Unmarshal(w.Body.Bytes(), &response)
	assert.Nil(t, err)
	assert.Equal(t, request.User.Username, response.User.Username)
	assert.Equal(t, request.User.Email, response.User.Email)
	assert.Nil(t, response.User.Bio)
	assert.Nil(t, response.User.Image)
	assert.NotEmpty(t, response.User.Token)
}

func TestLogin(t *testing.T) {
	w := httptest.NewRecorder()
	c, e := gin.CreateTestContext(w)
	e.POST("/api/users/login", server.LoginUser)

	request := userLoginReq{
		User: struct {
			Email    string `json:"email" binding:"required,email"`
			Password string `json:"password" binding:"required"`
		}{
			Email:    "test@mail.com",
			Password: "testpassword123",
		},
	}

	jsonRequest, err := json.Marshal(request)
	assert.Nil(t, err)

	body := strings.NewReader(string(jsonRequest))
	c.Request = httptest.NewRequest(http.MethodPost, "/api/users/login", body)
	e.ServeHTTP(w, c.Request)

	assert.Equal(t, http.StatusOK, w.Code)

	var response userResponse
	err = json.Unmarshal(w.Body.Bytes(), &response)
	assert.Nil(t, err)

	assert.Equal(t, request.User.Email, response.User.Email)
	assert.Nil(t, response.User.Bio)
	assert.Nil(t, response.User.Image)
	assert.NotEmpty(t, response.User.Token)

}
