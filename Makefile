build:
	docker-compose build

dev:
	docker-compose up

start:
	docker-compose up

stop:
	docker-compose down

migrate-latest:
	docker exec tax-id-validator yarn knex migrate:latest

migrate-rollback:
	docker exec tax-id-validator yarn knex migrate:rollback

migrate-up:
	docker exec tax-id-validator yarn knex migrate:up

migrate-down:
	docker exec tax-id-validator yarn knex migrate:down
