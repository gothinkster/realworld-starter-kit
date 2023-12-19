package io.realworld.resources;

import com.codahale.metrics.annotation.Timed;
import io.realworld.api.request.LoginDto;
import io.realworld.api.request.NewUserDto;
import io.realworld.api.response.UserDto;
import io.realworld.core.UserService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

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
    public Response login(@Valid @NotNull final LoginDto login) {
        final UserDto user = userService.login(login);
        return Response.ok(Map.of("user", user)).build();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response register(@Valid @NotNull final NewUserDto newUser) {
        final UserDto user = userService.saveUser(newUser);

        return Response.status(Response.Status.CREATED)
                .entity(Map.of("user", user))
                .build();
    }
}
