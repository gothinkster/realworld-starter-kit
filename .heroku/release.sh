#!/usr/bin/env nix-shell
#!nix-shell --argstr type run -i bash /app/shell.nix

set -e

# See https://github.com/niteoweb/pyramid-realworld-example-app/issues/86
echo "Installing required extensions"
psql $DATABASE_URL -c "CREATE EXTENSION IF NOT EXISTS pgcrypto;"

echo "Running database migrations"
alembic -c etc/alembic.ini -x ini=etc/production.ini upgrade head || echo "Database migrations failed!"
echo "Done"
