#! /bin/sh
URL=$1
STATUS=$2
TIMEOUT_SECONDS=30
echo "Waiting url" "$URL" "to return status code" "$STATUS"
timeout $TIMEOUT_SECONDS sh -c "until [ $(curl -s -o /dev/null -w "%{http_code}" "$URL") = $STATUS ]; do sleep 1; done; echo 'Server is up and running'" || (echo "Timeout reached" && exit 1)
