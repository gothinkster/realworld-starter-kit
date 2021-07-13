package com.yoon.realworld.repository;

import com.yoon.realworld.domain.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

@DataJpaTest
public class UserRepositoryTest {

    @Autowired
    UserRepository userRepository;

    @Test
    void persist(){
        //given
        User user = new User("testUser","test@test.com","1234");

        //when
        userRepository.save(user);
        userRepository.flush();

        //then
    }
}
