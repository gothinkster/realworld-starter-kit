package wattt3.realworld.common.exception;

import org.springframework.http.HttpStatus;

public enum ErrorCode {

    DUPLICATE_USER(HttpStatus.UNPROCESSABLE_ENTITY, "중복된 유저입니다.");

    private final HttpStatus status;
    private final String message;

    ErrorCode(HttpStatus status, String message) {
        this.status = status;
        this.message = message;
    }

    public HttpStatus getStatus() {
        return status;
    }

    public String getMessage() {
        return message;
    }
}
