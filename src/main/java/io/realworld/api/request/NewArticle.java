package io.realworld.api.request;

import com.fasterxml.jackson.annotation.JsonRootName;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.Set;

@JsonRootName("article")
public class NewArticle {
    @NotNull
    @NotEmpty
    private String title;

    @NotNull
    @NotEmpty
    private String description;

    @NotNull
    @NotEmpty
    private String body;

    private Set<String> tagList;

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

    public Set<String> getTagList() {
        return tagList;
    }

    public void setTagList(final Set<String> tagList) {
        this.tagList = tagList;
    }
}
