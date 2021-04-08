package handler

import (
	"github.com/alpody/fiber-realworld/model"
	"github.com/gofiber/fiber/v2"
	"github.com/gosimple/slug"
)

type userUpdateRequest struct {
	User struct {
		Username string `json:"username"`
		Email    string `json: "email" validate:"email"`
		Password string `json:"password"`
		Bio      string `json:"bio"`
		Image    string `json:"image"`
	} `json:"user"`
}

func newUserUpdateRequest() *userUpdateRequest {
	return new(userUpdateRequest)
}
func (r *userUpdateRequest) populate(u *model.User) {
	r.User.Username = u.Username
	r.User.Email = u.Email
	r.User.Password = u.Password
	if u.Bio != nil {
		r.User.Bio = *u.Bio
	}
	if u.Image != nil {
		r.User.Image = *u.Image
	}
}

func (r *userUpdateRequest) bind(c *fiber.Ctx, u *model.User, v *Validator) error {
	if err := c.BodyParser(r); err != nil {
		return err
	}
	if err := v.Validate(r); err != nil {
		return err
	}
	u.Username = r.User.Username
	u.Email = r.User.Email
	//fmt.Printf("request user %v, from db user %v", r.User, *u)
	if r.User.Password != u.Password {
		h, err := u.HashPassword(r.User.Password)
		if err != nil {
			return err
		}
		u.Password = h

	}
	u.Bio = &r.User.Bio
	u.Image = &r.User.Image
	return nil
}

type userRegisterRequest struct {
	User struct {
		Username string `json:"username" validate:"required"`
		Email    string `json: "email" validate:"required, email"`
		Password string `json:"password" validate:"required"`
	} `json:"user"`
}

func (r *userRegisterRequest) bind(c *fiber.Ctx, u *model.User, v *Validator) error {
	//validate

	if err := c.BodyParser(r); err != nil {
		return err
	}
	//fmt.Printf("%v", *r)

	if err := v.Validate(r); err != nil {
		return err
	}
	u.Username = r.User.Username
	u.Email = r.User.Email
	h, err := u.HashPassword(r.User.Password)
	if err != nil {
		return err
	}
	u.Password = h
	return nil
}

type userLoginRequest struct {
	User struct {
		Email    string `json:"email" validate:"required,email"`
		Password string `json:"password" validate: "required"`
	} `json:"user"`
}

func (r *userLoginRequest) bind(c *fiber.Ctx, v *Validator) error {

	if err := c.BodyParser(r); err != nil {
		return err
	}

	if err := v.Validate(r); err != nil {
		return err
	}
	//fmt.Printf("%v", *r)
	return nil
}

type articleCreateRequest struct {
	Article struct {
		Title       string   `json:"title" validate:"required"`
		Description string   `json:"description" validate:"required"`
		Body        string   `json:"body" validate:"required"`
		Tags        []string `json:"tagList, omitempty"`
	} `json:"article"`
}

func (r *articleCreateRequest) bind(c *fiber.Ctx, a *model.Article, v *Validator) error {
	if err := c.BodyParser(r); err != nil {
		return err
	}
	if err := v.Validate(r); err != nil {
		return err
	}
	a.Title = r.Article.Title
	a.Slug = slug.Make(r.Article.Title)
	a.Description = r.Article.Description
	a.Body = r.Article.Body
	if r.Article.Tags != nil {
		for _, t := range r.Article.Tags {
			a.Tags = append(a.Tags, model.Tag{Tag: t})
		}
	}
	return nil
}

type articleUpdateRequest struct {
	Article struct {
		Title       string   `json:"title"`
		Description string   `json:"description"`
		Body        string   `json:"body"`
		Tags        []string `json:"tagList"`
	} `json:"article"`
}

func (r *articleUpdateRequest) populate(a *model.Article) {
	r.Article.Title = a.Title
	r.Article.Description = a.Description
	r.Article.Body = a.Body
}

func (r *articleUpdateRequest) bind(c *fiber.Ctx, a *model.Article, v *Validator) error {
	if err := c.BodyParser(r); err != nil {
		return err
	}
	if err := v.Validate(r); err != nil {
		return err
	}
	a.Title = r.Article.Title
	a.Slug = slug.Make(a.Title)
	a.Description = r.Article.Description
	a.Body = r.Article.Body
	return nil
}

type createCommentRequest struct {
	Comment struct {
		Body string `json:"body" validate:"required"`
	} `json:"comment"`
}

func (r *createCommentRequest) bind(c *fiber.Ctx, cm *model.Comment, v *Validator) error {
	if err := c.BodyParser(r); err != nil {
		return err
	}
	if err := v.Validate(r); err != nil {
		return err
	}
	cm.Body = r.Comment.Body
	cm.UserID = userIDFromToken(c)
	return nil
}
