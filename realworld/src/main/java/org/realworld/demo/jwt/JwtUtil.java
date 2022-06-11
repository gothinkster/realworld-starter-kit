package org.realworld.demo.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.stereotype.Component;

import java.sql.Date;
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

    public String verifyToken(String token){
        try {
            Algorithm algorithm = Algorithm.HMAC512(configuration.getClientSecret());
            JWTVerifier verifier = JWT.require(algorithm)
                    .withIssuer(configuration.getIssuer())
                    .build(); //Reusable verifier instance
            DecodedJWT jwt = verifier.verify(token);
            return jwt.getClaim("email").asString();
        } catch (JWTVerificationException exception){
            throw new JWTVerificationException("Jwt 인증 오류");
        }

    }

}
