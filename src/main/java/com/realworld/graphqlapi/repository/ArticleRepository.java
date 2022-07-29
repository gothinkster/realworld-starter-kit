package com.realworld.graphqlapi.repository;

import com.realworld.graphqlapi.model.Article;

import java.util.UUID;

public interface ArticleRepository {
    Iterable<Article> getAllArticles();

    Article getById(UUID id);
}
