"use client"

import { useState, useEffect, useCallback } from 'react'

interface ClickTracker {
  [key: string]: number
}

interface EasterEggState {
  glitchMode: boolean
  matrixMode: boolean
  debugMode: boolean
  hackerMode: boolean
  nightOwlMessage: boolean
  fridayMessage: boolean
  clickTrackers: ClickTracker
}

export function useEasterEggs() {
  const [state, setState] = useState<EasterEggState>({
    glitchMode: false,
    matrixMode: false,
    debugMode: false,
    hackerMode: false,
    nightOwlMessage: false,
    fridayMessage: false,
    clickTrackers: {}
  })

  // Track clicks en elementos específicos
  const trackClick = useCallback((elementId: string, maxClicks: number = 5) => {
    setState(prev => {
      const currentCount = prev.clickTrackers[elementId] || 0
      const newCount = currentCount + 1
      
      const newTrackers = {
        ...prev.clickTrackers,
        [elementId]: newCount
      }

      // Activar efectos basados en clicks
      let newState = { ...prev, clickTrackers: newTrackers }

      if (elementId === 'hero-name' && newCount === 3) {
        // Triple click en nombre → Hacker Mode
        newState.hackerMode = true
        // Auto-hide después de 10 segundos
        setTimeout(() => {
          setState(current => ({ ...current, hackerMode: false }))
        }, 10000)
        console.log('🕵️ Hacker Mode Activated! Welcome to the matrix...')
      }
      
      if (elementId === 'hero-tagline' && newCount === 2) {
        // Double click en tagline → Cambiar a frases random
        newState.glitchMode = true
        // Auto-hide glitch después de 3 segundos
        setTimeout(() => {
          setState(current => ({ ...current, glitchMode: false }))
        }, 3000)
        console.log('⚡ Glitch Mode Activated! Reality is optional...')
      }

      if (elementId === 'logo-avatar' && newCount >= 5) {
        // 5 clicks en logo → Matrix Mode
        newState.matrixMode = true
        // Auto-hide después de 15 segundos
        setTimeout(() => {
          setState(current => ({ ...current, matrixMode: false }))
        }, 15000)
        console.log('🟢 Matrix Mode Activated! There is no spoon...')
        // Reset counter después de activar
        newTrackers[elementId] = 0
      }

      return newState
    })
  }, [])

  // Efectos time-based con manejo de errores
  useEffect(() => {
    const checkTimeBasedEffects = () => {
      try {
        const now = new Date()
        const hour = now.getHours()
        const day = now.getDay() // 0 = domingo, 5 = viernes

        setState(prev => ({
          ...prev,
          // Night Owl (2am - 6am)
          nightOwlMessage: hour >= 2 && hour <= 6,
          // Friday night (viernes después de 6pm)
          fridayMessage: day === 5 && hour >= 18,
        }))
      } catch (error) {
        console.warn('Error checking time-based effects:', error)
      }
    }

    checkTimeBasedEffects()
    // Check cada minuto
    const interval = setInterval(checkTimeBasedEffects, 60000)

    return () => clearInterval(interval)
  }, [])

  // Funciones para controlar efectos
  const toggleGlitchMode = useCallback(() => {
    setState(prev => ({ ...prev, glitchMode: !prev.glitchMode }))
  }, [])

  const toggleMatrixMode = useCallback(() => {
    setState(prev => ({ ...prev, matrixMode: !prev.matrixMode }))
  }, [])

  const toggleDebugMode = useCallback(() => {
    setState(prev => ({ ...prev, debugMode: !prev.debugMode }))
  }, [])

  const resetAllEffects = useCallback(() => {
    setState(prev => ({
      ...prev,
      glitchMode: false,
      matrixMode: false,
      debugMode: false,
      hackerMode: false,
      clickTrackers: {}
    }))
  }, [])

  // Random glitch phrases para el tagline - mejoradas
  const getRandomTagline = useCallback(() => {
    const phrases = [
      "Bug Creator | Error Generator | Coffee Consumer",
      "Stack Overflow Scholar | Copy-Paste Specialist | Ctrl+Z Master", 
      "Code Ninja | Deadline Survivor | Caffeine Powered",
      "Git Commit -m 'fix bug' | Git Push --force | Git Blame Others",
      "Rubber Duck Consultant | Console.log Detective | Syntax Error Hunter",
      "Microservice Architect | Monolith Destroyer | Container Whisperer",
      "API Conjurer | Database Wizard | Cache Invalidator",
      "DevOps Samurai | Infrastructure Tamer | CI/CD Pipeline Plumber",
      "React Hook Wizard | State Management Guru | Component Alchemist",
      "Docker Captain | Kubernetes Pilot | Cloud Native Explorer"
    ]
    return phrases[Math.floor(Math.random() * phrases.length)]
  }, [])

  return {
    state,
    trackClick,
    toggleGlitchMode,
    toggleMatrixMode,
    toggleDebugMode,
    resetAllEffects,
    getRandomTagline
  }
}
