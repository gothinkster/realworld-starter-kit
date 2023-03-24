package com.realworld.realworld.domain.user.service;

import com.realworld.realworld.domain.user.dto.UserRegisterRequestDto;
import com.realworld.realworld.domain.user.dto.UserRegisterResponseDto;
import com.realworld.realworld.domain.user.dto.UserFindResponseDto;

public interface UserService {

    Long registerUser(UserRegisterRequestDto dto);
    UserRegisterResponseDto findUserById(Long savedId);
    UserFindResponseDto findUserByEmail(String email);
}
