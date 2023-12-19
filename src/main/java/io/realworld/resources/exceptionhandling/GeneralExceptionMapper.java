package io.realworld.resources.exceptionhandling;

import io.realworld.api.response.ErrorsDto;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Map;

public class GeneralExceptionMapper implements ExceptionMapper<Exception> {

    private static final Logger LOG = LoggerFactory.getLogger(ApplicationExceptionMapper.class);

    @Override
    public Response toResponse(Exception e) {
        LOG.error("Exception:", e);

        return Response.status(500)
                .type(MediaType.APPLICATION_JSON)
                .entity(new ErrorsDto(Map.of("general", List.of("Internal server error"))))
                .build();
    }
}
