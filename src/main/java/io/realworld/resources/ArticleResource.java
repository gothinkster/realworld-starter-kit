package io.realworld.resources;

import com.codahale.metrics.annotation.Timed;
import io.dropwizard.auth.Auth;
import io.realworld.api.request.NewArticle;
import io.realworld.api.request.UpdatedArticle;
import io.realworld.api.response.Article;
import io.realworld.api.response.ArticleList;
import io.realworld.core.ArticleService;
import io.realworld.security.UserPrincipal;

import javax.validation.Valid;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Map;
import java.util.Optional;

@Timed
@Path("articles")
public class ArticleResource {

    private final ArticleService articleService;

    public ArticleResource(final ArticleService articleService) {
        this.articleService = articleService;
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response findArticles(@Auth final Optional<UserPrincipal> optionalAuthenticatedUser,
                                 @QueryParam("author") final String author,
                                 @QueryParam("tag") final String tag,
                                 @QueryParam("favorited") final String favoritedBy,
                                 @DefaultValue("0") @QueryParam("offset") @Min(0) final int offset,
                                 @DefaultValue("20") @QueryParam("limit") @Min(0) @Max(100) final int limit) {
        final String username = optionalAuthenticatedUser.map(UserPrincipal::getUsername).orElse(null);
        final ArticleList articles = articleService.findArticles(username, author, tag, favoritedBy, offset, limit);

        return Response.ok(articles).build();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createArticle(@Auth final UserPrincipal principal,
                                  @NotNull @Valid final NewArticle newArticle) {
        final Article article = articleService.createArticle(principal.getUsername(), newArticle);

        return Response.ok(Map.of("article", article)).build();
    }

    @GET
    @Path("{slug}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response findArticle(@Auth final Optional<UserPrincipal> optionalAuthenticatedUser,
                                @PathParam("slug") final String slug) {
        final String username = optionalAuthenticatedUser.map(UserPrincipal::getUsername).orElse(null);
        final Article article = articleService.findBySlug(username, slug);

        return Response.ok(Map.of("article", article)).build();
    }

    @DELETE
    @Path("{slug}")
    public Response deleteArticle(@PathParam("slug") final String slug) {
        articleService.deleteArticle(slug);

        return Response.noContent().build();
    }

    @PUT
    @Path("{slug}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateArticle(@Auth final UserPrincipal principal,
                                  @PathParam("slug") final String slug,
                                  @NotNull @Valid final UpdatedArticle update) {
        final Article article = articleService.updateArticle(principal.getUsername(), slug, update);

        return Response.ok(Map.of("article", article)).build();
    }

    @GET
    @Path("feed")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getFeed(@Auth final UserPrincipal principal,
                            @DefaultValue("0") @QueryParam("offset") @Min(0) final int offset,
                            @DefaultValue("20") @QueryParam("limit") @Min(0) @Max(100) final int limit) {
        final ArticleList articles = articleService.findFeed(principal.getUsername(), offset, limit);

        return Response.ok(articles).build();
    }

    @POST
    @Path("{slug}/favorite")
    @Produces(MediaType.APPLICATION_JSON)
    public Response addArticleToFavourites(@Auth final UserPrincipal principal,
                                           @PathParam("slug") final String slug) {
        final Article article = articleService.addArticleToFavourites(principal.getUsername(), slug);

        return Response.ok(Map.of("article", article)).build();
    }

    @DELETE
    @Path("{slug}/favorite")
    @Produces(MediaType.APPLICATION_JSON)
    public Response removeArticleFromFavourites(@Auth final UserPrincipal principal,
                                                @PathParam("slug") final String slug) {
        final Article article = articleService.removeArticleFromFavourites(principal.getUsername(), slug);

        return Response.ok(Map.of("article", article)).build();
    }
}
