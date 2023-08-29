package wattt3.realworld.domain.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.util.Assert;

public class UserServiceTest {

    private UserService userService;

    @BeforeEach
    void setUp() {
        userService = new UserService();
    }

    @Test
    @DisplayName("유저 등록(회원가입)")
    void registerUser() {
        UserRegisterRequest request = new UserRegisterRequest("email@email.com", "username",
            "password");

        userService.register(request);

    }

    public record UserRegisterRequest(
        @Email(message = "이메일 형식이 올바르지 않습니다.")
        String email,
        @NotBlank(message = "유저명은 필수입니다.")
        String username,
        @NotBlank(message = "패스워드는 필수입니다.")
        String password) {

        public User toDomain() {
            return new User(email, username, password, null, null);
        }
    }

    public static class User {

        private final String email;
        private final String username;
        private final String password;
        private final String bio;
        private final String image;

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

    public class UserService {

        public void register(UserRegisterRequest request) {
            User user = request.toDomain();
        }
    }
}
