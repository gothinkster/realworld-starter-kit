.PHONY: e2e-test unit-test test-run coverage

unit-test:
	go test -v ./api -coverprofile=coverage.out

coverage:
	go tool cover -html=coverage.out

test-run:
	ENVIRONMENT=test go run main.go 

e2e-test:
	bash tests/run-api-tests.sh

