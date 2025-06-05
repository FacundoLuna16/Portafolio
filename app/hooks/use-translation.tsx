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
      "Passionate backend developer with 5+ years of experience building scalable systems. I specialize in creating robust APIs, implementing DevOps practices, and ensuring security best practices across the development lifecycle.",
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
      "Desarrollador backend apasionado con más de 5 años de experiencia construyendo sistemas escalables. Me especializo en crear APIs robustas, implementar prácticas DevOps y asegurar las mejores prácticas de seguridad en todo el ciclo de desarrollo.",
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
