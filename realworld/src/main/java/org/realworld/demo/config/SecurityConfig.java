package org.realworld.demo.config;

import org.realworld.demo.jwt.JwtAuthenticationFilter;
import org.realworld.demo.jwt.JwtConfiguration;
import org.realworld.demo.jwt.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.context.SecurityContextPersistenceFilter;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    private JwtConfiguration jwtConfiguration;

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests(
                request -> request
                        .antMatchers("/api/users/login", "/api/users/**", "/login").permitAll()
                        .anyRequest().authenticated())
            .csrf().disable()
            .addFilterAfter(new JwtAuthenticationFilter(jwtConfiguration.getHeader(), jwtUtil), SecurityContextPersistenceFilter.class);
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
    }

    @Override
    public void configure(WebSecurity web){
        web.ignoring().antMatchers("/h2-console/**");
    }
}
