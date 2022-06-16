package org.realworld.demo.jwt;

import org.springframework.security.authentication.AbstractAuthenticationToken;

public class JwtAuthenticationToken extends AbstractAuthenticationToken {

    private final Object principal;

    private final String token;


    public JwtAuthenticationToken(Object principal, String token) {
        super(null);
        setAuthenticated(true);
        this.principal = principal;
        this.token = token;
    }


    @Override
    public Object getCredentials() {
        return null;
    }

    @Override
    public Object getPrincipal() {
        return principal;
    }

    public String getToken(){
        return token;
    }
}
