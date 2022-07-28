package com.realworld.graphqlapi.repository;

import com.realworld.graphqlapi.model.Article;

public interface ArticleRepository {
    Iterable<Article> getAllArticles();

    Article getById(String id);
}
