#!/usr/bin/env bash

cp .env.test .env && ./start.sh && dart test --concurrency=1 && docker compose down --volumes
