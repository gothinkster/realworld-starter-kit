package com.kiana.domain;

import org.springframework.data.annotation.Id;


public class User {

    @Id
    private long id;
    private String username;
    private String email;
    private String bio;
    private String image;

    public User(long id) {
        this.id = id;
    }

    public User(long id, String username, String email, String bio, String image) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.bio = bio;
        this.image = image;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }


    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username=" + username +
                ", email='" + email + '\'' +
                ", image='" + image + '\'' +
                ", bio='" + bio + '\'' +

                '}';
    }
}
