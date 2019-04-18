#!/usr/bin/env bash

set -e

echo "Running database migrations"
alembic -c etc/production.ini -n app:conduit upgrade head || echo "Database migrations failed!"
echo "Done"
