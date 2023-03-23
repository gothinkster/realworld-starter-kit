package com.realworld.realworld.domain.user.service;

import com.realworld.realworld.domain.user.dto.UserRegisterRequestDto;
import com.realworld.realworld.domain.user.dto.UserRegisterResponseDto;

public interface UserService {

    Long registerUser(UserRegisterRequestDto dto);
    UserRegisterResponseDto findUserById(Long savedId);
}
