package org.realworld.demo.controller.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ProfileDto {

    @JsonProperty(value = "profile")
    public Response response;

    public static class Response{
        public final String username;

        public final String bio;

        public final String image;

        public final boolean following;

        public Response(String username, String bio, String image, boolean following) {
            this.username = username;
            this.bio = bio;
            this.image = image;
            this.following = following;
        }
    }
}
