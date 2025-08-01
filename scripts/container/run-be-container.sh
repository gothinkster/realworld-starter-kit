#!/bin/bash
docker run --env-file api/.env -p 8000:8000 realworld-backend