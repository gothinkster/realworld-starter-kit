package wattt3.realworld.user.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import wattt3.realworld.user.application.request.RegisterUserRequest;
import wattt3.realworld.user.application.service.UserService;
import wattt3.realworld.user.infra.UserRepository;

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
        RegisterUserRequest request = new RegisterUserRequest("email@email.com", "username",
            "password");

        userService.register(request);

        assertThat(userRepository.findAll().size()).isEqualTo(1);
    }

}
