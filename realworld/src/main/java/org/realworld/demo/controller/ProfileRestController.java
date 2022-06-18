package org.realworld.demo.controller;

import org.realworld.demo.controller.dto.ProfileDto;
import org.realworld.demo.domain.User;
import org.realworld.demo.service.FollowStateService;
import org.realworld.demo.service.UserService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profiles")
public class ProfileRestController {

    private final FollowStateService stateService;

    private final UserService userService;

    public ProfileRestController(FollowStateService stateService, UserService userService) {
        this.stateService = stateService;
        this.userService = userService;
    }

    @GetMapping("/{username}")
    public ProfileDto getProfile(@PathVariable String username, @AuthenticationPrincipal Object prinicipal){
        User follower = prinicipal instanceof String ? null : (User) prinicipal;
        User followee = userService.getUserByUsername(username);

        boolean following = stateService.getFollowing(follower, followee);
        return new ProfileDto(followee.getUsername(), followee.getBio(), followee.getImage(), following);
    }

    @PostMapping("/{username}/follow")
    public ProfileDto followUser(@PathVariable String username, @AuthenticationPrincipal Object principal){
        User follower = (User) principal;
        User followee = userService.getUserByUsername(username);

        stateService.followUser(follower, followee);

        return new ProfileDto(followee.getUsername(), followee.getBio(), followee.getImage(), true);
    }

    @DeleteMapping("/{username}/follow")
    public ProfileDto unfollowUser(@PathVariable String username, @AuthenticationPrincipal Object principal){
        User follower = (User) principal;
        User followee = userService.getUserByUsername(username);

        stateService.unfollowUser(follower, followee);
        return new ProfileDto(followee.getUsername(), followee.getBio(), followee.getImage(), false);
    }

}
