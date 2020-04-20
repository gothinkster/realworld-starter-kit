package io.realworld.exceptions;

public enum ErrorCode {
    DUPLICATE_USERNAME("Username not available"),
    DUPLICATE_EMAIL("Email already used"),
    USER_ALREADY_FOLLOWED("User already followed"),
    NOT_FOUND("Resource not found"),
    INTERNAL_ERROR("Internal server error"),
    UNAUTHORIZED("User is not authorized"),
    FORBIDDEN("User is not allowed"),
    INVALID_CREDENTIALS("Invalid credentials");

    private final String defaultMessage;

    ErrorCode(final String defaultMessage) {
        this.defaultMessage = defaultMessage;
    }

    public String getDefaultMessage() {
        return defaultMessage;
    }
}
