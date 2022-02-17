#!/usr/bin/env bash

cp .env.test .env && docker compose up -d --build && dart test --concurrency=1 && docker compose down --volumes
