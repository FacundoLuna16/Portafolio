export const skills = {
  Backend: [
    "Java (Spring Boot)",
    "Python (FastAPI, Pytest)",
    "Node.js (Express)",
    "Microservicios",
    "PostgreSQL",
    "MySQL",
    "Swagger / OpenAPI",
  ],
  DevOps: [
    "Docker",
    "CI/CD (GitLab, Jenkins, GitHub Actions)",
    "Terraform",
    "AWS (EC2, RDS, IAM, CloudFormation)",
    "Linux / Bash Scripting",
    "Pipelines de integración",
  ],
  Security: [
    "Broken Access Control",
    "IDOR",
    "Token analysis",
    "Vulnerabilidad en APIs",
    "Cifrado y gestión de credenciales",
  ],
  QA: [
    "Selenium",
    "Pytest",
    "JUnit",
    "TestNG",
    "Postman / Newman",
    "Testing Automation",
  ],
} as const

export type SkillCategory = keyof typeof skills
