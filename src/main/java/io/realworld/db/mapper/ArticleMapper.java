package io.realworld.db.mapper;


import io.realworld.core.model.Article;
import io.realworld.core.model.Profile;
import org.jdbi.v3.core.mapper.RowMapper;
import org.jdbi.v3.core.statement.StatementContext;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

public class ArticleMapper implements RowMapper<Article> {

    @Override
    public Article map(final ResultSet rs, final StatementContext ctx) throws SQLException {
        return new Article(rs.getLong("ID"),
                rs.getString("SLUG"),
                rs.getString("TITLE"),
                rs.getString("DESCRIPTION"),
                rs.getString("BODY"),
                rs.getInt("FAVORITES_COUNT"),
                toInstant(rs, "CREATED_AT"),
                toInstant(rs, "UPDATED_AT"),
                toProfile(rs));
    }

    private Profile toProfile(final ResultSet rs) throws SQLException {
        return new Profile(rs.getLong("ID"),
                rs.getString("USERNAME"),
                rs.getString("BIO"),
                rs.getString("IMAGE"));
    }

    private Instant toInstant(final ResultSet rs, final String dateColumn) throws SQLException {
        final LocalDateTime date = rs.getObject(dateColumn, LocalDateTime.class);
        return date == null ? null : date.toInstant(ZoneOffset.UTC);
    }
}

