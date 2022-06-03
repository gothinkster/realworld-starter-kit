package org.realworld.demo.domain;

import org.springframework.util.StringUtils;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import java.text.Normalizer;
import java.util.List;
import java.util.Locale;
import java.util.regex.Pattern;

import static com.google.common.base.Preconditions.checkArgument;

@Entity
public class Article extends BaseTimeEntity{

    private static final Pattern NONLATIN = Pattern.compile("[^\\w-]");
    private static final Pattern WHITESPACE = Pattern.compile("[\\s]");

    @ManyToOne
    @JoinColumn(name="author_id")
    private User author;

    private boolean favorited;

    private int favoriteCount;

    private String title;

    private String description;

    private String body;

    @OneToMany
    private List<Tag> tags;

    protected Article(){}

    public Article(Builder builder){
        checkArgument(StringUtils.hasText(builder.title));
        checkArgument(builder.author != null);
        checkArgument(StringUtils.hasText(builder.body));

        this.author = builder.author;
        this.favorited = false;
        this.favoriteCount = 0;
        this.title = builder.title;
        this.description = builder.description;
        this.body = builder.body;
        this.tags = builder.tags;
    }

    public String getSlug() {
        String noWhiteSpace = WHITESPACE.matcher(this.title).replaceAll("-");
        String normalized = Normalizer.normalize(noWhiteSpace, Normalizer.Form.NFD);
        String slug = NONLATIN.matcher(normalized).replaceAll("");
        return slug.toLowerCase(Locale.ENGLISH);
    }

    public String getTitle(){
        return title;
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
