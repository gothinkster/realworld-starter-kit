#!/bin/bash
set -e

until psql "postgresql://$POSTGRES_USER@:5432" -c '\q'; do
  >&2 echo "Postgres is unavailable - waiting..."
  sleep 1
done

psql -v ON_ERROR_STOP=1 "postgresql://$POSTGRES_USER@:5432" <<-EOSQL
  DROP DATABASE IF EXISTS conduit_dev;
  DROP USER IF EXISTS conduit_dev;
  CREATE USER conduit_dev WITH PASSWORD '';
  CREATE DATABASE conduit_dev;
  GRANT ALL PRIVILEGES ON DATABASE conduit_dev TO conduit_dev;
EOSQL

psql -v ON_ERROR_STOP=1 "postgresql://$POSTGRES_USER@:5432/conduit_dev" <<-EOSQL
  CREATE EXTENSION IF NOT EXISTS pgcrypto;
  SELECT gen_random_uuid();
EOSQL
