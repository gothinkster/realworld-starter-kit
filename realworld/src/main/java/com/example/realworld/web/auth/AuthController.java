package com.example.realworld.web.auth;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AuthController {
    @GetMapping("/register")
    public String register() {
        return "pages/auth/register";
    }

    @GetMapping("/login")
    public String login() {
        return "pages/auth/login";
    }

}
