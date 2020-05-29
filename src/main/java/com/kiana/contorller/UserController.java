package com.kiana.contorller;

import com.kiana.service.UserRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class UserController {
    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @RequestMapping("/user")
    public String getUser(Model model){
        model.addAttribute("users", userRepository.findAll());
        return "users/list";
    }
}
