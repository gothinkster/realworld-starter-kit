package io.realworld.resources;

import com.codahale.metrics.annotation.Timed;
import io.dropwizard.auth.Auth;
import io.realworld.api.request.NewCommentDto;
import io.realworld.api.response.CommentDto;
import io.realworld.core.CommentService;
import io.realworld.security.UserPrincipal;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;
import java.util.Map;

@Timed
@Path("articles/{slug}/comments")
public class CommentResource {

    private final CommentService commentService;

    public CommentResource(final CommentService commentService) {
        this.commentService = commentService;
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response findArticleComments(@PathParam("slug") final String slug) {
        final List<CommentDto> comments = commentService.findArticleComments(slug);

        return Response.ok(Map.of("comments", comments)).build();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response saveComment(@Auth final UserPrincipal principal,
                                @PathParam("slug") final String slug,
                                @NotNull @Valid final NewCommentDto newComment) {
        final CommentDto comment = commentService.saveComment(principal.username(), slug, newComment);

        return Response.ok(Map.of("comment", comment)).build();
    }

    @DELETE
    @Path("{commentId}")
    public Response deleteComment(@Auth final UserPrincipal principal,
                                  @PathParam("slug") final String slug,
                                  @PathParam("commentId") final long commentId) {
        commentService.deleteComment(principal.username(), slug, commentId);

        return Response.noContent().build();
    }
}
