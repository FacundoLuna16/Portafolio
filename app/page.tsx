"use client"

import { TerminalNavbar } from "./components/terminal-navbar"
import { useTranslation } from "./hooks/use-translation"
import { useScrollToSection } from "@/lib/hooks/use-scroll-to-section"
import { HeroSection } from "./sections/HeroSection"
import { TerminalAboutSection } from "./sections/TerminalAboutSection"
import { HistorySection } from "./sections/HistorySection"
import { ProjectsSection } from "./sections/ProjectsSection"
import { ContactSection } from "./sections/ContactSection"

export default function Portfolio() {
  const { locale, setLocale } = useTranslation()
  const { scrollToSection } = useScrollToSection()

  const toggleLanguage = () => {
    const newLocale = locale === "en" ? "es" : "en"
    setLocale(newLocale)
  }

  return (
    <div className="min-h-screen">
      <TerminalNavbar toggleLanguage={toggleLanguage} onNavigate={scrollToSection} />
      <HeroSection />
      <TerminalAboutSection />
      <HistorySection />
      <ProjectsSection />
      <ContactSection />
    </div>
  )
}
