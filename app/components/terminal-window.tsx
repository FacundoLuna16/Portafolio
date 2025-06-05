import type React from "react"
interface TerminalWindowProps {
  children: React.ReactNode
  isDarkMode: boolean
  toggleLanguage: () => void
  setIsDarkMode: (val: boolean) => void
}

import { Button } from "@/components/ui/button"
import { Sun, Moon, Languages } from "lucide-react"

export function TerminalWindow({ children, isDarkMode, toggleLanguage, setIsDarkMode }: TerminalWindowProps) {
  return (
    <div className="min-h-screen p-4">
      <div
        className={`relative max-w-full mx-auto rounded-xl border-2 min-h-[calc(100vh-2rem)] ${
          isDarkMode ? "bg-terminal-black border-terminal-green" : "bg-white border-gray-300"
        }`}
      >
        {/* Toggles: Theme and Language */}
        <div className="absolute top-1 right-6 z-50 flex gap-2">
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

        {/* Terminal Header */}
        <div
          className={`flex items-center justify-between p-4 border-b-2 rounded-t-xl ${
            isDarkMode ? "border-terminal-green bg-terminal-black" : "border-gray-300 bg-gray-100"
          }`}
        >
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className={`font-mono text-sm ${isDarkMode ? "text-terminal-green" : "text-gray-700"}`}>
            facu@portfolio:~$ <span className="animate-pulse">_</span>
          </div>
          <div className="w-16"></div>
        </div>

        {/* Terminal Content */}
        <div className="relative">{children}</div>
      </div>
    </div>
  )
}
