package org.realworld.demo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/profiles")
public class ProfileRestController {

    @GetMapping("/{username}")
    public String getProfile(@PathVariable String username){
        return null;
    }
}
