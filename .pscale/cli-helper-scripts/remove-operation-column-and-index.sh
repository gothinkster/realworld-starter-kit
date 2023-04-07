#!/bin/bash

BRANCH_NAME=${BRANCH_NAME:-"remove-operation-column-and-index"}
DDL_STATEMENTS="alter table pixel_matrix drop column operation; drop index environment_operation on pixel_matrix;"

./create-db-branch-dr-and-connection.sh "$BRANCH_NAME" "$DDL_STATEMENTS"