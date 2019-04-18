#!/usr/bin/env bash

set -e

# workaround https://github.com/heroku/heroku-buildpack-python/issues/687
for f in src; do
    echo "/app/src" > /app/.heroku/python/lib/python3.7/site-packages/$f.egg-link
done
