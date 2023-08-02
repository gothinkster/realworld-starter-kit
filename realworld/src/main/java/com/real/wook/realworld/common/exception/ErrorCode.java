package com.real.wook.realworld.common.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.apache.commons.text.CaseUtils;
import org.springframework.http.HttpStatus;
@Getter
@RequiredArgsConstructor
public enum ErrorCode {
    // 500 Internal Server Error
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR),

    // 400 Bad Request
    INVALID_PARAMETER(HttpStatus.BAD_REQUEST),
    ILLEGAL_STATE(HttpStatus.BAD_REQUEST),

    // 401 Unauthorized
    UNAUTHORIZED(HttpStatus.UNAUTHORIZED),
    CODE_MISMATCH(HttpStatus.UNAUTHORIZED),

    // 403 Forbidden
    FORBIDDEN(HttpStatus.FORBIDDEN),

    // 404 Not Found
    NOT_FOUND(HttpStatus.NOT_FOUND),

    // 409 Conflict
    DUPLICATE(HttpStatus.CONFLICT);

    private final HttpStatus httpStatus;

    public String getCode() {
        return CaseUtils.toCamelCase(this.name(), false, '_');
    }
}
