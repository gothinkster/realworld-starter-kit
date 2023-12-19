package io.realworld.db.mapper;

import io.realworld.core.model.User;
import org.jdbi.v3.core.mapper.RowMapper;
import org.jdbi.v3.core.statement.StatementContext;

import java.sql.ResultSet;
import java.sql.SQLException;

public class UserMapper implements RowMapper<User> {
    @Override
    public User map(final ResultSet rs, final StatementContext ctx) throws SQLException {
        return new User(rs.getLong("ID"),
                rs.getString("EMAIL"),
                rs.getString("USERNAME"),
                rs.getString("BIO"),
                rs.getString("IMAGE"),
                rs.getString("PASSWORD"));
    }
}
