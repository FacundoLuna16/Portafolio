"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, CheckCircle, Lightbulb, ChevronDown, ChevronUp } from "lucide-react"
import { Challenge } from "@/lib/data/projects/types"

interface ChallengesSectionProps {
  challenges: Challenge[]
}

export function ChallengesSection({ challenges }: ChallengesSectionProps) {
  const [expandedChallenges, setExpandedChallenges] = useState<number[]>([])

  const toggleChallenge = (index: number) => {
    setExpandedChallenges(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  const toggleAll = () => {
    if (expandedChallenges.length === challenges.length) {
      setExpandedChallenges([])
    } else {
      setExpandedChallenges(challenges.map((_, index) => index))
    }
  }

  return (
    <section className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-mono font-bold text-terminal-green">
          <span className="text-terminal-cyan">$</span> git log --grep="fix:" --oneline
        </h2>
        <p className="text-terminal-green/80 font-mono">
          Principales desafíos técnicos y cómo los resolví
        </p>
        
        {/* Control para expandir/colapsar todos */}
        <div className="flex justify-center">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleAll}
            className="border-terminal-green/50 text-terminal-green hover:bg-terminal-green hover:text-terminal-black font-mono"
          >
            {expandedChallenges.length === challenges.length ? (
              <>
                <ChevronUp className="mr-2 h-4 w-4" />
                Colapsar Todo
              </>
            ) : (
              <>
                <ChevronDown className="mr-2 h-4 w-4" />
                Expandir Todo
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {challenges.map((challenge, index) => {
          const isExpanded = expandedChallenges.includes(index)
          
          return (
            <Card key={index} className="border-yellow-500/30 bg-yellow-500/5">
              {/* Header clickeable */}
              <CardHeader 
                className="cursor-pointer hover:bg-yellow-500/10 transition-colors duration-200"
                onClick={() => toggleChallenge(index)}
              >
                <CardTitle className="flex items-center justify-between text-yellow-400 font-mono">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-6 w-6" />
                    {challenge.title}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-yellow-400 hover:text-yellow-300 p-1"
                  >
                    {isExpanded ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </Button>
                </CardTitle>
              </CardHeader>
              
              {/* Contenido expandible */}
              {isExpanded && (
                <CardContent className="space-y-6 border-t border-yellow-500/20">
                  {/* Problem */}
                  <div className="space-y-3">
                    <h4 className="flex items-center gap-2 text-red-400 font-mono font-semibold">
                      <span className="text-red-500">●</span> Problema
                    </h4>
                    <p className="text-terminal-green/80 font-mono text-sm leading-relaxed pl-6">
                      {challenge.problem}
                    </p>
                  </div>

                  {/* Solution */}
                  <div className="space-y-3">
                    <h4 className="flex items-center gap-2 text-green-400 font-mono font-semibold">
                      <CheckCircle className="h-4 w-4" /> Solución
                    </h4>
                    <p className="text-terminal-green/80 font-mono text-sm leading-relaxed pl-6">
                      {challenge.solution}
                    </p>
                  </div>

                  {/* Impact */}
                  {challenge.impact && (
                    <div className="space-y-3">
                      <h4 className="flex items-center gap-2 text-blue-400 font-mono font-semibold">
                        <span className="text-blue-500">▲</span> Impacto
                      </h4>
                      <p className="text-terminal-green/80 font-mono text-sm leading-relaxed pl-6">
                        {challenge.impact}
                      </p>
                    </div>
                  )}

                  {/* Technical Details */}
                  {challenge.techDetails && challenge.techDetails.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-terminal-cyan font-mono font-semibold">
                        🔧 Detalles Técnicos:
                      </h4>
                      <div className="pl-6 space-y-2">
                        {challenge.techDetails.map((detail, detailIndex) => (
                          <div key={detailIndex} className="flex items-start gap-2">
                            <span className="text-terminal-cyan mt-1">→</span>
                            <span className="text-terminal-green/80 font-mono text-sm">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Learnings */}
                  {challenge.learnings && challenge.learnings.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="flex items-center gap-2 text-purple-400 font-mono font-semibold">
                        <Lightbulb className="h-4 w-4" /> Aprendizajes
                      </h4>
                      <div className="pl-6 space-y-2">
                        {challenge.learnings.map((learning, learningIndex) => (
                          <div key={learningIndex} className="flex items-start gap-2">
                            <span className="text-purple-400 mt-1">💡</span>
                            <span className="text-terminal-green/80 font-mono text-sm">{learning}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              )}
            </Card>
          )
        })}
      </div>
    </section>
  )
}
