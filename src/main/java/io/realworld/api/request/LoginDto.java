package io.realworld.api.request;

import com.fasterxml.jackson.annotation.JsonRootName;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;


@JsonRootName("user")
public record LoginDto(@NotNull @Email String email,
                       @NotNull @NotEmpty String password) {
}
