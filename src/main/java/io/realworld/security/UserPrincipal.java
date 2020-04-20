package io.realworld.security;

import java.security.Principal;

public class UserPrincipal implements Principal {
    private final String username;

    public UserPrincipal(final String username) {
        this.username = username;
    }

    public String getUsername() {
        return username;
    }

    @Override
    public String getName() {
        return getUsername();
    }
}
