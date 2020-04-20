package io.realworld.db.mapper;

import io.realworld.api.response.Article;
import io.realworld.api.response.Profile;
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
        final Article article = new Article();
        article.setId(rs.getLong("ID"));
        article.setSlug(rs.getString("SLUG"));
        article.setTitle(rs.getString("TITLE"));
        article.setDescription(rs.getString("DESCRIPTION"));
        article.setBody(rs.getString("BODY"));
        article.setFavoritesCount(rs.getInt("FAVORITES_COUNT"));
        article.setCreatedAt(toInstant(rs, "CREATED_AT"));
        article.setUpdatedAt(toInstant(rs, "UPDATED_AT"));
        final Profile profile = mapProfile(rs);
        article.setAuthor(profile);
        return article;
    }

    private Profile mapProfile(final ResultSet rs) throws SQLException {
        final Profile profile = new Profile();
        profile.setUsername(rs.getString("USERNAME"));
        profile.setBio(rs.getString("BIO"));
        profile.setImage(rs.getString("IMAGE"));
        return profile;
    }

    private Instant toInstant(final ResultSet rs, final String dateColumn) throws SQLException {
        final LocalDateTime date = rs.getObject(dateColumn, LocalDateTime.class);
        return date == null ? null : date.toInstant(ZoneOffset.UTC);
    }
}

