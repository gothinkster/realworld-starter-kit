package models

type Favorite struct {
	ID        int
	UserID    int
	ArticleID int

	// Transient
	User    User
	Article Article
}
