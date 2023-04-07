#! /bin/sh
# Clean
rm -rf dist build build.zip

# Build
npm run build
npm ci --omit dev
mv dist/main build
rm -rf dist
cp -r node_modules build/node_modules
