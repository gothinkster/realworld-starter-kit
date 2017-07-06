#!/bin/bash

set -e

if [ "$1" = 'apache2-foreground' ]; then
    # while ! timeout 1 bash -c "echo > /dev/tcp/gp_db_1/5432"; do sleep 10; done
    # ./yii migrate --interactive=0

    shift
    exec apache2-foreground "$@"
fi

exec "$@"
