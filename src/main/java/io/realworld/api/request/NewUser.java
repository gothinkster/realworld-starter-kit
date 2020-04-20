package io.realworld.api.request;

import com.fasterxml.jackson.annotation.JsonRootName;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@JsonRootName("user")
public class NewUser {

    @NotNull
    @Email
    private String email;

    @NotNull
    @NotEmpty
    private String username;

    @NotNull
    @NotEmpty
    private String password;

    public String getEmail() {
        return email;
    }

    public void setEmail(final String email) {
        this.email = email;
    }

    public String getUsername() {
        return username != null ? username.toLowerCase() : null;
    }

    public void setUsername(final String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(final String password) {
        this.password = password;
    }

}
