package org.realworld.demo.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

class UserRestControllerTest extends ControllerTest{



    @BeforeEach
    void setup(){
        userRepository.save(user);
    }


    @Test
    @DisplayName("[POST] /api/users/login")
    void apitest1() throws Exception {
        //Given
        ObjectNode node = objectMapper.createObjectNode();
        ObjectNode userNode = node.putObject("user");
        userNode.put("email", user.getEmail());
        userNode.put("password", user.getPassword());

        // When
        // Then
        mvc.perform(post("/api/users/login")
                        .content(node.toString())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.user.email").value(user.getEmail()))
                .andExpect(jsonPath("$.user.username").value(user.getUsername()))
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
        String token = jwtUtil.createToken(user.getEmail());

        // When
        // Then
        mvc.perform(get("/api/user").header("Authorization", "Bearer " + token))
                .andExpect(jsonPath("$.user.email").value(user.getEmail()))
                .andExpect(jsonPath("$.user.username").value(user.getUsername()))
                .andExpect(jsonPath("$.user.token").isNotEmpty())
                .andDo(print());
    }

    @Test
    @DisplayName("[PUT] /api/user")
    void apitest4() throws Exception {
        //Given
        String token = jwtUtil.createToken(user.getEmail());

        ObjectNode node = objectMapper.createObjectNode();
        ObjectNode userNode = node.putObject("user");

        String updatedEmail = "update@yahoo.com";
        String updatedBio = "update~~";
        String updatedImage = "http://update-image";

        userNode.put("email", updatedEmail);
        userNode.put("bio", updatedBio);
        userNode.put("image", updatedImage);

        // When
        // Then
        mvc.perform(put("/api/user").header("Authorization", "Bearer " + token)
                        .content(node.toString())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.user.email").value(updatedEmail))
                .andExpect(jsonPath("$.user.username").value(user.getUsername()))
                .andExpect(jsonPath("$.user.bio").value(updatedBio))
                .andExpect(jsonPath("$.user.image").value(updatedImage))
                .andDo(print());
    }
}