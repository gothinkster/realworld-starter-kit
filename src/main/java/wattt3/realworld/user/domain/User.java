package wattt3.realworld.user.domain;

import org.springframework.util.Assert;

public class User {

    private final String email;
    private final String username;
    private final String password;
    private final String bio;
    private final String image;
    private Long id;

    public User(String email, String username, String password, String bio, String image) {
        validateUser(email, username, password);
        this.email = email;
        this.username = username;
        this.password = password;
        this.bio = bio;
        this.image = image;
    }

    private void validateUser(String email, String username, String password) {
        Assert.hasText(email, "이메일은 필수입니다.");
        Assert.hasText(username, "유저명은 필수입니다.");
        Assert.hasText(password, "패스워드는 필수입니다.");
    }

    public Long getId() {
        return id;
    }

    public void assignId(Long id) {
        this.id = id;
    }
}
