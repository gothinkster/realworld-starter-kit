#!/bin/bash
set -e

until psql "postgresql://$POSTGRES_USER@:5432" -c '\q'; do
  >&2 echo "Postgres is unavailable - waiting..."
  sleep 1
done

psql -v ON_ERROR_STOP=1 "postgresql://$POSTGRES_USER@:5432" <<-EOSQL
  DROP DATABASE IF EXISTS conduit_test;
  DROP USER IF EXISTS conduit_test;
  CREATE USER conduit_test WITH PASSWORD '';
  CREATE DATABASE conduit_test;
  GRANT ALL PRIVILEGES ON DATABASE conduit_test TO conduit_test;
EOSQL

psql -v ON_ERROR_STOP=1 "postgresql://$POSTGRES_USER@:5432/conduit_test" <<-EOSQL
  CREATE EXTENSION IF NOT EXISTS pgcrypto;
  SELECT gen_random_uuid();
EOSQL
