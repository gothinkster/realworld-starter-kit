package models

import "fmt"

func (db *DB) Seed() {
	user1 := User{
		Username: "user1",
		Bio:      "Bio user 1",
		Email:    "user1@example.com",
		Password: "user1password1",
		Image:    "http://image.com/user1.png",
	}

	user2 := User{
		Username: "user2",
		Bio:      "Bio user 2",
		Email:    "user2@example.com",
		Password: "user2password2",
		Image:    "http://image.com/user2.png",
	}

	db.Create(&user1)
	db.Create(&user2)

	// Tags
	var tags []Tag
	for i := 0; i < 15; i++ {
		tag := Tag{Name: fmt.Sprintf("tag%d", i)}
		db.Create(&tag)
		tags = append(tags, tag)
	}

	// Articles
	tagIndex := 0
	for i := 0; i < 5; i++ {
		a := Article{
			Title:       fmt.Sprintf("Title %d", i+1),
			Description: fmt.Sprintf("Description %d", i+1),
			Body:        fmt.Sprintf("Body %d", i+1),
			Tags: []Tag{
				tags[tagIndex],
				tags[tagIndex+1],
				tags[tagIndex+2],
			},
			UserID: (i % 2) + 1,
		}

		db.Create(&a)

		db.Model(&a).Association("Favorites").Append(Favorite{
			UserID:    a.UserID,
			ArticleID: a.ID,
		})

		tagIndex += 3
	}
}

func (db *DB) CleanDatabase() {
	db.DropTable("users")
	db.DropTable("articles")
	db.DropTable("tags")
	db.DropTable("favorites")
}
