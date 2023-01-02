package api

type profileResponse struct {
	Profile profile `json:"profile"`
}

type profile struct {
	Username  string `json:"username"`
	Bio       string `json:"bio"`
	Image     string `json:"image"`
	Following bool   `json:"following"`
}

type authResponse struct {
	User userResponse `json:"user"`
}

type userResponse struct {
	Email    string `json:"email"`
	Token    string `json:"token"`
	Username string `json:"username"`
	Bio      string `json:"bio,omitempty"`
	Image    string `json:"image,omitempty"`
}
