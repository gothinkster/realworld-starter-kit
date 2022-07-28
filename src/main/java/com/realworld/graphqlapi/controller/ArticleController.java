package com.realworld.graphqlapi.controller;

import com.realworld.graphqlapi.model.Article;
import com.realworld.graphqlapi.repository.ArticleRepository;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.stream.StreamSupport;

@Controller
public class ArticleController {
    private final ArticleRepository articleRepository;

    public ArticleController(ArticleRepository articleRepository) {
        this.articleRepository = articleRepository;
    }

    @QueryMapping
    public Article articleById(@Argument String id) {
        return articleRepository.getById(id);
    }

    @QueryMapping
    public List<Article> articlesByAuthor(@Argument String id) {
        return StreamSupport.stream(articleRepository.getAllArticles().spliterator(), false)
            .filter(article ->
                article
                    .getAuthor().getId().equals(id))
            .toList();
    }
}
