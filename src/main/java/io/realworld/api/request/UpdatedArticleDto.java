package io.realworld.api.request;

import com.fasterxml.jackson.annotation.JsonRootName;

import java.util.Set;

@JsonRootName("article")
public record UpdatedArticleDto(String title,
                                String description,
                                String body,
                                Set<String> tagList) {
}
