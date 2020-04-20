package io.realworld.resources;

import com.codahale.metrics.annotation.Timed;
import io.dropwizard.auth.Auth;
import io.realworld.api.request.NewComment;
import io.realworld.api.response.Comment;
import io.realworld.core.CommentService;
import io.realworld.security.UserPrincipal;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
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
        final List<Comment> comments = commentService.findArticleComments(slug);

        return Response.ok(Map.of("comments", comments)).build();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response saveComment(@Auth final UserPrincipal principal,
                                @PathParam("slug") final String slug,
                                @NotNull @Valid final NewComment newComment) {
        final Comment comment = commentService.saveComment(principal.getUsername(), slug, newComment);

        return Response.ok(Map.of("comment", comment)).build();
    }

    @DELETE
    @Path("{commentId}")
    public Response deleteComment(@Auth final UserPrincipal principal,
                                  @PathParam("slug") final String slug,
                                  @PathParam("commentId") final long commentId) {
        commentService.deleteComment(principal.getUsername(), slug, commentId);

        return Response.noContent().build();
    }
}
