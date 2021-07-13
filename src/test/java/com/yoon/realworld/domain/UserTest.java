package com.yoon.realworld.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.*;

public class UserTest {

    @Test
    void createUser(){
        //given
        String username = "testUser";
        String email = "test@test.com";
        String password = "1234";

        User user = new User(username,email, password);

        //when
        //then
        assertThat(user.getUsername())
                .as("check %s username", user.getUsername())
                .isEqualTo(username);
        assertThat(user.getEmail())
                .as("check %s email", user.getEmail())
                .isEqualTo(email);
        assertThat(user.getPassword())
                .as("check %s password", user.getPassword())
                .isEqualTo(password);

    }
}
