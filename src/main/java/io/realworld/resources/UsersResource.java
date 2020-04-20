package io.realworld.resources;

import com.codahale.metrics.annotation.Timed;
import io.realworld.api.request.Login;
import io.realworld.api.request.NewUser;
import io.realworld.api.response.User;
import io.realworld.core.UserService;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Map;

@Timed
@Path("users")
public class UsersResource {

    private final UserService userService;

    public UsersResource(final UserService userService) {
        this.userService = userService;
    }

    @POST
    @Path("login")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response login(@Valid @NotNull final Login login) {
        final User user = userService.login(login);
        return Response.ok(Map.of("user", user)).build();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response register(@Valid @NotNull final NewUser newUser) {
        final User user = userService.saveUser(newUser);

        return Response.status(Response.Status.CREATED)
                .entity(Map.of("user", user))
                .build();
    }
}
