FROM nixos/nix AS build

# We need a non-root user for poetry, which doesn't like installing packages as root
RUN adduser -D -h /app builder builder
WORKDIR /app

# Only copy files relevant for the nix-shell in an earlier layer to
# have this be cached when those files don't change
COPY --chown=builder ./shell.nix ./nixpkgs.json ./
RUN nix-shell --argstr type build

COPY --chown=builder . ./
RUN \
  # Clean all untracked git files in case this is built in an unclean tree
  nix-shell --argstr type build --run "su builder -c 'if [ -d .git ]; then git clean -ffxd; fi'" \
  # Install Python dependencies
  && nix-shell --argstr type build --run "su builder -c 'poetry install -n --no-dev'" \
  # Clean up garbage in a nix-shell with runtime dependencies, meaning everything
  # not needed in it should be removed
  && /app/docker-entrypoints/run.sh nix-env -iA nixpkgs.bashInteractive \
  && /app/docker-entrypoints/run.sh nix-collect-garbage -d

# Multi-stage build to only propagate what we need
FROM nixos/nix

# Heroku stack images have these set, so we need to set them too
# to make Gunicorn work as expected
ENV \
    FORWARDED_ALLOW_IPS="*" \
    GUNICORN_CMD_ARGS="--access-logfile -" \
    NIX_BUILD_SHELL=/nix/var/nix/profiles/default/bin/bash

COPY --from=build /nix /nix
# Needed such that the nixpkgs fetched with fetchTarball isn't redownloaded
COPY --from=build /root/.cache/nix/tarballs /root/.cache/nix/tarballs
COPY --from=build /app /app

WORKDIR /app

# Set the entrypoint
ENTRYPOINT ["/app/docker-entrypoints/run.sh"]

# Default command
CMD ["bash"]
