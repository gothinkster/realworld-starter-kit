package io.realworld.security;

import io.realworld.exceptions.ApplicationException;
import io.realworld.exceptions.ErrorCode;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.Objects;

/**
 * Dummy password encoder.
 *
 * <p>
 * TODO: switch to something like:
 * <a href="https://github.com/spring-projects/spring-security/blob/master/crypto/src/main/java/org/springframework/security/crypto/bcrypt/BCryptPasswordEncoder.java">
 * Spring BCrypt - OpenBSD's Blowfish password hashing code
 * </a>
 */
public class PasswordEncoder {

    private static final String SEPARATOR = "###";

    private final SecureRandom random = new SecureRandom();

    public String encode(final String rawPassword) {
        Objects.requireNonNull(rawPassword, "rawPassword cannot be null");

        final String salt = randomSalt(64);

        return sha512(rawPassword + salt) + SEPARATOR + salt; //store salt and hash in the same column
    }

    public boolean matches(final String rawPassword, final String encodedPassword) {
        Objects.requireNonNull(rawPassword, "rawPassword cannot be null");

        final String[] split = encodedPassword.split(SEPARATOR);
        final String password = split[0];
        final String salt = split[1];

        return Objects.equals(sha512(rawPassword + salt), password);
    }

    private String sha512(final String text) {
        try {
            final MessageDigest digest = MessageDigest.getInstance("SHA-512");
            final byte[] hash = digest.digest(text.getBytes(StandardCharsets.UTF_8));
            return Base64.getEncoder().encodeToString(hash);
        } catch (final NoSuchAlgorithmException e) {
            throw new ApplicationException(ErrorCode.INTERNAL_ERROR, e);
        }
    }

    private String randomSalt(final int length) {
        final byte[] buffer = new byte[length];
        random.nextBytes(buffer);
        return Base64.getEncoder().encodeToString(buffer);
    }
}
