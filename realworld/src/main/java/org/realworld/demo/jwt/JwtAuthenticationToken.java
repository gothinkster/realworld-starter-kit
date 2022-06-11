package org.realworld.demo.jwt;

import org.springframework.security.authentication.AbstractAuthenticationToken;

public class JwtAuthenticationToken extends AbstractAuthenticationToken {

    private final String principal;

    private final String detail;


    public JwtAuthenticationToken(String username, String token) {
        super(null);
        setAuthenticated(true);
        principal = username;
        detail = token;
    }


    @Override
    public Object getCredentials() {
        return null;
    }

    @Override
    public String getPrincipal() {
        return principal;
    }

    public String getTokenString(){
        return detail;
    }
}
