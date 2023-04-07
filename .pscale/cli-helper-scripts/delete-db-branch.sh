#!/bin/bash

. use-pscale-docker-image.sh

. authenticate-ps.sh

BRANCH_NAME="$1"

. set-db-and-org-and-branch-name.sh

pscale branch delete "$DB_NAME" "$BRANCH_NAME" --force --org "$ORG_NAME"