# mockapi
Dockerized express microservice that exposes a simple endpoint and health checks

```
http://localhost:3005/app
http://localhost:3005/customer/login

http://localhost:9005/ready
http://localhost:9005/live
http://localhost:9005/health
```

```
$: docker build -t mockapi/service-customer:v1 .
$: docker run -p 3005:3005 -p 9005:9005 mockapi/service-customer

# Tag image
docker tag mockapi/service-customer:v1 cloud.canister.io:5000/interop/service-customer:v1

# Push image
docker push cloud.canister.io:5000/interop/service-customer:v1
```

```
PORT=80
AUTHENTICATION_SERVICE_URL=http://http.TCP.service-auth-deployment.default.svc.cluster.local/authenticate
```