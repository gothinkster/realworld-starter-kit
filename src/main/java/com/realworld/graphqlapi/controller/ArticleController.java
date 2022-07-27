package com.realworld.graphqlapi.controller;

import com.realworld.graphqlapi.model.Article;
import com.realworld.graphqlapi.model.Author;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

@Controller
public class ArticleController {

    @QueryMapping
    public Article articleById(@Argument String id){
        return Article.builder()
            .id("id-1")
            .author(new Author())
            .date("date")
            .text("text text text")
            .build();
    }
}
