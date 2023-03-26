# Clean
rm -rf dist
rm -rf .infra/dist

# Build
nest build
yarn install --frozen-lockfile --production=true
mv node_modules dist/node_modules

# Move artifact
mv dist .infra/dist

# Restore DEV dependencies
yarn install
