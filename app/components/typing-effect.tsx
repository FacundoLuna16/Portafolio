"use client"

import { useState, useEffect } from "react"

interface TypingEffectProps {
  text: string
  className?: string
  speed?: number
}

export function TypingEffect({ text, className = "", speed = 50 }: TypingEffectProps) {
  const [mounted, setMounted] = useState(false)
  const [displayText, setDisplayText] = useState("") // Siempre empezar vacío
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  // Marcar como montado en el cliente
  useEffect(() => {
    setMounted(true)
  }, [])

  // Iniciar animación solo después del montaje
  useEffect(() => {
    if (!mounted) return
    
    setIsAnimating(true)
  }, [mounted])

  useEffect(() => {
    if (!isAnimating || !mounted) return
    
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, speed)

      return () => clearTimeout(timeout)
    } else {
      setIsAnimating(false)
    }
  }, [mounted, currentIndex, text, speed, isAnimating])

  // Durante SSR y antes del montaje, mostrar el texto completo para evitar layout shift
  if (!mounted) {
    return (
      <div className={className}>
        {text}
      </div>
    )
  }

  return (
    <div className={className}>
      {displayText}
      {isAnimating && <span className="animate-pulse">_</span>}
    </div>
  )
}
