# Deploying the shop with Docker and Kubernetes

The site runs as three containers: nginx serving the React build, the Express API, and MongoDB.

```
browser --> frontend (nginx :80) --/api--> backend (Express :8000) --> mongo (:27017) + volume
```

Only the frontend is published. The browser calls `/api/...` on the same address and nginx forwards it to the backend.

## 0. Install the tools (Arch Linux)

```
sudo pacman -S docker docker-compose docker-buildx kubectl minikube
sudo systemctl enable --now docker
sudo usermod -aG docker $USER      # then log out and back in
docker run hello-world
```

## 1. Run everything with Docker Compose

```
cp .env.example .env               # set JWT_SECRET and ADMIN_PASSWORD
docker compose up -d --build
docker compose ps
docker compose exec backend node seed.js    # admin account + sample products
```

Open http://localhost:8080

Inside Docker the database is called `shop`, separate from the `sunwayL2` database you use while developing.

Data persistence check: `docker compose down`, then `docker compose up -d`. The products are still there because of the `mongo-data` volume. `docker compose down -v` deletes the volume as well.

## 2. Push the images to Docker Hub

```
docker login
export DOCKERHUB_USER=your-dockerhub-username
docker tag shop-backend  $DOCKERHUB_USER/shop-backend:v1
docker tag shop-frontend $DOCKERHUB_USER/shop-frontend:v1
docker push $DOCKERHUB_USER/shop-backend:v1
docker push $DOCKERHUB_USER/shop-frontend:v1
```

Leave the repositories public so the cluster can pull them.

## 3. Deploy to Kubernetes (Minikube)

```
minikube start --driver=docker
kubectl get nodes

# put your Docker Hub name into the manifests
sed -i "s/YOUR_DOCKERHUB_USERNAME/$DOCKERHUB_USER/" k8s/02-backend.yaml k8s/03-frontend.yaml

# credentials live in a Secret, never in the repo
kubectl create secret generic shop-secret \
  --from-literal=JWT_SECRET="$(openssl rand -hex 32)" \
  --from-literal=ADMIN_EMAIL=admin@store.com \
  --from-literal=ADMIN_PASSWORD='choose-a-password'

kubectl apply -f k8s/01-mongo.yaml
kubectl apply -f k8s/02-backend.yaml
kubectl apply -f k8s/03-frontend.yaml
kubectl get pods -w                         # wait until all are Running and 1/1

kubectl exec deploy/backend -- node seed.js
minikube service frontend --url             # open the printed address in your browser
```

### Scale and self-heal

```
kubectl scale deployment frontend --replicas=4
kubectl get pods
kubectl delete pod <one-backend-pod-name>   # Kubernetes starts a replacement
kubectl get pods
```

### Rolling update

Rebuild and push a `:v2` image, then:

```
kubectl set image deployment/backend backend=$DOCKERHUB_USER/shop-backend:v2
kubectl rollout status deployment/backend
kubectl rollout undo deployment/backend     # go back if something is wrong
```

## 4. Clean up

```
kubectl delete -f k8s/
kubectl delete secret shop-secret
minikube stop
docker compose down
```

## Command cheat sheet

| Task | Command |
|---|---|
| Build and start | `docker compose up -d --build` |
| Container status | `docker compose ps` |
| Backend logs | `docker compose logs backend` |
| Open the database shell | `docker exec -it shop-mongo mongosh shop` |
| Stop / start | `docker compose stop` / `docker compose start` |
| Remove containers (keep data) | `docker compose down` |
| Remove containers and data | `docker compose down -v` |
| Pods, services | `kubectl get pods,svc` |
| Pod details and events | `kubectl describe pod <name>` |
| Pod logs | `kubectl logs deploy/backend` |
| Scale | `kubectl scale deployment backend --replicas=3` |

## Troubleshooting

| Problem | Fix |
|---|---|
| `permission denied ... docker.sock` | Run `sudo usermod -aG docker $USER`, then log out and back in. |
| `port is already allocated` on 8080 | Change `"8080:80"` in `docker-compose.yml`. |
| Backend exits right away | `docker compose logs backend`. Usually `JWT_SECRET` is missing from `.env`. |
| Login or products fail, page shows errors | Check `docker compose ps`. All three containers should be Up. |
| `ImagePullBackOff` in Kubernetes | Wrong Docker Hub username in the manifests, image not pushed, or repository is private. |
| `CrashLoopBackOff` on backend | `kubectl logs deploy/backend`. Missing secret, or MongoDB is not ready yet (it retries). |
| Frontend pod `CrashLoopBackOff` (host not found "backend") | Apply `02-backend.yaml` before `03-frontend.yaml`, then `kubectl rollout restart deployment/frontend`. |
| Mongo PVC stays `Pending` | `minikube addons enable storage-provisioner` and `minikube addons enable default-storageclass`. |
| `minikube service` does not open a browser | Use `--url` and paste the address into your browser. |
