package io.realworld.db.mapper;


import io.realworld.core.model.ArticleIdTag;
import org.jdbi.v3.core.mapper.RowMapper;
import org.jdbi.v3.core.statement.StatementContext;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ArticleTagsMapper implements RowMapper<ArticleIdTag> {

    @Override
    public ArticleIdTag map(final ResultSet rs, final StatementContext ctx) throws SQLException {
        return new ArticleIdTag(rs.getLong("ARTICLE_ID"),
                rs.getString("NAME"));
    }


}
