package io.realworld.resources;

import com.codahale.metrics.annotation.Timed;
import io.realworld.db.TagRepository;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;
import java.util.Map;

@Timed
@Path("tags")
public class TagsResource {

    private final TagRepository tagRepository;

    public TagsResource(final TagRepository tagRepository) {
        this.tagRepository = tagRepository;
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response findTags() {
        final List<String> tags = tagRepository.findAllTags();

        return Response.ok(Map.of("tags", tags)).build();
    }
}
