package io.realworld.api.request;

import com.fasterxml.jackson.annotation.JsonRootName;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@JsonRootName("comment")
public class NewComment {
    @NotNull
    @NotEmpty
    private String body;

    public String getBody() {
        return body;
    }

    public void setBody(final String body) {
        this.body = body;
    }
}
