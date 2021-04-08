export APIURL=http://localhost:8585/api

build:
	go build .
run: 
	go run .
test: 
	go test -v ./...
test-race: 
	go test -v -race  ./...
rtest: 
	richgo test -v ./...
rtest-race: 
	richgo test -v -race  ./...
newman:
	../../../realworld/api/run-api-tests-local.sh
