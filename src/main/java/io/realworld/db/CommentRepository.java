package io.realworld.db;

import io.realworld.api.response.Comment;
import io.realworld.db.mapper.CommentMapper;
import org.jdbi.v3.sqlobject.config.RegisterRowMapper;
import org.jdbi.v3.sqlobject.customizer.Bind;
import org.jdbi.v3.sqlobject.statement.GetGeneratedKeys;
import org.jdbi.v3.sqlobject.statement.SqlQuery;
import org.jdbi.v3.sqlobject.statement.SqlUpdate;

import java.util.List;

public interface CommentRepository {
    @SqlUpdate("DELETE FROM comments WHERE ID = :id")
    void deleteComment(String slug, @Bind("id") long commentId);

    @GetGeneratedKeys
    @SqlUpdate("INSERT INTO comments (BODY, ARTICLE_ID, AUTHOR_ID, CREATED_AT, UPDATED_AT) " +
            "VALUES (:body, :articleId, :authorId, current_timestamp, current_timestamp)")
    long saveComment(@Bind("authorId") Long userId, @Bind("articleId") Long articleId, @Bind("body") String body);

    @SqlQuery("SELECT comments.*, users.USERNAME, users.BIO, users.IMAGE " +
            "FROM comments INNER JOIN users ON comments.AUTHOR_ID = users.ID " +
            "WHERE comments.ID = :commentId")
    @RegisterRowMapper(CommentMapper.class)
    Comment findCommentById(@Bind("commentId") long commentId);

    @SqlQuery("SELECT comments.*, users.USERNAME, users.BIO, users.IMAGE FROM comments " +
            "INNER JOIN users ON comments.AUTHOR_ID = users.ID " +
            "INNER JOIN articles ON comments.ARTICLE_ID = articles.ID " +
            "WHERE articles.SLUG = :slug")
    @RegisterRowMapper(CommentMapper.class)
    List<Comment> findArticleComments(@Bind("slug") String slug);

    @SqlUpdate("DELETE FROM comments WHERE ARTICLE_ID in (SELECT distinct(ID) FROM articles WHERE SLUG = :slug)")
    void deleteArticleComments(@Bind("slug") String slug);
}