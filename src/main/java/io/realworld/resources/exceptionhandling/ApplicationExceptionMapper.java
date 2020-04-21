package io.realworld.resources.exceptionhandling;

import io.realworld.api.response.Errors;
import io.realworld.exceptions.ApplicationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;
import java.util.List;
import java.util.Map;

@Provider
public class ApplicationExceptionMapper implements ExceptionMapper<ApplicationException> {

    private static final Logger LOG = LoggerFactory.getLogger(ApplicationExceptionMapper.class);

    @Override
    public Response toResponse(final ApplicationException e) {
        LOG.error("Exception:", e);
        final Errors error = mapToErrorMessage(e);

        return Response.status(mapToHttpStatus(e))
                .type(MediaType.APPLICATION_JSON)
                .entity(error)
                .build();
    }

    private Errors mapToErrorMessage(final ApplicationException exception) {
        final Errors error = new Errors();
        error.setErrors(Map.of("general", List.of(exception.getMessage())));
        return error;
    }

    private int mapToHttpStatus(final ApplicationException exception) {
        switch (exception.getErrorCode()) {
            case DUPLICATE_USERNAME:
            case DUPLICATE_EMAIL:
            case USER_ALREADY_FOLLOWED:
                return 422;
            case INVALID_CREDENTIALS:
            case UNAUTHORIZED:
                return 401;
            case FORBIDDEN:
                return 403;
            case NOT_FOUND:
                return 404;
            case INTERNAL_ERROR:
                return 500;
        }

        return 500;
    }
}
