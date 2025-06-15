"use client"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { TypingEffect } from "../components/typing-effect"
import { TerminalBackground } from "../components/terminal-background"
import { FloatingPanelsBackground } from "../components/floatingPanelsBackground"
import { GlitchEffect } from "../components/easter-egg-effects"
import { useTranslation } from "../hooks/use-translation"
import { useState, useEffect } from "react"

const homeTitle = "LUNA FACUNDO DEVELOPER"

interface EasterEggProps {
  trackClick: (elementId: string, maxClicks?: number) => void
  glitchMode: boolean
  getRandomTagline: () => string
}

interface HeroSectionProps {
  easterEggs?: EasterEggProps
}

export function HeroSection({ easterEggs }: HeroSectionProps) {
  const { t } = useTranslation()
  const [mounted, setMounted] = useState(false)
  const [currentTagline, setCurrentTagline] = useState("") 
  const [taglineClicks, setTaglineClicks] = useState(0)

  useEffect(() => {
    setMounted(true)
    setCurrentTagline(t("hero.tagline"))
  }, [t])
  
  if (!mounted) return null // <--- agrega esto


  const handleNameClick = () => {
    if (mounted && easterEggs) {
      easterEggs.trackClick('hero-name', 3)
    }
  }

  const handleTaglineClick = () => {
    if (mounted && easterEggs) {
      setTaglineClicks(prev => prev + 1)
      if (taglineClicks === 0) {
        easterEggs.trackClick('hero-tagline', 2)
        setTimeout(() => {
          setCurrentTagline(easterEggs.getRandomTagline())
        }, 500)
      } else {
        setCurrentTagline(easterEggs.getRandomTagline())
      }
    }
  }

  // Determinar el tagline a mostrar de forma consistente
  const displayTagline = mounted ? currentTagline : t("hero.tagline")
  const isInteractive = mounted && easterEggs

  return (
    <section id="hero" className="min-h-screen w-full flex flex-col items-center justify-center px-4 relative">
      <TerminalBackground />
      <FloatingPanelsBackground />
      <div className="relative z-10 flex flex-col items-center py-0 text-center space-y-10 w-full max-w-2xl">
        <div className="space-y-12">
          {/* Nombre clickeable con posible glitch effect */}
          <div 
            onClick={handleNameClick}
            className={`transition-opacity ${mounted ? 'cursor-pointer hover:opacity-80' : ''}`}
          >
            <GlitchEffect active={mounted && (easterEggs?.glitchMode || false)}>
              <pre className="font-mono text-terminal-green whitespace-pre-line leading-tight font-bold text-xl sm:text-2xl md:text-4xl lg:text-7xl break-words">
                <TypingEffect text={homeTitle} speed={50} />
              </pre>
            </GlitchEffect>
          </div>

          {/* Tags normales */}
          <div className="text-xl md:text-2xl text-terminal-cyan font-mono">{t("hero.tags")}</div>
          
          {/* Tagline con renderizado unificado */}
          <div 
            className={`text-terminal-green font-mono text-xl ${isInteractive ? 'cursor-pointer hover:text-terminal-cyan transition-colors' : ''}`}
            onClick={isInteractive ? handleTaglineClick : undefined}
            title={isInteractive ? "🎯 Click me for surprises..." : undefined}
          >
            <span className="text-terminal-cyan">$</span> echo &quot;{displayTagline}&quot;<span className="animate-pulse">_</span>
          </div>
        </div>
        
        {/* CV Download */}
        <a href="/Luna-Facundo-CV.pdf" download className="inline-block">
          <Button className="bg-terminal-green text-terminal-black hover:bg-terminal-cyan hover:text-terminal-black font-mono px-16 py-8 text-xl">
            <Download className="mr-2 h-5 w-5" />
            {t("hero.downloadCV")}
          </Button>
        </a>
      </div>
    </section>
  )
}
