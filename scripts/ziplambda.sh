#! /bin/sh
# Clean
./scripts/package.sh
zip -r dist.zip dist
mv dist.zip terraform/lambda/dist.zip
