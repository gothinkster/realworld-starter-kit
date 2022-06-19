package org.realworld.demo.domain;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import static com.google.common.base.Preconditions.checkArgument;
import static org.springframework.util.StringUtils.hasText;

@Entity
public class Comment extends BaseTimeEntity{

    @ManyToOne
    @JoinColumn(name="author_id", nullable = false)
    private User author;

    @ManyToOne
    @JoinColumn(name="article_id", nullable = false)
    private Article article;

    private String body;

    public User getAuthor() {
        return author;
    }

    public Article getArticle() {
        return article;
    }

    public String getBody() {
        return body;
    }

    /* for table row -> object mapping */
    protected Comment(){}

    public Comment(User author, Article article, String body){
        checkArgument(author != null);
        checkArgument(article != null);
        checkArgument(hasText(body));

        this.author = author;
        this.body = body;
        this.article = article;
    }
}
