package io.realworld.resources;

import com.codahale.metrics.annotation.Timed;
import io.dropwizard.auth.Auth;
import io.realworld.api.request.UpdatedUserDto;
import io.realworld.api.response.UserDto;
import io.realworld.core.UserService;
import io.realworld.security.UserPrincipal;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.Map;

@Timed
@Path("user")
public class UserResource {

    private final UserService userService;

    public UserResource(final UserService userService) {
        this.userService = userService;
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response currentUser(@Auth final UserPrincipal principal) {
        final UserDto user = userService.findByUsername(principal.username());
        return Response.ok(Map.of("user", user)).build();
    }

    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateUser(@Auth final UserPrincipal principal, @Valid @NotNull final UpdatedUserDto user) {
        final UserDto updatedUser = userService.updateUser(principal.username(), user);
        return Response.ok(Map.of("user", updatedUser)).build();
    }
}
