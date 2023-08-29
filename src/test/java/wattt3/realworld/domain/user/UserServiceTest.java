package wattt3.realworld.domain.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

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
        @NotBlank(message = "비밀번호는 필수입니다.")
        String password) {

    }

    public class UserService {

        public void register(UserRegisterRequest request) {
        }
    }

}
