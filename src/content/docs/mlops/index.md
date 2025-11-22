---
title: MLOps Fundamentals - AI Systems Engineering
description: Deploying and managing machine learning models in production with monitoring, scalability, and DevOps best practices.
---

# MLOps Fundamentals: Deploying AI Systems at Scale

MLOps bridges Machine Learning and Operations, enabling you to deploy, monitor, and maintain ML models in production reliably. Think of it as DevOps for AI - automating the lifecycle of your intelligent systems.

## 🤖 What is MLOps?

**MLOps = ML + DevOps**

It applies software engineering principles to ML systems:

- **Model as Code**: Models are versioned, tested, and deployed like software
- **Infrastructure as Code**: ML infrastructure is automated and reproducible
- **Continuous Integration/Delivery**: Models are continuously trained and deployed
- **Observability**: Performance metrics, data drift detection, and system health

## 🏗️ The MLOps Lifecycle

### **1. Data Management**
```python
# Data versioning with DVC
pip install dvc
dvc init

# Track data changes
dvc add data/raw.csv
git add data/.gitignore data/raw.csv.dvc
git commit -m "Add raw dataset"
```

### **2. Experimentation**
Track experiments with MLflow:

```python
import mlflow
import mlflow.sklearn

# Start experiment tracking
mlflow.set_experiment("fraud_detection_v2")

with mlflow.start_run():
    # Train model
    model = train_model(X_train, y_train)

    # Log parameters, metrics, and model
    mlflow.log_param("learning_rate", 0.01)
    mlflow.log_metric("accuracy", accuracy_score)
    mlflow.sklearn.log_model(model, "model")
```

### **3. Model Training Pipelines**
Use pipelines for reproducible training:

```python
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier

# Create ML pipeline
ml_pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('classifier', RandomForestClassifier(n_estimators=100))
])

# Train and save
ml_pipeline.fit(X_train, y_train)
joblib.dump(ml_pipeline, 'models/fraud_detector.pkl')
```

### **4. Model Deployment**

#### **Containerization for ML**
```dockerfile
# Multi-stage Dockerfile for ML
FROM python:3.9-slim as base

# Install system dependencies for CV/ML
RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

FROM base as builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --user -r requirements.txt

FROM base
# Copy only runtime dependencies
COPY --from=builder /root/.local /root/.local
COPY models/ ./models/
COPY src/app.py .

EXPOSE 8000
CMD ["python", "src/app.py"]
```

#### **Serving with FastAPI**
```python
from fastapi import FastAPI, File, UploadFile
from PIL import Image
import torch
import torchvision.transforms as transforms

app = FastAPI(title="Ona Vision API")

# Load ML model
model = torch.load('models/ona_vision.pt')
model.eval()

@app.post("/detect")
async def detect_objects(file: UploadFile = File(...)):
    # Preprocess image
    image = Image.open(file.file)
    transform = transforms.Compose([
        transforms.Resize((640, 640)),
        transforms.ToTensor(),
    ])
    processed_image = transform(image).unsqueeze(0)

    # Run inference
    with torch.no_grad():
        predictions = model(processed_image)

    # Return detections
    return {"detections": process_predictions(predictions)}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "model": "ona_vision_v1.2"}
```

## 📊 Model Monitoring & Observability

### **Performance Monitoring**
Track model performance in production:

```python
import prometheus_client as prom

# Define metrics
inference_time = prom.Histogram(
    'model_inference_duration_seconds',
    'Time spent processing inference'
)
prediction_confidence = prom.Gauge(
    'model_prediction_confidence',
    'Prediction confidence score'
)
model_accuracy = prom.Gauge(
    'model_accuracy', 'Model accuracy on validation set'
)

@app.middleware("http")
async def monitor_requests(request, call_next):
    start_time = time.time()
    response = await call_next(request)
    inference_time.observe(time.time() - start_time)
    return response
```

### **Data Drift Detection**
Monitor for changes in input data distribution:

```python
import numpy as np
from scipy.stats import ks_2samp

def detect_data_drift(reference_data, new_data, threshold=0.05):
    """
    Kolmogorov-Smirnov test for data drift
    """
    drift_detected = False

    for feature in reference_data.columns:
        ref_vals = reference_data[feature].values
        new_vals = new_data[feature].values

        # KS test
        statistic, p_value = ks_2samp(ref_vals, new_vals)

        if p_value < threshold:
            drift_detected = True
            logger.warning(f"Data drift detected in {feature}")

    return drift_detected
```

## 🔄 ML Pipelines with CI/CD

### **GitHub Actions for ML**
```yaml
name: ML Training Pipeline

on:
  push:
    branches: [ main ]
  schedule:
    - cron: '0 2 * * 1'  # Monday 2 AM

jobs:
  train:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - name: Set up Python
      uses: actions/setup-python@v4
      with:
        python-version: '3.9'

    - name: Install dependencies
      run: |
        pip install -r requirements.txt

    - name: Run tests
      run: pytest

    - name: Train model
      run: python src/train.py

    - name: Evaluate model
      run: python src/evaluate.py

    - name: Upload model artifact
      uses: actions/upload-artifact@v3
      with:
        name: trained-model
        path: models/
```

### **Model Versioning**
Use DVC for model and data versioning:

```bash
# Initialize DVC
dvc init
dvc add models/model.pkl
dvc add data/processed/

# Track with Git
git add models/model.pkl.dvc
git commit -m "Update model v2.1"

# Push to remote storage
dvc push
```

## 🎯 Real-World MLOps: FraudFlow

Building the fraud detection system from my experience:

### **Architecture**
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Data Ingestion│───▶│  Feature Engineering │───▶│   ML Training    │
│   (Kafka)       │    │  (Apache Beam)  │    │   (TensorFlow)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                                        │
┌─────────────────┐    ┌─────────────────┐               ▼
│Model Deployment │◀───│ Model Validation │    ┌─────────────────┐
│  (Kubernetes)   │    │  (TFX/MLflow)  │    │ Model Monitoring │
└─────────────────┘    └─────────────────┘    │  (Prometheus)   │
                                               └─────────────────┘
```

### **Key Components**

#### **Model Serving**
```python
# TensorFlow Serving with gRPC
from tensorflow_serving.apis import predict_pb2, prediction_service_pb2_grpc

def predict_fraud(transaction_features):
    # Create prediction request
    request = predict_pb2.PredictRequest()
    request.model_spec.name = 'fraud_detector'
    request.model_spec.signature_name = 'serving_default'

    # Add input data
    request.inputs['features'].CopyFrom(
        tf.make_tensor_proto(transaction_features)
    )

    # Get prediction
    stub = prediction_service_pb2_grpc.PredictionServiceStub(channel)
    result = stub.Predict(request)

    return result.outputs['fraud_probability']
```

#### **Continuous Training**
```yaml
# Cloud Build for retraining
steps:
- name: 'gcr.io/cloud-builders/docker'
  args: ['build', '-t', 'fraud-trainer', '.']

- name: 'fraud-trainer'
  args: ['python', 'train.py']

- name: 'gcr.io/cloud-builders/docker'
  args: ['build', '-t', 'gcr.io/$PROJECT_ID/fraud-detector:$COMMIT_SHA', 'serving/']

- name: 'gcr.io/cloud-builders/kubectl'
  args:
    - 'set'
    - 'image'
    - 'deployment/fraud-detector'
    - 'fraud-detector=gcr.io/$PROJECT_ID/fraud-detector:$COMMIT_SHA'
```

## 📈 Scaling ML Systems

### **Batch vs Real-time Inference**

#### **Batch Processing** (Offline)
```python
# Process large datasets offline
def batch_predict(data_path, model_path, output_path):
    model = load_model(model_path)
    data = load_data(data_path)

    predictions = []
    for batch in data.batch(1000):
        pred = model.predict(batch)
        predictions.extend(pred)

    save_predictions(predictions, output_path)
```

#### **Real-time Inference** (Online)
```python
# Low-latency predictions for live data
@app.post("/predict")
async def predict_real_time(features: TransactionFeatures):
    # Transform features
    processed_features = preprocess_transaction(features.dict())

    # Check feature drift
    if detect_drift(processed_features):
        trigger_model_retraining()

    # Make prediction
    fraud_prob = await model.predict_async(processed_features)

    return {
        "fraud_probability": fraud_prob,
        "threshold": 0.75,
        "is_fraud": fraud_prob > 0.75
    }
```

## 🏆 MLOps Best Practices

### **1. Model Validation**
```python
def validate_model(model, test_data, thresholds):
    """Comprehensive model validation"""
    predictions = model.predict(test_data.X)

    metrics = {
        'accuracy': accuracy_score(test_data.y, predictions),
        'precision': precision_score(test_data.y, predictions),
        'recall': recall_score(test_data.y, predictions),
        'f1': f1_score(test_data.y, predictions)
    }

    # Check if all metrics meet thresholds
    passed = all(
        metrics[metric] >= thresholds[metric]
        for metric in thresholds
    )

    return metrics, passed
```

### **2. A/B Testing**
```python
def ab_test_models(model_a, model_b, traffic_split=0.5):
    """Route traffic between models for comparison"""
    import random

    @app.post("/predict")
    def predict_with_ab_test(features):
        if random.random() < traffic_split:
            model = model_a
            version = "A"
        else:
            model = model_b
            version = "B"

        prediction = model.predict(features)

        # Log for analysis
        log_prediction(features, prediction, version)

        return {"prediction": prediction, "model_version": version}
```

## 🎓 Essential MLOps Tools

- **Experiment Tracking**: MLflow, Weights & Biases, Comet ML
- **Model Registry**: MLflow Model Registry, Azure ML
- **Serving**: TensorFlow Serving, TorchServe, BentoML
- **Pipelines**: Kubeflow, Apache Airflow, Prefect
- **Monitoring**: Prometheus, Grafana, Evidently AI
- **Versioning**: DVC, Pachyderm

## ➡️ Next Steps

Ready to operationalize your ML models? We'll cover:

- **Advanced Deployment**: Multi-model serving and model ensembles
- **Ethical AI**: Bias detection and fairness in production
- **Edge Deployment**: Running ML on IoT devices
- **Cost Optimization**: Reducing inference costs at scale

Your ML models deserve production-ready infrastructure. Let's build it!

[Continue to: Containerizing ML Models](/mlops/model-containers)
