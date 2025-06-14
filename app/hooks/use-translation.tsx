"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import en from "@/locales/en.json"
import es from "@/locales/es.json"

interface TranslationContextType {
  locale: string
  setLocale: (locale: string) => void
  t: (key: string) => string
  toggleLanguage: () => void
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

const translations = { en, es } as const

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState("es") // Cambié a español por defecto
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const savedLocale = localStorage.getItem("locale")
    if (savedLocale && (savedLocale === "en" || savedLocale === "es")) {
      setLocaleState(savedLocale)
    }
  }, [])

  const setLocale = (newLocale: string) => {
    setLocaleState(newLocale)
    if (isClient) {
      localStorage.setItem("locale", newLocale)
    }
  }

  const toggleLanguage = () => {
    const newLocale = locale === "en" ? "es" : "en"
    setLocale(newLocale)
  }

  const t = (key: string): string => {
    // Cast para que TS no proteste
    const dict = translations[locale as keyof typeof translations] as Record<string, string>
    return dict[key] || key
  }

  return (
    <TranslationContext.Provider value={{ locale, setLocale, t, toggleLanguage }}>
      {children}
    </TranslationContext.Provider>
  )
}

export function useTranslation() {
  const context = useContext(TranslationContext)
  if (context === undefined) {
    throw new Error("useTranslation must be used within a TranslationProvider")
  }
  
  return context
}
