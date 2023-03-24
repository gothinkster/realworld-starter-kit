package com.realworld.realworld.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.extern.slf4j.Slf4j;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
@Slf4j
public class JwtUtils {

    public static final String TOKEN_TYPE = "BEARER";

    public static String createJwtToken(String email, String secretKey, long expireTimeMs) {
        return Jwts.builder()
                .setSubject(email)
                .setHeader(createHeader())
                .setClaims(createClaims(email))
                .setExpiration(createExpireDate(expireTimeMs))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    public static String getTokenFromHeader(String header) {
        return header.split(" ")[1];
    }

    public static boolean isExpired(String token, String secretKey) {
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getExpiration().before(new Date());
    }

    public static String getEmail(String token, String secretKey) {
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().get("email", String.class);
    }

    private static Map<String, Object> createHeader() {
        Map<String, Object> header = new HashMap<>();
        header.put("typ", "JWT");
        header.put("alg", "HS256");
        header.put("regDate", System.currentTimeMillis());

        return header;
    }

    private static Claims createClaims(String email) {
        Claims claims = Jwts.claims();
        claims.put("email", email);
        return claims;
    }

    private static Date createExpireDate(long expireTimeMs) {
        return new Date(System.currentTimeMillis() + expireTimeMs);
    }

}
