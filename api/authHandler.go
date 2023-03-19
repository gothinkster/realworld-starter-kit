package api

import (
	"errors"
	"log"
	"net/http"

	db "github.com/aliml92/realworld-gin-sqlc/db/sqlc"
	"github.com/gin-gonic/gin"
	"github.com/lib/pq"
	"golang.org/x/crypto/bcrypt"
)


type userRegisterReq struct {
	User struct {
		Username string `json:"username" binding:"required"`
		Email    string `json:"email" binding:"required,email"`
		Password string `json:"password" binding:"required"`
	} `json:"user" binding:"required"`
}

func (r *userRegisterReq) bind(c *gin.Context, p *db.CreateUserParams) error {
	if err := c.ShouldBindJSON(r); err != nil {
		return err
	}
	p.Username = r.User.Username
	p.Email = r.User.Email
	hashed, err := bcrypt.GenerateFromPassword([]byte(r.User.Password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	p.Password = string(hashed)
	return nil
}


func (s *Server) RegisterUser(c *gin.Context){
	var (
		req userRegisterReq
		p  db.CreateUserParams
	)
	if err := req.bind(c, &p); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	user, err := s.store.CreateUser(c, p)
	if err != nil {
		var pgErr *pq.Error
		if errors.As(err, &pgErr) {
			log.Printf("error code: %s", pgErr.Code)
			log.Printf("error message: %s", pgErr.Message)
			log.Printf("error detail: %s", pgErr.Detail)
			log.Printf("error hint: %s", pgErr.Hint)
			log.Printf("error position: %s", pgErr.Position)
			log.Printf("error internal position: %s", pgErr.InternalPosition)
			log.Printf("error internal query: %s", pgErr.InternalQuery)
			log.Printf("error where: %s", pgErr.Where)
			log.Printf("error schema name: %s", pgErr.Schema)
			log.Printf("error table name: %s", pgErr.Table)
			log.Printf("error column name: %s", pgErr.Column)
			log.Printf("error data type name: %s", pgErr.DataTypeName)
			log.Printf("error constraint name: %s", pgErr.Constraint)
			log.Printf("error file: %s", pgErr.File)
			log.Printf("error line: %s", pgErr.Line)
			log.Printf("error routine: %s", pgErr.Routine)

			if pgErr.Code == "23505" {
				c.JSON(422, gin.H{"error": "user already exists"})
				return
			}
		}
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, gin.H{"user": user})
}