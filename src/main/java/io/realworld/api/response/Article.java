package io.realworld.api.response;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.time.Instant;
import java.util.Set;

public class Article {
    @JsonIgnore
    private Long id;
    private String slug;
    private String title;
    private String description;
    private String body;
    private Boolean favorited;
    private long favoritesCount;
    private Instant createdAt;
    private Instant updatedAt;
    private Set<String> tagList;
    private Profile author;

    public Long getId() {
        return id;
    }

    public void setId(final Long id) {
        this.id = id;
    }

    public String getSlug() {
        return slug;
    }

    public void setSlug(final String slug) {
        this.slug = slug;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(final String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(final String description) {
        this.description = description;
    }

    public String getBody() {
        return body;
    }

    public void setBody(final String body) {
        this.body = body;
    }

    public Boolean getFavorited() {
        return favorited;
    }

    public void setFavorited(final Boolean favorited) {
        this.favorited = favorited;
    }

    public long getFavoritesCount() {
        return favoritesCount;
    }

    public void setFavoritesCount(final long favoritesCount) {
        this.favoritesCount = favoritesCount;
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

    public Set<String> getTagList() {
        return tagList;
    }

    public void setTagList(final Set<String> tagList) {
        this.tagList = tagList;
    }

    public Profile getAuthor() {
        return author;
    }

    public void setAuthor(final Profile author) {
        this.author = author;
    }
}
