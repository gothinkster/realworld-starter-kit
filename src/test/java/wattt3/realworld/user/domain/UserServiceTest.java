package wattt3.realworld.user.domain;

import static org.assertj.core.api.Assertions.assertThat;

import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import wattt3.realworld.user.application.request.RegisterUserRequest;
import wattt3.realworld.user.infra.UserRepository;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@Transactional
public class UserServiceTest {

    @LocalServerPort
    private int port;
    @Autowired
    private UserRepository userRepository;

    @BeforeEach
    void setUp() {
        if (RestAssured.port == RestAssured.UNDEFINED_PORT) {
            RestAssured.port = port;
        }
    }

    @Test
    @DisplayName("유저 등록(회원가입)")
    void registerUser() {
        RegisterUserRequest request = new RegisterUserRequest("email@email.com", "username",
            "password");

        RestAssured.given().log().all()
            .contentType(ContentType.JSON)
            .body(request)
            .when()
            .post("/users")
            .then().log().all()
            .statusCode(HttpStatus.CREATED.value());

        assertThat(userRepository.findAll()).hasSize(1);
    }

}
