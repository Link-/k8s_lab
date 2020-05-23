# Kubernetes Lab
> A simple microservices setup to help you learn and manage a local Kubernetes cluster

A combination of simple mock microservices to help you kick start your local Kubernetes cluster locally. This project does not require you to setup a cloud based cluster. The microservices make simple calls to each other to simulate traffic.

## Installation

### Minikube Setup

```
# We use kubernetes v1.16.x to guarantee istio support
minikube start --memory='8000mb' --cpus=4 --kubernetes-version=v1.16.9

# Check status of the local cluster
minikube status

# Get list of active addons
minikube addons list

# Enable necessary addons
minikube addons enable ingress
minikube addons enable registry
minikube addons enable registry-creds

# Minikube dashboard
minikube dashboard
```

### Istio setup

```
# Download istio's latest stable release
cd ./k8s
curl -L https://istio.io/downloadIstio | sh -
export PATH="$PATH:/Users/bdghaidi/Projects/k8s_lab/k8s/istio-1.6.0/bin"
istioctl verify-install

# Install istio demo profile
cd ./istio-1.6.0
istioctl manifest apply --set profile=demo

# Monitor progress
kubectl get pods -n istio-system
```

### Install watch

```
brew install watch
```

### Setup AWS ECR

#### Setup AWS Cli

```
# Install awscli
brew install awscli

# Configure credentials
aws configure
```

#### Create Repositories in ECR

- Go to AWS console -> ECR
- Create 3 repositories named as per the below:
    - `service-auth`
    - `service-customer`
    - `service-payments`

#### Login to AWS ECR with Docker

We need to do this step so that we can push the images of the services to ECR before Kubernetes can pull them.

```
# Fetch credentials with awscli and login to the registry
docker login -u AWS -p (aws ecr get-login-password --profile <aws_profile> --region eu-west-1) https://<account_id>.dkr.ecr.eu-west-1.amazonaws.com
```

#### Build microservice images and push them to ECR

```
# Install gulp we will use it to build the images
npm install -g gulp

# Update the Gulpfile.js in each microservice to map to your defined ECR URL
const CONTAINER_REGISTRY = '<account_id>.dkr.ecr.eu-west-1.amazonaws.com';

# Build and push the images of all the microservices
gulp --f ./service-auth_v1/src/Gulpfile.js
gulp --f ./service-auth_v2/src/Gulpfile.js
gulp --f ./service-customer/src/Gulpfile.js
gulp --f ./service-payments/src/Gulpfile.js
```

#### Store AWS ECR credentials in minikube (Kubernetes secrets)
```
# Register AWS ECR credentials with minikube to be used by Kubernetes
minikube addons configure registry-creds
```

### Istio
```
# Enable istio sidecar injection in the default namespace
kubectl label namespace default istio-injection=enabled
```

### Deploy the microservices
```
cd ./k8s/deployments/

# Update the deployments to point to the proper URL of the docker image
image: <account_id>.dkr.ecr.eu-west-1.amazonaws.com/service-auth:v1

# Apply the deployments
kubectl apply -f service-auth-deployment_v1.yml
kubectl apply -f service-auth-deployment_v2.yml
kubectl apply -f service-customer-deployment.yml
kubectl apply -f service-payments-deployment.yml

# Watch the pods
watch -n 3 get pods -n default
```

### Add testing domain to /etc/hosts
```
# Get the cluster IP and map it to a domain
echo (minikube ip)" fintech.demo.local"

# Add the output from the above to your /etc/hosts file
```

### Test the setup
```
# Test the setup
curl -G fintech.demo.local/auth/v1/authenticate

> Output:
    {"method":"GET","path":"/authenticate","POD":"service-auth-v1-754c7754c6-9n58b","body":{"code":200,"key":"authentication","value":"User authenticated"}}
```

### Extras
```
# Install jq to have a clearer / cleaner JSON output
brew install jq

# Use jq while simulating continuous traffic
watch -n 3 'curl -G fintech.demo.local/auth/v1/authenticate | jq'

# Get logs from a single pod
kubectl -n default logs -f deployment/service-payments-deployment --all-containers=true --since=10m
```

### Istio Dashboards
```
istioctl dashboard kiali
istioctl dashboard grafana
istioctl dashboard prometheus
istioctl dashboard jaeger
```

### Istio test samples
```
# Navigate to ./tests
# Apply the destination rules first
kubectl apply -f ./destination_rules_all.yml

# Then pick and choose which virtual service you'd like to test
kubectl apply -f ./chaos_delay_7s.yml
```

---

## Release History

* 0.0.1
    * Work in progress

---

## Meta

Copyright [2020] [Bassem Dghaidi](https://github.com/Link-)

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

See ``LICENSE`` for more information.