.PHONY: e2e-test unit-test

unit-test:
	go test -v ./...

e2e-test:
	bash tests/run-api-tests.sh