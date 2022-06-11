package org.realworld.demo.jwt;

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

    public JwtAuthenticationFilter(String jwtHeaderName, JwtUtil jwtUtil){
        this.jwtHeaderName = jwtHeaderName;
        this.jwtUtil = jwtUtil;
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        String token = getToken((HttpServletRequest) servletRequest);
        if(token == null){
            filterChain.doFilter(servletRequest, servletResponse);
            return;
        }
        String email = jwtUtil.verifyToken(token);
        SecurityContextHolder.getContext().setAuthentication(new JwtAuthenticationToken(email, token));
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
