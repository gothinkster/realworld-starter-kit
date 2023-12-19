package io.realworld.core.model;

import java.time.Instant;

public record Comment(Long id,
                      String body,
                      Instant createdAt,
                      Instant updatedAt,
                      Profile author) {
}
