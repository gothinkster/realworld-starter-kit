package io.realworld.api.response;

import java.time.Instant;
import java.util.Set;

public record ArticleDto(String slug,
                         String title,
                         String description,
                         String body,
                         Boolean favorited,
                         long favoritesCount,
                         Instant createdAt,
                         Instant updatedAt,
                         Set<String> tagList,
                         ProfileDto author) {
}
