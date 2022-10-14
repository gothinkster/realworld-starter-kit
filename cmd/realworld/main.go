package main

import (
	"context"
	"fmt"
	"github.com/pavelkozlov/realworld/internal/user/repository"
	"github.com/pavelkozlov/realworld/pkg/db"
)

func main() {
	ddd := db.Connect()

	repo := repository.NewUserRepo(ddd)

	user, err := repo.FindUserByEmail(context.Background(), "test@test.ru")
	fmt.Printf("user: %+v \n", user)
	fmt.Println("error:", err)
}
