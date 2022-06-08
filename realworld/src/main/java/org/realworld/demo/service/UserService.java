package org.realworld.demo.service;

import org.realworld.demo.domain.User;
import org.realworld.demo.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User saveUser(User user){
        return userRepository.save(user);
    }

    public User updateUser(String email, String username, String password, String image, String bio){
        Optional<User> userOptional = userRepository.findByEmail(email);
        User user = userOptional.orElseThrow();
        user.update(password, username, bio, image);
        return userRepository.save(user);
    }
}
