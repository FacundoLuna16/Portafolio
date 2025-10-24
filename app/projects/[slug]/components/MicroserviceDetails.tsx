"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronRight, Code, Database, Shield, Zap } from "lucide-react"
import { Microservice } from "@/lib/data/projects/types"

interface MicroserviceDetailsProps {
  microservices: Microservice[]
  projectSlug?: string
}

export function MicroserviceDetails({ microservices, projectSlug }: MicroserviceDetailsProps) {
  const [expandedService, setExpandedService] = useState<string | null>(null)
  const [isClient, setIsClient] = useState(false)

  // No mostrar esta sección para el proyecto ShopUp
  if (projectSlug === 'shopup') {
    return null
  }

  useEffect(() => {
    setIsClient(true)
  }, [])

  const getServiceIcon = (name: string) => {
    if (name.toLowerCase().includes('gateway')) return <Shield className="h-5 w-5" />
    if (name.toLowerCase().includes('ai')) return <Zap className="h-5 w-5" />
    if (name.toLowerCase().includes('core')) return <Database className="h-5 w-5" />
    return <Code className="h-5 w-5" />
  }

  const getServiceColor = (name: string) => {
    if (name.toLowerCase().includes('gateway')) return 'text-blue-400 border-blue-400/30'
    if (name.toLowerCase().includes('ai')) return 'text-purple-400 border-purple-400/30'
    if (name.toLowerCase().includes('core')) return 'text-green-400 border-green-400/30'
    return 'text-terminal-green border-terminal-green/30'
  }

  if (!isClient) {
    return (
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-mono font-bold text-terminal-green">
            <span className="text-terminal-cyan">$</span> kubectl get services --all-namespaces
          </h2>
          <p className="text-terminal-green/80 font-mono">
            Deep dive en cada microservicio y sus responsabilidades específicas
          </p>
        </div>
        <div className="space-y-6">
          {microservices.map((service, index) => (
            <Card key={index} className="border-terminal-green">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 font-mono text-terminal-green">
                  {getServiceIcon(service.name)}
                  {service.name}
                </CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-mono font-bold text-terminal-green">
          <span className="text-terminal-cyan">$</span> kubectl get services --all-namespaces
        </h2>
        <p className="text-terminal-green/80 font-mono">
          Deep dive en cada microservicio y sus responsabilidades específicas
        </p>
      </div>

      <div className="space-y-6">
        {microservices.map((service, index) => {
          const isExpanded = expandedService === service.name
          const serviceColor = getServiceColor(service.name)
          
          return (
            <Card 
              key={index}
              className={`border transition-all duration-300 ${serviceColor} ${
                isExpanded ? 'shadow-lg' : 'hover:shadow-md'
              }`}
            >
              <CardHeader 
                className="cursor-pointer" 
                onClick={() => setExpandedService(isExpanded ? null : service.name)}
              >
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-3 font-mono text-terminal-green">
                    {getServiceIcon(service.name)}
                    {service.name}
                  </CardTitle>
                  
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="border-terminal-green/50 text-terminal-green font-mono">
                      {service.tech.length} tecnologías
                    </Badge>
                    {isExpanded ? 
                      <ChevronDown className="h-5 w-5 text-terminal-green" /> : 
                      <ChevronRight className="h-5 w-5 text-terminal-green" />
                    }
                  </div>
                </div>
                
                <p className="text-terminal-green/80 font-mono text-sm mt-2">
                  {service.description}
                </p>
              </CardHeader>

              {isExpanded && (
                <CardContent className="space-y-6">
                  {/* Tech Stack */}
                  <div>
                    <h4 className="text-sm font-mono font-semibold text-terminal-green mb-3">
                      🔧 Stack Tecnológico:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {service.tech.map((tech, techIndex) => (
                        <Badge 
                          key={techIndex}
                          variant="outline"
                          className="border-terminal-cyan/50 text-terminal-cyan font-mono text-xs"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Responsibilities */}
                  <div>
                    <h4 className="text-sm font-mono font-semibold text-terminal-green mb-3">
                      📋 Responsabilidades:
                    </h4>
                    <ul className="space-y-2">
                      {service.responsibilities.map((responsibility, respIndex) => (
                        <li 
                          key={respIndex}
                          className="flex items-start gap-2 text-terminal-green/80 font-mono text-sm"
                        >
                          <span className="text-terminal-cyan mt-1">•</span>
                          <span>{responsibility}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Endpoints */}
                  {service.endpoints && service.endpoints.length > 0 && (
                    <div>
                      <h4 className="text-sm font-mono font-semibold text-terminal-green mb-3">
                        🌐 Endpoints:
                      </h4>
                      <div className="space-y-1">
                        {service.endpoints.map((endpoint, endIndex) => (
                          <div 
                            key={endIndex}
                            className="font-mono text-sm text-terminal-cyan bg-terminal-cyan/10 px-3 py-1 rounded border border-terminal-cyan/20"
                          >
                            {endpoint}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Database Info */}
                  {service.database && (
                    <div>
                      <h4 className="text-sm font-mono font-semibold text-terminal-green mb-3">
                        🗄️ Base de Datos:
                      </h4>
                      <div className="font-mono text-sm text-terminal-green bg-terminal-green/10 px-3 py-2 rounded border border-terminal-green/20">
                        {service.database}
                      </div>
                    </div>
                  )}

                  {/* Code Snippet */}
                  {service.codeSnippet && (
                    <div>
                      <h4 className="text-sm font-mono font-semibold text-terminal-green mb-3">
                        💻 {service.codeSnippet.title}:
                      </h4>
                      <div className="bg-terminal-black/50 border border-terminal-green/30 rounded p-4 overflow-x-auto">
                        <pre className="text-sm font-mono text-terminal-green">
                          <code>{service.codeSnippet.code}</code>
                        </pre>
                      </div>
                      {service.codeSnippet.explanation && (
                        <p className="text-xs font-mono text-terminal-green/60 mt-2">
                          {service.codeSnippet.explanation}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Challenges */}
                  {service.challenges && service.challenges.length > 0 && (
                    <div>
                      <h4 className="text-sm font-mono font-semibold text-terminal-green mb-3">
                        🎯 Desafíos Técnicos:
                      </h4>
                      <div className="space-y-4">
                        {service.challenges.map((challenge, chalIndex) => (
                          <Card key={chalIndex} className="border-yellow-500/30 bg-yellow-500/5">
                            <CardContent className="p-4 space-y-3">
                              <h5 className="font-mono font-semibold text-yellow-400">
                                {challenge.title}
                              </h5>
                              <div className="space-y-2 text-sm font-mono">
                                <p><span className="text-red-400">Problema:</span> <span className="text-terminal-green/80">{challenge.problem}</span></p>
                                <p><span className="text-green-400">Solución:</span> <span className="text-terminal-green/80">{challenge.solution}</span></p>
                                {challenge.impact && (
                                  <p><span className="text-blue-400">Impacto:</span> <span className="text-terminal-green/80">{challenge.impact}</span></p>
                                )}
                              </div>
                              {challenge.techDetails && challenge.techDetails.length > 0 && (
                                <div className="mt-3">
                                  <span className="text-xs font-mono text-terminal-green/60">Detalles técnicos:</span>
                                  <ul className="mt-1 space-y-1">
                                    {challenge.techDetails.map((detail, detailIndex) => (
                                      <li key={detailIndex} className="text-xs font-mono text-terminal-green/70 flex items-start gap-2">
                                        <span className="text-terminal-cyan">→</span>
                                        <span>{detail}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </CardContent>
                          </Card>
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
