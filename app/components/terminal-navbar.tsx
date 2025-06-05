"use client"

import React from "react"
import { useCommandAnimation } from "../hooks/use-command-animation"
import { useTranslation } from "../hooks/use-translation"
import { useDarkMode } from "../hooks/use-dark-mode"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Languages, Menu, Moon, Sun } from "lucide-react"

interface TerminalNavbarProps {
  toggleLanguage: () => void
  onNavigate: (id: string) => void
}

export function TerminalNavbar({ toggleLanguage, onNavigate }: TerminalNavbarProps) {
  const { t } = useTranslation()
  const { command, runCommand } = useCommandAnimation()
  const { isDarkMode, setIsDarkMode } = useDarkMode()

  const navItems = [
    { section: "hero", command: `${t("navbar.home")} -li` },
    { section: "about", command: `${t("navbar.about")} -me` },
    { section: "projects", command: `${t("navbar.projects")} -all` },
    { section: "contact", command: `${t("navbar.contact")} -me` },
  ]

  const handleNav = (section: string, cmd: string) => {
    runCommand(cmd)
    onNavigate(section)
  }

  return (
    <nav
      className="sticky top-0 z-50 w-full border-b-2 bg-terminal-black border-terminal-green"
      aria-label="main navigation"
    >
      <div className="flex items-center justify-between w-full px-4 py-3">
        {/* Prompt */}
        <div className="flex-none min-w-max font-mono text-terminal-green overflow-hidden text-ellipsis">
          facu@portfolio:~$ {command ? (
            <>
              <span>{command}</span> <span className="text-terminal-cyan">→</span>
            </>
          ) : (
            <span className="animate-pulse">_</span>
          )}
        </div>

        {/* Commands */}
        <ul className="flex-1 hidden md:flex justify-center gap-6 font-mono text-terminal-green">
          {navItems.map((item) => (
            <li key={item.section}>
              <button
                onClick={() => handleNav(item.section, item.command)}
                className="hover:text-terminal-cyan underline-offset-4 hover:underline whitespace-nowrap"
              >
                $ {item.command}
              </button>
            </li>
          ))}
        </ul>

        {/* Toggles + menu */}
        <div className="flex-none flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-terminal-green hover:text-terminal-cyan"
            onClick={toggleLanguage}
            aria-label="Cambiar idioma"
          >
            <Languages className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-terminal-green hover:text-terminal-cyan"
            onClick={() => setIsDarkMode(!isDarkMode)}
            aria-label="Cambiar tema"
          >
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Abrir menú"
                className="text-terminal-green hover:text-terminal-cyan md:hidden"
              >
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="fixed inset-y-0 right-0 w-4/5 max-w-xs md:hidden z-[60] bg-terminal-black border-l-2 border-terminal-green"
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
