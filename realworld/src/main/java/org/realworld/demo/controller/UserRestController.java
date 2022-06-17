package org.realworld.demo.controller;

import org.realworld.demo.controller.dto.UserDto.UserCreateRequest;
import org.realworld.demo.controller.dto.UserDto.UserLoginRequest;
import org.realworld.demo.controller.dto.UserDto.UserResponse;
import org.realworld.demo.controller.dto.UserDto.UserUpdateRequest;
import org.realworld.demo.domain.User;
import org.realworld.demo.jwt.JwtAuthenticationToken;
import org.realworld.demo.jwt.JwtUtil;
import org.realworld.demo.service.UserService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class UserRestController {
    private final UserService userService;

    private final JwtUtil jwtUtil;

    public UserRestController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/users/login")
    public UserResponse login(@RequestBody UserLoginRequest request){
        User loginUser = userService.login(request.getEmail(), request.getPassword());
        String token = jwtUtil.createToken(loginUser.getEmail());
        return UserResponse.from(loginUser, token);

    }

    @PostMapping("/users")
    public UserResponse registerUser(@RequestBody UserCreateRequest request){
        User user = userService.saveUser(request.toUser());

        return UserResponse.from(user, "");
    }

    @GetMapping("/user")
    public UserResponse getUser(){
        JwtAuthenticationToken authentication = (JwtAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();

        return UserResponse.from((User) authentication.getPrincipal(), authentication.getToken());
    }

    @PutMapping("/user")
    public UserResponse updateUser(@RequestBody UserUpdateRequest request){
        JwtAuthenticationToken authentication = (JwtAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();

        User user = userService.updateUser(
                (User) authentication.getPrincipal(),
                request.getEmail(),
                request.getUsername(),
                request.getPassword(),
                request.getImage(),
                request.getBio()
        );

        return UserResponse.from(user, authentication.getToken());
    }
}
