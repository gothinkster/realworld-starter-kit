package io.realworld.resources;

import com.codahale.metrics.annotation.Timed;
import io.dropwizard.auth.Auth;
import io.realworld.api.response.Profile;
import io.realworld.core.ProfileService;
import io.realworld.security.UserPrincipal;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Map;

@Timed
@Path("profiles")
public class ProfileResource {
    private final ProfileService profileService;

    public ProfileResource(final ProfileService profileService) {
        this.profileService = profileService;
    }

    @GET
    @Path("{username}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response findProfile(@PathParam("username") final String username, @Auth final UserPrincipal principal) {
        final Profile profile = profileService.findProfileByUsername(username, principal.getUsername());

        return Response.ok(Map.of("profile", profile)).build();
    }

    @POST
    @Path("{username}/follow")
    @Produces(MediaType.APPLICATION_JSON)
    public Response followProfile(@PathParam("username") final String username, @Auth final UserPrincipal principal) {
        final Profile profile = profileService.followProfile(username, principal.getUsername());

        return Response.ok(Map.of("profile", profile)).build();
    }

    @DELETE
    @Path("{username}/follow")
    @Produces(MediaType.APPLICATION_JSON)
    public Response unfollowProfile(@PathParam("username") final String username, @Auth final UserPrincipal principal) {
        final Profile profile = profileService.unfollowProfile(username, principal.getUsername());

        return Response.ok(Map.of("profile", profile)).build();
    }
}

