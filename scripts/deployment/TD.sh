#!/bin/bash

# Check if the environment argument is provided
if [ -z "$1" ]; then
    echo "Usage: $0 <environment>"
    echo "Environment must be one of 'dev', 'stage', or 'prod'."
    exit 1
fi

# Get the environment argument
ENV=$1

# Validate the argument
if [[ "$ENV" != "dev" && "$ENV" != "stage" && "$ENV" != "prod" ]]; then
    echo "Invalid environment: $ENV"
    echo "Environment must be one of 'dev', 'stage', or 'prod'."
    exit 1
fi

# Set the corresponding files
VAR_FILE=".env.$ENV"
SECRET_FILE=".secrets.$ENV"

# Execute the act command
act workflow_dispatch \
    -W .github/workflows/TD.yml \
    --var-file "$VAR_FILE" \
    --secret-file "$SECRET_FILE" \
    --container-architecture linux/amd64
    # --local-repository ldoguin/setup-cbsh@develop=/home/ldoguing/Code/setup-cbsh
