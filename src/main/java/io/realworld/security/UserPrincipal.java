package io.realworld.security;

import java.security.Principal;

public record UserPrincipal(String username) implements Principal {

    @Override
    public String getName() {
        return username();
    }
}
