package io.realworld.db.mapper;

import io.realworld.api.response.Comment;
import io.realworld.api.response.Profile;
import org.jdbi.v3.core.mapper.RowMapper;
import org.jdbi.v3.core.statement.StatementContext;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

public class CommentMapper implements RowMapper<Comment> {
    @Override
    public Comment map(final ResultSet rs, final StatementContext ctx) throws SQLException {
        final Profile author = author(rs);
        final Comment comment = new Comment();
        comment.setId(rs.getLong("ID"));
        comment.setAuthor(author);
        comment.setBody(rs.getString("BODY"));
        comment.setCreatedAt(toInstant(rs, "CREATED_AT"));
        comment.setUpdatedAt(toInstant(rs, "UPDATED_AT"));
        return comment;
    }

    private Profile author(final ResultSet rs) throws SQLException {
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
