package io.realworld.api.response;

import java.util.List;

public record ArticleListDto(List<ArticleDto> articles,
                             int articlesCount) {
}
