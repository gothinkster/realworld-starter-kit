package org.realworld.demo.controller;

import org.realworld.demo.controller.dto.UserDto.UserCreateRequest;
import org.realworld.demo.controller.dto.UserDto.UserResponse;
import org.realworld.demo.controller.dto.UserDto.UserUpdateRequest;
import org.realworld.demo.domain.User;
import org.realworld.demo.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class UserRestController {
    private final UserService userService;

    public UserRestController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/users")
    public UserResponse registerUser(@RequestBody UserCreateRequest request){
        User user = userService.saveUser(request.request.toUser());
        return UserResponse.fromUser(user);
    }

    @GetMapping("/user")
    public UserResponse getUser(){
        // authentication required
        return null;
    }

    @PutMapping("/user")
    public UserResponse updateUser(@RequestBody UserUpdateRequest request){
        UserUpdateRequest.Request innerRequest = request.request;

        User user = userService.updateUser(
                innerRequest.email,
                innerRequest.username,
                innerRequest.password,
                innerRequest.image,
                innerRequest.bio
        );

        return UserResponse.fromUser(user);
    }
}
