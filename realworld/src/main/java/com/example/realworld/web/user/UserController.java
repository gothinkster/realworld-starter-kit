package com.example.realworld.web.user;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class UserController {
    @GetMapping("/profile/{username}")
    public String profile(@PathVariable("username") String username, Model model) {
        UserEntity user = new UserEntity(1, username, "junior backend developer");
        model.addAttribute("user", user);
        return "pages/user/profile";
    }

    @GetMapping("/settings")
    public String settings() {
        return "pages/user/settings";
    }


}
