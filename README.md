🚀 Ivaans Clothing Store - Employee Management System
Self-Healing DevSecOps Platform on AWS EKS
📌 Project Overview

The Ivaans Clothing Store Employee Management System is a cloud-native, containerized web application designed to manage employee information through a secure and scalable platform.

The application follows modern DevOps, GitOps, Observability, and DevSecOps practices by leveraging AWS EKS, Terraform, GitHub Actions, ArgoCD, Prometheus, Grafana, Loki, Alloy, and PagerDuty.

This project demonstrates end-to-end implementation of:

Infrastructure as Code (IaC)
CI/CD Automation
GitOps Deployment
Kubernetes Orchestration
Centralized Logging
Monitoring & Alerting
Self-Healing Infrastructure
Secure Application Delivery
🏢 Business Use Case

Ivaans Clothing Store requires an internal web portal to manage employee records efficiently.

Managers and administrators should be able to:

✅ Login Securely

✅ Add Employees

✅ Update Employee Information

✅ View Employees

✅ Delete Employees

✅ Monitor Application Health

✅ Receive Incident Alerts

🏗️ Solution Architecture
Plain Text
┌─────────────────┐
│ Users │
└────────┬────────┘
│
▼
┌────────────────────────────┐
│ AWS Application Load │
│ Balancer (ALB) │
└────────────┬───────────────┘
│
┌────────────────┴────────────────┐
│ │
▼ ▼
 
┌─────────────────┐ ┌─────────────────┐
│ React Frontend │ │ Spring Boot API │
│ Kubernetes Pods │ │ Kubernetes Pods │
└────────┬────────┘ └────────┬────────┘
│ │
└──────────────┬──────────────────┘
│
▼
┌─────────────────────┐
│ PostgreSQL RDS │
│ Private Subnet │
└─────────────────────┘
 
─────────────────────────────────────────────────────────────
 
Observability & Monitoring Layer
 
┌──────────────────────────────┐
│ Prometheus │
└─────────────┬────────────────┘
▼
┌──────────────────────────────┐
│ Grafana │
└──────────────────────────────┘
 
─────────────────────────────────────────────────────────────
 
Centralized Logging Layer
 
Application Logs
│
▼
┌──────────────────┐
│ Grafana Alloy │
└────────┬─────────┘
▼
┌──────────────────┐
│ Grafana Loki │
└────────┬─────────┘
▼
┌──────────────────┐
│ Grafana Dashboards│
└──────────────────┘
 
─────────────────────────────────────────────────────────────
 
Alerting Layer
 
Prometheus Alerts
│
▼
┌──────────────────┐
│ AlertManager │
└────────┬─────────┘
▼
┌──────────────────┐
│ PagerDuty │
└──────────────────┘
🚀 AWS Infrastructure Architecture
Plain Text
AWS Cloud
│
├── VPC
│
├── Public Subnets
│ ├── Application Load Balancer
│ └── NAT Gateway
│
├── Private Subnets
│ ├── EKS Cluster
│ │
│ ├── Worker Node 1
│ │ ├── React Frontend Pod
│ │ ├── Grafana Alloy
│ │
│ ├── Worker Node 2
│ │ ├── Spring Boot Pod
│ │ ├── Prometheus
│ │
│ ├── Worker Node 3
│ │ ├── Grafana
│ │ ├── Loki
│ │ ├── ArgoCD
│ │ └── AlertManager
│ │
│ └── PostgreSQL RDS
│
└── AWS ECR
 
🛠️ Technology Stack
Category	Technology
Frontend	React.js
Backend	Spring Boot
Database	PostgreSQL RDS
Containerization	Docker
Orchestration	Kubernetes (EKS)
Infrastructure as Code	Terraform
Source Control	GitHub
CI/CD	GitHub Actions
GitOps	ArgoCD
Monitoring	Prometheus
Visualization	Grafana
Logging	Grafana Loki
Log Collection	Grafana Alloy
Alerting	AlertManager
Incident Management	PagerDuty
Image Registry	AWS ECR
📂 Project Structure
Plain Text
ivaans-employee-management/
│
├── frontend/
│ ├── src/
│ ├── public/
│ └── Dockerfile
│
├── backend/
│ ├── src/
│ ├── pom.xml
│ └── Dockerfile
│
├── terraform/
│ ├── modules/
│ │ ├── vpc/
│ │ ├── eks/
│ │ ├── ecr/
│ │ ├── rds/
│ │ ├── alb/
│ │ ├── iam/
│ │ └── security-groups/
│ │
│ └── environments/
│ ├── dev/
│ └── prod/
│
├── kubernetes/
│ ├── frontend/
│ ├── backend/
│ ├── ingress/
│ └── monitoring/
│
├── gitops/
│ ├── frontend/
│ ├── backend/
│ └── argocd/
│
└── README.md
🎯 Application Features
Authentication
Secure Login
JWT Authentication
Role-Based Access Control
Employee Management
Add Employee
View Employee
Update Employee
Delete Employee
Search Employee
Monitoring
Application Health Metrics
JVM Metrics
Kubernetes Metrics
Logging
Application Logs
Kubernetes Logs
Error Tracking
Alerting
Application Down
High CPU Usage
High Memory Usage
Failed Deployments
Database Connectivity Issues
🔄 CI/CD Pipeline
Plain Text
Developer Pushes Code
│
▼
GitHub Actions
│
├── Code Build
│
├── Unit Testing
│
├── TFLint Scan
│
├── Checkov Scan
│
├── Trivy Scan
│
├── Docker Build
│
├── Push Image to ECR
│
└── Update GitOps Repository
│
▼
ArgoCD
│
▼
AWS EKS Cluster
🔐 DevSecOps Implementation
TFLint

Terraform code quality checks

Checkov

Infrastructure security scanning

Trivy

Container vulnerability scanning

GitHub Actions

Automated security validation

📊 Monitoring & Observability
Prometheus Metrics
CPU Usage
Memory Usage
Node Health
Pod Health
Request Rate
Response Time
Grafana Dashboards
Kubernetes Cluster Dashboard
Application Dashboard
Infrastructure Dashboard
JVM Dashboard
📝 Centralized Logging
Grafana Alloy

Collects logs from:

Spring Boot Pods
React Pods
Kubernetes Nodes
Grafana Loki

Stores and indexes logs for searching and troubleshooting.

Sample Query:

Plain Text
logql isn’t fully supported. Syntax highlighting is based on Plain Text.
{app="employee-management"} |= "ERROR"
🚨 Incident Management

PagerDuty receives alerts for:

Application Failures
High CPU Usage
High Memory Usage
Pod CrashLoops
Database Outages
Node Failures
♻️ Self-Healing Demonstration
Kubernetes Self-Healing
Shell
kubectl delete pod employee-backend

Kubernetes automatically recreates the pod.

GitOps Drift Detection

Manual Kubernetes changes:

Shell
kubectl edit deployment employee-backend
 

ArgoCD detects configuration drift and automatically restores the desired state.

📈 Future Enhancements
Multi-Tenant Support
Employee Attendance Module
Payroll Management
AWS Secrets Manager Integration
AWS WAF Integration
Horizontal Pod Autoscaler (HPA)
Cluster Autoscaler
Splunk Observability Integration
OpenTelemetry Integration
👨‍💻 Author

Uttam Sharma

Cloud | DevOps | Kubernetes | Terraform | AWS | GitOps | Observability | Splunk

⭐ Key Learning Outcomes
Terraform Infrastructure Automation
AWS EKS Administration
Docker Containerization
GitHub Actions CI/CD
ArgoCD GitOps Deployments
Kubernetes Self-Healing
Prometheus Monitoring
Grafana Dashboards
Loki Log Aggregation
DevSecOps Security Scanning
Incident Management with PagerDuty
Production-Grade Cloud-Native Architecture

This project serves as a complete end-to-end DevSecOps implementation showcasing modern cloud-native deployment, observability, security, and automation practices on AWS.
