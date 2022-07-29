package com.realworld.graphqlapi.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class Article {
    private String id;
    private String text;
    private String description;
    private Author author;
    private String date;
}
