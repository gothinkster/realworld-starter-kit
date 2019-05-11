package handler

import (
	"time"

	"github.com/xesina/golang-echo-realworld-example-app/model"
	"github.com/xesina/golang-echo-realworld-example-app/user"
	"github.com/xesina/golang-echo-realworld-example-app/utils"
	"github.com/labstack/echo/v4"
)

type userResponse struct {
	User struct {
		Username string  `json:"username"`
		Email    string  `json:"email"`
		Bio      *string `json:"bio"`
		Image    *string `json:"image"`
		Token    string  `json:"token"`
	} `json:"user"`
}

func newUserResponse(u *model.User) *userResponse {
	r := new(userResponse)
	r.User.Username = u.Username
	r.User.Email = u.Email
	r.User.Bio = u.Bio
	r.User.Image = u.Image
	r.User.Token = utils.GenerateJWT(u.ID)
	return r
}

type profileResponse struct {
	Profile struct {
		Username  string  `json:"username"`
		Bio       *string `json:"bio"`
		Image     *string `json:"image"`
		Following bool    `json:"following"`
	} `json:"profile"`
}

func newProfileResponse(us user.Store, userID uint, u *model.User) *profileResponse {
	r := new(profileResponse)
	r.Profile.Username = u.Username
	r.Profile.Bio = u.Bio
	r.Profile.Image = u.Image
	r.Profile.Following, _ = us.IsFollower(u.ID, userID)
	return r
}

type articleResponse struct {
	Slug           string    `json:"slug"`
	Title          string    `json:"title"`
	Description    string    `json:"description"`
	Body           string    `json:"body"`
	TagList        []string  `json:"tagList"`
	CreatedAt      time.Time `json:"createdAt"`
	UpdatedAt      time.Time `json:"updatedAt"`
	Favorited      bool      `json:"favorited"`
	FavoritesCount int       `json:"favoritesCount"`
	Author         struct {
		Username  string  `json:"username"`
		Bio       *string `json:"bio"`
		Image     *string `json:"image"`
		Following bool    `json:"following"`
	} `json:"author"`
}

type singleArticleResponse struct {
	Article *articleResponse `json:"article"`
}

type articleListResponse struct {
	Articles      []*articleResponse `json:"articles"`
	ArticlesCount int                `json:"articlesCount"`
}

func newArticleResponse(c echo.Context, a *model.Article) *singleArticleResponse {
	ar := new(articleResponse)
	ar.TagList = make([]string, 0)
	ar.Slug = a.Slug
	ar.Title = a.Title
	ar.Description = a.Description
	ar.Body = a.Body
	ar.CreatedAt = a.CreatedAt
	ar.UpdatedAt = a.UpdatedAt
	for _, t := range a.Tags {
		ar.TagList = append(ar.TagList, t.Tag)
	}
	for _, u := range a.Favorites {
		if u.ID == userIDFromToken(c) {
			ar.Favorited = true
		}
	}
	ar.FavoritesCount = len(a.Favorites)
	ar.Author.Username = a.Author.Username
	ar.Author.Image = a.Author.Image
	ar.Author.Bio = a.Author.Bio
	ar.Author.Following = a.Author.FollowedBy(userIDFromToken(c))
	return &singleArticleResponse{ar}
}

func newArticleListResponse(us user.Store, userID uint, articles []model.Article, count int) *articleListResponse {
	r := new(articleListResponse)
	r.Articles = make([]*articleResponse, 0)
	for _, a := range articles {
		ar := new(articleResponse)
		ar.TagList = make([]string, 0)
		ar.Slug = a.Slug
		ar.Title = a.Title
		ar.Description = a.Description
		ar.Body = a.Body
		ar.CreatedAt = a.CreatedAt
		ar.UpdatedAt = a.UpdatedAt
		for _, t := range a.Tags {
			ar.TagList = append(ar.TagList, t.Tag)
		}
		for _, u := range a.Favorites {
			if u.ID == userID {
				ar.Favorited = true
			}
		}
		ar.FavoritesCount = len(a.Favorites)
		ar.Author.Username = a.Author.Username
		ar.Author.Image = a.Author.Image
		ar.Author.Bio = a.Author.Bio
		ar.Author.Following, _ = us.IsFollower(a.AuthorID, userID)
		r.Articles = append(r.Articles, ar)
	}
	r.ArticlesCount = count
	return r
}

type commentResponse struct {
	ID        uint      `json:"id"`
	Body      string    `json:"body"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
	Author    struct {
		Username  string  `json:"username"`
		Bio       *string `json:"bio"`
		Image     *string `json:"image"`
		Following bool    `json:"following"`
	} `json:"author"`
}

type singleCommentResponse struct {
	Comment *commentResponse `json:"comment"`
}

type commentListResponse struct {
	Comments []commentResponse `json:"comments"`
}

func newCommentResponse(c echo.Context, cm *model.Comment) *singleCommentResponse {
	comment := new(commentResponse)
	comment.ID = cm.ID
	comment.Body = cm.Body
	comment.CreatedAt = cm.CreatedAt
	comment.UpdatedAt = cm.UpdatedAt
	comment.Author.Username = cm.User.Username
	comment.Author.Image = cm.User.Image
	comment.Author.Bio = cm.User.Bio
	comment.Author.Following = cm.User.FollowedBy(userIDFromToken(c))
	return &singleCommentResponse{comment}
}

func newCommentListResponse(c echo.Context, comments []model.Comment) *commentListResponse {
	r := new(commentListResponse)
	cr := commentResponse{}
	r.Comments = make([]commentResponse, 0)
	for _, i := range comments {
		cr.ID = i.ID
		cr.Body = i.Body
		cr.CreatedAt = i.CreatedAt
		cr.UpdatedAt = i.UpdatedAt
		cr.Author.Username = i.User.Username
		cr.Author.Image = i.User.Image
		cr.Author.Bio = i.User.Bio
		cr.Author.Following = i.User.FollowedBy(userIDFromToken(c))

		r.Comments = append(r.Comments, cr)
	}
	return r
}

type tagListResponse struct {
	Tags []string `json:"tags"`
}

func newTagListResponse(tags []model.Tag) *tagListResponse {
	r := new(tagListResponse)
	for _, t := range tags {
		r.Tags = append(r.Tags, t.Tag)
	}
	return r
}
