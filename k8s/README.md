# Minikube

```
# Start minikube
minikube start
# Make sure the kubernetes version used is supported!!
minikube start --memory='8000mb' --cpus=4 --kubernetes-version=v1.16.9
eval (minikube docker-env)

# Enable necessary addons
minikube addons enable ingress
minikube addons enable registry
minikube addons enable registry-creds


## Make sure there are no conflicting DNS services running
# Check what's running on port 53
sudo lsof -i :53
sudo launchctl unload /Library/LaunchDaemons/com.opendns.osx.RoamingClientConfigUpdater.plist
```

### Using canister (CRAP)
```
docker login --username=interop cloud.canister.io:5000
docker tag <image name> cloud.canister.io:5000/interop/<repo>
docker push cloud.canister.io:5000/interop/<repo>

# Create Kubernetes secret
kubectl create secret docker-registry canister.io --docker-server=cloud.canister.io:5000 --docker-username=interop --docker-password=<password> --docker-email=bassem@interop.link
```

### Using Treescale (CRAP)
```
docker login repo.treescale.com
```

### Using AWS ECR

Generated password expired every 12 hours.

```
# Get ECR password to authenticate with the registry
aws ecr get-login-password --profile personal --region eu-west-1
docker login -u AWS https://730880032795.dkr.ecr.eu-west-1.amazonaws.com -p 

# Configure registry with minikube

minikube addons configure registry-creds
```

### Istio
```
# Install demo profile (contains everything)
istioctl manifest apply --set profile=demo

# Label namespace for istio to inject side-car into pods belonging to this namespace
kubectl label namespace <namespace> istio-injection=enabled
kubectl get namespace -L istio-injection

# Envoy
istioctl dashboard envoy <podname>.<namespace>



```

<!-- ```
# Prometheus
kubectl -n istio-system port-forward (kubectl -n istio-system get pod -l app=prometheus -o jsonpath='{.items[0].metadata.name}') 9090:9090 &
istioctl dashboard prometheus
```

```
# Kibana
kubectl -n logging port-forward (kubectl -n logging get pod -l app=kibana -o jsonpath='{.items[0].metadata.name}') 5601:5601 &
http://localhost:5601
``` -->

<!-- ### Local registry
```
# Enable port fowarding
kubectl port-forward --namespace kube-system (kubectl get po -n kube-system | grep kube-registry-v0 | awk '{print $1;}') 5000:5000

# Make sure the following is in the /etc/hosts file
127.0.0.1	localhost registry.local
``` -->

### Test
```
# Alpine
kubectl run alpine-util --image=alpine:latest -it /bin/sh
```

```
# Weave
kubectl port-forward svc/weave-scope-app -n weave 4040:80
```

### Misc
```
# Monitoring
watch -n 3 kubectl get pods -n default

# Useful
kubectl -n default logs -f deployment/service-payments-deployment --all-containers=true --since=10m
```

### References
- https://kubernetes.io/docs/reference/kubectl/cheatsheet/
- https://blog.hasura.io/sharing-a-local-registry-for-minikube-37c7240d0615/
- https://caylent.com/50-useful-kubernetes-tools#Mon
- https://istio.io/docs/tasks/observability/logs/fluentd/