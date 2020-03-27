#!/usr/bin/env nix-shell
#!nix-shell --argstr type test -i bash /app/shell.nix

# This entrypoint is generally used by the CI/CD pipeline.
# This runs the given commands in an environment that has all the dependencies
# from `run` and some additional dependencies to run the tests.
# e.g. geckodriver for browser tests.

poetry run "$@"
