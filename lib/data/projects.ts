export interface Project {
  title: string
  description: string
  techStack: string[]
  imgSrc: string
  codeUrl: string | null
  demoUrl?: string | null
  category: string
}

export function getProjects(t: (key: string) => string): Project[] {
  return [
    {
    title: t('projects.shopup.title'),
    description: t('projects.shopup.description'),
    techStack: [
      "Java",
      "Node.js",
      "Spring Boot",
      "React",
      "JavaScript",
      "PostgreSQL",
      "MariaDB",
      "Docker",
      "Kubernetes",
      "Keycloak",
      "Mercado Pago",
      "Google Maps",
      "OpenAI",
      "Whisper",
    ],
    imgSrc: "/placeholder.svg?height=200&width=300",
    codeUrl: null,
    demoUrl: "https://kzmlebtfsrefxoyqvjgl.lite.vusercontent.net/",
    category: "Backend",
  },
  {
    title: t('projects.isidoro.title'),
    description: t('projects.isidoro.description'),
    techStack: [
      "React",
      "Vite",
      "TailwindCSS",
      "Node.js",
      "Express",
      "Docker",
      "GitHub Actions",
      "Nginx",
    ],
    imgSrc: "/Isidoro/isidoro.webp",
    codeUrl: null, // Repositorio privado
    demoUrl: "https://isidorosas.com.ar/",
    category: "Frontend",
  },
  {
    title: t('projects.logistica.title'),
    description: t('projects.logistica.description'),
    techStack: [
      "Java",
      "Spring Boot",
      "MySQL",
      "Next.js",
      "Docker",
      "Keycloak",
      "JWT",
      "Swagger",
      "Spring Security",
    ],
    imgSrc: "/ProyectoLogistica/principal.webp",
    codeUrl: "https://github.com/FacundoLuna16/ProyectoLogistica",
    demoUrl: null,
    category: "Backend",
  },
  {
    title: t('projects.security.title'),
    description: t('projects.security.description'),
    techStack: [
      "Python",
      "Burp Suite",
      "Bash",
      "Docker",
      "Markdown",
      "Kali Linux",
      "DevSecOps",
    ],
    imgSrc: "/placeholder.svg?height=200&width=300",
    codeUrl: "https://github.com/FacundoLuna16/Seguridad",
    demoUrl: null,
    category: "Security",
  },
  {
    title: t('projects.devops.title'),
    description: t('projects.devops.description'),
    techStack: [
      "GitLab CI/CD",
      "Docker",
      "Terraform",
      "AWS",
      "Kubernetes",
      "Linux",
      "Bash",
      "VirtualBox",
      "CloudFormation",
    ],
    imgSrc: "/TallerDevOps/taller.png",
    codeUrl: "https://github.com/FacundoLuna16/TallerDevOps",
    demoUrl: null,
    category: "DevOps",
  },
  {
    title: t('projects.tpi.title'),
    description: t('projects.tpi.description'),
    techStack: [
      "Java",
      "Spring Boot",
      "SQLite",
      "Maven",
      "JWT",
      "Swagger",
      "Docker",
      "API Gateway",
    ],
    imgSrc: "/placeholder.svg?height=200&width=300",
    codeUrl: "https://github.com/FacundoLuna16/TpiBack",
    demoUrl: null,
    category: "Backend",
  },
  ] as const
}
