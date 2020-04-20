package io.realworld.db.mapper;

import io.realworld.api.response.Profile;
import org.jdbi.v3.core.mapper.RowMapper;
import org.jdbi.v3.core.statement.StatementContext;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ProfileMapper implements RowMapper<Profile> {
    @Override
    public Profile map(final ResultSet rs, final StatementContext ctx) throws SQLException {
        final Profile profile = new Profile();
        profile.setId(rs.getLong("ID"));
        profile.setUsername(rs.getString("USERNAME"));
        profile.setBio(rs.getString("BIO"));
        profile.setImage(rs.getString("IMAGE"));
        return profile;
    }
}
