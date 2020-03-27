#!/usr/bin/env nix-shell
#!nix-shell --argstr type run -i bash /app/shell.nix

# This entrypoint is generally used by Heroku to run the already built app.
# The given commands are run in an environment that has the least set of
# dependencies available - only binaries and libraries required to run the
# service. e.g. poetry, psql etc.
#
# This entrypoint also creates the SSH keys from the run-time variables in Heroku.

poetry run "$@"
