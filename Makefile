.PHONY: build

build:
	rm -rf dist build build.zip
	npm run build
	npm ci --omit dev
	mv dist/main build
	rm -rf dist
	cp -r node_modules build/node_modules

zip:
	cd build &&	zip -r ../build.zip *

nohup/server:
	nohup node build/server &
	./scripts/wait_for_status.sh http://localhost:3000/api/checks/readiness 200

nohup/docker:
	nohup docker run --rm --network=host --env API_PORT=3001 app &
	./scripts/wait_for_status.sh http://localhost:3001/api/checks/readiness 200

infra/up:
	docker-compose up localstack mysql

format:
	npx prettier --write .

typecheck:
	npx tsc --noEmit

ci: typecheck format