---
title: Cloud Computing Overview - From Zero to Scalable Infrastructure
description: A practical look at Cloud Computing fundamentals, deployment models, and service types (IaaS, PaaS, SaaS), leveraging my experience as an Azure AZ-900 holder.
---

# 2. Cloud Computing Overview: From Zero to Scalable Infrastructure

If DevOps is the culture, then **Cloud Computing** is the stadium where the game is played. It's the essential foundation for nearly every modern tech solution, from simple web apps to complex MLOps systems like **Ona Vision**.

I can attest that you don't need a huge budget or a sprawling data center to start building big—you just need a solid understanding of the cloud. (Fun fact: I was able to pass the **Microsoft Azure Fundamentals (AZ-900)** certification last year just by diving into the Microsoft Learn resources! It proves that with focus, you can master these concepts.)

Let's break down the fundamentals that are non-negotiable for any aspiring DevOps engineer.

## ☁️ What is Cloud Computing?

In simple terms, cloud computing is the **on-demand delivery of IT resources over the internet with pay-as-you-go pricing.** Instead of owning, maintaining, and powering physical servers yourself, you rent access to them from a major provider like Azure, AWS, or GCP.

### Key Characteristics:

| Characteristic | Why It Matters for DevOps |
| :--- | :--- |
| **On-Demand Self-Service** | Spin up a new server or database instantly for testing or deployment. |
| **Resource Pooling** | Resources are shared and dynamically allocated (like a utility service). |
| **Rapid Elasticity** | Scale up (handle more traffic) or scale down (save money) automatically. This is essential for handling unpredictable demand. |
| **Measured Service** | Pay only for what you use, which requires careful **measurement** (a key part of CALMS!). |

---

## 🏢 Cloud Deployment Models

Where do you actually run your infrastructure? The model you choose dictates who is responsible for managing the hardware and software.

1.  **Public Cloud:** Services offered by third-party providers (Azure, AWS, GCP) over the public internet.
    * **Pros:** Low cost, no maintenance, infinite scalability.
    * **Cons:** Less control over infrastructure.
    * **Use Case:** Ideal for nearly all side projects and production web apps.

2.  **Private Cloud:** Computing resources used exclusively by one business or organization. It can be physically located on the company’s premises or hosted by a third-party.
    * **Pros:** Maximum security and control.
    * **Cons:** High cost and responsibility for management.
    * **Use Case:** Highly regulated industries (banking, government).

3.  **Hybrid Cloud:** A mix of public and private clouds, connected by technology that allows data and applications to be shared between them.
    * **Pros:** Flexibility to keep sensitive data on-premise while leveraging public cloud scalability.
    * **Use Case:** Large enterprises transitioning to the cloud.

---

## 📦 Cloud Service Models (IaaS, PaaS, SaaS)

This is perhaps the most important concept to grasp for DevOps, as it defines your level of responsibility (and control). Think of it like deciding how much of a restaurant you want to run. 

### 1. Infrastructure as a Service (IaaS)
* **The Analogy:** Renting the kitchen and equipment (servers, storage, networking). You manage everything inside.
* **What you manage:** Operating System, Middleware, Runtime, Application, Data.
* **Examples:** Virtual Machines (**Azure VMs**, EC2), Virtual Networks, Storage Buckets.
* **DevOps Fit:** Maximum flexibility and control. Essential for deploying custom, containerized systems like my **Go Reverse Proxy** project, where I needed OS-level access to configure a Kubernetes node.

### 2. Platform as a Service (PaaS)
* **The Analogy:** Ordering food delivery. You just provide the ingredients (your code) and the kitchen (platform) handles everything else.
* **What you manage:** Only the Application and Data.
* **Examples:** Azure App Service, Google App Engine, Azure SQL Database.
* **DevOps Fit:** Great for speeding up application deployment, reducing OS patching and maintenance time. Perfect for backend APIs built on standard runtimes (e.g., Python, Node.js).

### 3. Software as a Service (SaaS)
* **The Analogy:** Eating at a restaurant. You just consume the final product.
* **What you manage:** Nothing—the vendor handles everything.
* **Examples:** Microsoft 365, Google Workspace, Salesforce, or even tools like **GitHub Actions** (the CI/CD software itself).
* **DevOps Fit:** Used for development and collaboration tools, but not for hosting your custom applications.

---

## 🎯 Cloud in Action: From Theory to Project

In the DevOps track, we lean heavily on **IaaS** and **PaaS**. For example:

* To run the high-concurrency **Go Reverse Proxy** project on a small Minikube cluster, we're acting at the **IaaS** level (managing the OS and container runtime).
* When using managed services like Azure Container Registry or a managed PostgreSQL database, we benefit from the **PaaS** model, offloading the burden of patching and scaling the underlying OS.

Understanding these models is key to making smart architectural decisions that balance control, cost, and maintenance effort.

[Continue to: Linux Basics](/foundations/linux-basics)
