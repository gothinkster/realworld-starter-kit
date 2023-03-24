package com.realworld.realworld.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.realworld.realworld.domain.user.dto.UserLoginRequestDto;
import com.realworld.realworld.domain.user.dto.UserResponseDto;
import com.realworld.realworld.domain.user.entity.User;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.io.IOException;
import java.util.InputMismatchException;

@Slf4j
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    @Value("${jwt.secretKey}")
    private String secretKey;
    @Value("${jwt.expiredTimeMs}")
    private long expiredTimeMs;

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager) {
        super.setAuthenticationManager(authenticationManager);
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {

        UsernamePasswordAuthenticationToken token;
        try {
            UserLoginRequestDto requestDto = new ObjectMapper().readValue(request.getInputStream(), UserLoginRequestDto.class);
            token = new UsernamePasswordAuthenticationToken(requestDto.getEmail(), requestDto.getPassword());
        } catch (IOException e) {
            throw new InputMismatchException();
        }

        return getAuthenticationManager().authenticate(token);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException {

        CustomUserDetails userDetails = (CustomUserDetails) authResult.getPrincipal();
        User user = userDetails.getUser();

        String token = JwtUtils.createJwtToken(user.getEmail(), secretKey, expiredTimeMs);

        response.addHeader(HttpHeaders.AUTHORIZATION, JwtUtils.TOKEN_TYPE + " " + token);
        response.setContentType(String.valueOf(MediaType.APPLICATION_JSON));
        response.setCharacterEncoding("utf-8");

        UserResponseDto responseDto = UserResponseDto.builder()
                        .entity(user)
                        .token(token)
                        .build();
        response.getWriter().println(new ObjectMapper().writeValueAsString(responseDto));
    }

}
