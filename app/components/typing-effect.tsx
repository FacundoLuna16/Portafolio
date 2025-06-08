"use client"

import { useState, useEffect } from "react"

interface TypingEffectProps {
  text: string
  className?: string
  speed?: number
  loop?: boolean
  cursor?: string
}

export function TypingEffect({
  text,
  className = "",
  speed = 50,
  loop = false,
  cursor = "_",
}: TypingEffectProps) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, speed)

      return () => clearTimeout(timeout)
    } else if (loop) {
      const timeout = setTimeout(() => {
        setDisplayText("")
        setCurrentIndex(0)
      }, 1500)
      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text, speed, loop])

  return (
    <div className={className}>
      {displayText}
      {currentIndex < text.length && (
        <span className="animate-pulse">{cursor}</span>
      )}
    </div>
  )
}
