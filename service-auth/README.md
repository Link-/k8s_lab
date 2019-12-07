# mockapi
Dockerized express microservice that exposes a simple endpoint and health checks

```
http://localhost:3005/app
http://localhost:3005/authenticate

http://localhost:9005/ready
http://localhost:9005/live
http://localhost:9005/health
```

```
$: docker build -t mockapi/service-auth:v1 .
$: docker run -p 3005:3005 -p 9005:9005 mockapi/service-auth

# Tag image
docker tag mockapi/service-auth:v1 cloud.canister.io:5000/interop/service-auth:v1

# Push image
docker push cloud.canister.io:5000/interop/service-auth:v1
```

```
PORT=80
```