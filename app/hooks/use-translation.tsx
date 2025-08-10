"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"
import { translationLoader } from "@/lib/translations/loader"
// Keep legacy imports for fallback compatibility
import en from "@/locales/en.json"
import es from "@/locales/es.json"

interface TranslationContextType {
  locale: string
  setLocale: (locale: string) => void
  t: (key: string) => string
  toggleLanguage: () => void
  loadNamespace: (namespace: string) => Promise<void>
  preloadNamespaces: (namespaces: string[]) => Promise<void>
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

const legacyTranslations = { en, es } as const

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState("es") // Español por defecto
  const [mounted, setMounted] = useState(false)
  const [initialLocale, setInitialLocale] = useState("es") // Para SSR consistency
  const [loadedNamespaces, setLoadedNamespaces] = useState<Set<string>>(new Set())

  useEffect(() => {
    setMounted(true)
    // Solo acceder a localStorage después del montaje y si estamos en el cliente
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedLocale = localStorage.getItem("locale")
      if (savedLocale && (savedLocale === "en" || savedLocale === "es")) {
        setLocaleState(savedLocale)
        setInitialLocale(savedLocale)
      }
    }

    // Preload critical namespaces
    translationLoader.preloadCritical(locale).catch(() => {})
  }, [locale])

  // Update loaded namespaces when locale changes
  useEffect(() => {
    if (mounted) {
      const cachedNamespaces = translationLoader.getCachedNamespaces(locale)
      setLoadedNamespaces(new Set(cachedNamespaces))
    }
  }, [locale, mounted])

  const setLocale = (newLocale: string) => {
    setLocaleState(newLocale)
    if (mounted && typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem("locale", newLocale)
    }
    // Preload critical namespaces for new locale
    translationLoader.preloadCritical(newLocale).catch(() => {})
  }

  const toggleLanguage = () => {
    const newLocale = locale === "en" ? "es" : "en"
    setLocale(newLocale)
  }

  const loadNamespace = useCallback(async (namespace: string) => {
    try {
      await translationLoader.loadNamespace(locale, namespace)
      setLoadedNamespaces(prev => new Set([...prev, namespace]))
    } catch (error) {
      // Failed to load namespace - silent in production
    }
  }, [locale])

  const preloadNamespaces = useCallback(async (namespaces: string[]) => {
    try {
      await translationLoader.loadNamespaces(locale, namespaces)
      setLoadedNamespaces(prev => new Set([...prev, ...namespaces]))
    } catch (error) {
      // Failed to preload namespaces - silent in production
    }
  }, [locale])

  const t = useCallback((key: string): string => {
    // Usar initialLocale durante SSR/hidratación para consistencia
    const activeLocale = mounted ? locale : initialLocale

    // Try new namespaced system first
    if (mounted && typeof window !== 'undefined') {
      // This will be resolved asynchronously, but for sync access we need fallback
      translationLoader.getTranslation(activeLocale, key).then(result => {
        // This would require async state update, which is complex for sync t()
        // For now, we'll rely on the legacy fallback system
      }).catch(() => {
        // Fallback handled below
      })
    }

    // Fallback to legacy system for immediate sync access
    const dict = legacyTranslations[activeLocale as keyof typeof legacyTranslations] as Record<string, string>
    return dict[key] || key
  }, [locale, mounted, initialLocale])

  return (
    <TranslationContext.Provider value={{ 
      locale, 
      setLocale, 
      t, 
      toggleLanguage, 
      loadNamespace, 
      preloadNamespaces 
    }}>
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
