package com.realworld.graphqlapi.resolver;


import com.realworld.graphqlapi.exceptions.AuthorIsNotPresentException;
import com.realworld.graphqlapi.model.Article;
import com.realworld.graphqlapi.repository.ArticleRepository;

import graphql.execution.DataFetcherResult;
import graphql.kickstart.tools.GraphQLQueryResolver;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Component
public class ArticleResolver implements GraphQLQueryResolver {
    private final ArticleRepository articleRepository;

    public ArticleResolver(ArticleRepository articleRepository) {
        this.articleRepository = articleRepository;
    }

    public List<Article> findArticleByIds(List<UUID> ids) {
        return ids.stream().map(articleRepository::getById).collect(Collectors.toList());
    }

    public Article findArticleByIdWithAuthor(UUID id) {
        return articleRepository.findArticleByIdWithAuthor(id);
    }

    public DataFetcherResult<List<Article>> findArticleByIdsWithAuthor(List<UUID> ids) {
        List<Article> responseData = new ArrayList<>();
        Map<String, Object> failData = new HashMap<>();
        for (UUID id : ids) {
            try {
                responseData.add(articleRepository.findArticleByIdWithAuthor(id));
            } catch (AuthorIsNotPresentException e) {
                failData.put("id", id);
            }
        }

        return DataFetcherResult.<List<Article>>newResult()
                .data(responseData)
                .error(new AuthorIsNotPresentException("failed to get author for ids:", failData))
                .build();
    }

    public Article articleById(UUID id) {
        return articleRepository.getById(id);
    }

    public List<Article> articlesByAuthor(UUID id) {
        return StreamSupport.stream(articleRepository.getAllArticles().spliterator(), false)
                .filter(article ->
                        article.getAuthor().getId().equals(id))
                .collect(Collectors.toList());
    }

    public Iterable<Article> articles(){
        return articleRepository.getAllArticles();
    }

}
