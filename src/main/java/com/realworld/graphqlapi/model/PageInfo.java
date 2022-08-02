package com.realworld.graphqlapi.model;


import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PageInfo {
    private boolean hasNextPage;
    private boolean hasPreviousPage;
    private boolean startCursor;
    private boolean endCursor;
}
