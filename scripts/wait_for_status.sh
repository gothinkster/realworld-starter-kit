#! /bin/bash

TIMEOUT_SECONDS=30
URL="$1"
STATUS_CODE="$2"

if [[ -z "$URL" || -z "$STATUS_CODE" ]]; then
  echo "Usage: $0 URL STATUS_CODE"
  exit 1
fi

if ! [[ "$STATUS_CODE" =~ ^[0-9]+$ ]]; then
  echo "STATUS_CODE must be a number"
  exit 1
fi

echo "Waiting for $URL to return HTTP $STATUS_CODE"

if ! timeout $TIMEOUT_SECONDS sh -c "until curl --silent -v --head --fail $URL >/dev/null; do sleep 1; done"; then
  echo "Timed out"
  exit 1
fi

if curl --silent --head --fail "$URL" | head -n 1 | grep -q "$STATUS_CODE"; then
  echo "Server started successfully"
  exit 0
else
  echo "Server did not return HTTP $STATUS_CODE"
  exit 1
fi
