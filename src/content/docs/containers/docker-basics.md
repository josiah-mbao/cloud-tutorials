---
title: Docker Basics - Containerizing Your First Application (Tutorial)
description: A hands-on tutorial for software engineers to understand and use Docker, focusing on creating a Dockerfile, building an image, and running a container.
---

# 1. Docker Basics: Containerizing Your First Application 🐳

In the world of DevOps, we often say: **"It works on my machine" is a failure state.**

Containers, specifically using **Docker**, solve this problem. Docker allows us to package an application—including all its code, libraries, dependencies, and configuration—into a single, consistent unit called an **image**. This image can then run anywhere (your laptop, a cloud server, a Kubernetes cluster) exactly the same way.

In this tutorial, **we will containerize a simple Python web application** to understand the core workflow: **Write a Dockerfile $\rightarrow$ Build an Image $\rightarrow$ Run a Container.**

## Prerequisites

Before we begin, you need to have:
1.  **Docker Desktop** installed on your system.
2.  A text editor (VS Code, Sublime, etc.).
3.  A Terminal/Command Prompt.

## Step 1: Set Up Our Tiny Python App

First, we need something to containerize. **We will create a simple Python web server** that prints a message.

### 1.1. Create a Project Folder

Open your Terminal and run these commands to set up the necessary files:

```bash
# Create and enter the project directory
$mkdir docker-basics-app$ cd docker-basics-app

# Create a file for the Python code
$ touch app.py

# Create a file for Python dependencies
$ touch requirements.txt
```

### 1.2 Write the Application Code

Open app.py in your text editor and add the following code:

```python
# app.py
from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello from our Docker Container! - Josiah'

if __name__ == '__main__':
    # We will run this app on port 8080 inside the container
    app.run(debug=True, host='0.0.0.0', port=8080)
```

Notice that we are binding the app to 0.0.0.0 so it's accessible from outside the container.

### 1.3 Define the Dependencies

Open requirements.txt and add the single required library:

```plaintext
# requirements.txt
Flask
```

# Step 2: Write the Dockerfile

The Dockerfile is a text file containing all the commands Docker needs to assemble the image. Think of it as a recipe book.

We will now create a file named Dockerfile (no file extension!) in the docker-basics-app directory.


### 2.1 Create the Dockerfile
```bash
touch Dockerfile
```

### 2.3. Add the Instructions

Open `Dockerfile` and add these instructions:
```Dockerfile
# Dockerfile

# 1. Base Image: We start from a base Python image (official, lightweight)
FROM python:3.9-slim

# 2. Set Working Directory: This is the directory inside the image where our app lives
WORKDIR /app

# 3. Copy Requirements: Copy the dependencies file into the working directory
COPY requirements.txt .

# 4. Install Dependencies: Run the package installer inside the image
RUN pip install --no-cache-dir -r requirements.txt

# 5. Copy Application: Copy the rest of our app code into the image
COPY app.py .

# 6. Expose Port: Inform Docker that the container listens on this port
EXPOSE 8080

# 7. Run Command: The command to execute when the container starts
CMD ["python", "app.py"]
```
**Notice that** we install dependencies before copying the application. This is a crucial best practice to take advantage of Docker's layer caching and speed up subsequent builds!

# Step 3: Build the Image

Now we execute the Dockerfile to create our image. **We will name the image** my-web-app and tag it with :v1.0

Run the following command in your project directory (docker-basics-app):
```bash
# The '.' at the end tells Docker to look for the Dockerfile in the current directory
docker build -t my-web-app:v1.0 .
```

You will see several steps run, corresponding to the lines in your Dockerfile.
- The output should show Successfully built [Image ID] and Successfully tagged my-web-app:v1.0

**Let's check** if the image was built successfully:
```bash
docker images
```
**You should see** my-web-app listed in the output. This is your reproducible, portable application package!

# Step 4: Run the Container

The image is the static blueprint; the **container** is the live, running instance. **We will now run our miage as a container.**
```bash
# -d: Run in detached mode (background)
# -p 80:8080: Map host port 80 to container port 8080
# --name: Give the running container a friendly name
docker run -d -p 80:8080 --name running-app my-web-app:v1.0
```
**The output should be a long string (the Container ID).** This confirms the container is running in the background.

# Step 5: Verify the Result (Success!)
We can confirm the app is running by checking the active containers and then accessing the app.

## 5.1. Check Container Status
```bash
docker ps
```
**You should see** running-app listed with a status of Up and the ports 0.0.0.0:80->8080/tcp mapped.

## 5.2. Access the Apllication

Open your web browser and navigate to:
```plaintext
http://localhost/
**You should see the message:** "Hello from our Docker Container! - Josiah.
```

Congratulations! **We have built and deployed a self-contained. portable web application.** This is the foundational action that powers large-scale systems, from simple backends to complex MLOps pipelines!

# ➡️ Next: Managing Multiple Containers
Docker is powerful, but what if your application needs a database, a cache, and a backend service (like in your Ona Vision project)? Running multiple containers manually gets complicated fast.

Next, we'll look at Docker Compose, the tool we use to orchestrate multi-container local environments.

[Continue to: Docker Compose](/containers/docker-compose)
