package io.realworld.security;

import io.dropwizard.auth.Authenticator;
import io.jsonwebtoken.*;

import javax.crypto.spec.SecretKeySpec;
import java.security.Key;
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
            final Jws<Claims> claims = Jwts.parserBuilder()
                    .setSigningKey(jwtConfig.getSecret())
                    .build()
                    .parseClaimsJws(credentials.getToken());

            return Optional.of(new UserPrincipal(claims.getBody().getSubject()));
        } catch (final JwtException e) {
            return Optional.empty();
        }
    }

    public JwtToken generateJwt(final String username) {
        final SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;
        final Key signingKey = new SecretKeySpec(jwtConfig.getSecret(), signatureAlgorithm.getJcaName());
        final Date issuedAt = new Date();
        final String token = Jwts.builder()
                .setSubject(username)
                .setIssuedAt(issuedAt)
                .setExpiration(new Date(issuedAt.getTime() + jwtConfig.getTokenExpiration().toMillis()))
                .signWith(signingKey, signatureAlgorithm)
                .compact();
        return new JwtToken(token);
    }
}
