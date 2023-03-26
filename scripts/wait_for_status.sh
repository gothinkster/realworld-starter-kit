STATUS=$1
echo "Waiting url" "$URL" "for status code" "$STATUS"
timeout 10s sh -c "until [ $(curl -s -o /dev/null -w "%{http_code}" "$URL") = $STATUS ]; do sleep 1; done; echo 'Server is up and running'" || (echo "Timeout reached" && exit 1)
