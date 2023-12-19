package io.realworld.api.request;

import com.fasterxml.jackson.annotation.JsonRootName;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.Set;

@JsonRootName("article")
public record NewArticleDto(@NotNull @NotEmpty String title,
                            @NotNull @NotEmpty String description,
                            @NotNull @NotEmpty String body,
                            Set<String> tagList) {
}
