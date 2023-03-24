package com.realworld.realworld.domain.user.dto;

import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.annotation.JsonTypeName;
import com.realworld.realworld.domain.user.entity.User;
import lombok.Builder;
import lombok.Getter;

@Getter
@JsonTypeName("user")
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.WRAPPER_OBJECT)
public class UserResponseDto {

    private final String email;
    private final String token;
    private final String username;
    private final String bio;
    private final String image;

    @Builder
    public UserResponseDto(User entity, String token) {
        this.email = entity.getEmail();
        this.username = entity.getUsername();
        this.bio = entity.getBio();
        this.image = entity.getImage();
        this.token = token;
    }
}
