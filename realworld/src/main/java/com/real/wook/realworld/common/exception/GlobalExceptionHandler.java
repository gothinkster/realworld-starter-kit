package com.real.wook.realworld.common.exception;

import com.real.wook.realworld.common.CommonResponse;
import jakarta.validation.ConstraintViolationException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.MessageSource;
import org.springframework.context.NoSuchMessageException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@Slf4j
@RestControllerAdvice
@RequiredArgsConstructor
public class GlobalExceptionHandler {
    private final ConstraintViolationResolver violationMessageResolver;
    private final MessageSource messageSource;

    @ExceptionHandler(Exception.class)
    public ResponseEntity<CommonResponse> exceptionHandler(Exception e) {
        log.error("INTERNAL SERVER ERROR: ", e);

        return ResponseEntity
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(CommonResponse.fail(ErrorCode.INTERNAL_SERVER_ERROR));
    }

    @ExceptionHandler(ConstraintViolationException.class)
    ResponseEntity<CommonResponse> handleConstraintViolationException(ConstraintViolationException e) {
        log.error("ConstraintViolationException: ", e);

        List<FieldErrorDetail> fieldErrorDetails = e.getConstraintViolations().stream()
            .map(violationMessageResolver::toFiledErrorDetail)
            .collect(Collectors.toList());

        return ResponseEntity
            .status(HttpStatus.BAD_REQUEST)
            .body(CommonResponse.fail(ErrorCode.INVALID_PARAMETER, fieldErrorDetails));
    }

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<CommonResponse> CustomExceptionHandler(CustomException e) {
        log.error("CustomException -> errorCode: {}, errorMessage: {}", e.getErrorCode(), getErrorMessage(e));

        ErrorCode errorCode = e.getErrorCode();
        return ResponseEntity
            .status(errorCode.getHttpStatus())
            .body(CommonResponse.fail(getErrorMessage(e), errorCode));
    }

    /**
     * {@link CustomException#getCode()} 메서드로 code를 가져와 MessageSource 통해 매칭되는 오류 메시지를 가져온다.
     *
     * @param CustomException
     * @return
     */
    private String getErrorMessage(CustomException CustomException) {
        String errorMessage;

        try {
            errorMessage = messageSource.getMessage(CustomException.getCode(),
                CustomException.getArguments() != null ? CustomException.getArguments().toArray() : null,
                Locale.getDefault());
        } catch (NoSuchMessageException e) {
            errorMessage = messageSource.getMessage(CustomException.getErrorCode().getCode(), null, Locale.getDefault());
        }

        return errorMessage;
    }
}
