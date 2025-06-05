"use client"

import React from "react"
import { useCommandAnimation } from "../hooks/use-command-animation"
import { useTranslation } from "../hooks/use-translation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Languages, Menu, Moon, Sun } from "lucide-react"

interface TerminalNavbarProps {
  isDarkMode: boolean
  setIsDarkMode: (val: boolean) => void
  toggleLanguage: () => void
  onNavigate: (id: string) => void
}

export function TerminalNavbar({ isDarkMode, setIsDarkMode, toggleLanguage, onNavigate }: TerminalNavbarProps) {
  const { t } = useTranslation()
  const { command, runCommand } = useCommandAnimation()

  const navItems = [
    { section: "hero", command: `${t("navbar.home")} -li` },
    { section: "about", command: `${t("navbar.about")} -me` },
    { section: "projects", command: `${t("navbar.projects")} -all` },
    { section: "contact", command: `${t("navbar.contact")} -me` },
  ]

  const handleNav = (section: string, cmd: string) => {
    runCommand(cmd)
    document.getElementById(section)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className={`sticky top-0 z-50 border-b-2 ${isDarkMode ? "bg-terminal-black border-terminal-green" : "bg-gray-100 border-gray-300"}`}>
      <div className="relative flex items-center justify-between p-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Abrir menú" className="text-terminal-green hover:text-terminal-cyan">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className={`border-2 ${isDarkMode ? "bg-terminal-black border-terminal-green" : "bg-white border-gray-300"}`}>
              <nav className="mt-6 flex flex-col gap-4" aria-label="Secciones">
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
        <div className="absolute top-1 right-6 flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-terminal-green hover:text-terminal-cyan"
            onClick={toggleLanguage}
          >
            <Languages className="h-4 w-4" />
            <span className="sr-only">Toggle language</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-terminal-green hover:text-terminal-cyan"
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
      <nav className="hidden md:flex items-center gap-x-6 p-4 font-mono text-sm" aria-label="Secciones">
        <span className="text-terminal-green whitespace-nowrap">
          facu@portfolio:~$ {command ? <><span>{command}</span> <span className="text-terminal-cyan">→</span></> : <span className="animate-pulse">_</span>}
        </span>
        {navItems.map((item) => (
          <button
            key={item.section}
            onClick={() => handleNav(item.section, item.command)}
            className="text-terminal-green hover:text-terminal-cyan whitespace-nowrap"
          >
            $ {item.command}
          </button>
        ))}
      </nav>
    </div>
  )
}
