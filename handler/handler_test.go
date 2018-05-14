package handler_test

import (
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
	"github.com/xesina/golang-echo-realworld-example-app/models"
	"os"
	"testing"
	"log"
)

var (
	db *gorm.DB
)

func TestMain(m *testing.M) {
	setup()
	code := m.Run()
	tearDown()
	os.Exit(code)
}

// This function will create a temporarily database for running testing cases
func testDB() *gorm.DB {
	db, err := gorm.Open("sqlite3", "./../realworld_test.db")
	if err != nil {
		log.Fatal(err)
	}
	db.DB().SetMaxIdleConns(3)
	db.LogMode(false)
	return db
}

// Migrate the schema of database if needed
func AutoMigrate() {
	if err := db.AutoMigrate(&models.User{}).Error; err != nil {
		log.Fatal(err)
	}
}

// Delete the database after running testing cases.
func dropTestDB() {
	_ = db.Close()
	if err := os.Remove("./../realworld_test.db"); err != nil {
		log.Fatal(err)
	}
}

func authHeader(token string) string {
	return "Token " + token
}

func setup() {
	db = testDB()
	AutoMigrate()
	loadFixtures()
}

func tearDown() {
	dropTestDB()
}

func loadFixtures() error {
	bio := "user1 bio"
	image := "http://realworld.io/user1.jpg"
	u := models.User{
		Username: "user1",
		Email:    "user1@realworld.io",
		Bio:      &bio,
		Image:    &image,
	}
	if err := u.HashPassword("secret"); err != nil {
		return err
	}

	if err := db.Create(&u).Error; err != nil {
		return err
	}
	return nil
}
