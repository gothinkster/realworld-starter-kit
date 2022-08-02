package com.realworld.graphqlapi.connection;

import com.realworld.graphqlapi.model.Article;
import graphql.relay.ConnectionCursor;
import graphql.relay.DefaultConnectionCursor;
import graphql.relay.Edge;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.List;
import java.util.UUID;

@Component
public class ConnectionCursorUtil {

    public ConnectionCursor from(Article article) {
        return new DefaultConnectionCursor(
            Base64.getEncoder().encodeToString(article.getId().toString().getBytes(StandardCharsets.UTF_8)));
    }

    public UUID getIdByCursor(String cursor) {
        return UUID.fromString(new String(Base64.getDecoder().decode(cursor)));
    }

    public <T> ConnectionCursor getStartCursor(List<Edge<T>> edjes) {
        return edjes.isEmpty() ? null : edjes.get(0).getCursor();
    }

    public <T> ConnectionCursor getEndCursor(List<Edge<T>> edjes) {
        return edjes.isEmpty() ? null : edjes.get(edjes.size() - 1).getCursor();
    }
}
