package storage

import (
	"github.com/jinzhu/gorm"
	"github.com/xesina/golang-echo-realworld-example-app/user"
)

type UserStore struct {
	db *gorm.DB
}

func NewUserStore(db *gorm.DB) *UserStore {
	return &UserStore{
		db: db,
	}
}

func (us *UserStore) Init() error {
	return us.db.AutoMigrate(
		&user.User{},
		&user.Follow{},
	).Error
}

func (us *UserStore) GetByID(id uint) (*user.User, error) {
	var model user.User
	if err := us.db.First(&model, id).Error; err != nil {
		if gorm.IsRecordNotFoundError(err) {
			return nil, nil
		}
		return nil, err
	}
	return &model, nil
}

func (us *UserStore) GetByEmail(e string) (*user.User, error) {
	var m user.User
	if err := us.db.Where(&user.User{Email: e}).First(&us).Error; err != nil {
		if gorm.IsRecordNotFoundError(err) {
			return nil, nil
		}
		return nil, err
	}
	return &m, nil
}

func (us *UserStore) GetByUsername(username string) (usr *user.User, err error) {
	if err = us.db.Where(&user.User{Username: username}).Preload("Followers").First(&usr).Error; err != nil {
		if gorm.IsRecordNotFoundError(err) {
			return usr, nil
		}
		return usr, err
	}
	return usr, err
}

func (us *UserStore) Create(u *user.User) (err error) {
	return us.db.Create(u).Error
}

func (us *UserStore) Update(u *user.User) error {
	return us.db.Model(u).Update(u).Error
}

func (us *UserStore) AddFollower(u *user.User, followerID uint) error {
	return us.db.Model(u).Association("Followers").Append(&user.Follow{FollowerID: followerID, FollowingID: u.ID}).Error
}

func (us *UserStore) RemoveFollower(u *user.User, followerID uint) error {
	f := user.Follow{
		FollowerID:  followerID,
		FollowingID: u.ID,
	}
	if err := us.db.Model(u).Association("Followers").Find(&f).Error; err != nil {
		return err
	}
	if err := us.db.Delete(f).Error; err != nil {
		return err
	}
	return nil
}
