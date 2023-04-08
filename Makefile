.PHONY: build

build:
	npm install
	rm -rf dist build build.zip
	npm run build
	mv dist/main build
	rm -rf dist node_modules

	npm ci --omit dev
	cp -r node_modules build/node_modules

	npm install

zip:
	cd build &&	zip -r ../build.zip *

nohup/local:
	nohup node build/server &
	./scripts/wait_for_status.sh http://localhost:3000/api/checks/readiness 200

nohup/docker:
	nohup docker run --rm --network=host --env API_PORT=3001 app &
	./scripts/wait_for_status.sh http://localhost:3001/api/checks/readiness 200

infra/up:
	docker-compose up localstack mysql

format:
	npx prettier --write .
	cd terraform/lambda && terraform fmt

typecheck:
	npx tsc --noEmit

ci: typecheck format

localstack/terraform: export AWS_ACCESS_KEY_ID = foo
localstack/terraform: export AWS_SECRET_ACCESS_KEY = bar
localstack/terraform: export TF_VAR_DATABASE_URL = mysql://realworld:realworld@mysql:3306/realworld
localstack/terraform: export TF_VAR_ENVIRONMENT = localstack
localstack/terraform:
	cd terraform/lambda \
	&& tflocal init -upgrade -reconfigure \
		-backend-config="force_path_style=true" \
		-backend-config="endpoint=http://localhost:4566" \
		-backend-config="iam_endpoint=http://localhost:4566" \
		-backend-config="sts_endpoint=http://localhost:4566" \
		-backend-config="dynamodb_endpoint=http://localhost:4566" \
		-backend-config="key=realworld-app/$(TF_VAR_ENVIRONMENT)/lambda.tfstate" \
	&& tflocal apply -auto-approve

aws/terraform:
	cd terraform/lambda \
	&& terraform init -upgrade -reconfigure -backend-config="key=realworld-app/$(TF_VAR_ENVIRONMENT)/lambda.tfstate" \
	&& terraform apply -auto-approve
