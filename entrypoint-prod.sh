#!/usr/bin/env sh
cd $APP_HOME

echo "Start production application server..."
-yarn knex migrate:latest --env production && yarn build && yarn start
