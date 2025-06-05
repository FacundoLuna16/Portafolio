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
    "navbar.projects": "projects",
    "navbar.contact": "contact",
    "hero.tags": "Backend | DevOps | Security",
    "hero.tagline": "Building robust systems one commit at a time",
    "hero.downloadCV": "Download CV",
    "about.description": 
    "Soy desarrollador backend y estudiante avanzado de Ingeniería en Sistemas de Información en UTN FRC. Combino experiencia práctica en desarrollo de microservicios con Java, Docker y PostgreSQL, junto con una fuerte base en seguridad y buenas prácticas DevOps. Lidero el backend de ShopUp, participo como mentor en ciberseguridad en GISSIC y me desempeño como ayudante en Sistemas Operativos. Actualmente, investigo cómo aplicar IA generativa para automatizar procesos y mejorar la experiencia del usuario en entornos reales.",
    "projects.apiGateway.description":
      "High-performance API gateway with rate limiting, authentication, and load balancing",
    "projects.infrastructure.description": "Terraform modules for AWS infrastructure deployment and management",
    "projects.security.description": "Automated vulnerability scanner for web applications and APIs",
    "contact.thanks": "Thanks for visiting!",
    "timeline.utn.title": "UTN FRC – SO Assistant",
    "timeline.utn.description": "Operating Systems Teaching Assistant",
    "timeline.shopup.title": "ShopUp Core – Backend Lead",
    "timeline.shopup.description": "Led backend development team",
    "timeline.hacklab.title": "Hacklab GISSIC – Mentor",
    "timeline.hacklab.description": "Cybersecurity research mentor",
    "timeline.ai.title": "Generative AI – Researcher",
    "timeline.ai.description": "AI/ML research and development",
  },
  es: {
    "navbar.home": "inicio",
    "navbar.about": "sobre_mi",
    "navbar.projects": "proyectos",
    "navbar.contact": "contacto",
    "hero.tags": "Backend | DevOps | Seguridad",
    "hero.tagline": "Construyendo sistemas robustos un commit a la vez",
    "hero.downloadCV": "Descargar CV",
    "about.description":
      "I'm a backend developer and senior Information Systems Engineering student at UTN FRC. I combine hands-on experience with Java microservices, Docker, and PostgreSQL, with a strong foundation in security and DevOps best practices. I lead the backend of ShopUp, mentor in cybersecurity at GISSIC, and assist in teaching Operating Systems. I'm currently researching how to apply generative AI to automate processes and enhance real-world user experiences.",
    "projects.apiGateway.description":
      "Gateway de API de alto rendimiento con limitación de velocidad, autenticación y balanceador de carga",
    "projects.infrastructure.description": "Módulos de Terraform para despliegue y gestión de infraestructura AWS",
    "projects.security.description": "Escáner automatizado de vulnerabilidades para aplicaciones web y APIs",
    "contact.thanks": "¡Gracias por visitar!",
    "timeline.utn.title": "UTN FRC – Ayudante SO",
    "timeline.utn.description": "Ayudante de Cátedra Sistemas Operativos",
    "timeline.shopup.title": "ShopUp Core – Líder Backend",
    "timeline.shopup.description": "Lideré el equipo de desarrollo backend",
    "timeline.hacklab.title": "Hacklab GISSIC – Mentor",
    "timeline.hacklab.description": "Mentor de investigación en ciberseguridad",
    "timeline.ai.title": "IA Generativa – Investigador",
    "timeline.ai.description": "Investigación y desarrollo en IA/ML",
  },
}

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
