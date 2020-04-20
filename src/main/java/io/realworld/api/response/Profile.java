package io.realworld.api.response;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class Profile {
    @JsonIgnore
    private Long id;
    private String username;
    private String bio;
    private String image;
    private Boolean following;

    public Long getId() {
        return id;
    }

    public void setId(final Long id) {
        this.id = id;
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

    public Boolean getFollowing() {
        return following;
    }

    public void setFollowing(final Boolean following) {
        this.following = following;
    }
}
