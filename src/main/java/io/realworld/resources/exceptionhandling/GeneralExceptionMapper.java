package io.realworld.resources.exceptionhandling;

import io.realworld.api.response.Errors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import java.util.List;
import java.util.Map;

public class GeneralExceptionMapper implements ExceptionMapper<Exception> {

    private static final Logger LOG = LoggerFactory.getLogger(ApplicationExceptionMapper.class);

    @Override
    public Response toResponse(Exception e) {
        LOG.error("Exception:", e);

        final Errors error = new Errors();
        error.setErrors(Map.of("general", List.of("Internal server error")));

        return Response.status(500)
                .type(MediaType.APPLICATION_JSON)
                .entity(error)
                .build();
    }
}
