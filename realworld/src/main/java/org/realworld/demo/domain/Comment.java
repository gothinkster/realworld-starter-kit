package org.realworld.demo.domain;

import com.google.common.base.Preconditions;
import org.springframework.util.StringUtils;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import static com.google.common.base.Preconditions.*;

@Entity
public class Comment extends BaseTimeEntity{

    @ManyToOne
    @JoinColumn(name="author_id")
    private User author;

    private String body;

    /* for table row -> object mapping */
    protected Comment(){}

    public Comment(User author, String body){
        checkArgument(author != null);
        checkArgument(StringUtils.hasText(body));

        this.author = author;
        this.body = body;
    }
}
