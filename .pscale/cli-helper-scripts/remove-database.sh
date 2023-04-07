#!/bin/bash

BRANCH_NAME=${BRANCH_NAME:-"main"}

. use-pscale-docker-image.sh

# At the moment, service tokens do not allow DB deletions
unset PLANETSCALE_SERVICE_TOKEN
. authenticate-ps.sh

. set-db-and-org-and-branch-name.sh

pscale database delete --force "$DB_NAME" --org "$ORG_NAME"
# check if DB deletion worked
if [ $? -ne 0 ]; then
  echo "Failed to remove database $DB_NAME"
  exit 1
fi
