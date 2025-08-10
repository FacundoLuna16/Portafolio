export interface Project {
  id: string // ID único del proyecto
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
    id: 'shopup',
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
    imgSrc: "/ShopUp/Login.webp",
    codeUrl: null,
    demoUrl: "https://shopup.com.ar/",
    category: "Backend",
  },
  {
    id: 'barberia',
    title: t('projects.barberia.title'),
    description: t('projects.barberia.description'),
    techStack: [
      "React 18",
      "Spring Boot 3",
      "PostgreSQL",
      "JWT",
      "Redis",
      "Tailwind CSS",
      "Vite",
      "Spring Security",
      "Docker",
      "Zustand",
    ],
    imgSrc: "/Barberia-Faderoom/1-PaginaPrincipal.webp",
    codeUrl: null, // Repositorio privado
    demoUrl: null, // No hay demo pública
    category: "Backend",
  },
  {
    id: 'isidoro',
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
    id: 'security',
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
    imgSrc: "/Seguridad/portada.webp",
    codeUrl: "https://github.com/FacundoLuna16/Seguridad",
    demoUrl: null,
    category: "Security",
  },
  {
    id: 'devops',
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
    id: 'logistica',
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
  ] as const
}
