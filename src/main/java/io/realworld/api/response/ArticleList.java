package io.realworld.api.response;

import java.util.List;

public class ArticleList {
    private List<Article> articles;
    private int articlesCount;

    public List<Article> getArticles() {
        return articles;
    }

    public void setArticles(final List<Article> articles) {
        this.articles = articles;
    }

    public int getArticlesCount() {
        return articlesCount;
    }

    public void setArticlesCount(final int articlesCount) {
        this.articlesCount = articlesCount;
    }
}
