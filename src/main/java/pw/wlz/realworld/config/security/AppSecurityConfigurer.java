package pw.wlz.realworld.config.security;


import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;

@Slf4j
@Configuration
@EnableConfigurationProperties(AppSecurityConfigProperties.class)
public class AppSecurityConfigurer extends WebSecurityConfigurerAdapter {

    private final AppSecurityConfigProperties properties;

    public AppSecurityConfigurer(AppSecurityConfigProperties properties) {
        this.properties = properties;
    }

    @Override
    public void configure(WebSecurity web) {

        if (properties.getIgnore().isPresent()) {
            web.ignoring().antMatchers(properties.getIgnore().get().toArray(new String[0]));
            log.info("Ignoring security for URL {}", properties.getIgnore().get());
        }
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        // 인증은 폼 로그인을 사용하지 않고 인증 요청 API 를 따로 사용하므로
        // 폼 로그인 및 로그아웃 비활성화 함.
        http
                .csrf().disable()
                .httpBasic().disable()
                .formLogin().disable()
                .logout().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        // 사용자 로그인 후 사용자 인증 JWT 토큰을 전달하여 인증여부를 확인하기 때문에
        // API 요청 시 마다 사용자 인증 필터 전에 인증 여부를 확인하는 필터를 생성한다.
        // 즉, HTTP Header 에 "Authorization" 항목을 체크하는 필터 설정



    }
}
