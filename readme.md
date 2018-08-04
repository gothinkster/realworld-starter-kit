# ![RealWorld Example App](logo.png)

> ### Golang/Echo codebase containing real world examples (CRUD, auth, advanced patterns, etc) that adheres to the [RealWorld](https://github.com/gothinkster/realworld) spec and API.


### [Demo](https://github.com/gothinkster/realworld)&nbsp;&nbsp;&nbsp;&nbsp;[RealWorld](https://github.com/gothinkster/realworld)


This codebase was created to demonstrate a fully fledged fullstack application built with **Golang/Echo** including CRUD operations, authentication, routing, pagination, and more.

## Getting started

### Install Golang
Please check the official golang installation guide before you start. [Official Documentation](https://golang.org/doc/install)

### Environment Config
make sure your ~/.*shrc have those variable:
```
➜  echo $GOPATH
/Users/zitwang/test/
➜  echo $GOROOT
/usr/local/go/
➜  echo $PATH
...:/usr/local/go/bin:/Users/zitwang/test//bin:/usr/local/go//bin
```
For more info and detailed instructions please check this guide: [Setting GOPATH](https://github.com/golang/go/wiki/SettingGOPATH) 

### Install dep
https://golang.github.io/dep/docs/installation.html

### Clone the repository
Clone this repository to your $GOPATH:
```
➜ git clone https://github.com/xesina/golang-echo-realworld-example-app.git  $GOPATH/src/github.com/xesina/golang-echo-realworld-example-app
```
Or simply use the following command which will handle cloning the repo:
```
➜ go get -u -v github.com/xesina/golang-echo-realworld-example-app
```

Switch to the repo folder
```
➜ cd $GOPATH/src/github.com/xesina/golang-echo-realworld-example-app
```

### Install dependencies
```
➜ dep ensure -v
```

### Run
```
➜ go run main.go
```

### Build
```
➜ go build
```

### Tests
```
➜ go test ./...
```
