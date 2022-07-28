package com.realworld.graphqlapi.repository;

import com.realworld.graphqlapi.model.Author;

import java.util.Arrays;
import java.util.List;

public class DummyAuthorRepository implements AuthorRepository {

    private final List<Author> authors;

    public DummyAuthorRepository() {
        authors = Arrays.asList(
            new Author("1", "Name1", "lastName1"),
            new Author("2", "Name2", "lastName2"),
            new Author("3", "Name3", "lastName3"),
            new Author("4", "Name4", "lastName4")
        );
    }

    @Override
    public Iterable<Author> getAllAuthors() {
        return authors;
    }

    @Override
    public Author getById(String id) {
        return authors.stream().filter(s -> s.getId().equals(id)).findFirst().orElse(null);
    }
}
