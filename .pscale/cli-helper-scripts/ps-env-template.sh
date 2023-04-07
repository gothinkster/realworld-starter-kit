#!/bin/bash
export ORG_NAME="$ORG_NAME"
echo "::set-output name=ORG_NAME::$ORG_NAME"

export DB_NAME="$DB_NAME"
echo "::set-output name=DB_NAME::$DB_NAME"

export BRANCH_NAME="$BRANCH_NAME"
echo "::set-output name=BRANCH_NAME::$BRANCH_NAME"

export DEPLOY_REQUEST_NUMBER="$DEPLOY_REQUEST_NUMBER"
echo "::set-output name=DEPLOY_REQUEST_NUMBER::$DEPLOY_REQUEST_NUMBER"

export DEPLOY_REQUEST_URL="$DEPLOY_REQUEST_URL"
echo "::set-output name=DEPLOY_REQUEST_URL::$DEPLOY_REQUEST_URL"

export BRANCH_URL="$BRANCH_URL"
echo "::set-output name=BRANCH_URL::$BRANCH_URL"

