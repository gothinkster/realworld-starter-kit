#!/bin/bash

. use-pscale-docker-image.sh

. authenticate-ps.sh

BRANCH_NAME="$1"
DDL_STATEMENTS="$2"
DEPLOY_REQUEST_NUMBER="$3"


. set-db-and-org-and-branch-name.sh

. ps-create-helper-functions.sh
create-schema-change "$DB_NAME" "$BRANCH_NAME" "$ORG_NAME" "$DDL_STATEMENTS"
create-diff-for-ci "$DB_NAME" "$ORG_NAME" "$DEPLOY_REQUEST_NUMBER" "$BRANCH_NAME" "update"
