#!/usr/bin/env nix-shell
#!nix-shell --argstr type develop -i bash /app/shell.nix

# This is the default environment for nix-shell and is used for
# developing/debugging the app. It contains all the dependencies from `test`
# and some extra dependencies such as `tmux`, `vim` etc.

# This entrypoint can also be used in Heroku shell or CircleCI for debugging.
# e.g. /app/docker-entrypoints/develop.sh vim

poetry run "$@"
