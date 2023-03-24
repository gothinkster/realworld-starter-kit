package com.realworld.realworld.domain.user.service;

import com.realworld.realworld.domain.user.dto.UserRegisterRequestDto;
import com.realworld.realworld.domain.user.dto.UserResponseDto;

public interface UserService {

    Long registerUser(UserRegisterRequestDto dto);
    UserResponseDto findUserById(Long savedId);
    UserResponseDto findUserByEmail(String email);

}
