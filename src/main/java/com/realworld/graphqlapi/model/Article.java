package com.realworld.graphqlapi.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Article {
    private String id;
    private String text;
    private String description;
    private Author author;
    private String date;
}
