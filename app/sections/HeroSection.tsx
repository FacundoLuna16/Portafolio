"use client"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { motion } from "framer-motion"
import { TypingEffect } from "../components/typing-effect"
import { useTranslation } from "../hooks/use-translation"

const homeTitle = "LUNA FACUNDO DEVELOPER"

export function HeroSection() {
  const { t } = useTranslation()
  return (
    <section id="hero" className="min-h-screen w-full flex flex-col items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 hero-bg" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex flex-col items-center py-0 text-center space-y-10 w-full max-w-2xl"
      >
        <div className="space-y-12">
          <pre className="font-mono text-terminal-green whitespace-pre-line leading-tight font-bold text-2xl xs:text-3xl sm:text-4xl lg:text-7xl break-words">
            <TypingEffect text={homeTitle} speed={50} />
          </pre>
          <div className="text-xl md:text-2xl text-terminal-cyan font-mono">{t("hero.tags")}</div>
          <div className="text-terminal-green font-mono text-xl">
            <span className="text-terminal-cyan">$</span> echo &quot;{t("hero.tagline")}&quot;<span className="animate-pulse">_</span>
          </div>
        </div>
        <a href="/Luna-Facundo-CV.pdf" download className="inline-block">
          <Button className="bg-terminal-green text-terminal-black hover:bg-terminal-cyan hover:text-terminal-black font-mono px-16 py-8 text-xl">
            <Download className="mr-2 h-5 w-5" />
            {t("hero.downloadCV")}
          </Button>
        </a>
      </motion.div>
    </section>
  )
}
