export interface Project {
  title: string
  description: string
  techStack: string[]
  imgSrc: string
  codeUrl: string | null
  demoUrl?: string | null
  category: string
}

export const projects: Project[] = [
  {
    title: "ShopUp – Plataforma E-commerce",
    description:
      "PWA para ayudar a pequeños emprendimientos a gestionar catálogos, ventas y reputación. Soporta búsquedas por voz, reportes, calificaciones e integración con IA para asistencia.",
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
    title: "Isidoro S.A. – Web Institucional",
    description:
      "Sitio informativo responsive para empresa agropecuaria. Estilo inspirado en John Deere, soporte multilenguaje y backend con envío de correos.",
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
    codeUrl: "https://github.com/lautarogregorat/IsidoroWebPage",
    demoUrl: "https://isidorosas.com.ar/",
    category: "Frontend",
  },
  {
    title: "Sistema de Logística – Gestión de Envíos",
    description:
      "Plataforma integral para la gestión de pedidos, rutas de entrega y notificaciones a clientes. Incluye autenticación, asignación de recursos y despliegue dockerizado.",
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
    title: "Training Ciberseguridad – GISSIC UTN",
    description:
      "Repositorio técnico con análisis, scripts y soluciones a desafíos de ciberseguridad ofensiva y desarrollo seguro. Alineado a prácticas DevSecOps.",
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
    title: "Taller DevOps – Infraestructura & Despliegue",
    description:
      "Proyecto integrador de prácticas DevOps: pipelines CI/CD, contenedores Docker, despliegue en AWS y conceptos de IaC y Kubernetes. Trabajo colaborativo y automatizado.",
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
    title: "TPI Backend – Sistema de Alquiler de Bicicletas",
    description:
      "Sistema backend con arquitectura de microservicios para gestionar el alquiler de bicicletas, cálculo de precios, estaciones y usuarios autenticados vía JWT. Despliegue local y Docker-ready.",
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
