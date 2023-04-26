package api

import (
	"os"
	"testing"

	"github.com/gin-gonic/gin"

	"github.com/aliml92/realworld-gin-sqlc/config"
	db "github.com/aliml92/realworld-gin-sqlc/db/sqlc"
)

func newTestServer(t *testing.T, store db.Store) *Server {
	conf := config.LoadConfig("test", "../env/")
	server := NewServer(conf, store, nil)
	server.MountHandlers()
	return server
}

func TestMain(m *testing.M) {
	gin.SetMode(gin.TestMode)
	os.Exit(m.Run())
}
