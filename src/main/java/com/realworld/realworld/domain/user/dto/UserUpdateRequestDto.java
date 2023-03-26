package com.realworld.realworld.domain.user.dto;

import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.annotation.JsonTypeName;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@JsonTypeName("user")
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.WRAPPER_OBJECT)
public class UserUpdateRequestDto {

    @NotBlank
    private String username;

    private String bio;

    private String image;

    @Builder
    public UserUpdateRequestDto(String username, String bio, String image) {
        this.username = username;
        this.bio = bio;
        this.image = image;
    }

}
