package com.realworld.graphqlapi.resolver;


import com.realworld.graphqlapi.connection.ConnectionCursorUtil;
import com.realworld.graphqlapi.model.Article;
import com.realworld.graphqlapi.repository.ArticleRepository;
import graphql.kickstart.tools.GraphQLQueryResolver;
import graphql.relay.Connection;
import graphql.relay.ConnectionCursor;
import graphql.relay.DefaultConnection;
import graphql.relay.DefaultEdge;
import graphql.relay.DefaultPageInfo;
import graphql.relay.Edge;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class ArticleResolver implements GraphQLQueryResolver {
    private final ArticleRepository articleRepository;
    private final ConnectionCursorUtil cursorUtil;

    public List<Article> findArticleByIds(List<UUID> ids) {
        return ids.stream().map(articleRepository::getById).collect(Collectors.toList());
    }

    public Article findArticleByIdWithAuthor(UUID id) {
        return articleRepository.findArticleByIdWithAuthor(id);
    }

    public List<Article> findArticleByIdsWithAuthor(List<UUID> ids) {
        return ids.stream().map(articleRepository::findArticleByIdWithAuthor).collect(Collectors.toList());
    }

    public Article articleById(UUID id) {
        return articleRepository.getById(id);
    }

    public List<Article> articlesByAuthor(UUID id) {
        return articleRepository.getAllArticles().stream()
            .filter(article ->
                article.getAuthor().getId().equals(id))
            .collect(Collectors.toList());
    }

    public List<Article> allArticles() {
        return articleRepository.getAllArticles();
    }

    public Connection<Article> articles(int first, @Nullable String cursor) {
        List<Article> articles = cursor == null ? articleRepository.getAllArticles()
            : articleRepository.getAfter(cursorUtil.getIdByCursor(cursor));

        List<Edge<Article>> edges = articles
            .stream()
            .map(article -> new DefaultEdge<>(article, cursorUtil.from(article)))
            .limit(first)
            .collect(Collectors.toUnmodifiableList());

        ConnectionCursor startCursor = cursorUtil.getStartCursor(edges);
        ConnectionCursor endCursor = cursorUtil.getEndCursor(edges);

        return new DefaultConnection<>(
            edges,
            new DefaultPageInfo(
                startCursor,
                endCursor,
                cursor != null,
                edges.size() >= first));
    }
}
