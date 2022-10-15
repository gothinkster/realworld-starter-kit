coverage:
	go test -v -coverprofile cover.out ./... && \
	go tool cover -html cover.out -o cover.html && \
  	rm cover.out && open cover.html

test:
	go test ./... -v

swag:
	swag init