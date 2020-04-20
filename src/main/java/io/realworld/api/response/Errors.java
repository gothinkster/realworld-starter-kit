package io.realworld.api.response;

import java.util.List;
import java.util.Map;

public class Errors {
    private Map<String, List<String>> errors;

    public Map<String, List<String>> getErrors() {
        return errors;
    }

    public void setErrors(final Map<String, List<String>> errors) {
        this.errors = errors;
    }
}
