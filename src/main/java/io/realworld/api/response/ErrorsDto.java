package io.realworld.api.response;

import java.util.List;
import java.util.Map;

public record ErrorsDto(Map<String, List<String>> errors) {
}