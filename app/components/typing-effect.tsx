"use client"

import { useState, useEffect } from "react"

interface TypingEffectProps {
  text: string
  className?: string
  speed?: number
}

export function TypingEffect({ text, className = "", speed = 50 }: TypingEffectProps) {
  const [mounted, setMounted] = useState(false)
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  // Marcar como montado en el cliente
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, speed)

      return () => clearTimeout(timeout)
    }
  }, [mounted, currentIndex, text, speed])

  // No mostrar animación hasta que esté montado
  if (!mounted) {
    return <div className={className}>{text}</div>
  }

  return (
    <div className={className}>
      {displayText}
      {currentIndex < text.length && <span className="animate-pulse">_</span>}
    </div>
  )
}
