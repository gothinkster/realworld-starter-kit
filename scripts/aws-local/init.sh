#! /usr/bin/env bash
awslocal s3api create-bucket \
   --bucket "santunioni-iac-state" \
   --region us-east-1

awslocal dynamodb create-table \
   --table-name "santunioni-iac-state-lock" \
   --attribute-definitions AttributeName=LockID,AttributeType=S \
   --key-schema AttributeName=LockID,KeyType=HASH \
   --billing-mode PAY_PER_REQUEST
