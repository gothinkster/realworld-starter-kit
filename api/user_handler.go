package api

import (
	"net/http"

	db "github.com/aliml92/realworld-gin-sqlc/db/sqlc"
	"github.com/gin-gonic/gin"
)

// GetCurrentUser godoc
// @Summary Get current user
// @Description Get current user
// @Tags user
// @Accept  json
// @Produce  json
// @Success 200 {object} userResponse
// @Failure 404 {object} Error
// @Failure 500 {object} Error
// @Security Bearer
// @Router /user [post]
func (s *Server) GetCurrentUser(c *gin.Context) {
	// id := getFromJWT(c)
	id := "some_uuid"
	user, err := Nullable(s.store.GetUser(c.Request.Context(), id))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	if user == nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "user not found"})
		return
	}
	c.JSON(http.StatusOK, newUserResponse(user)) // check
}

type updateUserReq struct {
	User struct {
		Email    string `json:"email" binding:"omitempty,email"`
		Username string `json:"username" binding:"omitempty"`
		Password string `json:"password" binding:"omitempty"`
		Image    string `json:"image" binding:"omitempty,url"`
		Bio      string `json:"bio" binding:"omitempty"`
	} `json:"user" binding:"required"`
}

func (req *updateUserReq) bind(c *gin.Context, p *db.UpdateUserParams) error {
	if err := c.ShouldBindJSON(req); err != nil {
		return err
	}
	if req.User.Email != "" {
		p.Email.String = req.User.Email
		p.Email.Valid = true
	}
	if req.User.Username != "" {
		p.Username.String = req.User.Username
		p.Username.Valid = true
	}
	if req.User.Password != "" {
		p.Password.String = req.User.Password
		p.Password.Valid = true
	}
	if req.User.Image != "" {
		p.Image.String = req.User.Image
		p.Image.Valid = true
	}
	if req.User.Bio != "" {
		p.Bio.String = req.User.Bio
		p.Bio.Valid = true
	}
	return nil
}


// UpdateUser godoc
// @Summary Update user
// @Description Update user
// @Tags user
// @Accept  json
// @Produce  json
// @Success 200 {object} userResponse
// @Failure 404 {object} Error
// @Failure 500 {object} Error
// @Security Bearer
// @Router /user [put]
func (s *Server) UpdateUser(c *gin.Context) {
	// id := getFromJWT(c)
	id := "some_uuid"
	var (
		req updateUserReq
		p   db.UpdateUserParams
	)
	if err := req.bind(c, &p); err != nil {
		c.JSON(http.StatusUnprocessableEntity, NewError(err))
		return
	}
	p.ID = id
	u, err := Nullable(s.store.UpdateUser(c.Request.Context(), p))
	if err != nil {
		if constraintErr(err) != nil {
			c.JSON(http.StatusUnprocessableEntity, constraintErr(err))
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
	}
	if u == nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "user not found"})
	}
	c.JSON(http.StatusOK, newUserResponse(u))
}

type profileResponse struct {
	Profile struct {
		Username  string  `json:"username"`
		Bio       *string `json:"bio"`
		Image     *string `json:"image"`
		Following bool    `json:"following"`
	} `json:"profile"`
}

func newProfileResponse(u *db.User, isFollowing bool) *profileResponse {
	var bio, image string
	resp := new(profileResponse)
	resp.Profile.Username = u.Username
	if u.Bio.Valid {
		bio = u.Bio.String
		resp.Profile.Bio = &bio
	}
	if u.Image.Valid {
		image = u.Image.String
		resp.Profile.Image = &image
	}
	resp.Profile.Following = isFollowing
	return resp
}

// GetProfile godoc
// @Summary Get profile
// @Description Get profile of any user by username. Authentification optional
// @Tags user
// @Accept  json
// @Produce  json
// @Success 200 {object} profileResponse
// @Failure 404 {object} Error
// @Failure 500 {object} Error
// @Security Bearer
// @Router /profiles/{username} [get]
func (s *Server) GetProfile(c *gin.Context) { 
	username := c.Param("username")
	user, err := Nullable(s.store.GetUserByUsername(c.Request.Context(), username))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	if user == nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "user not found"})
		return
	}
	p := db.IsFollowingParams{
		FollowerID: "some_uuid",
		FollowingID: user.ID,
	}
	isFollowing, err := s.store.IsFollowing(c.Request.Context(), p)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, newProfileResponse(user, isFollowing))
}



// FollowUser godoc
// @Summary Follow user by username
// @Description Follow user
// @Tags user
// @Accept  json
// @Produce  json
// @Success 200 {object} profileResponse
// @Failure 404 {object} Error
// @Failure 500 {object} Error
// @Security Bearer
// @Router /profiles/{username}/follow [post]
func (s *Server) FollowUser(c *gin.Context) {
	followerID := "some_uuid"
	username := c.Param("username")
	user, err := Nullable(s.store.GetUserByUsername(c.Request.Context(), username))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	if user == nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "user not found"})
		return
	}
	p := db.FollowUserParams{
		FollowerID: followerID,
		FollowingID: user.ID,
	}
	if err := s.store.FollowUser(c.Request.Context(), p); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, newProfileResponse(user, true))
}


// UnfollowUser godoc
// @Summary Unfollow user by username
// @Description Unfollow user
// @Tags user
// @Accept  json
// @Produce  json
// @Success 200 {object} profileResponse
// @Failure 404 {object} Error
// @Failure 500 {object} Error
// @Security Bearer
// @Router /profiles/{username}/follow [delete]
func (s *Server) UnfollowUser(c *gin.Context) {
	followerID := "some_uuid"
	username := c.Param("username")
	user, err := Nullable(s.store.GetUserByUsername(c.Request.Context(), username))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	if user == nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "user not found"})
		return
	}
	p := db.UnfollowUserParams{
		FollowerID: followerID,
		FollowingID: user.ID,
	}
	if err := s.store.UnfollowUser(c.Request.Context(), p); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, newProfileResponse(user, false))
}