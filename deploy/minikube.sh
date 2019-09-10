#!/bin/sh

#
# Open `README.md` for usage information
#

# Delete
minikube stop
minikube delete

# Setup
minikube config set vm-driver virtualbox
minikube config set cpus 2
minikube config set memory 4096

# Start
minikube start
minikube config set registry true # Must be enabled after Minikube has started
minikube dashboard >/dev/null 2>&1 &

# Status
minikube status
minikube config view
minikube addons list
minikube service list
minikube ip

# Build & Release
eval "$(minikube docker-env)"
registry="" docker-compose build
docker images

# Deploy
kubectl create deployment realworld --image=realworld:0.1
kubectl wait --for=condition=available deployment/realworld --timeout=30s
kubectl expose deployment realworld --type=NodePort --port=9090 # type=LoadBalancer only for EKS/GKE
kubectl wait --for=condition=ready svc/realworld --timeout=30s

# Open
SERVICE_URL="$(minikube service realworld --url)"
http "$SERVICE_URL/api/articles"
