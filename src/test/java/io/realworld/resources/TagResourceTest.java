package io.realworld.resources;

import io.dropwizard.testing.junit5.DropwizardClientExtension;
import io.dropwizard.testing.junit5.DropwizardExtensionsSupport;
import io.realworld.db.TagRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.*;

@ExtendWith(DropwizardExtensionsSupport.class)
public class TagResourceTest {

    private static final TagRepository repository = mock(TagRepository.class);
    private static final DropwizardClientExtension DROPWIZARD = new DropwizardClientExtension(new TagsResource(repository));

    @AfterEach
    public void tearDown() {
        Mockito.reset(repository);
    }

    @Test
    @DisplayName("Verifies if the 'Tags' REST service returns the tags in expected format")
    public void allTagsAreReturned() throws Exception {
        //given
        given(repository.findAllTags()).willReturn(List.of("tag1", "tag2"));

        //when
        final var response = get("/tags");

        //then
        assertThat(response.statusCode()).isEqualTo(200);
        assertThat(response.body()).isEqualTo("{\"tags\":[\"tag1\",\"tag2\"]}");
        verify(repository, times(1)).findAllTags();
    }

    private HttpResponse<String> get(final String uri) throws java.io.IOException, InterruptedException {
        final var request = HttpRequest.newBuilder()
                .uri(URI.create(DROPWIZARD.baseUri() + uri))
                .timeout(Duration.ofMinutes(1))
                .GET()
                .build();
        return HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
    }
}
