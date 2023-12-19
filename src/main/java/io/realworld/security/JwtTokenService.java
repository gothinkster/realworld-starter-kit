package io.realworld.security;

import io.dropwizard.auth.Authenticator;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import java.util.Date;
import java.util.Optional;

public class JwtTokenService implements Authenticator<JwtToken, UserPrincipal> {

    private final JwtConfiguration jwtConfig;

    public JwtTokenService(final JwtConfiguration jwtConfig) {
        this.jwtConfig = jwtConfig;
    }

    @Override
    public Optional<UserPrincipal> authenticate(final JwtToken credentials) {
        try {
            final Jws<Claims> claims = Jwts.parser()
                    .verifyWith(Keys.hmacShaKeyFor(jwtConfig.getSecret()))
                    .build()
                    .parseSignedClaims(credentials.token());

            return Optional.of(new UserPrincipal(claims.getPayload().getSubject()));
        } catch (final JwtException e) {
            return Optional.empty();
        }
    }

    public JwtToken generateJwt(final String username) {
        final Date issuedAt = new Date();
        final Date expiresAt = new Date(new Date().getTime() + jwtConfig.getTokenExpiration().toMillis());
        return new JwtToken(Jwts.builder()
                .subject(username)
                .issuedAt(issuedAt)
                .expiration(expiresAt)
                .signWith(Keys.hmacShaKeyFor(jwtConfig.getSecret()), Jwts.SIG.HS256)
                .compact());
    }
}
