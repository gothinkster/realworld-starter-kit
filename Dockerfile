FROM nixos/nix AS build

# We need a non-root user for poetry, which doesn't like installing packages as root
RUN adduser -D -h /app builder builder
WORKDIR /app

# Only copy files relevant for the nix-shell in an earlier layer to
# have this be cached when those files don't change
COPY --chown=builder ./shell.nix ./sources.json ./pyproject.toml ./poetry.lock ./poetry.toml ./
RUN nix-shell --show-trace --argstr type build

COPY --chown=builder . /app
RUN \
	# Clean all untracked git files in case this is built in an unclean tree
	nix-shell --argstr type build --run "git clean -ffxd || true" \
	&& nix-shell --argstr type build --run "su builder -c 'poetry install --no-dev'" \
	&& nix-shell --argstr type run --run "nix-env -iA nixpkgs.bashInteractive"

# Multi-stage build to only propagate what we need
FROM nixos/nix

# Heroku stack images have these set, so we need to set them too
# to make Gunicorn work as expected
ENV \
	FORWARDED_ALLOW_IPS="*" \
	GUNICORN_CMD_ARGS="--access-logfile -"

COPY --from=build /nix /nix
# Needed such that the nixpkgs fetched with fetchTarball isn't redownloaded
COPY --from=build /root/.cache/nix/tarballs /root/.cache/nix/tarballs
COPY --from=build --chown=root /app /app
WORKDIR /app

# Create an entrypoint
RUN \
	echo $'#!/usr/bin/env nix-shell\n#!nix-shell --argstr type run -i bash /app/shell.nix\npoetry run "$@"' \
	| tee /usr/local/bin/docker-entrypoint.sh \
	&& chmod +x /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
CMD ["bash"]
