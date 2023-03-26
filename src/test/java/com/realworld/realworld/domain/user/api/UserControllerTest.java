package com.realworld.realworld.domain.user.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.realworld.realworld.domain.user.dto.UserLoginRequestDto;
import com.realworld.realworld.domain.user.dto.UserRegisterRequestDto;
import com.realworld.realworld.domain.user.dto.UserUpdateRequestDto;
import com.realworld.realworld.domain.user.repository.UserRepository;
import com.realworld.realworld.domain.user.service.UserService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.test.context.support.WithAnonymousUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ObjectMapper objectMapper;

    @Nested
    @DisplayName("회원가입 테스트")
    class Register_test {

        @Test
        @DisplayName("유효한 회원 정보 입력 시 200(ok) 반환")
        void register_test01() throws Exception {
            String email = "aaa@gmail.com";
            String username = "사용자A";
            UserRegisterRequestDto requestDto = UserRegisterRequestDto.builder()
                    .email(email)
                    .password("aaa")
                    .username(username)
                    .build();

            mockMvc.perform(post("/api/users")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(requestDto)))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.user.username").value(username));
        }

        @ParameterizedTest
        @DisplayName("이메일이 유효하지 않으면 400(BadRequest) 에러 반환")
        @ValueSource(strings = {"", " ", "aa", "aa@", "aa@.", "aaa@m.."})
        void register_test02(String requestDtoEmail) throws Exception {
            UserRegisterRequestDto requestDto = UserRegisterRequestDto.builder()
                    .email(requestDtoEmail)
                    .password("aaa")
                    .username("사용자A")
                    .build();

            mockMvc.perform(post("/api/users")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(requestDto)))
                    .andExpect(status().isBadRequest());
        }

        @ParameterizedTest
        @DisplayName("비밀번호가 유효하지 않으면 400(BadRequest) 에러 반환")
        @ValueSource(strings = {"", " "})
        void register_test03(String requestDtoPassword) throws Exception {
            UserRegisterRequestDto requestDto = UserRegisterRequestDto.builder()
                    .email("aaa@gmail.com")
                    .password(requestDtoPassword)
                    .username("사용자A")
                    .build();

            mockMvc.perform(post("/api/users")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(requestDto)))
                    .andExpect(status().isBadRequest());
        }

        @ParameterizedTest
        @DisplayName("사용자 이름이 유효하지 않으면 400(BadRequest) 에러 반환")
        @ValueSource(strings = {"", " "})
        void register_test04(String requestDtoUsername) throws Exception {
            UserRegisterRequestDto requestDto = UserRegisterRequestDto.builder()
                    .email("aaa@gmail.com")
                    .password("bbb")
                    .username(requestDtoUsername)
                    .build();

            mockMvc.perform(post("/api/users")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(requestDto)))
                    .andExpect(status().isBadRequest());
        }
    }

    @Nested
    @DisplayName("로그인 테스트")
    class Login_test {

        @Test
        @DisplayName("로그인 성공 시 토큰과 사용자 정보를 반환")
        void login_test01() throws Exception {
            String email = "aaa@gmail.com";
            String password = "aaa";
            String username = "사용자a";
            userService.registerUser(new UserRegisterRequestDto(email, password, username));
            UserLoginRequestDto requestDto = UserLoginRequestDto.builder()
                    .email(email)
                    .password(password)
                    .build();

            mockMvc.perform(post("/api/users/login")
                            .contentType(MediaType.APPLICATION_JSON)
                            .characterEncoding("utf-8")
                            .content(objectMapper.writeValueAsString(requestDto)))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.user.email").value(email))
                    .andExpect(jsonPath("$.user.username").value(username))
                    .andExpect(jsonPath("$.user.token").isNotEmpty());
        }

        @Test
        @DisplayName("아이디 불일치 시 401(Unauthorized) 에러 반환")
        void login_test02() throws Exception {
            String email = "aaa@gmail.com";
            String password = "aaa";
            userService.registerUser(new UserRegisterRequestDto(email, password, "사용자a"));

            UserLoginRequestDto requestDto = UserLoginRequestDto.builder()
                    .email("aaaa@gmail.com")
                    .password(password)
                    .build();

            mockMvc.perform(post("/api/users/login")
                            .contentType(MediaType.APPLICATION_JSON)
                            .characterEncoding("utf-8")
                            .content(objectMapper.writeValueAsString(requestDto)))
                    .andExpect(status().isUnauthorized());
        }

        @Test
        @DisplayName("비밀번호 불일치 시 401(Unauthorized) 에러 반환")
        void login_test03() throws Exception {
            String email = "aaa@gmail.com";
            String password = "aaa";
            userService.registerUser(new UserRegisterRequestDto(email, password, "사용자a"));

            UserLoginRequestDto requestDto = UserLoginRequestDto.builder()
                    .email(email)
                    .password("bbb")
                    .build();

            mockMvc.perform(post("/api/users/login")
                            .contentType(MediaType.APPLICATION_JSON)
                            .characterEncoding("utf-8")
                            .content(objectMapper.writeValueAsString(requestDto)))
                    .andExpect(status().isUnauthorized());
        }
    }

    @Nested
    @DisplayName("회원 조회 테스트")
    class findUser_test {

        private final TestUserDetailService userDetailService = new TestUserDetailService(userRepository);
        private UserDetails userDetails;

        @Test
        @DisplayName("회원 조회 성공 시 사용자 정보 반환")
        void findUser_test01() throws Exception {
            Long userId = userService.registerUser(new UserRegisterRequestDto("aaa@gmail.com", "aaa", "사용자A"));
            userDetails = userDetailService.loadUserByUsername(String.valueOf(userId));

            mockMvc.perform(get("/api/user").with(user(userDetails)))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.user.email").value("aaa@gmail.com"))
                    .andExpect(jsonPath("$.user.username").value("사용자A"));
        }

        @Test
        @DisplayName("회원 조회 실패 시 403(Forbidden) 에러 반환")
        @WithAnonymousUser
        void findUser_test03() throws Exception {
            mockMvc.perform(get("/api/user"))
                    .andExpect(status().isForbidden());
        }
    }

    @Nested
    @DisplayName("회원 수정 테스트")
    class UpdateUser_test {

        private final TestUserDetailService userDetailService = new TestUserDetailService(userRepository);
        private UserDetails userDetails;

        @Test
        @DisplayName("회원 수정 성공 시 사용자 정보 반환")
        void UpdateUser_test01() throws Exception {
            Long userId = userService.registerUser(new UserRegisterRequestDto("aaa@gmail.com", "aaa", "사용자A"));
            userDetails = userDetailService.loadUserByUsername(String.valueOf(userId));

            UserUpdateRequestDto requestDto = UserUpdateRequestDto.builder()
                    .username("사용자b")
                    .bio("bbb bio")
                    .image("bbb image")
                    .build();

            mockMvc.perform(put("/api/user").with(user(userDetails))
                            .contentType(MediaType.APPLICATION_JSON)
                            .characterEncoding("utf-8")
                            .content(objectMapper.writeValueAsString(requestDto)))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.user.username").value("사용자b"))
                    .andExpect(jsonPath("$.user.bio").value("bbb bio"))
                    .andExpect(jsonPath("$.user.image").value("bbb image"));
        }

    }
}