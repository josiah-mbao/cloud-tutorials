---
title: GitHub Actions Tutorial - Automating Your First CI Pipeline
description: A hands-on tutorial to set up a GitHub Actions workflow to automatically build, test, and containerize our application from the Docker Basics guide.
---

# 2. GitHub Actions Tutorial: Automating Your First CI Pipeline 🤖

**GitHub Actions** is a free, powerful tool that lives inside your GitHub repository. It allows us to define automated workflows using simple YAML files. These workflows automatically run the **CI** steps—checking out code, running tests, and building the container—every time we make a change.

In this tutorial, **we will create a workflow** that automatically validates the application we built in the **Docker Basics** guide.

## Prerequisites

1.  We have completed the **Docker Basics** tutorial (`docker-basics-app`).
2.  The `docker-basics-app` code is pushed to a **GitHub repository** (ensure this is done now!).

## Step 1: Add a Basic Test File

CI pipelines require automated tests. **We will create a simple test** to confirm our application is ready for the pipeline.

### 1.1. Install `pytest` Locally

If you don't have it, install the testing framework and update your dependencies file:

```bash
# In your docker-basics-app directory
pip install pytest
echo "pytest" >> requirements.txt
