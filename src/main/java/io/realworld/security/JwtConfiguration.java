package io.realworld.security;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotNull;
import java.time.Duration;
import java.util.Base64;
import java.util.Objects;

public class JwtConfiguration {
    private final byte[] secret;
    private final Duration tokenExpiration;

    public JwtConfiguration(@JsonProperty("secret") @NotNull final String secret,
                            @JsonProperty("tokenExpiration") @NotNull final Duration tokenExpiration) {
        this.secret = Base64.getDecoder().decode(Objects.requireNonNull(secret));
        this.tokenExpiration = Objects.requireNonNull(tokenExpiration);
    }

    public byte[] getSecret() {
        return secret;
    }

    public Duration getTokenExpiration() {
        return tokenExpiration;
    }
}
