package handler_test

import (
	"fmt"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
	"github.com/xesina/golang-echo-realworld-example-app/models"
	"os"
	"testing"
)

var (
	db *gorm.DB
)

func TestMain(m *testing.M) {
	db = testDB()
	AutoMigrate()
	exitVal := m.Run()
	dropTestDB(db)
	os.Exit(exitVal)
}

// This function will create a temporarily database for running testing cases
func testDB() *gorm.DB {
	db, err := gorm.Open("sqlite3", "./../realworld_test.db")
	if err != nil {
		fmt.Println("db err: ", err)
	}
	db.DB().SetMaxIdleConns(3)
	db.LogMode(true)
	return db
}

// Migrate the schema of database if needed
func AutoMigrate() {
	db.AutoMigrate(&models.User{})
}

// Delete the database after running testing cases.
func dropTestDB(db *gorm.DB) error {
	db.Close()
	err := os.Remove("./../realworld_test.db")
	return err
}
