#!/bin/bash

. use-pscale-docker-image.sh

. authenticate-ps.sh

DB_NAME="$1"
ORG_NAME="$2"
BRANCH_NAME="$3"

. ps-create-helper-functions.sh
create-branch-info "$DB_NAME" "$BRANCH_NAME" "$ORG_NAME"
create-deploy-request "$DB_NAME" "$BRANCH_NAME" "$ORG_NAME"

. create-branch-connection-string.sh
create-branch-connection-string "$DB_NAME" "$BRANCH_NAME" "$ORG_NAME" "creds-${BRANCH_NAME}"
