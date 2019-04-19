#!/bin/bash
set -e

psql "postgresql://$POSTGRES_USER@:5432/$POSTGRES_DB" -v ON_ERROR_STOP=1 <<-EOSQL
  CREATE USER conduit_dev WITH PASSWORD '';
  CREATE DATABASE conduit_dev;
  GRANT ALL PRIVILEGES ON DATABASE conduit_dev TO conduit_dev;
EOSQL

psql -v ON_ERROR_STOP=1 "postgresql://$POSTGRES_USER@:5432/conduit_dev" <<-EOSQL
  CREATE EXTENSION IF NOT EXISTS pgcrypto;
  SELECT gen_random_uuid();
EOSQL
