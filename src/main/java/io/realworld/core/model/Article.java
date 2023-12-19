package io.realworld.core.model;

import java.time.Instant;

public record Article(Long id,
                      String slug,
                      String title,
                      String description,
                      String body,
                      long favoritesCount,
                      Instant createdAt,
                      Instant updatedAt,
                      Profile author) {
}
