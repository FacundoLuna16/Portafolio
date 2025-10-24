"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Code, Copy, CheckCheck } from "lucide-react"
import { Microservice } from "@/lib/data/projects/types"

interface CodeShowcaseProps {
  microservices: Microservice[]
  projectSlug?: string
}

export function CodeShowcase({ microservices, projectSlug }: CodeShowcaseProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyToClipboard = async (code: string, title: string) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopiedCode(title)
      setTimeout(() => setCopiedCode(null), 2000)
    } catch (err) {
      console.error('Error copying to clipboard:', err)
    }
  }

  const getLanguageColor = (language: string) => {
    switch (language.toLowerCase()) {
      case 'java': return 'text-orange-400 border-orange-400/30'
      case 'javascript':
      case 'js': return 'text-yellow-400 border-yellow-400/30'
      case 'typescript':
      case 'ts': return 'text-blue-400 border-blue-400/30'
      case 'python': return 'text-green-400 border-green-400/30'
      case 'bash': return 'text-purple-400 border-purple-400/30'
      case 'powershell': return 'text-cyan-400 border-cyan-400/30'
      case 'properties': return 'text-purple-400 border-purple-400/30'
      default: return 'text-terminal-green border-terminal-green/30'
    }
  }

  // No mostrar esta sección para el proyecto ShopUp
  if (projectSlug === 'shopup') {
    return null
  }

  // Filtrar microservicios que tienen code snippets
  const servicesWithCode = microservices.filter(service => service.codeSnippet)

  // Detectar si es un proyecto de seguridad
  const isSecurityProject = microservices.some(service =>
    service.tech.some(tech => ['Burp Suite Professional', 'Metasploit', 'Kali Linux', 'Nmap'].includes(tech))
  )

  // Detectar si es el proyecto Isidoro
  const isIsidoroProject = projectSlug === 'isidoro'

  // Función para generar el título apropiado
  const getTitle = () => {
    if (isSecurityProject) return 'cat exploits/*.py'
    if (isIsidoroProject) return 'ls -la frontend/src/'
    return 'find . -name "*.java" -o -name "*.py" | head -5'
  }

  // Función para generar la descripción apropiada
  const getDescription = () => {
    if (isSecurityProject) return 'Scripts y exploits desarrollados durante el training'
    if (isIsidoroProject) return 'Implementaciones clave del frontend React y backend Node.js'
    return 'Snippets de código real del proyecto - implementaciones clave'
  }

  // No mostrar esta sección si no hay código para mostrar o es proyecto Isidoro
  if (servicesWithCode.length === 0 || isIsidoroProject) {
    return null
  }

  return (
    <section className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-mono font-bold text-terminal-green">
          <span className="text-terminal-cyan">$</span> {getTitle()}
        </h2>
        <p className="text-terminal-green/80 font-mono">
          {getDescription()}
        </p>
      </div>

      <div className="grid gap-8">
        {servicesWithCode.map((service, index) => {
          const snippet = service.codeSnippet!
          const languageColor = getLanguageColor(snippet.language)
          
          return (
            <Card key={index} className={`border transition-all duration-300 ${languageColor}`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-3 font-mono text-terminal-green">
                    <Code className="h-5 w-5" />
                    {snippet.title}
                  </CardTitle>
                  
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className={`font-mono text-xs ${languageColor}`}>
                      {snippet.language}
                    </Badge>
                    <Badge variant="outline" className="border-terminal-green/50 text-terminal-green font-mono text-xs">
                      {service.name}
                    </Badge>
                  </div>
                </div>
                
                {snippet.explanation && (
                  <p className="text-terminal-green/80 font-mono text-sm mt-3">
                    {snippet.explanation}
                  </p>
                )}
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Code Block */}
                <div className="relative">
                  <div className="absolute top-3 right-3 z-10">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-terminal-green/50 text-terminal-green hover:bg-terminal-green hover:text-terminal-black font-mono text-xs"
                      onClick={() => copyToClipboard(snippet.code, snippet.title)}
                    >
                      {copiedCode === snippet.title ? (
                        <>
                          <CheckCheck className="mr-1 h-3 w-3" />
                          Copiado
                        </>
                      ) : (
                        <>
                          <Copy className="mr-1 h-3 w-3" />
                          Copiar
                        </>
                      )}
                    </Button>
                  </div>
                  
                  <div className="bg-terminal-black/80 border border-terminal-green/30 rounded-lg p-6 overflow-x-auto">
                    <pre className="text-sm font-mono text-terminal-green">
                      <code>{snippet.code}</code>
                    </pre>
                  </div>
                </div>

                {/* Code Context */}
                <div className="bg-terminal-green/5 border border-terminal-green/20 rounded p-4">
                  <h4 className="text-sm font-mono font-semibold text-terminal-green mb-2">
                    🔍 Contexto del Código:
                  </h4>
                  <div className="space-y-2 text-xs font-mono text-terminal-green/80">
                    <p><span className="text-terminal-cyan">{isSecurityProject ? 'Dominio:' : 'Servicio:'}</span> {service.name}</p>
                    <p><span className="text-terminal-cyan">Descripción:</span> {service.description}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      <span className="text-terminal-cyan">Tech Stack:</span>
                      {service.tech.slice(0, 3).map((tech, techIndex) => (
                        <Badge key={techIndex} variant="outline" className="border-terminal-cyan/30 text-terminal-cyan text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {service.tech.length > 3 && (
                        <Badge variant="outline" className="border-terminal-green/30 text-terminal-green text-xs">
                          +{service.tech.length - 3} más
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
