# Convenience makefile to build the dev env and run common commands
# Based on https://github.com/niteoweb/Makefile
.EXPORT_ALL_VARIABLES:
PIPENV_VENV_IN_PROJECT = 1
PIPENV_IGNORE_VIRTUALENVS = 1

.PHONY: all
all: .installed

.PHONY: install
install:
	@rm -f .installed  # force re-install
	@make .installed

.installed: Pipfile Pipfile.lock
	@echo "Pipfile(.lock) is newer than .installed, (re)installing"
	@pipenv sync --dev
	@pipenv run pre-commit install -f --hook-type pre-commit
	@pipenv run pre-commit install -f --hook-type pre-push
	@echo "This file is used by 'make' for keeping track of last install time. If Pipfile or Pipfile.lock are newer then this file (.installed) then all 'make *' commands that depend on '.installed' know they need to run pipenv install first." \
		> .installed

# Start database in docker in foreground
.PHONY: pgsql
pgsql: .installed
	@docker stop pgsql || true
	@docker rm pgsql || true
	@docker run -it --rm --name pgsql -v $(shell pwd)/.docker:/docker-entrypoint-initdb.d -p 5432:5432 postgres:11.2-alpine \
		postgres -c 'log_statement=all' -c 'max_connections=1000' -c 'log_connections=true'  -c 'log_disconnections=true'  -c 'log_duration=true'

# Start database in docker in background
.PHONY: start-pgsql
start-pgsql: .installed
	@docker start pgsql || docker run -d -v $(shell pwd)/.docker:/docker-entrypoint-initdb.d -p 5432:5432 --name pgsql postgres:11.2-alpine

# Open devdb with pgweb, a fantastic browser-based postgres browser
.PHONY: pgweb
pgweb:
	@docker run -p 8081:8081 --rm -it --link pgsql:pgsql -e "DATABASE_URL=postgres://conduit_dev:@pgsql:5432/conduit_dev?sslmode=disable" sosedoff/pgweb

.PHONY: clean-pgsql
clean-pgsql: .installed
	@docker stop pgsql || true
	@docker rm pgsql || true

.PHONY: stop-pgsql
stop-pgsql: .installed
	@docker stop pgsql || true

# Drop, recreate and populate development database with demo content
.PHONY: devdb
devdb: .installed
	@pipenv run python -m conduit.scripts.drop_tables
	@pipenv run alembic -c etc/alembic.ini -x ini=etc/development.ini upgrade head
	@pipenv run python -m conduit.scripts.populate

.PHONY: pshell
pshell: .installed
	@pipenv run pshell etc/development.ini

# Run development server
.PHONY: run
run: .installed
	@pipenv run pserve etc/development.ini

# Testing and linting targets
.PHONY: lint
lint: .installed
	@pipenv run pre-commit run --all-files --hook-stage push

.PHONY: types
types: .installed
	# Delete .mypy_cache because mypy report is not generated when cache is fresh https://github.com/python/mypy/issues/5103
	@rm -rf .mypy_cache
	@pipenv run mypy src/conduit
	@cat ./typecov/linecount.txt
	@pipenv run typecov 100 ./typecov/linecount.txt

.PHONY: format
format: .installed
	@pipenv run black src/conduit

# anything, in regex-speak
filter = "."

# additional arguments for pytest
unit_test_all = "false"
ifeq ($(filter),".")
	unit_test_all = "true"
endif
ifdef path
	unit_test_all = "false"
endif
args = ""
pytest_args = -k $(filter) $(args)
coverage_args = ""
ifeq ($(unit_test_all),"true")
	coverage_args = --cov=conduit --cov-branch --cov-report html --cov-report xml:cov.xml --cov-report term-missing --cov-fail-under=100
endif

.PHONY: unit
unit: .installed
ifeq ($(unit_test_all),"true")
	@pipenv run python -m conduit.scripts.drop_tables -c etc/test.ini
endif
ifndef path
	@pipenv run pytest src/conduit $(coverage_args) $(pytest_args)
else
	@pipenv run pytest $(path)
endif

.PHONY: postman-tests
postman-tests: .installed
	# Your need to install newman (npm install newman)
	# and run `make run` in a another tab
	@APIURL=http://localhost:8080/api src/conduit/tests/postman/run-postman-tests.sh


.PHONY: tests
tests: format lint types unit

.PHONY: clean
clean:
	@if [ -d ".venv/" ]; then pipenv --rm; fi
	@rm -rf .coverage .mypy_cache htmlcov/ htmltypecov src/conduit.egg-info typecov xunit.xml \
			.git/hooks/pre-commit .git/hooks/pre-push
	@rm -f .installed
