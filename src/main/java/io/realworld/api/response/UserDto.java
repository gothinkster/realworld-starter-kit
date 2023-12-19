package io.realworld.api.response;

public record UserDto(
        String email,
        String username,
        String bio,
        String image,
        String token) {

}
