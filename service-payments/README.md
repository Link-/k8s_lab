# mockapi
Dockerized express microservice that exposes a simple endpoint and health checks

```
http://localhost:3005/app
http://localhost:3005/payments/

http://localhost:9005/ready
http://localhost:9005/live
http://localhost:9005/health
```

```
docker build -t cloud.canister.io:5000/interop/service-payments:v1 .
docker run -p 3005:3005 -p 9005:9005 cloud.canister.io:5000/interop/service-payments

# Tag image
docker tag mockapi/service-payments:v1 cloud.canister.io:5000/interop/service-payments:v1

# Push image
docker push cloud.canister.io:5000/interop/service-payments:v1
```

```
PORT=80
CUSTOMER_SERVICE_LOGIN_URL=http://http.TCP.service-customer-deployment.default.svc.cluster.local/login
MOCKY_EXTERNAL_URL=http://www.mocky.io/v2/5db852283b0000eda535f04e
```