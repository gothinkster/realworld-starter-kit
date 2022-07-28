package com.realworld.graphqlapi.repository;

import com.realworld.graphqlapi.model.Author;

public interface AuthorRepository {
    Iterable<Author> getAllAuthors();

    Author getById(String id);
}
