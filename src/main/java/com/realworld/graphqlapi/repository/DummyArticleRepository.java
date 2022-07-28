package com.realworld.graphqlapi.repository;

import com.realworld.graphqlapi.model.Article;

import java.util.Arrays;
import java.util.List;

public class DummyArticleRepository implements ArticleRepository {

    private final List<Article> articles;

    public DummyArticleRepository(AuthorRepository authors) {
        articles = Arrays.asList(
            new Article("1", "article-1", "desc1", authors.getById("1"), "date1"),
            new Article("2", "article-2", "desc2", authors.getById("2"), "date2"),
            new Article("3", "article-3", "desc3", authors.getById("3"), "date3"),
            new Article("4", "article-4", "desc4", authors.getById("4"), "date4"),
            new Article("5", "article-55", "desc55", authors.getById("1"), "date5")
        );
    }

    @Override
    public Iterable<Article> getAllArticles() {
        return articles;
    }

    @Override
    public Article getById(String id) {
        return articles.stream().filter(a -> id.equals(a.getId())).findFirst().orElse(null);
    }
}
