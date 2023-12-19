package io.realworld.api.response;


public record ProfileDto(String username,
                         String bio,
                         String image,
                         Boolean following) {

}
