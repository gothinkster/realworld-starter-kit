package org.realworld.demo.controller.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.realworld.demo.domain.User;

public class UserDto {

    private UserDto(){}

    public static class UserCreateRequst {

        @JsonProperty(value = "user")
        public UserCreateRequst.Request request;

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

    public static class UserCreateResponse{

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

        public UserCreateResponse(Response response){
            this.response = response;
        }

        public static UserCreateResponse fromUser(User user){
            return new UserCreateResponse(
                    new Response(user.getEmail(), "", user.getUserName(), user.getBio(), user.getImage())
            );
        }
    }
}
