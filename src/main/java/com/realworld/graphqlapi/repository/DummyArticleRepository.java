package com.realworld.graphqlapi.repository;

import com.realworld.graphqlapi.exceptions.AuthorIsNotPresentException;
import com.realworld.graphqlapi.model.Article;
import com.realworld.graphqlapi.model.NewsArticle;
import com.realworld.graphqlapi.model.StaticImageArticle;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

public class DummyArticleRepository implements ArticleRepository {

    private final List<Article> articles;

    public DummyArticleRepository(AuthorRepository authors) {
        articles = Arrays.asList(
            new NewsArticle(new UUID(1L, 2L), "article-1", "desc1", authors.getById(new UUID(1L, 2L)), "date1"),
            new NewsArticle(new UUID(1L, 3L), "article-2", "desc2", authors.getById(new UUID(1L, 3L)), "date2"),
            new NewsArticle(new UUID(1L, 4L), "article-3", "desc3", authors.getById(new UUID(1L, 4L)), "date3"),
            new NewsArticle(new UUID(1L, 5L), "article-4", "desc4", authors.getById(new UUID(1L, 5L)), "date4"),
            new NewsArticle(new UUID(1L, 6L), "article-55", "desc55", null, "date5"),
            new StaticImageArticle(new UUID(1L, 7L), "https://pictures/static-logo.jpg", authors.getById(new UUID(1L, 2L)))
        );
    }

    @Override
    public Iterable<Article> getAllArticles() {
        return articles;
    }

    @Override
    public Article getById(UUID id) {
        return articles.stream().filter(a -> id.equals(a.getId())).findFirst().orElse(null);
    }

    @Override
    public Article findArticleByIdWithAuthor(UUID id) {
        Article article = getById(id);

        if (article.getAuthor() == null) {
            Map<String, Object> params = new HashMap<>();
            params.put("articleId", id);
            throw new AuthorIsNotPresentException("Author is null for " + id, params);
        }
        return article;
    }
}
