package com.realworld.graphqlapi.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ArticlePage {
    private Edje edje;
    private PageInfo pageInfo;
}
