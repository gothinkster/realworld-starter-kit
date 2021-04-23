.PHONY: deps
deps:
	go get -u github.com/go-swagger/go-swagger/cmd/swagger

.PHONY: gen
gen: clean
	swagger generate server --api-package realworld --name realworld -t gen -f ./swagger/swagger.yml

.PHONY: install
install:
	go get ./...

.PHONY: run
run:
	go run gen/cmd/realworld-server/main.go --host 0.0.0.0 --port 3000

.PHONY: open
open:
	open http://localhost:3000/hello?name=hello-go-swagger

.PHONY: clean
clean:
	rm -rf ./gen
	mkdir ./gen