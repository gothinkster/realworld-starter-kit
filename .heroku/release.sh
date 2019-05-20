#!/usr/bin/env bash

set -e

echo "Running database migrations"
alembic -x ini=etc/production.ini upgrade head || echo "Database migrations failed!"
echo "Done"
