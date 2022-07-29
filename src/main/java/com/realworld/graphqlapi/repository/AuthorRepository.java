package com.realworld.graphqlapi.repository;

import com.realworld.graphqlapi.model.Author;

import java.util.UUID;

public interface AuthorRepository {
    Iterable<Author> getAllAuthors();

    Author getById(UUID id);
}
