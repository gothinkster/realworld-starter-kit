package models

import (
	"github.com/jinzhu/gorm"
)

type Datastorer interface {
	UserStorer
	ArticleStorer
	TagStorer
	InitSchema()
}

type DB struct {
	*gorm.DB
}

func NewDB(dialect, dbName string) (*DB, error) {
	db, err := gorm.Open(dialect, dbName)
	if err != nil {
		return nil, err
	}

	return &DB{db}, nil
}

func (db *DB) InitSchema() {
	db.AutoMigrate(&Favorite{})
	db.AutoMigrate(&User{})
	db.AutoMigrate(&Article{})
	db.AutoMigrate(&Tag{})

}
