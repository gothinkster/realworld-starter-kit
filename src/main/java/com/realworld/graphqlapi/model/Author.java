package com.realworld.graphqlapi.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.UUID;

@Data
@AllArgsConstructor
public class Author {
    private UUID id;
    private String firstName;
    private String lastName;
}
