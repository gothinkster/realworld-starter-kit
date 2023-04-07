#!/bin/bash

BRANCH_NAME=${BRANCH_NAME:-"add-operation-column-and-index"}
DDL_STATEMENTS="alter table pixel_matrix add column operation varchar(10) default NULL; create index environment_operation on pixel_matrix(environment, operation);" 

./create-db-branch-dr-and-connection.sh "$BRANCH_NAME" "$DDL_STATEMENTS"