#!/bin/bash

. use-pscale-docker-image.sh
. authenticate-ps.sh
. wait-for-deploy-request-merged.sh
. set-db-and-org-and-branch-name.sh
. ps-create-helper-functions.sh

# if no parameter was passed, display usage
if [ $# -eq 0 ]; then
    echo "Usage: $0 <deploy request id>"
    exit 1
fi

create-deployment "$DB_NAME" "$ORG_NAME" "$1"