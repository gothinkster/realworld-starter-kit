package io.realworld.db;

import io.realworld.core.model.ArticleIdTag;
import io.realworld.db.mapper.ArticleTagsMapper;
import org.jdbi.v3.sqlobject.config.RegisterRowMapper;
import org.jdbi.v3.sqlobject.customizer.Bind;
import org.jdbi.v3.sqlobject.customizer.BindList;
import org.jdbi.v3.sqlobject.statement.SqlBatch;
import org.jdbi.v3.sqlobject.statement.SqlQuery;
import org.jdbi.v3.sqlobject.statement.SqlUpdate;

import java.util.Collection;
import java.util.List;
import java.util.Set;

public interface TagRepository {
    @SqlQuery("SELECT NAME FROM tags")
    List<String> findAllTags();

    @SqlQuery("SELECT distinct(NAME) FROM tags WHERE NAME IN (<tags>)")
    Set<String> findTags(@BindList("tags") Collection<String> tags);

    @SqlBatch("INSERT INTO tags (NAME) VALUES (?)")
    void saveTags(Set<String> tags);

    @SqlBatch("INSERT INTO articles_tags (ARTICLE_ID, TAG_ID) " +
            "VALUES (?, (SELECT ID FROM tags WHERE name = ?)) " +
            "ON CONFLICT DO NOTHING")
    void addTagsToArticle(Collection<Long> articleIds, Collection<String> tag);

    @SqlUpdate("DELETE FROM articles_tags WHERE ARTICLE_ID = :articleId")
    void deleteArticleTags(@Bind("articleId") long articleId);

    @SqlUpdate("DELETE FROM articles_tags WHERE ARTICLE_ID in (SELECT distinct(ID) FROM articles WHERE SLUG = :slug)")
    void deleteArticleTags(@Bind("slug") String slug);

    @SqlQuery("SELECT at.ARTICLE_ID, t.NAME FROM articles_tags at " +
            "INNER JOIN tags t ON at.TAG_ID = t.ID " +
            "WHERE at.ARTICLE_ID in (<articleIds>)")
    @RegisterRowMapper(ArticleTagsMapper.class)
    List<ArticleIdTag> findArticlesTags(@BindList("articleIds") Collection<Long> articleIds);

}
