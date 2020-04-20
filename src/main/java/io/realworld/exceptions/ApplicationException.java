package io.realworld.exceptions;

public class ApplicationException extends RuntimeException {

    private static final long serialVersionUID = -8892173866965490572L;

    private final ErrorCode errorCode;


    public ApplicationException(final ErrorCode errorCode) {
        this(errorCode, errorCode.getDefaultMessage());
    }

    public ApplicationException(final ErrorCode errorCode, final String message) {
        super(message);
        this.errorCode = errorCode;
    }

    public ApplicationException(final ErrorCode errorCode, final Throwable cause) {
        this(errorCode, errorCode.name(), cause);
    }

    public ApplicationException(final ErrorCode errorCode, final String message, final Throwable cause) {
        super(message, cause);
        this.errorCode = errorCode;
    }

    public ErrorCode getErrorCode() {
        return errorCode;
    }
}
