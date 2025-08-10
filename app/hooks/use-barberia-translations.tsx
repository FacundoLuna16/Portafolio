"use client"

import { useEffect, useCallback } from "react"
import { useTranslation } from "./use-translation"

/**
 * Specialized hook for FADE ROOM (barberia) project translations
 * Preloads barberia namespace and provides typed translation function
 */
export function useBarberiaTranslations() {
  const { locale, loadNamespace, t } = useTranslation()

  useEffect(() => {
    // Preload barberia namespace when hook is used
    loadNamespace('barberia').catch(() => {})
  }, [loadNamespace, locale])

  const tBarberia = useCallback((key: string): string => {
    // Try barberia namespace first with legacy fallback
    return t(`projects.barberia.${key}`)
  }, [t])

  return {
    locale,
    t: tBarberia, 
    tGlobal: t // Access to global t function if needed
  }
}