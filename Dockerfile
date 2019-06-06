#
# 1. Build Container
#
FROM golang:1.12.1 AS build

ENV GO111MODULE=on \
    GOOS=linux \
    GOARCH=amd64

RUN mkdir -p /src

# First add modules list to better utilize caching
COPY go.sum go.mod /src/

WORKDIR /src

# Download dependencies
RUN go mod download

COPY . /src

# Build components.
# Put built binaries and runtime resources in /app dir ready to be copied over or used.
RUN CGO_ENABLED=0 go install -ldflags="-w -s" && \
    mkdir -p /app && \
    cp -r $GOPATH/bin/golang-echo-realworld-example-app /app/

#
# 2. Runtime Container
#
FROM alpine:3.9

ENV TZ=Asia/Tehran \
    PATH="/app:${PATH}"

RUN apk add --update --no-cache \
    tzdata \
    ca-certificates \
    bash \
    && \
    cp --remove-destination /usr/share/zoneinfo/${TZ} /etc/localtime && \
    echo "${TZ}" > /etc/timezone && \
    mkdir -p /var/log && \
    chgrp -R 0 /var/log && \
    chmod -R g=u /var/log

WORKDIR /app

COPY --from=build /app /app/

CMD ["./golang-echo-realworld-example-app"]
