package org.realworld.demo.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import org.springframework.boot.autoconfigure.security.oauth2.resource.OAuth2ResourceServerProperties;
import org.springframework.stereotype.Component;

import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Calendar;

@Component
public final class JwtUtil {

    private final JwtConfiguration configuration;

    public JwtUtil(JwtConfiguration jwtConfiguration){
        configuration = jwtConfiguration;
    }

    public String createToken(String email){
        try {
            Algorithm algorithm = Algorithm.HMAC512(configuration.getClientSecret());
            Date now = new Date(Calendar.getInstance().getTimeInMillis());
            Date expireDate = new Date(now.getTime() + configuration.getExpirySeconds() * 1000L);

            return JWT.create()
                    .withExpiresAt(expireDate)
                    .withIssuedAt(now)
                    .withIssuer(configuration.getIssuer())
                    .withClaim("email", email)
                    .sign(algorithm);

        } catch (JWTCreationException exception){
            throw new JWTCreationException("Jwt 토큰 생성 오류", new IllegalArgumentException());
        }
    }

}
