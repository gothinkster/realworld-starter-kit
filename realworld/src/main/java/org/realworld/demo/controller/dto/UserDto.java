package org.realworld.demo.controller.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.realworld.demo.domain.User;

public class UserDto {

    private UserDto(){}

    public static class UserUpdateRequest{
        @JsonProperty(value = "user")
        public UserUpdateRequest.Request request;

        public static class Request{
            public final String email;

            public final String username;

            public final String password;

            public final String image;

            public final String bio;

            public Request(String email, String username, String password, String image, String bio){
                this.email = email;
                this.username = username;
                this.password = password;
                this.image = image;
                this.bio = bio;
            }

        }
    }

    public static class UserCreateRequest {

        @JsonProperty(value = "user")
        public UserCreateRequest.Request request;

        public static class Request{

            private final String username;

            private final String email;

            private final String password;

            public Request(String username, String email, String password){
                this.username = username;
                this.email = email;
                this.password = password;
            }

            public User toUser(){
                return new User(email, password, username, "", "");
            }
        }
    }

    public static class UserResponse {

        @JsonProperty(value="user")
        public Response response;

        public Response getResponse() {
            return response;
        }

        public static class Response{
            private final String email;

            private final String token;

            private final String username;

            private final String bio;

            private final String image;

            private Response(String email, String token, String username, String bio, String image) {
                this.email = email;
                this.token = token;
                this.username = username;
                this.bio = bio;
                this.image = image;
            }

            public String getEmail() {
                return email;
            }

            public String getToken() {
                return token;
            }

            public String getUsername() {
                return username;
            }

            public String getBio() {
                return bio;
            }

            public String getImage() {
                return image;
            }
        }

        public UserResponse(Response response){
            this.response = response;
        }

        public static UserResponse fromUser(User user){
            return new UserResponse(
                    new Response(user.getEmail(), "", user.getUsername(), user.getBio(), user.getImage())
            );
        }
    }

    public static class UserLoginRequest{

        @JsonProperty(value="user")
        public Request request;

        public String getEmail(){
            return request.email;
        }

        public String getPassword(){
            return request.password;
        }


        public static class Request{
            public final String email;

            public final String password;

            public Request(String email, String password){
                this.email = email;
                this.password = password;
            }

        }
    }
}
