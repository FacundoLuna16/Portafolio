"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface TranslationContextType {
  locale: string
  setLocale: (locale: string) => void
  t: (key: string) => string
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

const translations = {
  en: {
    "navbar.home": "home",
    "navbar.about": "about_me",
    "navbar.history": "history",
    "navbar.projects": "projects",
    "navbar.contact": "contact",
    "hero.tags": "Backend | DevOps | Security",
    "hero.tagline": "Building robust systems one commit at a time",
    "hero.downloadCV": "Download CV",

    // ---------- long texts split for readability ----------
    "about.description":
      "Backend developer and senior Information Systems Engineering student at UTN FRC. " +
      "I have hands-on experience building microservices with Java and Spring Boot, " +
      "QA automation, Docker-based deployments, and modern DevOps practices in cloud " +
      "environments (AWS, Terraform). I contribute as a teaching assistant in Operating " +
      "Systems and specialize in integrating security (DevSecOps, Keycloak, Spring Security) " +
      "and automation within CI/CD pipelines. Currently, I actively participate in " +
      "cybersecurity challenges and explore the use of AI to automate processes and enhance " +
      "real-world user experience.",

    "history.description":
      "I am currently available and actively seeking new professional challenges where I can " +
      "apply my skills, continue growing, and contribute real value through the development " +
      "of robust and secure software.",

    "projects.apiGateway.description":
      "High-performance API gateway with rate limiting, authentication, and load balancing",
    "projects.infrastructure.description":
      "Terraform modules for AWS infrastructure deployment and management",
    "projects.security.description":
      "Automated vulnerability scanner for web applications and APIs",
    "contact.thanks": "Thanks for visiting!",

    "timeline.utn.title": "UTN FRC – Operating Systems Teaching Assistant",
    "timeline.utn.description":
      "Teaching Assistant in Operating Systems (2024–Present)",
    "timeline.utn.summary":
      "Prepared and delivered theoretical and lab classes, graded exams, and provided " +
      "technical and conceptual support to students. Full course responsibility since 2025.",

    "timeline.qatitle": "TestingDeSoftwareArg – QA Automation",
    "timeline.qadescription":
      "QA Automation, TestingDeSoftwareArg (Jan 2024–Nov 2024)",
    "timeline.qasummary":
      "Designed and executed automated tests using Selenium (Python/Java), Locust, TDD, and " +
      "REST API validation. Integrated testing in CI pipelines.",

    "timeline.logistics.title":
      "Logistics Project – Backend Developer (Freelance)",
    "timeline.logistics.description":
      "Backend Developer, Freelance Project (Nov 2023–Jan 2024)",
    "timeline.logistics.summary":
      "Developed RESTful APIs with Java/Spring Boot, implemented microservice architectures, " +
      "Docker integration, API Gateway management, and security with Keycloak/Spring Security.",

    "timeline.soon.year": "2025",
    "timeline.soon.title": "Coming soon…",
    "timeline.soon.description": "Preparing for new professional challenges.",
    "timeline.soon.summary":
      "Stay tuned for upcoming projects and opportunities.",
  },

  es: {
    "navbar.home": "inicio",
    "navbar.about": "sobre_mi",
    "navbar.history": "historia",
    "navbar.projects": "proyectos",
    "navbar.contact": "contacto",
    "hero.tags": "Backend | DevOps | Seguridad",
    "hero.tagline": "Construyendo sistemas robustos un commit a la vez",
    "hero.downloadCV": "Descargar CV",

    "history.description":
      "Actualmente me encuentro disponible y en búsqueda activa de nuevos desafíos " +
      "profesionales donde pueda aplicar mis conocimientos, seguir creciendo y aportar " +
      "valor real a través del desarrollo de software robusto y seguro.",

    "about.description":
      "Desarrollador backend y estudiante avanzado de Ingeniería en Sistemas de Información " +
      "en UTN FRC. Tengo experiencia real en el desarrollo de microservicios con Java y " +
      "Spring Boot, automatización de pruebas (QA Automation), despliegue con Docker y " +
      "prácticas DevOps modernas en entornos cloud (AWS, Terraform). Colaboro como ayudante " +
      "de cátedra en Sistemas Operativos y me especializo en la integración de seguridad " +
      "(DevSecOps, Keycloak, Spring Security) y automatización en pipelines CI/CD. " +
      "Actualmente, participo activamente en desafíos de ciberseguridad y exploro la " +
      "aplicación de inteligencia artificial para automatizar procesos y mejorar la " +
      "experiencia de usuario en proyectos reales.",

    "projects.apiGateway.description":
      "Gateway de API de alto rendimiento con limitación de velocidad, autenticación y " +
      "balanceador de carga",
    "projects.infrastructure.description":
      "Módulos de Terraform para despliegue y gestión de infraestructura AWS",
    "projects.security.description":
      "Escáner automatizado de vulnerabilidades para aplicaciones web y APIs",
    "contact.thanks": "¡Gracias por visitar!",

    "timeline.utn.title": "UTN FRC – Ayudante de Sistemas Operativos",
    "timeline.utn.description":
      "Ayudante de cátedra en Sistemas Operativos (2024–Actualidad)",
    "timeline.utn.summary":
      "Preparé y dicté clases teóricas y prácticas, corregí exámenes y brindé soporte " +
      "técnico y conceptual a estudiantes. Responsable de un curso completo desde 2025.",

    "timeline.qatitle": "TestingDeSoftwareArg – QA Automation",
    "timeline.qadescription":
      "QA Automation, TestingDeSoftwareArg (Ene 2024–Nov 2024)",
    "timeline.qasummary":
      "Diseñé y ejecuté pruebas automatizadas con Selenium (Python/Java), Locust, TDD y " +
      "validación de APIs REST. Integración de pruebas en pipelines CI.",

    "timeline.logistics.title": "Proyecto Logística – Backend Freelance",
    "timeline.logistics.description":
      "Desarrollador Backend Freelance (Nov 2023–Ene 2024)",
    "timeline.logistics.summary":
      "Desarrollé APIs RESTful en Java/Spring Boot, arquitecturas con microservicios, " +
      "integración con Docker y API Gateway, y seguridad con Keycloak/Spring Security.",

    "timeline.soon.year": "2025",
    "timeline.soon.title": "Próximamente…",
    "timeline.soon.description": "Preparando nuevos desafíos profesionales.",
    "timeline.soon.summary":
      "Mantente atento para próximos proyectos y oportunidades.",
  },
};


export function TranslationProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState("en")

  useEffect(() => {
    const savedLocale = localStorage.getItem("locale")
    if (savedLocale && (savedLocale === "en" || savedLocale === "es")) {
      setLocaleState(savedLocale)
    }
  }, [])

  const setLocale = (newLocale: string) => {
    setLocaleState(newLocale)
    localStorage.setItem("locale", newLocale)
  }

  const t = (key: string): string => {
  // Cast para que TS no proteste
  const dict = translations[locale as keyof typeof translations] as Record<string, string>
  return dict[key] || key
  }



  return <TranslationContext.Provider value={{ locale, setLocale, t }}>{children}</TranslationContext.Provider>
}

export function useTranslation() {
  const context = useContext(TranslationContext)
  if (context === undefined) {
    throw new Error("useTranslation must be used within a TranslationProvider")
  }
  return context
}
