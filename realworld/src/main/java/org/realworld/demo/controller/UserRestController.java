package org.realworld.demo.controller;

import org.realworld.demo.controller.dto.UserDto.UserCreateRequst;
import org.realworld.demo.controller.dto.UserDto.UserCreateResponse;
import org.realworld.demo.domain.User;
import org.realworld.demo.service.UserService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class UserRestController {
    private final UserService userService;

    public UserRestController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/users")
    public UserCreateResponse registerUser(@RequestBody UserCreateRequst request){
        User user = userService.registerUser(request.request.toUser());
        return UserCreateResponse.fromUser(user);
    }
}
