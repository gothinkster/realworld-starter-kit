package models

type TagStorer interface {
	FindTag(*Tag) error
	FindTags(tags *[]Tag) error
	FindTagOrInit(string) (Tag, error)
}

type Tag struct {
	ID            uint
	Name          string `gorm:"unique"`
	TaggingsCount uint
	Articles      []Article `gorm:"many2many:taggings;"`
}

func (db *DB) FindTag(tag *Tag) error {
	return db.Where(&tag).Find(&tag).Error
}

func (db *DB) FindTags(tags *[]Tag) error {
	return db.Model(&Tag{}).Find(&tags).Error
}

func (db *DB) FindTagOrInit(tagName string) (tag Tag, err error) {
	err = db.DB.FirstOrInit(&tag, Tag{Name: tagName}).Error
	return
}
