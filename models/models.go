package models

import (
	"github.com/jinzhu/gorm"
)

func InitSchema(db *gorm.DB) {
	db.AutoMigrate(&User{})
}
