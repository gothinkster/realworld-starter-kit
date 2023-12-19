package io.realworld.core.model;

public record User(Long id,
                   String email,
                   String username,
                   String bio,
                   String image,
                   String password) {

}
