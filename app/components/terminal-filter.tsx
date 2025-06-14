"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

interface TerminalFilterProps {
  filters: string[]
  activeFilter: string
  onFilterChange: (filter: string) => void
  filteredCount: number
}

export function TerminalFilter({ filters, activeFilter, onFilterChange, filteredCount }: TerminalFilterProps) {
  const [mounted, setMounted] = useState(false)
  const [typingFilter, setTypingFilter] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleFilterClick = (filter: string) => {
    setTypingFilter(filter)
    setTimeout(() => {
      onFilterChange(filter)
      setTypingFilter(null)
    }, 500) // Reducido de 800ms a 500ms
  }

  if (!mounted) {
    return (
      <div className="flex flex-wrap gap-2 mb-8">
        {filters.map((filter) => (
          <div key={filter} className="h-10 w-20 bg-terminal-green/20 rounded animate-pulse"></div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4 mb-8">
      {/* Terminal Command Line */}
      <div className="font-mono text-terminal-green">
        <span className="text-terminal-cyan">$</span> filter --category=
        {typingFilter ? (
          <span className="text-terminal-yellow">
            {typingFilter.toLowerCase()}
            <span className="animate-pulse">█</span>
          </span>
        ) : (
          <span className="text-terminal-yellow">
            {activeFilter.toLowerCase()}
            <span className="animate-pulse text-terminal-green">█</span>
          </span>
        )}
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => {
          const isActive = activeFilter === filter
          const isTyping = typingFilter === filter
          
          return (
            <Button
              key={filter}
              variant="outline"
              className={`font-mono text-sm transition-all duration-300 ${
                isActive
                  ? "bg-terminal-green text-terminal-black border-terminal-green shadow-lg shadow-terminal-green/20"
                  : isTyping
                  ? "border-terminal-yellow text-terminal-yellow bg-terminal-yellow/10"
                  : "border-terminal-green/50 text-terminal-green hover:border-terminal-green hover:bg-terminal-green/10"
              }`}
              onClick={() => handleFilterClick(filter)}
              disabled={isTyping}
            >
              {isTyping ? (
                <div className="flex items-center space-x-1">
                  <div className="w-1 h-1 bg-current rounded-full animate-bounce"></div>
                  <div className="w-1 h-1 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-1 h-1 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              ) : (
                <>
                  {getFilterIcon(filter)} {filter}
                </>
              )}
            </Button>
          )
        })}
      </div>

      {/* Results Count */}
      <div className="font-mono text-sm text-terminal-green/70">
        <span className="text-terminal-cyan">&gt;</span> Found {filteredCount} projects matching criteria
      </div>
    </div>
  )
}

function getFilterIcon(filter: string): string {
  switch (filter) {
    case 'All':
      return '📁'
    case 'Backend':
      return '⚙️'
    case 'Frontend':
      return '🎨'
    case 'DevOps':
      return '🚀'
    case 'Security':
      return '🛡️'
    default:
      return '📄'
  }
}
