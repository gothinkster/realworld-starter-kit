package io.realworld.api.request;

import com.fasterxml.jackson.annotation.JsonRootName;

import javax.validation.constraints.Email;

@JsonRootName("user")
public class UpdatedUser {
    @Email
    private String email;

    private String username;

    private String password;

    private String bio;

    private String image;

    public String getEmail() {
        return email;
    }

    public void setEmail(final String email) {
        this.email = email;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(final String bio) {
        this.bio = bio;
    }

    public String getImage() {
        return image;
    }

    public void setImage(final String image) {
        this.image = image;
    }

    public String getUsername() {
        return username != null ? username.toLowerCase() : null;
    }

    public void setUsername(final String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(final String password) {
        this.password = password;
    }
}
