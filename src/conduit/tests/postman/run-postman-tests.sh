#!/usr/bin/env bash
set -e

ALLOWED_ASSERTION_FAILURES=9
ALLOWED_SCRIPT_FAILURES=0

SCRIPTDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"

APIURL=${APIURL:-https://conduit.productionready.io/api}
USERNAME=${USERNAME:-u`date +%s`}
EMAIL=${EMAIL:-$USERNAME@mail.com}
PASSWORD=${PASSWORD:-password}

npx newman -r cli,json run $SCRIPTDIR/Conduit.postman_collection.json \
  --delay-request 500 \
  --global-var "APIURL=$APIURL" \
  --global-var "USERNAME=$USERNAME" \
  --global-var "EMAIL=$EMAIL" \
  --global-var "PASSWORD=$PASSWORD" \
  --reporter-json-export newman-report.json \
  --suppress-exit-code

failed_assertions=$(cat newman-report.json | jq '.run.stats.assertions.failed')
if [ $failed_assertions -gt $ALLOWED_ASSERTION_FAILURES ]; then
    echo "More failures ($failed_assertions) than expected ($ALLOWED_ASSERTION_FAILURES)! "
    exit 255
fi


failed_scripts=$(cat newman-report.json | jq '.run.stats.testScripts.failed')
if [ $failed_scripts -gt $ALLOWED_SCRIPT_FAILURES ]; then
    echo "More failures ($failed_scripts) than expected ($ALLOWED_SCRIPT_FAILURES)! "
    exit 255
fi

