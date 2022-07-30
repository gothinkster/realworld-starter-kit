package io.realworld.db.mapper;


import org.jdbi.v3.core.mapper.RowMapper;
import org.jdbi.v3.core.statement.StatementContext;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ArticleTagsMapper implements RowMapper<ArticleTagsMapper.ArticleIdTag> {

    @Override
    public ArticleIdTag map(final ResultSet rs, final StatementContext ctx) throws SQLException {
        final var tuple = new ArticleIdTag();
        tuple.setArticleId(rs.getLong("ARTICLE_ID"));
        tuple.setTag(rs.getString("NAME"));
        return tuple;
    }

    public static class ArticleIdTag {
        private Long articleId;
        private String tag;

        public Long getArticleId() {
            return articleId;
        }

        public void setArticleId(final Long articleId) {
            this.articleId = articleId;
        }

        public String getTag() {
            return tag;
        }

        public void setTag(final String tag) {
            this.tag = tag;
        }
    }
}
