package com.realworld.realworld.domain.user.dto;

import com.realworld.realworld.domain.user.entity.User;
import lombok.Getter;

@Getter
public class UserRegisterResponseDto {

    private final String email;
    private final String username;
    private final String bio;
    private final String image;

    public UserRegisterResponseDto(User entity) {
        this.email = entity.getEmail();
        this.username = entity.getUsername();
        this.bio = entity.getBio();
        this.image = entity.getImage();
    }
}
