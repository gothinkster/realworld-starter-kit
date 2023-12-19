package io.realworld.db;

import com.codahale.metrics.annotation.Timed;
import io.realworld.core.model.Article;
import io.realworld.db.mapper.ArticleMapper;
import org.jdbi.v3.sqlobject.config.RegisterRowMapper;
import org.jdbi.v3.sqlobject.customizer.Bind;
import org.jdbi.v3.sqlobject.customizer.BindList;
import org.jdbi.v3.sqlobject.statement.GetGeneratedKeys;
import org.jdbi.v3.sqlobject.statement.SqlQuery;
import org.jdbi.v3.sqlobject.statement.SqlUpdate;

import java.util.List;
import java.util.Set;

@Timed
public interface ArticleRepository {

    @SqlQuery("SELECT articles.*, users.USERNAME, users.BIO, users.IMAGE " +
            "FROM articles INNER JOIN users ON articles.AUTHOR_ID = users.ID " +
            "WHERE slug = :slug")
    @RegisterRowMapper(ArticleMapper.class)
    Article findArticle(@Bind("slug") String slug);

    @SqlQuery("SELECT ID FROM articles WHERE SLUG = :slug")
    Long findArticleIdBySlug(@Bind("slug") String slug);

    @SqlQuery("SELECT articles.*, users.USERNAME, users.BIO, users.IMAGE " +
            "FROM articles INNER JOIN users ON articles.AUTHOR_ID = users.ID " +
            "WHERE articles.ID = :articleId")
    @RegisterRowMapper(ArticleMapper.class)
    Article findArticleById(@Bind("articleId") long articleId);

    @GetGeneratedKeys
    @SqlUpdate("INSERT INTO articles (TITLE, DESCRIPTION, BODY, SLUG, AUTHOR_ID, CREATED_AT, UPDATED_AT) " +
            "VALUES (:title, :description, :body, :slug, :authorId, current_timestamp, current_timestamp)")
    Long saveArticle(@Bind("authorId") Long authorId,
                     @Bind("slug") String slug,
                     @Bind("title") String title,
                     @Bind("description") String description,
                     @Bind("body") String body);

    @SqlUpdate("UPDATE articles set " +
            "SLUG = :slug, " +
            "TITLE = :title, " +
            "DESCRIPTION = :description, " +
            "BODY = :body, " +
            "UPDATED_AT = current_timestamp " +
            "WHERE ID = :id")
    void updateArticle(@Bind("id") Long id,
                       @Bind("slug") String slug,
                       @Bind("title") String title,
                       @Bind("description") String description,
                       @Bind("body") String body);

    @SqlQuery("SELECT distinct(articles.ID), articles.*, users.USERNAME, users.BIO, users.IMAGE FROM articles " +
            "LEFT JOIN articles_tags ON articles.ID = articles_tags.ARTICLE_ID " +
            "LEFT JOIN tags ON tags.ID = articles_tags.TAG_ID " +
            "LEFT JOIN users ON articles.AUTHOR_ID = users.ID " +
            "LEFT JOIN favorites ON articles.ID = favorites.ARTICLE_ID " +
            "WHERE (:author IS NULL OR users.USERNAME=:author) " +
            "AND (:tag IS NULL OR tags.NAME =:tag) " +
            "AND (:favoritedBy IS NULL OR :favoritedBy = favorites.USER_ID) " +
            "ORDER BY articles.CREATED_AT DESC " +
            "LIMIT :limit " +
            "OFFSET :offset")
    @RegisterRowMapper(ArticleMapper.class)
    List<Article> findArticles(@Bind("author") String author,
                               @Bind("tag") String tag,
                               @Bind("favoritedBy") Long favoritedBy,
                               @Bind("offset") int offset,
                               @Bind("limit") int limit);

    @SqlQuery("SELECT count(distinct articles.ID) FROM articles " +
            "LEFT JOIN articles_tags ON articles.ID = articles_tags.ARTICLE_ID " +
            "LEFT JOIN tags ON tags.ID = articles_tags.TAG_ID " +
            "LEFT JOIN users ON articles.AUTHOR_ID = users.ID " +
            "LEFT JOIN favorites ON articles.ID = favorites.ARTICLE_ID " +
            "WHERE (:author IS NULL OR users.USERNAME=:author)" +
            "AND (:tag IS NULL OR tags.NAME =:tag) " +
            "AND (:favoritedBy IS NULL OR :favoritedBy = favorites.USER_ID)")
    int countArticles(@Bind("author") String author, @Bind("tag") String tag, @Bind("favoritedBy") Long favoritedBy);


    @SqlUpdate("DELETE FROM articles WHERE SLUG = :slug")
    void deleteArticle(@Bind("slug") String slug);

    @SqlUpdate("INSERT INTO favorites (USER_ID, ARTICLE_ID) VALUES (:userId, :articleId)")
    void addToFavorites(@Bind("userId") Long userId, @Bind("articleId") Long articleId);

    @SqlUpdate("DELETE FROM favorites where USER_ID = :userId and ARTICLE_ID = :articleId")
    void removeFromFavorites(@Bind("userId") Long userId, @Bind("articleId") Long articleId);

    @SqlQuery("SELECT distinct(articles.id), articles.*, u.USERNAME, u.BIO, u.IMAGE FROM articles " +
            "INNER JOIN users u ON articles.AUTHOR_ID = u.ID " +
            "INNER JOIN followers f ON articles.AUTHOR_ID = f.USER_ID " +
            "INNER JOIN users u1 ON f.FOLLOWER_ID = u1.ID " +
            "WHERE u1.USERNAME = :username " +
            "ORDER BY articles.CREATED_AT DESC " +
            "LIMIT :limit " +
            "OFFSET :offset")
    @RegisterRowMapper(ArticleMapper.class)
    List<Article> findArticlesOfAuthors(@Bind("username") String username,
                                        @Bind("offset") int offset,
                                        @Bind("limit") int limit);

    @SqlQuery("SELECT count(distinct articles.id) FROM articles " +
            "INNER JOIN users u ON articles.AUTHOR_ID = u.ID " +
            "INNER JOIN followers f ON articles.AUTHOR_ID = f.USER_ID " +
            "INNER JOIN users u1 ON f.FOLLOWER_ID = u1.ID " +
            "WHERE u1.USERNAME = :username ")
    int countFeedSize(@Bind("username") String username);

    @SqlUpdate("UPDATE articles SET FAVORITES_COUNT = FAVORITES_COUNT + 1 where ID = :articleId")
    void incrementFavoritesCount(@Bind("articleId") Long articleId);

    @SqlUpdate("UPDATE articles SET FAVORITES_COUNT = FAVORITES_COUNT - 1 where ID = :articleId")
    void decrementFavoritesCount(@Bind("articleId") Long articleId);

    @SqlQuery("SELECT ARTICLE_ID FROM favorites " +
            "INNER JOIN users on users.ID = favorites.USER_ID " +
            "WHERE users.USERNAME = :username " +
            "AND ARTICLE_ID in (<articleIds>)")
    Set<Long> findFavoriteArticles(@Bind("username") String username,
                                   @BindList("articleIds") Set<Long> articleIds);

}