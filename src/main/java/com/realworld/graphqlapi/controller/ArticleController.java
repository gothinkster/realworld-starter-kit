package com.realworld.graphqlapi.controller;

import com.realworld.graphqlapi.repository.ArticleRepository;


import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

//@Controller
@Deprecated
public class ArticleController {
    private final ArticleRepository articleRepository;

    public ArticleController(ArticleRepository articleRepository) {
        this.articleRepository = articleRepository;
    }
//
//    @QueryMapping
//    public Article articleById(@Argument String id) {
//        return articleRepository.getById(id);
//    }
//
//    @QueryMapping
//    public List<Article> articlesByAuthor(@Argument String id) {
//        return StreamSupport.stream(articleRepository.getAllArticles().spliterator(), false)
//            .filter(article ->
//                article
//                    .getAuthor().getId().equals(id))
//            .collect(Collectors.toList());
//    }
}
