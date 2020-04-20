package io.realworld.api.response;

import java.time.Instant;

public class Comment {
    private Long id;
    private String body;
    private Instant createdAt;
    private Instant updatedAt;
    private Profile author;

    public Long getId() {
        return id;
    }

    public void setId(final Long id) {
        this.id = id;
    }

    public String getBody() {
        return body;
    }

    public void setBody(final String body) {
        this.body = body;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(final Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(final Instant updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Profile getAuthor() {
        return author;
    }

    public void setAuthor(final Profile author) {
        this.author = author;
    }
}
