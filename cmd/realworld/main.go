package main

import (
	"context"
	"fmt"
	"github.com/pavelkozlov/realworld/internal/user/repository"
	"github.com/pavelkozlov/realworld/pkg/db"
)

func main() {
	ddd := db.Connect()
	fmt.Println(ddd.Stats())

	repo := repository.NewUserRepo(ddd)

	_, err := repo.FindUserByEmail(context.Background(), "kek")
	fmt.Println(err)
}
