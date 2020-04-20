package io.realworld.resources;

import com.codahale.metrics.annotation.Timed;
import io.dropwizard.auth.Auth;
import io.realworld.api.request.UpdatedUser;
import io.realworld.api.response.User;
import io.realworld.core.UserService;
import io.realworld.security.UserPrincipal;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
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
        final User user = userService.findByUsername(principal.getUsername());
        return Response.ok(Map.of("user", user)).build();
    }

    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateUser(@Auth final UserPrincipal principal, @Valid @NotNull final UpdatedUser user) {
        final User updatedUser = userService.updateUser(principal.getUsername(), user);
        return Response.ok(Map.of("user", updatedUser)).build();
    }
}
