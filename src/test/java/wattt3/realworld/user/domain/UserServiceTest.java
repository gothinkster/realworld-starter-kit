package wattt3.realworld.user.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.transaction.annotation.Transactional;
import wattt3.realworld.user.application.request.RegisterUserRequest;
import wattt3.realworld.user.application.service.UserService;
import wattt3.realworld.user.infra.UserRepository;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@Transactional
public class UserServiceTest {

    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;

    @Test
    @DisplayName("유저 등록(회원가입)")
    void registerUser() {
        RegisterUserRequest request = new RegisterUserRequest("email@email.com", "username",
            "password");

        userService.register(request);

        assertThat(userRepository.findAll().size()).isEqualTo(1);
    }

}
