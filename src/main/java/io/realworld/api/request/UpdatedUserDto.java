package io.realworld.api.request;

import com.fasterxml.jackson.annotation.JsonRootName;
import jakarta.validation.constraints.Email;

@JsonRootName("user")
public record UpdatedUserDto(@Email String email,
                             String username,
                             String password,
                             String bio,
                             String image) {
}
