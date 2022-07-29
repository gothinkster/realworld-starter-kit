package com.realworld.graphqlapi.model;


import lombok.Data;

@Data
public class PageInfo {
    private boolean hasNextPage;
    private boolean hasPreviousPage;
    private boolean startCursor;
    private boolean endCursor;
}
