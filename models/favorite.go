package models

type Favorite struct {
	ID        int
	User      User
	UserID    int
	Article   Article
	ArticleID int
}
