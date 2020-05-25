set -xeu


hub=$(nix-build --no-out-link '<nixpkgs>' -A gitAndTools.hub)/bin/hub

poetry update

# Only continue if there are any changes
if ! git diff-index --quiet HEAD; then
  today=$(date -I)
  # Commit the new changes and push them to the repository so a PR can be opened
  git checkout -b "poetry-update-$today"
  git config user.name "poetry updater"
  git commit -a -m "poetry update $today"
  git push -u origin "poetry-update-$today"
  "$hub" pull-request --no-edit --assign zupo
fi
