package com.realworld.realworld.domain.user.api;

import com.realworld.realworld.domain.user.dto.UserRegisterRequestDto;
import com.realworld.realworld.domain.user.dto.UserResponseDto;
import com.realworld.realworld.domain.user.service.UserService;
import com.realworld.realworld.security.CustomUserDetails;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/api/users")
    public UserResponseDto registerUser(@RequestBody @Valid final UserRegisterRequestDto requestDto){
        Long savedId = userService.registerUser(requestDto);
        return userService.findUserById(savedId);
    }

    @GetMapping("/api/user")
    public UserResponseDto findUser(@AuthenticationPrincipal final CustomUserDetails userDetails){
        return userService.findUserById(userDetails.getUser().getId());
    }

}
