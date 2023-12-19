package io.realworld.db;

import io.realworld.core.model.Profile;
import io.realworld.core.model.User;
import io.realworld.db.mapper.ProfileMapper;
import io.realworld.db.mapper.UserMapper;
import org.jdbi.v3.sqlobject.config.RegisterRowMapper;
import org.jdbi.v3.sqlobject.customizer.Bind;
import org.jdbi.v3.sqlobject.customizer.BindList;
import org.jdbi.v3.sqlobject.statement.GetGeneratedKeys;
import org.jdbi.v3.sqlobject.statement.SqlQuery;
import org.jdbi.v3.sqlobject.statement.SqlUpdate;

import java.util.Collection;
import java.util.Set;

public interface UserRepository {
    @SqlQuery("SELECT * FROM users WHERE USERNAME = :username")
    @RegisterRowMapper(ProfileMapper.class)
    Profile findProfileByUsername(@Bind("username") String username);

    @SqlQuery("SELECT ID FROM users WHERE USERNAME = :username")
    Long findUserIdByUsername(@Bind("username") String username);

    @SqlQuery("SELECT ID FROM users WHERE EMAIL = :email")
    Long findUserIdByEmail(@Bind("email") String email);

    @SqlQuery("SELECT * FROM users WHERE USERNAME = :username")
    @RegisterRowMapper(UserMapper.class)
    User findUserByUsername(@Bind("username") String username);

    @SqlQuery("SELECT * FROM users WHERE EMAIL = :email")
    @RegisterRowMapper(UserMapper.class)
    User findUserByEmail(@Bind("email") String email);

    @SqlUpdate("INSERT INTO followers (USER_ID, FOLLOWER_ID, CREATED_AT) " +
            "VALUES (:followed, :follower, current_timestamp)")
    void followProfile(@Bind("followed") Long followedId, @Bind("follower") Long followerId);

    @SqlUpdate("DELETE FROM followers where FOLLOWER_ID = :follower AND USER_ID = :followed")
    void unfollowProfile(@Bind("followed") Long followedId, @Bind("follower") Long followerId);

    @SqlQuery("SELECT EXISTS (SELECT * FROM followers WHERE FOLLOWER_ID = :follower AND USER_ID = :followed)")
    boolean isFollowing(@Bind("followed") Long followedId, @Bind("follower") Long followerId);

    @SqlQuery("SELECT EXISTS (SELECT * FROM followers f " +
            "INNER JOIN users u on f.FOLLOWER_ID = u.ID " +
            "WHERE f.USER_ID = :followed AND u.USERNAME = :follower)")
    boolean isFollowing(@Bind("followed") Long followedId, @Bind("follower") String followerUsername);

    @SqlQuery("SELECT u2.USERNAME FROM followers f " +
            "INNER JOIN users u1 on f.FOLLOWER_ID = u1.ID " +
            "INNER JOIN users u2 on f.USER_ID = u2.ID " +
            "WHERE u1.USERNAME = :follower AND u2.USERNAME in (<authors>)")
    Set<String> findFollowedAuthorUsernames(@BindList("authors") Collection<String> authors, @Bind("follower") String username);

    @GetGeneratedKeys
    @SqlUpdate("INSERT INTO users (USERNAME, EMAIL, PASSWORD, CREATED_AT, UPDATED_AT) " +
            "VALUES (:username, :email, :password, current_timestamp, current_timestamp)")
    long save(@Bind("username") String username,
              @Bind("email") String email,
              @Bind("password") String password);

    @SqlQuery("SELECT * FROM users WHERE ID = :id")
    @RegisterRowMapper(UserMapper.class)
    User findUserById(@Bind("id") long id);

    @SqlUpdate("UPDATE users SET " +
            "USERNAME = :username, " +
            "EMAIL = :email, " +
            "PASSWORD = :password, " +
            "IMAGE = :image, " +
            "BIO = :bio, " +
            "UPDATED_AT = current_timestamp " +
            "WHERE ID = :id")
    void updateUser(@Bind("id") Long id,
                    @Bind("username") String username,
                    @Bind("email") String email,
                    @Bind("password") String password,
                    @Bind("image") String image,
                    @Bind("bio") String bio);
}
