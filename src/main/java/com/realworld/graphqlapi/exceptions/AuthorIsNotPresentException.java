package com.realworld.graphqlapi.exceptions;

import graphql.ErrorType;
import graphql.GraphQLError;
import graphql.language.SourceLocation;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class AuthorIsNotPresentException extends RuntimeException implements GraphQLError {
    private Map<String, Object> parameters = new HashMap();

    public AuthorIsNotPresentException(String message){
        super(message);
    }

    public AuthorIsNotPresentException(String message, Map<String, Object> additionParams) {
        super(message);
        if (additionParams != null) {
            parameters = additionParams;
        }
    }

    @Override
    public List<SourceLocation> getLocations() {
        return null;
    }

    @Override
    public ErrorType getErrorType() {
        return null;
    }

    @Override
    public List<Object> getPath() {
        return null;
    }

    @Override
    public Map<String, Object> toSpecification() {
        return null;
    }

    @Override
    public Map<String, Object> getExtensions() {
        return parameters;
    }
}
