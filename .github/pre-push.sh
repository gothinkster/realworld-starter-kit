#!/bin/sh

#
# Refer to `.git/hooks/pre-push.sample` for more information about this hook script.
# To clean Docker artifacts execute: `sudo docker system prune -af`
#

set -e

docker-compose up -d mongodb
./gradlew clean all
docker-compose up -d --build --force-recreate

npm install newman

export TEST_RES="backend/src/test/resources/postman"
node_modules/.bin/newman run $TEST_RES/postman.json -e $TEST_RES/environment.json

export REPO="https://raw.githubusercontent.com/gothinkster/realworld"
curl $REPO/master/api/Conduit.postman_collection.json -o build/postman.json
node_modules/.bin/newman run build/postman.json -e $TEST_RES/environment.json
