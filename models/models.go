package models

import (
	"github.com/jinzhu/gorm"
)

func Init(db *gorm.DB) {
	db.AutoMigrate(&User{})
}
