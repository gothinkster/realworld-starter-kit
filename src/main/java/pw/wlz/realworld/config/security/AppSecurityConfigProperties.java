package pw.wlz.realworld.config.security;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.ConstructorBinding;

import java.util.List;
import java.util.Optional;

@ConstructorBinding
@ConfigurationProperties(prefix = "app.security")
public class AppSecurityConfigProperties {

    private final List<String> ignore;

    public AppSecurityConfigProperties(List<String> ignore) {
        this.ignore = ignore;
    }

    public Optional<List<String>> getIgnore() {
        return Optional.ofNullable(ignore);
    }
}
