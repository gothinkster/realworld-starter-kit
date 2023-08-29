package wattt3.realworld.domain.user;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

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

}
