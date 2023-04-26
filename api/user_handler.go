package api

import (
	"net/http"

	db "github.com/aliml92/realworld-gin-sqlc/db/sqlc"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
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

func newUserResponse(user *db.User) *userResponse {
	resp := new(userResponse)
	resp.User.Username = user.Username
	resp.User.Email = user.Email
	resp.User.Bio = user.Bio
	resp.User.Image = user.Image
	token, _ := GenerateJWT(user.ID)
	resp.User.Token = token
	return resp
}


type userRegisterReq struct {
	User struct {
		Username string `json:"username" binding:"required"`
		Email    string `json:"email" binding:"required,email"`
		Password string `json:"password" binding:"required"`
	} `json:"user"`
}

func (r *userRegisterReq) bind(c *gin.Context, p *db.CreateUserParams) error {
	if err := c.ShouldBindJSON(r); err != nil {
		return err
	}
	hashed, err := bcrypt.GenerateFromPassword([]byte(r.User.Password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	p.ID = generateID()
	p.Username = r.User.Username
	p.Email = r.User.Email
	p.Password = string(hashed)
	return nil
}

// RegisterUser godoc
// @Summary		Register a new user
// @Description	Register a new user
// @Tags		auth
// @Accept		json
// @Produce		json
// @Param		user	body		userRegisterReq	true	"User"
// @Success		201		{object}	userResponse
// @Failure		422		{object}	Error
// @Failure		500		{object}	Error
//
// @Router	/users  [post]
func (s *Server) RegisterUser(c *gin.Context) { // TODO:✅ POST /users - RegisterUser
	var (
		req userRegisterReq
		p   db.CreateUserParams
	)
	if err := req.bind(c, &p); err != nil {
		c.JSON(http.StatusUnprocessableEntity, NewValidationError(err))
		return
	}
	user, err := s.store.CreateUser(c, p)
	if err != nil {
		if apiErr := convertToApiErr(err); apiErr != nil {
			c.JSON(http.StatusUnprocessableEntity, NewValidationError(apiErr))
			return
		}
		c.JSON(http.StatusInternalServerError, NewError(err))
		return
	}
	// return user and token
	c.JSON(http.StatusCreated, newUserResponse(user))
}

type userLoginReq struct {
	User struct {
		Email    string `json:"email" binding:"required,email"`
		Password string `json:"password" binding:"required"`
	} `json:"user"`
}

// LoginUser godoc
// @Summary		Login a user
// @Description	Login a user
// @Tags		auth
// @Accept		json
// @Produce		json
// @Param		user	body		userLoginReq	true	"User"
// @Success		200		{object}	userResponse
// @Failure		403		{object}	Error
// @Failure		422		{object}	Error
// @Failure		500		{object}	Error
//
// @Router	/users/login [post]
func (s *Server) LoginUser(c *gin.Context) { // TODO:✅  POST /users/login - LoginUser
	var req userLoginReq
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusUnprocessableEntity, NewValidationError(err))
		return
	}
	u, err := Nullable(s.store.GetUserByEmail(c.Request.Context(), req.User.Email))
	if err != nil {
		c.JSON(http.StatusInternalServerError, NewValidationError(err))
		return
	}
	if u == nil {
		c.JSON(http.StatusForbidden, NewValidationError(ErrAccessForbidden))
		return
	}
	if err := bcrypt.CompareHashAndPassword([]byte(u.Password), []byte(req.User.Password)); err != nil {
		c.JSON(http.StatusForbidden, NewValidationError(ErrAccessForbidden))
		return
	}

	c.JSON(http.StatusOK, newUserResponse(u))
}


// GetCurrentUser godoc
// @Summary     Get current user
// @Description Get current user
// @Tags 		user
// @Accept  	json
// @Produce  	json
// @Success 	200 	{object} 	userResponse
// @Failure 	401 	{object} 	Error
// @Failure 	404		{object} 	Error
// @Failure 	500 	{object} 	Error
// @Security 	Bearer
// @Router /user [get]
func (s *Server) GetCurrentUser(c *gin.Context) { // TODO:✅ GET /user - GetCurrentUser
	id := GetIDFromHeader(c)
	user, err := Nullable(s.store.GetUser(c.Request.Context(), id))
	if err != nil {
		c.JSON(http.StatusInternalServerError, NewError(err))
		return
	}
	if user == nil {
		c.JSON(http.StatusNotFound, NewError(ErrUserNotFound))
		return
	}
	c.JSON(http.StatusOK, newUserResponse(user))
}

type updateUserReq struct {
	User struct {
		Email    *string `json:"email" binding:"omitempty,email"`
		Username *string `json:"username" binding:"omitempty"`
		Password *string `json:"password" binding:"omitempty"`
		Image    *string `json:"image" binding:"omitempty,url"`
		Bio      *string `json:"bio" binding:"omitempty"`
	} `json:"user"`
}

func (req *updateUserReq) bind(c *gin.Context, p *db.UpdateUserParams) error {
	if err := c.ShouldBindJSON(req); err != nil {
		return err
	}
	p.Email = req.User.Email
	p.Username = req.User.Username
	if req.User.Password != nil {
		hashed, err := bcrypt.GenerateFromPassword([]byte(*req.User.Password), bcrypt.DefaultCost)
		if err != nil {
			return err
		}
		stringHashed :=  string(hashed)
		p.Password = &stringHashed
	}
	p.Image = req.User.Image
	p.Bio = req.User.Bio
	return nil
}

// UpdateUser godoc
// @Summary 	Update user
// @Description Update user
// @Tags 		user
// @Accept 		json
// @Produce 	json
// @Param 		user 	body 		updateUserReq 	true 	"User"
// @Success 	200 	{object} 	userResponse
// @Failure 	401 	{object} 	Error
// @Failure 	404 	{object} 	Error
// @Failure 	422 	{object} 	Error
// @Failure 	500 	{object} 	Error
// @Security 	Bearer
// @Router /user [put]
func (s *Server) UpdateUser(c *gin.Context) { // TODO:✅ PUT /user - UpdateUser
	id := GetIDFromHeader(c)
	var (
		req updateUserReq
		p   db.UpdateUserParams
	)
	if err := req.bind(c, &p); err != nil {
		c.JSON(http.StatusUnprocessableEntity, NewValidationError(err))
		return
	}
	p.ID = id
	u, err := Nullable(s.store.UpdateUser(c.Request.Context(), p))
	if err != nil {
		if apiErr := convertToApiErr(err); apiErr != nil {
			c.JSON(http.StatusUnprocessableEntity, NewValidationError(apiErr))
		}
		c.JSON(http.StatusInternalServerError, NewError(err))
		return
	}
	if u == nil {
		c.JSON(http.StatusNotFound, NewError(ErrUserNotFound))
		return
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
	resp := new(profileResponse)
	resp.Profile.Username = u.Username
	resp.Profile.Bio = u.Bio
	resp.Profile.Image = u.Image
	resp.Profile.Following = isFollowing
	return resp
}

// GetProfile godoc
// @Summary 	Get profile
// @Description Get profile of any user by username. Authentification optional
// @Tags 		user
// @Accept  	json
// @Produce  	json
// @Param 		username path 		string 		true 	"Username"
// @Success 	200 	{object} 	profileResponse
// @Failure 	404 	{object} 	Error
// @Failure 	500 	{object} 	Error
// @Security 	Bearer || {}
// @Router /profiles/{username} [get]
func (s *Server) GetProfile(c *gin.Context) { // TODO:✅ GET /profiles/:username - GetProfile
	var (
		followerID  string
		isFollowing bool
	)
	token := GetJWTFromHeader(c)
	if token != "" {
		followerID = GetIDFromToken(token)
	}
	username := c.Param("username")
	user, err := Nullable(s.store.GetUserByUsername(c.Request.Context(), username))
	if err != nil {
		c.JSON(http.StatusInternalServerError, NewError(err))
		return
	}
	if user == nil {
		c.JSON(http.StatusNotFound, NewError(ErrUserNotFound))
		return
	}
	if followerID != "" {
		p := db.IsFollowingParams{
			FollowerID:  followerID,
			FollowingID: user.ID,
		}
		isFollowing, err = s.store.IsFollowing(c.Request.Context(), p)
		if err != nil {
			c.JSON(http.StatusInternalServerError, NewError(err))
			return
		}
	}

	c.JSON(http.StatusOK, newProfileResponse(user, isFollowing))
}

// FollowUser godoc
// @Summary 	Follow user by username
// @Description Follow user
// @Tags 		user
// @Accept  	json
// @Produce  	json
// @Param 		username path 		string 		true 	"Username"
// @Success 	200 	{object} 	profileResponse
// @Failure 	404 	{object} 	Error
// @Failure 	500 	{object} 	Error
// @Security Bearer
// @Router /profiles/{username}/follow [post]
func (s *Server) FollowUser(c *gin.Context) { // TODO:✅ POST /profiles/:username/follow - FollowUser
	followerID := GetIDFromHeader(c)
	username := c.Param("username")
	user, err := Nullable(s.store.GetUserByUsername(c.Request.Context(), username))
	if err != nil {
		c.JSON(http.StatusInternalServerError, NewError(err))
		return
	}
	if user == nil {
		c.JSON(http.StatusNotFound, NewError(ErrUserNotFound))
		return
	}
	p := db.FollowUserParams{
		FollowerID:  followerID,
		FollowingID: user.ID,
	}
	if err := s.store.FollowUser(c.Request.Context(), p); err != nil {
		c.JSON(http.StatusInternalServerError, NewError(err))
		return
	}
	c.JSON(http.StatusOK, newProfileResponse(user, true))
}

// UnfollowUser godoc
// @Summary 	Unfollow user by username
// @Description Unfollow user
// @Tags 		user
// @Accept  	json
// @Produce  	json
// @Param 		username path		string		true 	"Username"
// @Success 	200		{object}	profileResponse
// @Failure 	404 	{object}	Error
// @Failure 	500 	{object}	Error
// @Security 	Bearer
// @Router /profiles/{username}/follow [delete]
func (s *Server) UnfollowUser(c *gin.Context) { // TODO:✅ DELETE /profiles/:username/follow - UnfollowUser
	followerID := GetIDFromHeader(c)
	username := c.Param("username")
	user, err := Nullable(s.store.GetUserByUsername(c.Request.Context(), username))
	if err != nil {
		c.JSON(http.StatusInternalServerError, NewError(err))
		return
	}
	if user == nil {
		c.JSON(http.StatusNotFound, NewError(ErrUserNotFound))
		return
	}
	p := db.UnfollowUserParams{
		FollowerID:  followerID,
		FollowingID: user.ID,
	}
	if err := s.store.UnfollowUser(c.Request.Context(), p); err != nil {
		c.JSON(http.StatusInternalServerError, NewError(err))
		return
	}
	c.JSON(http.StatusOK, newProfileResponse(user, false))
}
