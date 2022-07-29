package com.realworld.graphqlapi.repository;

import com.realworld.graphqlapi.model.Author;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;

public class DummyAuthorRepository implements AuthorRepository {

    private final List<Author> authors;

    public DummyAuthorRepository() {
        authors = Arrays.asList(
            new Author(new UUID(1L, 2L), "Name1", "lastName1"),
            new Author(new UUID(1L, 3L), "Name2", "lastName2"),
            new Author(new UUID(1L, 4L), "Name3", "lastName3"),
            new Author(new UUID(1L, 5L), "Name4", "lastName4")
        );
    }

    @Override
    public Iterable<Author> getAllAuthors() {
        return authors;
    }

    @Override
    public Author getById(UUID id) {
        return authors.stream().filter(s -> s.getId().equals(id)).findFirst().orElse(null);
    }
}
