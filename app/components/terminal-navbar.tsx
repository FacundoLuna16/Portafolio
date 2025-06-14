"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useCommandAnimation } from "../hooks/use-command-animation"
import { useTranslation } from "../hooks/use-translation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Languages, Menu, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

interface TerminalNavbarProps {
  toggleLanguage?: () => void
  onNavigate?: (id: string) => void
}

export function TerminalNavbar({ toggleLanguage: toggleLangProp, onNavigate }: TerminalNavbarProps) {
  const { t, toggleLanguage: toggleLangHook } = useTranslation()
  const { command, runCommand } = useCommandAnimation()
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Usar la función de toggle apropiada
  const handleToggleLanguage = toggleLangProp || toggleLangHook

  const navItems = [
    { section: "hero", command: `${t("navbar.home")} -li`, href: "/" },
    { section: "about", command: `${t("navbar.about")} -me`, href: "/#about" },
    { section: "history", command: `${t("navbar.history")}`, href: "/#history" },
    { section: "projects", command: `${t("navbar.projects")} -all`, href: "/#projects" },
    { section: "contact", command: `${t("navbar.contact")} -me`, href: "/#contact" },
  ]

  const handleNav = (section: string, cmd: string, href: string) => {
    runCommand(cmd)
    
    if (onNavigate && href.startsWith("/#")) {
      // Navegación dentro de la página principal
      onNavigate(section)
    } else if (href === "/") {
      // Navegación al home
      router.push("/")
    } else if (href.startsWith("/#")) {
      // Si queremos ir a una sección del home desde otra página
      router.push("/")
      // Después de navegar al home, hacer scroll a la sección
      setTimeout(() => {
        const element = document.getElementById(section)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    } else {
      // Navegación normal
      router.push(href)
    }
  }

  return (
    <nav
      className="sticky top-0 z-50 w-full border-b-2 border-terminal-green bg-background"
      aria-label="main navigation"
    >
      <div className="grid grid-cols-[auto_1fr_auto] items-center w-full px-2 py-2 md:px-12 md:py-4 gap-2 md:gap-4">
        
        {/* Columna 1: Terminal Prompt */}
        <div className="flex items-center">
          <span className="block overflow-hidden text-ellipsis whitespace-nowrap font-mono text-terminal-green text-base md:w-[34ch]">
            facu@portfolio:~$ {command ? (
              <>
                <span>{command}</span> <span className="text-terminal-cyan">↲</span>
              </>
            ) : (
              <span className="absolute animate-pulse">_</span>
            )}
            {/* Texto oculto para accesibilidad */}
            <span className="opacity-0 pointer-events-none absolute">
              projects -all ↲
            </span>
          </span>
        </div>

        {/* Columna 2: Comandos de navegación */}
        <ul className="hidden md:flex gap-8 justify-center w-full">
          {navItems.map((item) => (
            <li key={item.section}>
              <button
                onClick={() => handleNav(item.section, item.command, item.href)}
                className="font-mono text-terminal-green hover:text-terminal-cyan underline-offset-4 hover:underline whitespace-nowrap text-base"
              >
                $ {item.command}
              </button>
            </li>
          ))}
        </ul>

        {/* Columna 3: Controles (idioma, tema, menú mobile) */}
        <div className="flex items-center gap-2 justify-end">
          <Button
            variant="ghost"
            size="icon"
            className="text-terminal-green hover:text-terminal-cyan p-3"
            onClick={handleToggleLanguage}
            aria-label="Cambiar idioma"
          >
            <Languages className="h-6 w-6" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="text-terminal-green hover:text-terminal-cyan p-3"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Cambiar tema"
            disabled
          >
            {isClient && theme === "dark" ? <Sun className="h-8 w-8" /> : <Moon className="h-8 w-8" />}
          </Button>

          {/* Menú móvil */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Abrir menú"
                className="text-terminal-green hover:text-terminal-cyan md:hidden"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="top-0 right-0 h-full w-2/3 max-w-xs border-2 bg-background border-terminal-green"
            >
              <nav
                className="mt-6 flex flex-col gap-4 overflow-y-auto"
                aria-label="Secciones"
              >
                {navItems.map((item) => (
                  <SheetClose asChild key={item.section}>
                    <button
                      onClick={() => handleNav(item.section, item.command, item.href)}
                      className="font-mono text-terminal-green hover:text-terminal-cyan text-left"
                    >
                      $ {item.command}
                    </button>
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
