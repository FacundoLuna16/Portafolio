"use client"

import { useState, useEffect } from "react"

const codeSnippets = [
  "docker compose up -d",
  "kubectl get pods -A",
  "terraform apply -auto-approve",
  "git push origin main",
  "curl -X POST /api/deploy",
  "npm run build && npm run deploy",
  "python manage.py migrate",
  "echo 'Hello, World!' > hello.txt",
  "ssh user@server 'uptime'",
]

export function CodeRotator() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [charIndex, setCharIndex] = useState(0)

  useEffect(() => {
    const currentSnippet = codeSnippets[currentIndex]
    if (isTyping && charIndex < currentSnippet.length) {
      const timeout = setTimeout(() => {
        setDisplayText(currentSnippet.slice(0, charIndex + 1))
        setCharIndex(charIndex + 1)
      }, 80)
      return () => clearTimeout(timeout)
    } else if (isTyping && charIndex >= currentSnippet.length) {
      const timeout = setTimeout(() => {
        setIsTyping(false)
      }, 3000) // Display complete text for 3 seconds
      return () => clearTimeout(timeout)
    } else if (!isTyping) {
      const timeout = setTimeout(() => {
        setDisplayText("")
        setCharIndex(0)
        setCurrentIndex((prev) => (prev + 1) % codeSnippets.length)
        setIsTyping(true)
      }, 1000) // Pause before next snippet
      return () => clearTimeout(timeout)
    }
  }, [currentIndex, charIndex, isTyping])

  return (
    <div className="font-mono text-terminal-green text-2xl md:text-4xl lg:text-6xl leading-relaxed">
      <pre className="whitespace-pre-wrap">
        <span className="text-terminal-cyan">$ </span>
        {displayText}
        <span className="animate-pulse">_</span>
      </pre>
    </div>
  )
}
