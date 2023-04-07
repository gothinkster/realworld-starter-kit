#!/bin/bash

. use-pscale-docker-image.sh
. authenticate-ps.sh
. wait-for-deploy-request-merged.sh
. set-db-and-org-and-branch-name.sh
. ps-create-helper-functions.sh


raw_output=`pscale deploy-request list "$DB_NAME" --org "$ORG_NAME" --format json`
# check return code, if not 0 then error
if [ $? -ne 0 ]; then
    echo "Error: pscale deploy-branch list returned non-zero exit code $?: $raw_output"
    exit 1
fi
output=`echo $raw_output | jq "[.[] | select(.state == \"open\") ] | .[0].number "`

# test whether the output is a number
if [[ $output =~ ^[0-9]+$ ]]; then
    create-deployment "$DB_NAME" "$ORG_NAME" "$output"
else
    echo "No open deployment request found: $raw_output"
    exit 3
fi
