package io.realworld.db.mapper;

import io.realworld.api.response.User;
import org.jdbi.v3.core.mapper.RowMapper;
import org.jdbi.v3.core.statement.StatementContext;

import java.sql.ResultSet;
import java.sql.SQLException;

public class UserMapper implements RowMapper<User> {
    @Override
    public User map(final ResultSet rs, final StatementContext ctx) throws SQLException {
        final User user = new User();
        user.setId(rs.getLong("ID"));
        user.setUsername(rs.getString("USERNAME"));
        user.setEmail(rs.getString("EMAIL"));
        user.setBio(rs.getString("BIO"));
        user.setImage(rs.getString("IMAGE"));
        user.setPassword(rs.getString("PASSWORD"));
        return user;
    }
}
