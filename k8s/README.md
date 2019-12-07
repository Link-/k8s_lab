# Minikube

```
# Start minikube
minikube start
minikube start --memory='3000mb' --cpus=4
```

Using canister
```
docker login --username=interop cloud.canister.io:5000
docker tag <image name> cloud.canister.io:5000/interop/<repo>
docker push cloud.canister.io:5000/interop/<repo>

# Create Kubernetes secret
kubectl create secret docker-registry canister.io --docker-server=cloud.canister.io:5000 --docker-username=interop --docker-password=<password> --docker-email=bassem@interop.link

```

Local registry
```
# Enable port fowarding
kubectl port-forward --namespace kube-system (kubectl get po -n kube-system | grep kube-registry-v0 | awk '{print $1;}') 5000:5000

# Make sure the following is in the /etc/hosts file
127.0.0.1	localhost registry.local
```

```
# Alpine
kubectl run alpine-util --image=alpine:latest -it /bin/sh
```

```
# Weave
kubectl port-forward svc/weave-scope-app -n weave 4040:80
```

```
# Useful
kubectl -n default logs -f deployment/service-payments-deployment --all-containers=true --since=10m
```

```
# istio
# Label namespace for istio
kubectl label namespace <namespace> istio-injection=enabled
kubectl get namespace -L istio-injection
```

```
# Prometheus
kubectl -n istio-system port-forward (kubectl -n istio-system get pod -l app=prometheus -o jsonpath='{.items[0].metadata.name}') 9090:9090 &
istioctl dashboard prometheus
```

### References
- https://kubernetes.io/docs/reference/kubectl/cheatsheet/
- https://blog.hasura.io/sharing-a-local-registry-for-minikube-37c7240d0615/
- https://caylent.com/50-useful-kubernetes-tools#Mon