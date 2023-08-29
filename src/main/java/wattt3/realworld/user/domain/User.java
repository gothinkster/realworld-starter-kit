package wattt3.realworld.user.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Comment;
import org.springframework.util.Assert;

@Getter
@Entity
@Table(name = "users")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Comment("유저")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "email", nullable = false, unique = true)
    @Comment("이메일")
    private String email;
    @Column(name = "username", nullable = false, unique = true)
    @Comment("유저명")
    private String username;
    @Column(name = "password", nullable = false)
    @Comment("비밀번호")
    private String password;
    @Column(name = "bio")
    @Comment("약력")
    private String bio;
    @Column(name = "image")
    @Comment("이미지")
    private String image;

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

}
