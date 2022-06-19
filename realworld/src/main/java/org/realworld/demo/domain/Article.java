package org.realworld.demo.domain;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static com.google.common.base.Preconditions.checkArgument;
import static org.realworld.demo.utils.Utility.toSlug;
import static org.springframework.util.StringUtils.hasText;

@Entity
public class Article extends BaseTimeEntity{

    @ManyToOne
    @JoinColumn(name="author_id", nullable = false)
    private User author;

    private boolean favorited;

    private int favoriteCount;

    private String title;

    @Column(unique = true)
    private String slug;

    private String description;

    private String body;

    @OneToMany
    private final List<Tag> tags = new ArrayList<>();

    protected Article(){}

    public Article(Builder builder){
        checkArgument(hasText(builder.title));
        checkArgument(builder.author != null);
        checkArgument(hasText(builder.body));

        this.author = builder.author;
        this.favorited = false;
        this.favoriteCount = 0;
        this.title = builder.title;
        this.slug = toSlug(this.title);
        this.description = builder.description;
        this.body = builder.body;
        this.tags.addAll(builder.tags);
    }


    public String getTitle(){
        return title;
    }

    public String getDescription(){ return description;}

    public User getAuthor() {
        return author;
    }

    public String getSlug(){ return slug; }

    public boolean isFavorited() {
        return favorited;
    }

    public int getFavoriteCount() {
        return favoriteCount;
    }

    public String getBody() {
        return body;
    }

    public List<Tag> getTags() {
        return tags;
    }

    public void update(String title, String description, String body){
        if(hasText(title)){
            this.title = title;
            this.slug = toSlug(title);
        }
        if(hasText(description)){
            this.description = description;
        }
        if(hasText(body)){
            this.body = body;
        }
        this.updatedAt = LocalDateTime.now();
    }

    public static class Builder {
        private final User author;
        private final String title;
        private String description;
        private final String body;
        private List<Tag> tags;

        // 필수적인 필드 : brand
        public Builder(User author, String title, String body) {
            this.author = author;
            this.title = title;
            this.body = body;
        }

        public Builder description(String description) {
            this.description = description;
            return this;
        }


        public Builder tags(List<Tag> tags) {
            this.tags = tags;
            return this;
        }

        public Article build() {
            return new Article(this);
        }
    }
}
