package com.realworld.realworld.domain.user.service;

import org.springframework.security.crypto.password.PasswordEncoder;

public class PasswordEncoderTest implements PasswordEncoder {

    @Override
    public String encode(CharSequence rawPassword) {
        return "encodedassword_"+rawPassword;
    }

    @Override
    public boolean matches(CharSequence rawPassword, String encodedPassword) {
        return false;
    }
}
