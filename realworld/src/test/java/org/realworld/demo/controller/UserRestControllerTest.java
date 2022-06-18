package org.realworld.demo.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.realworld.demo.domain.User;
import org.realworld.demo.jwt.JwtUtil;
import org.realworld.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import javax.transaction.Transactional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

class UserRestControllerTest extends ControllerTest{

    private final ObjectMapper objectMapper = new ObjectMapper();

    @BeforeEach
    void setup(){
        userRepository.save(new User(email, password, username, "", ""));
    }


    @Test
    @DisplayName("[POST] /api/users/login")
    void apitest1() throws Exception {
        //Given
        ObjectNode node = objectMapper.createObjectNode();
        ObjectNode user = node.putObject("user");
        user.put("email", email);
        user.put("password", password);

        // When
        // Then
        mvc.perform(post("/api/users/login")
                        .content(node.toString())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.user.email").value(email))
                .andExpect(jsonPath("$.user.username").value(username))
                .andExpect(jsonPath("$.user.token").isNotEmpty())
                .andDo(print());
    }

    @Test
    @DisplayName("[POST] /api/users")
    void apitest2() throws Exception {
        //Given
        ObjectNode node = objectMapper.createObjectNode();
        ObjectNode user = node.putObject("user");
        user.put("username", "testuser");
        user.put("email", "testuser@email.com");
        user.put("password", "1111");

        // When
        // Then
        mvc.perform(post("/api/users")
                        .content(node.toString())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.user.email").value("testuser@email.com"))
                .andExpect(jsonPath("$.user.username").value("testuser"))
                .andExpect(jsonPath("$.user.token").isEmpty())
                .andDo(print());
    }

    @Test
    @DisplayName("[GET] /api/user")
    void apitest3() throws Exception {
        //Given
        String token = jwtUtil.createToken(email);

        // When
        // Then
        mvc.perform(get("/api/user").header("Authorization", "Bearer " + token))
                .andExpect(jsonPath("$.user.email").value(email))
                .andExpect(jsonPath("$.user.username").value(username))
                .andExpect(jsonPath("$.user.token").isNotEmpty())
                .andDo(print());
    }

    @Test
    @DisplayName("[PUT] /api/user")
    void apitest4() throws Exception {
        //Given
        String token = jwtUtil.createToken(email);

        ObjectNode node = objectMapper.createObjectNode();
        ObjectNode user = node.putObject("user");

        String updatedEmail = "update@yahoo.com";
        String updatedBio = "update~~";
        String updatedImage = "http://update-image";

        user.put("email", updatedEmail);
        user.put("bio", updatedBio);
        user.put("image", updatedImage);

        // When
        // Then
        mvc.perform(put("/api/user").header("Authorization", "Bearer " + token)
                        .content(node.toString())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.user.email").value(updatedEmail))
                .andExpect(jsonPath("$.user.username").value(username))
                .andExpect(jsonPath("$.user.bio").value(updatedBio))
                .andExpect(jsonPath("$.user.image").value(updatedImage))
                .andDo(print());
    }


}