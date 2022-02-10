docker build -t sagi403/multi-client:latest -t sagi403/multi-client:$SHA -f ./client/Dockerfile ./client
docker build -t sagi403/multi-server:latest -t sagi403/multi-server:$SHA -f ./server/Dockerfile ./server
docker build -t sagi403/multi-worker:latest -t sagi403/multi-worker:$SHA -f ./worker/Dockerfile ./worker

docker push sagi403/multi-client:latest
docker push sagi403/multi-server:latest
docker push sagi403/multi-worker:latest

docker push sagi403/multi-client:$SHA
docker push sagi403/multi-server:$SHA
docker push sagi403/multi-worker:$SHA

kubectl apply -f k8s
kubectl set image deployments/server-deployment server=sagi403/multi-server:$SHA
kubectl set image deployments/client-deployment client=sagi403/multi-client:$SHA
kubectl set image deployments/worker-deployment worker=sagi403/multi-worker:$SHA