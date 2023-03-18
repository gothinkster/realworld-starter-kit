package api

import (
	db "github.com/aliml92/realworld-go-sqlc/db/sqlc"
	"github.com/gorilla/mux"
)



type Server struct {
	router *mux.Router
	store db.Querier
}


func NewServer(store db.Querier) *Server {
	server := &Server{store: store}
	router := mux.NewRouter()
	server.router = router
	return server
}


func (s *Server) MountHandlers() {
	
}

func (s *Server) Start(addr string) error {
	return nil
}