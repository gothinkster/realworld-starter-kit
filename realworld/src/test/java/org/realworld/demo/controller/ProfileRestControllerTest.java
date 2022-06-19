package org.realworld.demo.controller;

import org.aspectj.lang.annotation.Before;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.realworld.demo.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.nio.file.AccessDeniedException;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class ProfileRestControllerTest extends ControllerTest{

    private final User followee = new User("followee@gmail.com", "1234", "followee", "I'm a followee", "https://aaabbb.jpg");

    @BeforeEach
    void setup() {
        userRepository.save(user);
        userRepository.save(followee);
    }

    @Test
    @DisplayName("[GET] /api/profiles/{username} w/o login")
    void test1() throws Exception {
        //Given

        // When
        // Then
        mvc.perform(get("/api/profiles/{username}", followee.getUsername()))
                .andExpect(jsonPath("$.profile.username").value(followee.getUsername()))
                .andExpect(jsonPath("$.profile.image").value(followee.getImage()))
                .andExpect(jsonPath("$.profile.bio").value(followee.getBio()))
                .andExpect(jsonPath("$.profile.following").value(false))
                .andDo(print());
    }

    @Test
    @DisplayName("[GET] /api/profiles/{username} with login")
    void test2() throws Exception {
        //Given
        String token = jwtUtil.createToken(user.getEmail());

        // When
        // Then
        mvc.perform(get("/api/profiles/{username}", followee.getUsername())
                        .header("Authorization", "Bearer " + token))
                .andExpect(jsonPath("$.profile.username").value(followee.getUsername()))
                .andExpect(jsonPath("$.profile.image").value(followee.getImage()))
                .andExpect(jsonPath("$.profile.bio").value(followee.getBio()))
                .andExpect(jsonPath("$.profile.following").value(false))
                .andDo(print());
    }


    @Test
    @DisplayName("[POST] /api/profiles/{username}/follow")
    void test3() throws Exception {
        //Given
        String token = jwtUtil.createToken(user.getEmail());

        // When
        // Then
        mvc.perform(post("/api/profiles/{username}/follow", followee.getUsername())
                        .header("Authorization", "Bearer " + token))
                .andExpect(jsonPath("$.profile.username").value(followee.getUsername()))
                .andExpect(jsonPath("$.profile.image").value(followee.getImage()))
                .andExpect(jsonPath("$.profile.bio").value(followee.getBio()))
                .andExpect(jsonPath("$.profile.following").value(true))
                .andDo(print());
    }

    @Test
    @DisplayName("[POST] /api/profiles/{username}/follow w/o login -> Access Denied")
    void test3_2() throws Exception {
        //Given

        // When
        // Then
        mvc.perform(post("/api/profiles/{username}/follow", followee.getUsername()))
                .andExpect(status().is(403))
                .andExpect(status().reason("Access Denied"))
                .andDo(print());

    }


}