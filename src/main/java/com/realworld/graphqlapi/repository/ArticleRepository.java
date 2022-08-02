package com.realworld.graphqlapi.repository;

import com.realworld.graphqlapi.model.Article;

import java.util.List;
import java.util.UUID;

public interface ArticleRepository {
    List<Article> getAllArticles();

    Article getById(UUID id);

    Article findArticleByIdWithAuthor(UUID id);

    List<Article> getAfter(UUID id);
}
