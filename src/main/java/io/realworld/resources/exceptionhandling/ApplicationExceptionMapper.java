package io.realworld.resources.exceptionhandling;

import io.realworld.api.response.ErrorsDto;
import io.realworld.exceptions.ApplicationException;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Map;

@Provider
public class ApplicationExceptionMapper implements ExceptionMapper<ApplicationException> {

    private static final Logger LOG = LoggerFactory.getLogger(ApplicationExceptionMapper.class);

    @Override
    public Response toResponse(final ApplicationException e) {
        LOG.error("Exception:", e);

        return Response.status(mapToHttpStatus(e))
                .type(MediaType.APPLICATION_JSON)
                .entity(toErrorMessage(e))
                .build();
    }

    private ErrorsDto toErrorMessage(final ApplicationException exception) {
        return new ErrorsDto(Map.of("general", List.of(exception.getMessage())));
    }

    private int mapToHttpStatus(final ApplicationException exception) {
        return switch (exception.getErrorCode()) {
            case DUPLICATE_USERNAME, DUPLICATE_EMAIL, USER_ALREADY_FOLLOWED -> 422;
            case INVALID_CREDENTIALS, UNAUTHORIZED -> 401;
            case FORBIDDEN -> 403;
            case NOT_FOUND -> 404;
            case INTERNAL_ERROR -> 500;
        };

    }
}
