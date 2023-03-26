package com.realworld.realworld.domain.user.api;

import com.realworld.realworld.domain.user.entity.User;
import com.realworld.realworld.domain.user.repository.UserRepository;
import com.realworld.realworld.security.CustomUserDetails;
import org.springframework.context.annotation.Profile;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

@Profile("test")
public class TestUserDetailService implements UserDetailsService {

    private final UserRepository userRepository;

    public TestUserDetailService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {

        User entity = userRepository.findById(Long.parseLong(userId))
                .orElseThrow(() -> new IllegalArgumentException("해당 사용자가 없습니다."));

        return new CustomUserDetails(entity);
    }
}
