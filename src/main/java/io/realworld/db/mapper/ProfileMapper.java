package io.realworld.db.mapper;

import io.realworld.core.model.Profile;
import org.jdbi.v3.core.mapper.RowMapper;
import org.jdbi.v3.core.statement.StatementContext;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ProfileMapper implements RowMapper<Profile> {
    @Override
    public Profile map(final ResultSet rs, final StatementContext ctx) throws SQLException {
        return new Profile(rs.getLong("ID"),
                rs.getString("USERNAME"),
                rs.getString("BIO"),
                rs.getString("IMAGE"));
    }
}
