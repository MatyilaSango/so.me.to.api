#!/bin/bash

echo "------- Starting operations --------"

# Gateway service operation

gateway=gateway
auth=auth

echo Moving to $gateway directory

cd gateway

docker build -t gateway .

echo Finished building image $gateway

# Auth service operation

cd ../microservices/auth

echo Moving to $auth directory

docker build -t auth .

echo Finished building image $auth

## Docker compose

docker-compose up
