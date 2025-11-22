---
title: Introduction to CI/CD - The Engine of DevOps
description: An explanation of Continuous Integration (CI) and Continuous Delivery/Deployment (CD), and how they enable rapid, reliable software releases.
---


We've learned to package our application into a portable unit using **Docker**. But how do we get that container from our laptop to the cloud automatically, reliably, and repeatedly?

The answer is **CI/CD**—a practice that turns the manual, error-prone process of software release into an automated pipeline. CI/CD stands for **Continuous Integration** and **Continuous Delivery** (or **Deployment**). This pipeline is the single most important piece of automation in modern software development.

## 🏗️ The Two Halves: CI and CD

CI/CD isn't a single step; it's a constant feedback loop designed to catch mistakes early and ship value fast.

### 1. Continuous Integration (CI)
CI is the practice where developers **merge their code changes into a central repository frequently** (often several times a day). Every merge triggers an automated build and test process.

| CI Stage | Action | Why it Matters (Feedback Loop) |
| :--- | :--- | :--- |
| **Commit** | Code changes are pushed to GitHub. | The process begins immediately. |
| **Build** | The application code is compiled and the Docker image is built. | Confirms the code and Dockerfile work together. |
| **Test** | Automated unit tests and linting are run against the code. | **Amplify Feedback Loops:** If tests fail, the developer knows instantly and fixes the bug before it leaves the development environment. |

### 2. Continuous Delivery (CD)
CD is the process that ensures every successful build from the CI stage can be released to users at any moment.

| CD Stage | Action | Why it Matters (Flow) |
| :--- | :--- | :--- |
| **Release** | The final artifact (like the Docker image) is tagged and stored in a registry (like Docker Hub or Azure Container Registry). | **Automation:** The artifact is ready for deployment without any manual preparation. |
| **Deploy** | The artifact is automatically rolled out to a staging or production environment (e.g., to a Kubernetes cluster). | **System Thinking:** Ensures the full journey from code to running service is streamlined. |

## 💡 Delivery vs. Deployment

The difference between **Continuous Delivery** and **Continuous Deployment** is small but crucial:

* **Continuous Delivery:** The code is **ready to deploy** at any time, but a human **manual gate** (a button click) is required to push it to production. This is common for critical systems or MLOps models that require final human sign-off.
* **Continuous Deployment:** The code is **automatically deployed** to production immediately after passing all tests. No human intervention required. This is the goal of high-velocity teams.

## 🔁 CI/CD in Practice

For the **Ona Vision** project, a robust pipeline is crucial:
1.  **CI:** A new ML model is committed. CI tests its integrity, runs a validation script, and builds a new Docker image.
2.  **CD:** The new Docker image is pushed to a registry, and then automatically (or manually) deployed to the Kubernetes cluster to start serving traffic.

This practice is the ultimate demonstration of the **Automation** pillar of DevOps (CALMS).

## ➡️ Next Steps: Putting it into Action

The best way to understand CI/CD is to build one. Next, we will use **GitHub Actions**, the industry-standard tool for automating pipelines directly in your repository.

[Continue to: GitHub Actions](/cicd/github-actions)
