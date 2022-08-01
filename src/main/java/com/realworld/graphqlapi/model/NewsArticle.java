package com.realworld.graphqlapi.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
public class NewsArticle implements Article {
    private UUID id;
    private String text;
    private String description;
    private Author author;
    private String date;
}
