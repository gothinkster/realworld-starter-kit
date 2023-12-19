package io.realworld.api.request;

import com.fasterxml.jackson.annotation.JsonRootName;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

@JsonRootName("comment")
public record NewCommentDto(@NotNull @NotEmpty String body) {
}
