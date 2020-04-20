package io.realworld.security;

public class JwtToken {
    private final String token;

    public JwtToken(final String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }
}
