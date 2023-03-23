package com.realworld.realworld.domain.user.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.realworld.realworld.domain.user.dto.UserRegisterRequestDto;
import com.realworld.realworld.domain.user.repository.UserRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @DisplayName("유효한 회원 정보 입력 시 200 ok 반환")
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
                .andExpect(jsonPath("$.username").value(username));
    }

    @ParameterizedTest
    @DisplayName("이메일이 유효하지 않으면 400 에러 반환")
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
    @DisplayName("비밀번호가 유효하지 않으면 400 에러 반환")
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
    @DisplayName("사용자 이름이 유효하지 않으면 400 에러 반환")
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