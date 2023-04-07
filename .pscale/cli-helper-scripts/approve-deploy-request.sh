#!/bin/bash

. use-pscale-docker-image.sh

. authenticate-ps.sh

DEPLOY_REQUEST_NUMBER="$1"
COMMENT="$2"
# escape whitespaces in comment with no-break space
COMMENT="$(echo "$COMMENT" | sed -e 's/ /\&nbsp;/g')"

. set-db-and-org-and-branch-name.sh
pscale deploy-request review "$DB_NAME" "$DEPLOY_REQUEST_NUMBER" --approve --comment "$COMMENT" --org "$ORG_NAME"


