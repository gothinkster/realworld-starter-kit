#!/bin/bash
set -e

psql "postgresql://$POSTGRES_USER@:5432/$POSTGRES_DB" -v ON_ERROR_STOP=1 <<-EOSQL
  CREATE USER conduit_test WITH PASSWORD '';
  CREATE DATABASE conduit_test;
  GRANT ALL PRIVILEGES ON DATABASE conduit_test TO conduit_test;
EOSQL

psql -v ON_ERROR_STOP=1 "postgresql://$POSTGRES_USER@:5432/conduit_test" <<-EOSQL
  CREATE EXTENSION IF NOT EXISTS pgcrypto;
  SELECT gen_random_uuid();
EOSQL
