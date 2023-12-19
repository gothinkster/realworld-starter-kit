package io.realworld.security;

import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.junit.jupiter.api.Test;

import java.time.Duration;
import java.util.Base64;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

public class JwtTokenServiceTest {

    @Test
    void expiredTokensAreRejected() {
        //given
        final JwtTokenService classUnderTest = jwtService(-1);

        //when
        final JwtToken generatedToken = classUnderTest.generateJwt("user");
        final Optional<UserPrincipal> principal = classUnderTest.authenticate(generatedToken);

        //then
        assertThat(principal.isPresent()).isFalse();
    }

    @Test
    void usernameIsExtractedFromToken() {
        //given
        final JwtTokenService classUnderTest = jwtService(5);

        //when
        final JwtToken generatedToken = classUnderTest.generateJwt("user");
        final Optional<UserPrincipal> principal = classUnderTest.authenticate(generatedToken);

        //then
        assertThat(principal.isPresent()).isTrue();
        assertThat(principal.get().username()).isEqualTo("user");
    }

    @Test
    void invalidTokenIsRejected() {
        //given
        final JwtTokenService classUnderTest = jwtService(5);

        //when
        final Optional<UserPrincipal> principal = classUnderTest.authenticate(new JwtToken("invalid token"));

        //then
        assertThat(principal.isPresent()).isFalse();
    }

    private JwtTokenService jwtService(final long expirationInSeconds) {
        final Duration tokenExpiration = Duration.ofSeconds(expirationInSeconds);
        final String secret = Base64.getEncoder().encodeToString(Keys.secretKeyFor(SignatureAlgorithm.HS256).getEncoded());
        return new JwtTokenService(new JwtConfiguration(secret, tokenExpiration));
    }
}
