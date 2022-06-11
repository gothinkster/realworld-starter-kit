package org.realworld.demo.jwt;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@ConfigurationProperties(prefix = "jwt")
@Configuration
public class JwtConfiguration {

    private String clientSecret;

    private String header;

    private String issuer;

    private int expirySeconds;

    public String getClientSecret() {
        return clientSecret;
    }

    public String getHeader() {
        return header;
    }

    public String getIssuer() {
        return issuer;
    }

    public int getExpirySeconds() {
        return expirySeconds;
    }

    public void setClientSecret(String clientSecret) {
        this.clientSecret = clientSecret;
    }

    public void setHeader(String header) {
        this.header = header;
    }

    public void setIssuer(String issuer) {
        this.issuer = issuer;
    }

    public void setExpirySeconds(int expirySeconds) {
        this.expirySeconds = expirySeconds;
    }
}
