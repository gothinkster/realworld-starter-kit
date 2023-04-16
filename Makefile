.PHONY: build setup

setup:
	npm install

build:
	rm -rf build dist
	npm run prebuild
	npm run build
	mv dist build
	npm ci --omit dev
	cp -r node_modules build/node_modules

zip:
	cd build &&	zip -r ../build.zip *

nohup/local:
	nohup sh -c 'cd build && node server' &
	./scripts/wait_for_status.sh http://localhost:3000/api/checks/readiness 200

nohup/docker:
	nohup docker run --rm --network=host --env API_PORT=3001 app &
	./scripts/wait_for_status.sh http://localhost:3001/api/checks/readiness 200

infra/up:
	docker-compose up localstack mysql

ci:
	docker-compose rm -f localstack mysql
	docker-compose up -d localstack mysql

	npm install

	npx prettier --write .
	cd terraform/lambda && terraform fmt
	npx tsc --noEmit

	npm run migration:run
	npm run migration:check

	npm run test:unit

	make build
	npm install

	make nohup/local
	DRIVER=trpc API_URL=http://localhost:3000/api TRPC_URL=http://localhost:3000/trpc npm run test:acceptance
	DRIVER=rest API_URL=http://localhost:3000/api TRPC_URL=http://localhost:3000/trpc npm run test:acceptance

localstack/terraform: export AWS_ACCESS_KEY_ID = foo
localstack/terraform: export AWS_SECRET_ACCESS_KEY = bar
localstack/terraform: export TF_VAR_DATABASE_URL = mysql://realworld:realworld@mysql:3306/realworld
localstack/terraform: export TF_VAR_ENVIRONMENT = production
localstack/terraform:
	docker-compose up -d localstack mysql

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

planetscale/migrations:
	npm run typeorm schema:drop
	npm run typeorm migration:run
