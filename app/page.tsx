"use client"

import dynamic from 'next/dynamic'
import { TerminalNavbar } from "./components/terminal-navbar"
import { useTranslation } from "./hooks/use-translation"
import { useScrollToSection } from "@/lib/hooks/use-scroll-to-section"
import { useEasterEggs } from "./hooks/use-easter-eggs"
// import { useAnalytics } from "./hooks/use-analytics"
// import { useMicroOptimizations } from "./components/micro-optimizations"
import { HeroSection } from "./sections/HeroSection"
// Easter Eggs - importación directa para evitar problemas
import EasterEggEffects from "./components/easter-egg-effects"

// Skeleton component para loading states
const SectionSkeleton = () => (
  <section className="py-20 px-2 sm:px-4 lg:px-8">
    <div className="max-w-6xl mx-auto animate-pulse">
      <div className="h-8 bg-terminal-green/20 rounded mb-8 w-64"></div>
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-24 bg-terminal-green/10 rounded"></div>
        ))}
      </div>
    </div>
  </section>
)

// Lazy loading de secciones below-the-fold
const TerminalAboutSection = dynamic(() => 
  import("./sections/TerminalAboutSection").then(mod => ({ default: mod.TerminalAboutSection })),
  { 
    loading: () => <SectionSkeleton />,
    ssr: false 
  }
)

const HistorySection = dynamic(() => 
  import("./sections/HistorySection").then(mod => ({ default: mod.HistorySection })),
  { loading: () => <SectionSkeleton /> }
)

const ProjectsSection = dynamic(() => 
  import("./sections/ProjectsSection").then(mod => ({ default: mod.ProjectsSection })),
  { loading: () => <SectionSkeleton /> }
)

const HoloContactSection = dynamic(() => 
  import("./sections/HoloContactSection").then(mod => ({ default: mod.HoloContactSection })),
  { loading: () => <SectionSkeleton /> }
)

export default function Portfolio() {
  const { locale, setLocale } = useTranslation()
  const { scrollToSection } = useScrollToSection()
  const { state: easterEggState, trackClick, getRandomTagline } = useEasterEggs()
  // const { trackCVDownload, trackContactInteraction, trackProjectView } = useAnalytics()
  // const { applyRouteSpecificOptimizations } = useMicroOptimizations()

  const toggleLanguage = () => {
    const newLocale = locale === "en" ? "es" : "en"
    setLocale(newLocale)
  }

  return (
    <div className="min-h-screen relative">
      {/* Easter Egg Effects - Siempre presente pero condicionalmente activo */}
      <EasterEggEffects 
        matrixActive={easterEggState.matrixMode}
        hackerActive={easterEggState.hackerMode}
        nightOwlActive={easterEggState.nightOwlMessage}
        fridayActive={easterEggState.fridayMessage}
      />

      {/* Main Content */}
      <TerminalNavbar toggleLanguage={toggleLanguage} onNavigate={scrollToSection} />
      
      {/* Hero - Carga inmediata (crítico) */}
      <HeroSection 
        easterEggs={{
          trackClick,
          glitchMode: easterEggState.glitchMode,
          getRandomTagline
        }}
      />
      
      {/* Secciones - Lazy loading progresivo */}
      <TerminalAboutSection />
      <HistorySection />
      <ProjectsSection />
      <HoloContactSection />
    </div>
  )
}
