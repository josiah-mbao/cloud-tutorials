---
title: Introduction to Kubernetes
description: Understanding container orchestration with Kubernetes - the foundation for scalable, production-ready deployments.
---

# Introduction to Kubernetes: Orchestrating Containers at Scale

Kubernetes (K8s) is the industry-standard platform for automating deployment, scaling, and management of containerized applications. Think of it as the "operating system" for your cloud infrastructure - managing where and how your containers run.

## 🏗️ Why Kubernetes?

> **The Old Problem**: You have multiple Docker containers that need to work together. You manually coordinate which containers run on which servers, how they communicate, and what happens when a server fails. Chaos ensues.

> **Kubernetes Solution**: K8s automates this entire process. It treats your containers like cattle, not pets - if one fails, another automatically replaces it.

## 🏛️ Kubernetes Architecture

### **The Control Plane** (Brain)
The control plane makes global decisions about the cluster and detects/responds to events:

- **API Server**: The front-end for Kubernetes - all admin operations go through here
- **etcd**: Distributed key-value store that stores Kubernetes cluster data
- **Scheduler**: Assigns Pods to Nodes based on resource requirements and constraints
- **Controller Manager**: Runs controller processes that handle routine tasks

### **Nodes** (Workers)
The worker machines that run your containerized applications:

- **kubelet**: Runs on each node, ensures containers are running in Pods
- **kube-proxy**: Network proxy that maintains network rules on nodes
- **Container Runtime**: Usually Docker or containerd

## 📦 Core Kubernetes Objects

### **Pods** - The Smallest Deployable Unit
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-simple-pod
spec:
  containers:
  - name: my-app
    image: nginx:latest
    ports:
    - containerPort: 80
```

**Think of Pods as envelopes**: They can contain one or more containers that work together. In practice, most Pods have a single container.

### **Services** - Network Abstractions
Services provide stable networking and load balancing for Pods:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-service
spec:
  selector:
    app: MyApp
  ports:
  - protocol: TCP
    port: 80
    targetPort: 9376
  type: ClusterIP  # LoadBalancer, NodePort, ClusterIP
```

### **Deployments** - Declarative Pod Management
Deployments manage ReplicaSets (which manage Pods) for zero-downtime updates:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.20
        ports:
        - containerPort: 80
```

## 🚀 Getting Started: Minikube

For development and learning, Minikube creates a local single-node Kubernetes cluster:

### **Installation**
```bash
# macOS with Homebrew
brew install minikube

# Linux
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube

# Windows
choco install minikube
```

### **Start Your Cluster**
```bash
minikube start

# Check status
minikube status

# Get cluster info
kubectl cluster-info
```

### **Your First Deployment**
```bash
# Create deployment
kubectl create deployment hello-minikube --image=k8s.gcr.io/echoserver:1.4

# Expose as service
kubectl expose deployment hello-minikube --type=LoadBalancer --port=8080

# Get service URL
minikube service hello-minikube --url

# Check pods
kubectl get pods

# View logs
kubectl logs deployment/hello-minikube
```

## 🔧 kubectl - Your Kubernetes Swiss Army Knife

kubectl is the command-line tool you use to interact with K8s clusters:

### **Basic Commands**
```bash
# View resources
kubectl get pods
kubectl get services
kubectl get deployments

# Describe resources (detailed info)
kubectl describe pod my-pod
kubectl describe deployment my-deployment

# Edit resources
kubectl edit deployment my-deployment

# Delete resources
kubectl delete pod my-pod
kubectl delete deployment my-deployment

# View logs
kubectl logs pod/my-pod
kubectl logs -f deployment/my-deployment  # Follow logs
```

### **Context and Configuration**
```bash
# View current context
kubectl config current-context

# Switch contexts
kubectl config use-context my-cluster

# View available contexts
kubectl config get-contexts
```

## ⚙️ Configuration with YAML

All Kubernetes resources are defined declaratively in YAML. Here's the structure:

```yaml
apiVersion: apps/v1          # API version
kind: Deployment            # Resource type
metadata:                   # Resource identification
  name: my-deployment
  labels:
    app: my-app
spec:                       # Resource specification
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
      - name: my-container
        image: nginx:latest
        ports:
        - containerPort: 80
```

## 📊 Observability in Kubernetes

### **Monitoring with Prometheus**
Install Prometheus in your cluster:

```bash
# Add Prometheus Helm repo
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm install prometheus prometheus-community/prometheus

# Port forward to access
kubectl port-forward svc/prometheus-server 9090:80
# Access at http://localhost:9090
```

### **Logging with Fluentd**
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: fluentd-config
data:
  fluent.conf: |
    <source>
      @type tail
      path /var/log/containers/*_kube-system_*.log
      pos_file /var/log/fluentd-containers.log.pos
      read_from_head true
      tag kubernetes.*
    </source>
```

## 🔄 Real-World Examples

### **Deploying Ona Vision**
Here's how we're moving our computer vision system to production:

1. **Build the Container**: Multi-stage Dockerfile for optimized CV pipeline
2. **Create Deployment**: GPU-enabled Pods with persistent storage
3. **Add Service**: LoadBalancer for external access
4. **Configure Autoscaling**: Scale based on CPU usage during peak times
5. **Set up Monitoring**: Track FPS, inference times, and detection accuracy

### **Zero-Downtime Updates**
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: cv-pipeline
spec:
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 1
      maxSurge: 1
  replicas: 3
  # ... rest of spec
```

## 🏆 Kubernetes Best Practices

### **Health Checks**
Always define readiness and liveness probes:

```yaml
spec:
  containers:
  - name: app
    image: my-app:latest
    livenessProbe:
      httpGet:
        path: /health
        port: 8080
      initialDelaySeconds: 30
      periodSeconds: 10
    readinessProbe:
      httpGet:
        path: /ready
        port: 8080
      initialDelaySeconds: 5
      periodSeconds: 5
```

### **Resource Limits**
Prevent resource starvation:

```yaml
spec:
  containers:
  - name: app
    resources:
      requests:
        memory: "128Mi"
        cpu: "100m"
      limits:
        memory: "512Mi"
        cpu: "500m"
```

### **Namespace Isolation**
Use namespaces to separate environments:

```bash
kubectl create namespace production
kubectl create namespace staging
kubectl create namespace development
```

## 🎓 Learning Resources

- **Official Docs**: kubernetes.io/docs
- **Minikube Tuturials**: minikube.sigs.k8s.io/docs
- **Kube by Example**: kubebyexample.com
- **Katacoda**: katacoda.com/courses/kubernetes

## ➡️ Next Steps

Now that you understand the basics, we'll dive deeper:

- **Advanced Networking**: Ingress, Network Policies
- **Storage**: Persistent Volumes, ConfigMaps, Secrets
- **Security**: RBAC, Pod Security Standards
- **Helm Charts**: Package manager for Kubernetes applications

Ready to deploy your first application? Let's create a production-ready web service next!

[Continue to: Deploying a Web Application](/kubernetes/web-deployment)
