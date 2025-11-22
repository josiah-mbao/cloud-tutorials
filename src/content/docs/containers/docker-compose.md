---
title: Docker Compose - Orchestrating Multi-Container Applications
description: Managing complex applications with multiple containers using Docker Compose for local development and testing.
---

# Docker Compose: Orchestrating Multi-Container Applications 🐳⚖️

Single containers are great, but real applications rarely run in isolation. Your web app needs a database, your ML pipeline needs message queues, and everything needs networking. Manual container management becomes a nightmare.

**Docker Compose** solves this by allowing you to define and run multi-container applications with a single YAML file. Think of it as the conductor orchestrating your container symphony.

## 🎭 The Problem Compose Solves

> **Before Compose**: Running a web app with PostgreSQL required:
> ```bash
> # Terminal 1
> docker run -d --name postgres -e POSTGRES_PASSWORD=mypassword postgres:13
>
> # Terminal 2
> docker network create my-network
> docker network connect my-network postgres
>
> # Terminal 3
> docker run -d --name web-app --network my-network -e DATABASE_URL=... my-web-app
> ```
> Chaos! Multiple terminals, manual networking, environment variables everywhere.

> **With Compose**: One file, one command:
> ```bash
> docker compose up -d
> ```

## 🏗️ Your First docker-compose.yml

Create a `docker-compose.yml` file in your project root:

```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://user:password@db:5432/mydb
    depends_on:
      - db

  db:
    image: postgres:13
    environment:
      - POSTGRES_DB=mydb
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

**Let's break it down:**

### **Services**
Each service defines a container:
- `web`: Our application container (built from local Dockerfile)
- `db`: PostgreSQL database (uses pre-built image)

### **Networking**
Compose automatically creates a network. Services communicate using service names as hostnames (`db`, not `localhost`).

### **Volumes**
Persistent data storage that survives container restarts.

### **Dependencies**
`depends_on` ensures database starts before the web app.

## 🚀 Running Your Stack

### **Start Everything**
```bash
docker compose up -d
```

### **View Logs**
```bash
# All services
docker compose logs

# Specific service
docker compose logs web

# Follow logs in real-time
docker compose logs -f
```

### **Stop Everything**
```bash
docker compose down
```

### **Rebuild and Restart**
```bash
# Rebuild after code changes
docker compose up --build -d

# Force rebuild everything
docker compose up --build --force-recreate -d
```

## 📋 Essential Compose Commands

| Command | Description |
|---------|-------------|
| `docker compose up -d` | Start all services in background |
| `docker compose down` | Stop and remove all services |
| `docker compose ps` | Show running services |
| `docker compose logs -f` | Follow logs from all services |
| `docker compose exec web bash` | Run command in running container |
| `docker compose restart web` | Restart specific service |
| `docker compose up --scale web=3` | Scale service to 3 replicas |

## 🏗️ Advanced Configuration

### **Environment Files**
Keep secrets out of your compose file:

```yaml
# docker-compose.yml
services:
  web:
    env_file:
      - .env

  db:
    env_file:
      - .env.db
```

```bash
# .env
DATABASE_URL=postgresql://user:password@db:5432/mydb

# .env.db
POSTGRES_PASSWORD=mysecretpassword
```

### **Development vs Production**
Use profiles to run different services:

```yaml
services:
  web:
    # Always runs
    build: .

  nginx:
    # Only in production
    profiles: ["prod"]
    image: nginx:alpine

  debugger:
    # Only in development
    profiles: ["dev"]
    image: debug-tool:latest
```

```bash
# Development
docker compose --profile dev up

# Production
docker compose --profile prod up
```

## 🌐 Networking Deep Dive

### **Default Network**
Compose creates a bridge network automatically. Services communicate via service names.

### **Custom Networks**
For more complex setups:

```yaml
networks:
  frontend:
    driver: bridge
  backend:
    driver: bridge

services:
  nginx:
    networks:
      - frontend
      - backend

  web:
    networks:
      - backend

  db:
    networks:
      - backend
```

### **External Networks**
Connect to networks from other compose files:

```yaml
networks:
  proxy:
    external: true
```

## 📊 Volumes and Persistence

### **Named Volumes**
```yaml
volumes:
  postgres_data:
    driver: local
  redis_data:

services:
  db:
    volumes:
      - postgres_data:/var/lib/postgresql/data
  cache:
    volumes:
      - redis_data:/data
```

### **Bind Mounts**
Mount host directories (great for development):

```yaml
services:
  web:
    volumes:
      - ./src:/app/src  # Host path : Container path
      - /app/node_modules  # Anonymous volume for node_modules
```

### **File-Based Volumes**
```yaml
volumes:
  postgres_data:
    driver_opts:
      type: tmpfs
      device: tmpfs
```

## 🧪 Testing with Compose

### **Integration Tests**
Create a separate compose file for testing:

```yaml
# docker-compose.test.yml
version: '3.8'

services:
  web:
    build: .
    command: npm test
    environment:
      - NODE_ENV=test
    depends_on:
      - db
      - cache

  db:
    image: postgres:13-alpine
    environment:
      - POSTGRES_DB=test

  cache:
    image: redis:alpine
```

```bash
docker compose -f docker-compose.test.yml up --abort-on-container-exit
```

## 🚀 Production Considerations

### **Health Checks**
```yaml
services:
  web:
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    depends_on:
      db:
        condition: service_healthy

  db:
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 30s
      timeout: 10s
      retries: 3
```

### **Resource Limits**
```yaml
services:
  web:
    deploy:
      resources:
        limits:
          cpus: '0.50'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M
```

## 🔧 Troubleshooting

### **Common Issues**

#### **Port Conflicts**
```bash
# Check what's using port 5432
lsof -i :5432

# Change port mapping
ports:
  - "5433:5432"  # Host:Container
```

#### **Database Connection Issues**
```bash
# Connect to database container
docker compose exec db psql -U user -d mydb

# Check network
docker compose exec web ping db
```

#### **Clean Restart**
```bash
# Remove everything
docker compose down -v --remove-orphans

# Start fresh
docker compose up -d
```

## 🎯 Real-World: Ona Vision Stack

How I deploy the computer vision system locally:

```yaml
version: '3.8'

services:
  ona-vision:
    build:
      context: .
      dockerfile: Dockerfile.ml
    ports:
      - "8000:8000"
    volumes:
      - ./models:/app/models
      - ./videos:/app/videos
    environment:
      - REDIS_URL=redis://cache:6379
      - PROMETHEUS_PORT=9090
    depends_on:
      - cache
      - prometheus

  cache:
    image: redis:alpine
    ports:
      - "6379:6379"

  prometheus:
    image: prom/prometheus:latest
    volumes:
      - ./monitoring/prometheus.yml:/etc/prometheus/prometheus.yml
    ports:
      - "9090:9090"

  grafana:
    image: grafana/grafana:latest
    volumes:
      - grafana_data:/var/lib/grafana
    ports:
      - "3000:3000"
    depends_on:
      - prometheus

volumes:
  grafana_data:
```

## 📚 Best Practices

### **1. Keep it Simple**
Start with minimal services, add complexity gradually.

### **2. Use Environment Files**
Never commit secrets to version control.

### **3. Version Your Compose Files**
Use `version: '3.8'` for latest features.

### **4. Name Your Resources**
Avoid auto-generated names for volumes and networks.

### **5. Document Everything**
Add comments explaining complex configurations.

## ➡️ Next Steps

Now that you can orchestrate containers locally, you're ready for:
- **Kubernetes**: Production-scale orchestration
- **Helm**: Packaging complex applications
- **Service Mesh**: Advanced networking with Istio/Linkerd

Master Docker Compose, and you'll have the foundation for any modern application architecture!

[Continue to: Introduction to Kubernetes](/kubernetes)
