package io.realworld.api.response;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class User {
    @JsonIgnore
    private Long id;
    private String email;
    private String username;
    private String bio;
    private String image;
    private String token;
    @JsonIgnore
    private String password;

    public Long getId() {
        return id;
    }

    public void setId(final Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(final String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(final String username) {
        this.username = username;
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

    public String getToken() {
        return token;
    }

    public void setToken(final String token) {
        this.token = token;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(final String password) {
        this.password = password;
    }
}
