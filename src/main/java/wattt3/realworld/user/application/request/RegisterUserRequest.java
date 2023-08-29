package wattt3.realworld.user.application.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import wattt3.realworld.user.domain.User;

public record RegisterUserRequest(
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
