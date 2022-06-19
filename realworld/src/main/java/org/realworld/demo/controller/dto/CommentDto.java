package org.realworld.demo.controller.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.realworld.demo.domain.Comment;
import org.realworld.demo.domain.User;

import java.time.LocalDateTime;
import java.util.List;

import static org.realworld.demo.controller.dto.CommentDto.CommentCreateResponse.Response;

public class CommentDto {

    public static class CommentCreateRequest{

        @JsonProperty(value = "comment")
        private Request request;

        private static class Request {
            private final String body;

            private Request(String body) {
                this.body = body;
            }
        }

        public CommentCreateRequest(String body){
            this.request = new Request(body);
        }

        public String getBody(){
            return request.body;
        }

    }

    public static class CommentCreateResponse {

        @JsonProperty(value = "comment")
        private Response response;

        public CommentCreateResponse(Comment comment, User author, boolean following){
            response = new Response(comment, author, following);
        }

        static class Response{
            private final Long id;

            private final LocalDateTime createdAt;

            private final LocalDateTime updatedAt;

            private final String body;

            private final Author author;

            private Response(Comment comment, User author, boolean following) {
                this.id = comment.getId();
                this.createdAt = comment.getCreatedAt();
                this.updatedAt = comment.getUpdatedAt();
                this.body = comment.getBody();
                this.author = new Author(author, following);
            }

            private static class Author{
                private final String username;

                private final String bio;

                private final String image;

                private final boolean following;

                public Author(User author, boolean following) {
                    this.username = author.getUsername();
                    this.bio = author.getBio();
                    this.image = author.getImage();
                    this.following = following;
                }
            }
        }
    }

    public static class MultipleCommentResponse{

        @JsonProperty(value = "comment")
        public List<Response> responses;

        public MultipleCommentResponse(List<Comment> comments, boolean[] followings) {
            for (int i = 0; i < comments.size(); i++) {
                Comment comment = comments.get(i);
                responses.add(new CommentCreateResponse.Response(comment, comment.getAuthor(), followings[i]));
            }
        }
    }
}
