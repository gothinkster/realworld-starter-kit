#!/bin/bash

REQUIREMENTS_FILE="./api/requirements.txt"

if [ ! -f "$REQUIREMENTS_FILE" ]; then
    echo "Error: $REQUIREMENTS_FILE not found."
    exit 1
fi

echo "Installing dependencies from $REQUIREMENTS_FILE..."
pip install -r "$REQUIREMENTS_FILE"

echo "Dependency installation completed."
