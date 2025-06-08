"use client"

import React from "react"
import { useCommandAnimation } from "../hooks/use-command-animation"
import { useTranslation } from "../hooks/use-translation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Languages, Menu, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

interface TerminalNavbarProps {
  toggleLanguage: () => void
  onNavigate: (id: string) => void
}

export function TerminalNavbar({ toggleLanguage, onNavigate }: TerminalNavbarProps) {
  const { t } = useTranslation()
  const { command, runCommand } = useCommandAnimation()
  const { theme, setTheme } = useTheme()
  const isDarkMode = theme === "dark"

  const navItems = [
    { section: "hero", command: `${t("navbar.home")} -li` },
    { section: "about", command: `${t("navbar.about")} -me` },
    { section: "history", command: `${t("navbar.history")}` },
    { section: "projects", command: `${t("navbar.projects")} -all` },
    { section: "contact", command: `${t("navbar.contact")} -me` },

  ]

  const handleNav = (section: string, cmd: string) => {
    runCommand(cmd)
    onNavigate(section)
  }

  return (
    <nav
      className="sticky top-0 z-50 w-full border-b-2 border-terminal-green bg-background"
      aria-label="main navigation"
    >
      <div className="grid grid-cols-[auto_1fr_auto] items-center w-full px-2 py-2 md:px-12 md:py-4 gap-2 md:gap-4">
        {/* Columna 1: Prompt */}
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

        {/* Columna 2: Comandos */}
        <ul className="hidden md:flex gap-8 justify-center w-full">
          {navItems.map((item) => (
            <li key={item.section}>
              <button
                onClick={() => handleNav(item.section, item.command)}
                className="font-mono text-terminal-green hover:text-terminal-cyan underline-offset-4 hover:underline whitespace-nowrap text-base"
              >
                $ {item.command}
              </button>
            </li>
          ))}
        </ul>

        {/* Columna 3: Toggles y menú */}
        <div className="flex items-center gap-2 justify-end">
        <Button
          variant="ghost"
          size="icon"
          className="text-terminal-green hover:text-terminal-cyan p-3"
          onClick={toggleLanguage}
          aria-label="Cambiar idioma"
        >
          <Languages className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-terminal-green hover:text-terminal-cyan p-3"
          onClick={() => setTheme(isDarkMode ? "light" : "dark")}
          aria-label="Cambiar tema"
          disabled
        >
          {isDarkMode ? <Sun className="h-8 w-8" /> : <Moon className="h-8 w-8" />}
        </Button>

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
                      onClick={() => handleNav(item.section, item.command)}
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
