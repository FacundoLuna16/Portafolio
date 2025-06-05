"use client"

import { useState, useEffect } from "react"

interface TypingEffectProps {
  text: string
  className?: string
  speed?: number
}

export function TypingEffect({ text, className = "", speed = 50 }: TypingEffectProps) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, speed)

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text, speed])

  return (
    <div className={className}>
      {displayText}
      {currentIndex < text.length && <span className="animate-pulse">_</span>}
    </div>
  )
}
