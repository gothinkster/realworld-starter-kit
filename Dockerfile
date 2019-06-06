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
RUN go install -installsuffix cgo -ldflags="-w -s" && \
    mkdir -p /app && \
    cp -r $GOPATH/bin/golang-echo-realworld-example-app /app/

#
# 2. Runtime Container
#
FROM alpine

LABEL maintainer="Sina Saeidi <xesina@gmail.com>"

ENV TZ=Asia/Tehran \
    PATH="/app:${PATH}"

RUN apk add --update --no-cache \
    sqlite \
    tzdata \
    ca-certificates \
    bash \
    && \
    cp --remove-destination /usr/share/zoneinfo/${TZ} /etc/localtime && \
    echo "${TZ}" > /etc/timezone

# See http://stackoverflow.com/questions/34729748/installed-go-binary-not-found-in-path-on-alpine-linux-docker
RUN mkdir /lib64 && ln -s /lib/libc.musl-x86_64.so.1 /lib64/ld-linux-x86-64.so.2

WORKDIR /app

COPY --from=build /app /app/

EXPOSE 8585

CMD ["./golang-echo-realworld-example-app"]
