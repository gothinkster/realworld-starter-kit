#! /bin/sh
aws s3api create-bucket \
   --bucket "santunioni-iac-state" \
   --endpoint-url http://localhost:4566 \
   --region us-east-1

aws dynamodb create-table \
   --table-name "santunioni-iac-state-lock" \
   --attribute-definitions AttributeName=LockID,AttributeType=S \
   --key-schema AttributeName=LockID,KeyType=HASH \
   --endpoint-url http://localhost:4566 \
   --billing-mode PAY_PER_REQUEST

export AWS_ACCESS_KEY_ID=foo
export AWS_SECRET_ACCESS_KEY=bar

export TF_VAR_DATABASE_URL=mysql://realworld:realworld@localhost:3306/realworld
export TF_VAR_ENVIRONMENT=localstack

tflocal fmt
tflocal init \
   -upgrade \
   -reconfigure \
   -backend-config="force_path_style=true" \
   -backend-config="key=realworld-app/ephemeral/lambda.tfstate"

tflocal apply -auto-approve
