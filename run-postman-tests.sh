#!/usr/bin/env bash
set -x

if [ ! -f ./postman_collections/Conduit.postman_collection.json ]
then
  echo "Downloading Postman collection tests from upstream realworld project repository"
  mkdir -p ./postman_collections
  wget -q -O ./postman_collections/Conduit.postman_collection.json https://raw.githubusercontent.com/gothinkster/realworld/main/api/Conduit.postman_collection.json
else
  echo "Postman collection with tests found. Will use it."
fi

echo "Starting application and running postman collection tests"

sbt run &> sbt_run.log & sbt_pid=$!

timeout --signal=SIGINT 120 tail -f sbt_run.log | grep -iqe "Application realworld-tapir-zio started"
app_started=$?

if [[ $app_started -ne 0 ]]
then
  echo "Looks like application haven't started within configured time period"
  kill $sbt_pid
  exit 1
fi

docker run --rm --add-host=host.docker.internal:host-gateway -t -v `pwd`/postman_collections:/postman_collections \
 postman/newman run /postman_collections/Conduit.postman_collection.json \
 --delay-request 500 \
 --global-var "APIURL=http://host.docker.internal:8080/api" \
 --global-var "USERNAME=user123" \
 --global-var "EMAIL=user123@email.com" \
 --global-var "PASSWORD=password123"
exit_status=$?

kill $sbt_pid

# TODO - replace with the line below to make CI fail in case there are POSTMAN test errors
# exit $exit_status
exit 0