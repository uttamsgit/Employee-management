# 🚀 Ivaans Clothing Store - Employee Management System

![AWS](https://img.shields.io/badge/AWS-EKS-orange)
![Terraform](https://img.shields.io/badge/Terraform-IaC-blue)
![Kubernetes](https://img.shields.io/badge/Kubernetes-Orchestration-blue)
![ArgoCD](https://img.shields.io/badge/ArgoCD-GitOps-red)
![Prometheus](https://img.shields.io/badge/Prometheus-Monitoring-orange)
![Grafana](https://img.shields.io/badge/Grafana-Observability-yellow)
![Loki](https://img.shields.io/badge/Loki-Logging-purple)

## 📖 Overview

The **Ivaans Clothing Store Employee Management System** is a cloud-native application builtnd managers to securely manage employee data while leveraging:

- Infrastructure as Code (Terraform)
- Kubernetes Orchestration (Amazon EKS)
- GitOps Deployment (ArgoCD)
- CI/CD Automation (GitHub Actions)
- Monitoring & Alerting (Prometheus + Grafana)
- Centralized Logging (Loki + Alloy)
- Incident Response (PagerDuty)

---

## 🏢 Business Use Case

The application provides an internal employee management portal for Ivaans Clothing Store.

### Features

✅ User Authentication

✅ Add Employee

✅ View Employees

✅ Update Employee

✅ Delete Employee

✅ Kubernetes Self-Healing

✅ Monitoring & Alerting

✅ Centralized Logging

---

# 🏗️ Solution Architecture

```mermaid
flowchart TD

A[Users] --> B[AWS Application Load Balancer]

B --> C[React Frontend]
C --> D[Spring Boot Backend]
D --> E[PostgreSQL RDS]

D --> F[Prometheus]
F --> G[Grafana]

D --> H[Grafana Alloy]
H --> I[Grafana Loki]
I --> G

F --> J[AlertManager]
J --> K[PagerDuty]
```

---

# ☁️ AWS Infrastructure Architecture

```mermaid
flowchart TD

A[VPC]

A --> B[Public Subnets]
A --> C[Private Subnets]

B --> D[Application Load Balancer]
B --> E[NAT Gateway]

C --> F[EKS Cluster]

F --> G[React Frontend Pods]
F --> H[Spring Boot Pods]
F --> I[Prometheus]
F --> J[Grafana]
F --> K[Loki]
F --> L[Alloy]
F --> M[ArgoCD]

C --> N[RDS PostgreSQL]

O[AWS ECR] --> F
```

---

# 🚀 DevOps Workflow

```mermaid
flowchart LR

A[Developer Pushes Code] --> B[GitHub Repository]

B --> C[GitHub Actions]

C --> D[Maven Build]

D --> E[Unit Testing]

E --> F[Checkov Scan]

F --> G[TFLint]

G --> H[Trivy Scan]

H --> I[Docker Build]

I --> J[Push Image to ECR]

J --> K[Update GitOps Repository]

K --> L[ArgoCD]

L --> M[AWS EKS]
```

---

# 📊 Monitoring Architecture

```mermaid
flowchart LR

A[Spring Boot Application]
--> B[Actuator Metrics]

B --> C[Prometheus]

C --> D[Grafana Dashboards]
```

---

# 📝 Logging Architecture

```mermaid
flowchart LR

A[Application Logs]
--> B[Grafana Alloy]

B --> C[Grafana Loki]

C --> D[Grafana Dashboard]
```

---

# 🚨 Alerting Flow

```mermaid
flowchart LR

A[Prometheus]

A --> B[AlertManager]

B --> C[PagerDuty]

C --> D[Email]

C --> E[Mobile Notification]
```

---

# 🛠️ Technology Stack

| Category | Technology |
|-----------|-----------|
| Frontend | React.js |
| Backend | Spring Boot |
| Database | PostgreSQL RDS |
| Containerization | Docker |
| Orchestration | Kubernetes (EKS) |
| Infrastructure as Code | Terraform |
| CI/CD | GitHub Actions |
| GitOps | ArgoCD |
| Monitoring | Prometheus |
| Visualization | Grafana |
| Logging | Loki |
| Log Collection | Alloy |
| Alerting | AlertManager |
| Incident Management | PagerDuty |
| Container Registry | AWS ECR |

---

# 📂 Project Structure

```text
ivaans-employee-management/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── Dockerfile
│
├── backend/
│   ├── src/
│   ├── pom.xml
│   └── Dockerfile
│
├── terraform/
│   ├── modules/
│   │   ├── vpc/
│   │   ├── eks/
│   │   ├── ecr/
│   │   ├── rds/
│   │   ├── alb/
│   │   └── iam/
│
├── kubernetes/
│   ├── frontend/
│   ├── backend/
│   ├── ingress/
│   └── monitoring/
│
├── gitops/
│   ├── frontend/
│   ├── backend/
│   └── argocd/
│
└── README.md
```

---

# 🔐 DevSecOps Controls

### Terraform Validation

```bash
terraform validate
```

### Terraform Linting

```bash
tflint
```

### Infrastructure Security Scan

```bash
checkov -d .
```

### Container Image Scan

```bash
trivy image employee-app:latest
```

---

# ♻️ Self-Healing Demonstration

Delete an application pod:

```bash
kubectl delete pod employee-backend
```

Kubernetes automatically recreates the pod.

Verify:

```bash
kubectl get pods -w
```

---

# 📈 Future Enhancements

- Horizontal Pod Autoscaler (HPA)
- Cluster Autoscaler
- AWS Secrets Manager
- OpenTelemetry
- Splunk Observability
- Multi-Tenant Architecture
- Attendance Module
- Payroll Management

---

# 👨‍💻 Author

### Uttam Singh

Cloud Engineer | DevOps Engineer | AWS | Terraform | Kubernetes | GitOps | Observability

---

## ⭐ Key Learning Outcomes

- Terraform Infrastructure Automation
- AWS EKS Administration
- Docker Containerization
- GitHub Actions CI/CD
- GitOps with ArgoCD
- Kubernetes Self-Healing
- Prometheus Monitoring
- Grafana Observability
- Loki Logging
- DevSecOps Security Scanning
- PagerDuty Alerting
