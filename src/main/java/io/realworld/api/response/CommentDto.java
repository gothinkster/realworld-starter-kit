package io.realworld.api.response;

import java.time.Instant;

public record CommentDto(Long id,
                         String body,
                         Instant createdAt,
                         Instant updatedAt,
                         ProfileDto author) {
}
