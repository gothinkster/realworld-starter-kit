package com.realworld.realworld.domain.user.dto;

import com.realworld.realworld.domain.user.entity.User;
import lombok.Builder;
import lombok.Getter;

@Getter
public class UserFindResponseDto {

    private final String email;
    private final String token;
    private final String username;
    private final String bio;
    private final String image;

    @Builder
    public UserFindResponseDto(User entity) {
        this.email = entity.getEmail();
        this.username = entity.getUsername();
        this.bio = entity.getBio();
        this.image = entity.getImage();
        this.token = "";
    }
}
