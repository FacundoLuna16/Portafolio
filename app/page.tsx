"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, Github, Linkedin, Mail } from "lucide-react"
import { TerminalNavbar } from "./components/terminal-navbar"
import { TypingEffect } from "./components/typing-effect"
import { ProjectCard } from "./components/project-card"
import { CodeRotator } from "./components/code-rotator"
import { MiniTimeline } from "./components/mini-timeline"
import { useTranslation } from "./hooks/use-translation"

const homeTitle = "LUNA FACUNDO DEVELOPER"

export default function Portfolio() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [activeFilter, setActiveFilter] = useState("All")
  const { t, locale, setLocale } = useTranslation()

const skills = {
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
};


const projects = [
  {
    title: "ShopUp – Plataforma E-commerce",
    description:
      "PWA para ayudar a pequeños emprendimientos a gestionar catálogos, ventas y reputación. Soporta búsquedas por voz, reportes, calificaciones e integración con IA para asistencia.",
    techStack: [
      "Java", "Node.js", "Spring Boot", "React", "JavaScript", 
      "PostgreSQL", "MariaDB", "Docker", "Kubernetes", 
      "Keycloak", "Mercado Pago", "Google Maps", "OpenAI", "Whisper"
    ],
    imgSrc: "/placeholder.svg?height=200&width=300", // Cambialo si tenés otro más representativo
    codeUrl: null,
    demoUrl: "https://kzmlebtfsrefxoyqvjgl.lite.vusercontent.net/",
    category: "Backend",
  },
  {
    title: "Isidoro S.A. – Web Institucional",
    description:
      "Sitio informativo responsive para empresa agropecuaria. Estilo inspirado en John Deere, soporte multilenguaje y backend con envío de correos.",
    techStack: [
      "React", "Vite", "TailwindCSS", 
      "Node.js", "Express", 
      "Docker", "GitHub Actions", "Nginx"
    ],
    imgSrc: "/Isidoro/isidoro.webp", // Podés poner una captura si tenés, o dejar el placeholder
    codeUrl: "https://github.com/lautarogregorat/IsidoroWebPage",
    demoUrl: "https://isidorosas.com.ar/",
    category: "Frontend",
  },
  {
    title: "Sistema de Logística – Gestión de Envíos",
    description:
      "Plataforma integral para la gestión de pedidos, rutas de entrega y notificaciones a clientes. Incluye autenticación, asignación de recursos y despliegue dockerizado.",
    techStack: [
      "Java", "Spring Boot", "MySQL",
      "Next.js", "Docker", "Keycloak",
      "JWT", "Swagger", "Spring Security"
    ],
    imgSrc: "/ProyectoLogistica/principal.webp", // Cambialo si tenés captura, o dejá el placeholder
    codeUrl: "https://github.com/FacundoLuna16/ProyectoLogistica.png",
    demoUrl: null,
    category: "Backend",
  },
  {
    title: "Training Ciberseguridad – GISSIC UTN",
    description:
      "Repositorio técnico con análisis, scripts y soluciones a desafíos de ciberseguridad ofensiva y desarrollo seguro. Alineado a prácticas DevSecOps.",
    techStack: [
      "Python", "Burp Suite", "Bash", "Docker",
      "Markdown", "Kali Linux", "DevSecOps"
    ],
    imgSrc: "/placeholder.svg?height=200&width=300", // Cambialo por una captura si tenés, o usá un placeholder
    codeUrl: "https://github.com/FacundoLuna16/Seguridad",
    demoUrl: null,
    category: "Security",
  },
  {
    title: "Taller DevOps – Infraestructura & Despliegue",
    description:
      "Proyecto integrador de prácticas DevOps: pipelines CI/CD, contenedores Docker, despliegue en AWS y conceptos de IaC y Kubernetes. Trabajo colaborativo y automatizado.",
    techStack: [
      "GitLab CI/CD", "Docker", "Terraform", "AWS", "Kubernetes",
      "Linux", "Bash", "VirtualBox", "CloudFormation"
    ],
    imgSrc: "/TallerDevOps/taller.png", // Podés reemplazarlo por una imagen del proyecto
    codeUrl: "https://github.com/FacundoLuna16/TallerDevOps",
    demoUrl: null,
    category: "DevOps",
  },
  {
    title: "TPI Backend – Sistema de Alquiler de Bicicletas",
    description:
      "Sistema backend con arquitectura de microservicios para gestionar el alquiler de bicicletas, cálculo de precios, estaciones y usuarios autenticados vía JWT. Despliegue local y Docker-ready.",
    techStack: [
      "Java", "Spring Boot", "SQLite", "Maven",
      "JWT", "Swagger", "Docker", "API Gateway"
    ],
    imgSrc: "/placeholder.svg?height=200&width=300",  // Podés reemplazarlo por una miniatura real
    codeUrl: "https://github.com/FacundoLuna16/TpiBack",
    demoUrl: null,
    category: "Backend",
  },
  // {
  //   title: "Test Automatizado – Despegar",
  //   description:
  //     "Framework de testing automatizado usando Java, Selenium y TestNG. Arquitectura basada en Page Object Model y ejecución multiplataforma vía Maven en Chrome, Firefox, Edge y Brave.",
  //   techStack: [
  //     "Java", "Selenium", "TestNG", "Maven", "Page Object Model"
  //   ],
  //   imgSrc: "/testdespegar.png", // reemplazá si tenés una miniatura
  //   codeUrl: "https://github.com/FacundoLuna16/testDespegar",
  //   demoUrl: null,
  //   category: "Testing",
  // },
];


  const filteredProjects =
    activeFilter === "All" ? projects : projects.filter((project) => project.category === activeFilter)

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
  }

  const toggleLanguage = () => {
    const newLocale = locale === "en" ? "es" : "en"
    setLocale(newLocale)
    console.log(`$ sudo locale set ${newLocale === "es" ? "es_AR" : "en_US"} && exec bash`)
  }

  return (
    <div className={`min-h-screen transition-all duration-200 ${isDarkMode ? "dark bg-terminal-black" : "bg-gray-50"}`}>
      <TerminalNavbar
        isDarkMode={isDarkMode}
        toggleLanguage={toggleLanguage}
        setIsDarkMode={setIsDarkMode}
        onNavigate={scrollToSection}
      />
          

        {/* Hero Section */}
        <section id="hero" className="min-h-screen w-full flex flex-col items-center justify-center px-4 relative">
            {/* Background Code Rotator */}
          <div className="relative z-10 flex flex-col items-center py-0 text-center space-y-10 w-full max-w-2xl">
              <div className="space-y-12">
                <pre className="font-mono text-terminal-green whitespace-pre-line leading-tight font-bold text-2xl xs:text-3xl sm:text-4xl lg:text-7xl break-words">
                  <TypingEffect text={homeTitle} speed={50} />
                </pre>
                <div className="text-xl md:text-2xl text-terminal-cyan font-mono">{t("hero.tags")}</div>
                <div className="text-terminal-green font-mono text-xl">
                  <span className="text-terminal-cyan">$</span> echo "{t("hero.tagline")}"
                  <span className="animate-pulse">_</span>
                </div>
              </div>

              {/* Botón para descargar CV */}
              <a
                href="/public/Luna-Facundo-CV.pdf"
                download
                className="inline-block" // Mantiene el estilo del botón
              >
                <Button
                  className="
                    bg-terminal-green text-terminal-black
                    hover:bg-terminal-cyan hover:text-terminal-black font-mono
                    px-16 py-8 text-xl"  // <-- Más padding y fuente grande
                >
                  <Download className="mr-2 h-5 w-5" /> {/* Icono más grande también */}
                  {t("hero.downloadCV")}
                </Button>
              </a>
            {/* <div className="absolute w-full left-0 right-0 flex opacity-15 pointer-events-none">
              <div className="whitespace-nowrap overflow-ellipsis">
                <CodeRotator />
              </div>
            </div> */}
          </div>
          {/* Background Image */}
        </section>

        {/* About Section */}
        <section id="about" className="py-20 px-2 sm:px-4 lg:px-8">
          <div className="max-w-7xl xl:max-w-screen-2xl mx-auto px-2 sm:px-8">
            <h2 className="text-5xl font-mono font-bold text-terminal-green mb-8">
              <span className="text-terminal-cyan">$</span> whoami
            </h2>

            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-12 items-stretch min-h-[400px]">
              {/* Columna izquierda: Sobre mí + Skills */}
              <div className="flex flex-col h-full space-y-6">
                {/* Sobre mí */}
                <Card className="bg-terminal-black border-terminal-green">
                  <CardContent className="p-6">
                    <p className="text-terminal-green font-mono leading-relaxed md:text-xl">
                      {t("about.description")}
                    </p>
                  </CardContent>
                </Card>

                {/* Skills (con scroll si es necesario) */}
                <div className="space-y-4 overflow-y-auto max-h-[70vh]">
                  {Object.entries(skills).map(([category, skillList]) => (
                    <div key={category}>
                      <h3 className="text-terminal-cyan font-mono font-semibold mb-2 md:text-xl">{category}:</h3>
                      <div className="flex flex-wrap gap-2">
                        {skillList.map((skill) => (
                          <Badge
                            key={skill}
                            variant="outline"
                            className="border-terminal-green text-terminal-green hover:bg-terminal-green hover:text-terminal-black font-mono text-sm md:text-base"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Columna derecha: Timeline */}
              <div className="flex flex-col h-full">
                <MiniTimeline className="h-full" />
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 px-2 sm:px-4 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl font-mono font-bold text-terminal-green mb-8">
              <span className="text-terminal-cyan">$</span> ls projects/
            </h2>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              {["All", "Backend", "DevOps", "Security"].map((filter) => (
                <Button
                  key={filter}
                  variant={activeFilter === filter ? "default" : "outline"}
                  className={`font-mono text-xl ${
                    activeFilter === filter
                      ? "bg-terminal-green text-terminal-black"
                      : "border-terminal-green text-terminal-green hover:bg-terminal-green hover:text-terminal-black"
                  }`}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </Button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, index) => (
                <ProjectCard key={index} {...project} />
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-2 sm:px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-mono font-bold text-terminal-green mb-8">
              <span className="text-terminal-cyan">$</span> curl --data "message" https://contact.api
            </h2>

            <div className="space-y-8">
              <Card className="bg-terminal-black border-terminal-green">
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="text-center">
                      <Mail className="h-8 w-8 text-terminal-cyan mx-auto mb-4" />
                      <p className="font-mono text-terminal-green">
                        <a href="mailto:fakkuluna98@gmail.com" className="hover:text-terminal-cyan transition-colors">
                          fakkuluna98@gmail.com
                        </a>
                      </p>
                    </div>

                    <div className="text-center">
                      <Github className="h-8 w-8 text-terminal-cyan mx-auto mb-4" />
                      <p className="font-mono text-terminal-green">
                        <a href="https://github.com/FacundoLuna16" className="hover:text-terminal-cyan transition-colors">
                          github.com/FacundoLuna16
                        </a>
                      </p>
                    </div>

                    <div className="text-center">
                      <Linkedin className="h-8 w-8 text-terminal-cyan mx-auto mb-4" />
                      <p className="font-mono text-terminal-green">
                        <a
                          href="https://linkedin.com/in/luna-facundo"
                          className="hover:text-terminal-cyan transition-colors"
                        >
                          linkedin.com/in/luna-facundo
                        </a>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="font-mono text-terminal-green">
                <span className="text-terminal-cyan">$</span> echo "{t("contact.thanks")}"
                <span className="animate-pulse">_</span>
              </div>
            </div>
          </div>
        </section>
    </div>
  )
}
