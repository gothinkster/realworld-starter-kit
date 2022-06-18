package org.realworld.demo.service;

import org.realworld.demo.domain.User;
import org.realworld.demo.repository.UserRepository;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User saveUser(User user){
        return userRepository.save(user);
    }

    public User updateUser(User originUser, String email, String username, String password, String image, String bio){
        User updatedUser = originUser.update(email, password, username, bio, image);
        return userRepository.save(updatedUser);
    }

    public User getUserByUsername(String username){
        return userRepository.findByUsername(username).orElseThrow();
    }


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email).orElseThrow();
    }

    public User login(String email, String password){
        Optional<User> maybeUser = userRepository.findByEmail(email);
        User user = maybeUser.orElseThrow();
        if(!user.getPassword().equals(password)){
            throw new BadCredentialsException("비밀번호가 맞지 않습니다");
        }
        return user;
    }
}
