package database

import (
	"github.com/jinzhu/gorm"
	"fmt"
	"github.com/xesina/golang-echo-realworld-example-app/models"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
)

func New() *gorm.DB {
	db, err := gorm.Open("sqlite3", "./realworld.db")
	if err != nil {
		fmt.Println("storage err: ", err)
	}
	db.DB().SetMaxIdleConns(3)
	db.LogMode(true)
	return db
}

func AutoMigrate(db *gorm.DB) {
	db.AutoMigrate(&models.User{})
}
