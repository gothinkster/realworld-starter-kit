package com.realworld.realworld.domain.user.api;

import com.realworld.realworld.domain.user.dto.UserRegisterRequestDto;
import com.realworld.realworld.domain.user.dto.UserRegisterResponseDto;
import com.realworld.realworld.domain.user.dto.UserFindResponseDto;
import com.realworld.realworld.domain.user.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    @PostMapping("/api/users")
    public UserRegisterResponseDto registerUser(@RequestBody @Valid final UserRegisterRequestDto requestDto){
        Long savedId = userService.registerUser(requestDto);
        return userService.findUserById(savedId);
    }

    @GetMapping("/api/user")
    public UserFindResponseDto findUser(Authentication authentication){
        return userService.findUserByEmail(authentication.getName());
    }

}
