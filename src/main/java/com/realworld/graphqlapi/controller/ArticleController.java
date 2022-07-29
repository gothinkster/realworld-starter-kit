package com.realworld.graphqlapi.controller;

import com.realworld.graphqlapi.model.Article;
import com.realworld.graphqlapi.model.ArticlePage;
import com.realworld.graphqlapi.model.Edje;
import com.realworld.graphqlapi.model.NewsArticle;
import com.realworld.graphqlapi.model.Node;
import com.realworld.graphqlapi.model.PageInfo;
import com.realworld.graphqlapi.repository.ArticleRepository;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.UUID;
import java.util.stream.StreamSupport;

@Controller
public class ArticleController {
    private final ArticleRepository articleRepository;

    public ArticleController(ArticleRepository articleRepository) {
        this.articleRepository = articleRepository;
    }

    @QueryMapping
    public Article articleById(@Argument UUID id) {
        return articleRepository.getById(id);
    }

    @QueryMapping
    public Iterable<? extends Article> articlesByAuthor(@Argument UUID id) {
        return StreamSupport.stream(articleRepository.getAllArticles().spliterator(), false)
            .filter(NewsArticle.class::isInstance)
            .map(NewsArticle.class::cast)
            .filter(article ->
                article
                    .getAuthor().getId().equals(id))
            .toList();
    }

    @QueryMapping
    public Iterable<ArticlePage> articles() {
        return StreamSupport.stream(articleRepository.getAllArticles().spliterator(), false)
            .map(article -> new ArticlePage(new Edje(new Node(article)), new PageInfo()))
            .toList();
    }
}
