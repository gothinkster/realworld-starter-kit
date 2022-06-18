package org.realworld.demo.controller.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.realworld.demo.domain.Article;
import org.realworld.demo.domain.Tag;
import org.realworld.demo.domain.User;

import java.time.LocalDateTime;
import java.util.List;

public class ArticleDto {

    private ArticleDto(){}

    public static class ArticleResponse{

        @JsonProperty(value = "article")
        public Response response;

        public ArticleResponse(Article article, boolean following){
            response = new Response(article, following);
        }

        private static class Response {

            public final String title;

            public final String slug;

            public final String description;

            public final String body;

            public final List<String> tagList;

            public final LocalDateTime createdAt;

            public final LocalDateTime updatedAt;

            public final boolean favorited;

            public final int favoritesCount;

            public final Author author;

            public Response(Article article, boolean following){
                this.title = article.getTitle();
                this.slug = article.getSlug();
                this.description = article.getDescription();
                this.body = article.getBody();
                this.tagList = article.getTags().stream().map(Tag::getName).toList();
                this.createdAt = article.getCreatedAt();
                this.updatedAt = article.getUpdatedAt();
                this.favorited = article.isFavorited();
                this.favoritesCount = article.getFavoriteCount();
                this.author = new Author(article.getAuthor(), following);
            }

            private static class Author{
                public final String username;

                public final String bio;

                public final String image;

                public final boolean following;

                public Author(User author, boolean following){
                    this.username = author.getUsername();
                    this.bio = author.getBio();
                    this.image = author.getImage();
                    this.following = following;
                }

            }
        }
    }

    public static class ArticleCreateRequest{

        @JsonProperty(value = "article")
        public Request request;

        public String getTitle(){
            return request.title;
        }

        public String getDescription(){
            return request.description;
        }

        public String getBody(){
            return request.body;
        }

        public List<String> getTags(){
            return request.tagList;
        }

        private static class Request{
            private final String title;

            private final String description;

            private final String body;

            private final List<String> tagList;

            public Request(String title, String description, String body, List<String> tagList){
                this.title = title;
                this.description = description;
                this.body = body;
                this.tagList = tagList;
            }
        }
    }

    public static class ArticleUpdateRequest{

        public String getTitle(){
            return request.title;
        }

        public String getDescription(){
            return request.description;
        }

        public String getBody(){
            return request.body;
        }

        @JsonProperty(value = "article")
        public Request request;

        private static class Request{
            private final String title;

            private final String description;

            private final String body;

            public Request(String title, String description, String body){
                this.title = title;
                this.description = description;
                this.body = body;
            }
        }
    }
}
