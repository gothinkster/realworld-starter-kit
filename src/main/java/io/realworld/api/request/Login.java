package io.realworld.api.request;

import com.fasterxml.jackson.annotation.JsonRootName;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@JsonRootName("user")
public class Login {
    @NotNull
    @Email
    private String email;

    @NotNull
    @NotEmpty
    private String password;

    public String getEmail() {
        return email;
    }

    public void setEmail(final String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(final String password) {
        this.password = password;
    }
}
