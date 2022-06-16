package org.realworld.demo.jwt;

import org.realworld.demo.domain.User;
import org.realworld.demo.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;


public class JwtAuthenticationFilter extends GenericFilterBean {

    private final String jwtHeaderName;

    private final JwtUtil jwtUtil;

    private final UserRepository userRepository;

    public JwtAuthenticationFilter(String jwtHeaderName, JwtUtil jwtUtil, UserRepository userRepository){
        this.jwtHeaderName = jwtHeaderName;
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        String token = getToken((HttpServletRequest) servletRequest);
        if(token == null){
            filterChain.doFilter(servletRequest, servletResponse);
            return;
        }
        User user = userRepository.findByEmail(jwtUtil.verifyToken(token)).orElseThrow();
        SecurityContextHolder.getContext().setAuthentication(new JwtAuthenticationToken(user, token));
        filterChain.doFilter(servletRequest, servletResponse);
    }

    private String getToken(HttpServletRequest request){
        String token = request.getHeader(this.jwtHeaderName);
        if(token == null){
            return null;
        }
        return token.substring("Bearer ".length());
    }
}
