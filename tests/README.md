## Pre-requisites

```
kubectl apply -f ./destination_rules_all.yml
```

### Tests

#### Basic traffic

```
curl -G fintech.demo.local/auth/v1/authenticate
watch -n 3 curl -G fintech.demo.local/customer/v1/login
watch -n 3 curl -G fintech.demo.local/payments/v1/pay
```

```
while true
    curl -G http://fintech.demo.local/customer/v1/login
    echo "---\n"
    sleep 0.5
end
```

### Tripping circuit breaker

```
fortio load -c 15 -qps 0 -t 30s -loglevel Warning http://fintech.demo.local/customer/v1/login
```

```
fortio load -c 15 -qps 0 -t 30s -loglevel Warning http://fintech.demo.local/customer/v1/login
```