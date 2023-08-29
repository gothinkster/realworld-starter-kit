package wattt3.realworld.domain.user;

import static org.assertj.core.api.Assertions.assertThat;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.util.Assert;

public class UserServiceTest {

    private UserService userService;
    private UserRepository userRepository;

    @BeforeEach
    void setUp() {
        userRepository = new UserRepository();
        userService = new UserService(userRepository);
    }

    @Test
    @DisplayName("유저 등록(회원가입)")
    void registerUser() {
        UserRegisterRequest request = new UserRegisterRequest("email@email.com", "username",
            "password");

        userService.register(request);
        assertThat(userRepository.findAll().size()).isEqualTo(1);
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

    public class UserService {

        private final UserRepository userRepository;

        public UserService(UserRepository userRepository) {
            this.userRepository = userRepository;
        }

        public void register(UserRegisterRequest request) {
            User user = request.toDomain();
            userRepository.save(user);
        }
    }

    private class UserRepository {

        private final Map<Long, User> users = new HashMap<>();
        private Long sequence = 1L;

        public void save(final User user) {
            user.assignId(sequence);
            sequence++;
            users.put(user.getId(), user);
        }

        public List<User> findAll() {
            return new ArrayList<>(users.values());
        }

    }
}
