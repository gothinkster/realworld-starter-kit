#! /bin/sh
# Clean
rm -rf dist

# Build
npm run build
npm ci --omit dev
rm -rf dist/acceptance && mv dist/main/* dist/ && rm -rf dist/main
cp -r node_modules dist/node_modules
