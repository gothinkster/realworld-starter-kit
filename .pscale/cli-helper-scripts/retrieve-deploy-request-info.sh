#!/bin/bash

. use-pscale-docker-image.sh

. authenticate-ps.sh

DB_NAME="$1"
ORG_NAME="$2"
DEPLOY_REQUEST_NUMBER="$3"

. ps-create-helper-functions.sh
create-deploy-request-info "$DB_NAME" "$ORG_NAME" "$DEPLOY_REQUEST_NUMBER"

create-diff-for-ci "$DB_NAME" "$ORG_NAME" "$DEPLOY_REQUEST_NUMBER" "$BRANCH_NAME" "update"

. create-branch-connection-string.sh
create-branch-connection-string "$DB_NAME" "$BRANCH_NAME" "$ORG_NAME" "creds-${BRANCH_NAME}"
