"use client"

import { useState, useEffect } from "react"
import { useTranslation } from "../hooks/use-translation"

interface NavigationProps {
  onNavigate: (sectionId: string) => void
}

export function Navigation({ onNavigate }: NavigationProps) {
  const [isVisible, setIsVisible] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 2000) // Show navigation after typing animation

    return () => clearTimeout(timer)
  }, [])

  const navItems = [
    {
      section: "hero",
      command: t("navbar.home") + " -li",
    },
    {
      section: "about",
      command: "man " + t("navbar.about"),
    },
    {
      section: "projects" ,
      command: t("navbar.projects") + " -all",
    },
    {
      section: "contact",
      command: t("navbar.contact") + " -me",
    },
  ]

  if (!isVisible) return null

  return (
    <nav className="fixed top-[4.75rem] left-4 right-4 z-40 bg-terminal-black/90 backdrop-blur-sm border border-terminal-green rounded p-4">
      <div className="flex flex-wrap gap-4 justify-center">
        {navItems.map((item) => (
          <button
            key={item.section}
            onClick={() => onNavigate(item.section)}
            className="font-mono text-terminal-green hover:text-terminal-cyan transition-colors text-sm"
          >
            <span className="text-terminal-cyan">$</span> {item.command}
          </button>
        ))}
      </div>
    </nav>
  )
}
