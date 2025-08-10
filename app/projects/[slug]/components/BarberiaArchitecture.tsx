"use client"

import React from 'react'
import { Database, Server, Globe, Shield, Zap, Code } from 'lucide-react'
import { useBarberiaTranslations } from '@/app/hooks/use-barberia-translations'

interface Microservice {
  name: string
  description: string
  tech: string[]
  responsibilities: string[]
}

interface BarberiaArchitectureProps {
  architecture: {
    description: string
    microservices?: Microservice[]
    components?: Microservice[]
    integrations: string[]
  }
}

const techIcons: { [key: string]: any } = {
  'React 18': Globe,
  'Spring Boot 3': Server,
  'PostgreSQL': Database,
  'Redis': Zap,
  'JWT': Shield,
  'Spring Security': Shield
}

export function BarberiaArchitecture({ architecture }: BarberiaArchitectureProps) {
  const { t } = useBarberiaTranslations()

  const getTechIcon = (tech: string) => {
    const IconComponent = techIcons[tech] || Code
    return <IconComponent className="w-5 h-5" />
  }

  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-terminal-green mb-4 font-mono">
            <Server className="inline w-8 h-8 mr-3 text-terminal-cyan" />
            <span className="text-terminal-cyan">$</span> {t('architecture.title')}
          </h2>
          <p className="text-terminal-green/80 text-lg max-w-3xl mx-auto leading-relaxed">
            {architecture.description}
          </p>
        </div>

        {/* Architecture Diagram */}
        <div className="mb-12">
          <div className="bg-terminal-black/50 border-2 border-terminal-green rounded-lg p-6">
            <div className="grid md:grid-cols-3 gap-6">
              
              {/* Frontend Layer */}
              <div className="space-y-4">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/20 border-2 border-blue-400 mb-3">
                    <Globe className="w-8 h-8 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-bold text-blue-400 font-mono">Frontend</h3>
                  <p className="text-xs text-terminal-green/60">Cliente Web</p>
                </div>
                <div className="space-y-2">
                  {['React 18', 'Vite', 'Tailwind CSS', 'Zustand'].map((tech, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm bg-blue-500/10 border border-blue-400/30 rounded px-3 py-2">
                      {getTechIcon(tech)}
                      <span className="text-blue-300 font-mono">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Backend Layer */}
              <div className="space-y-4">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 border-2 border-green-400 mb-3">
                    <Server className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-lg font-bold text-green-400 font-mono">Backend</h3>
                  <p className="text-xs text-terminal-green/60">API REST</p>
                </div>
                <div className="space-y-2">
                  {['Spring Boot 3', 'Spring Security', 'Spring Data JPA', 'JWT'].map((tech, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm bg-green-500/10 border border-green-400/30 rounded px-3 py-2">
                      {getTechIcon(tech)}
                      <span className="text-green-300 font-mono">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Database Layer */}
              <div className="space-y-4">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-500/20 border-2 border-purple-400 mb-3">
                    <Database className="w-8 h-8 text-purple-400" />
                  </div>
                  <h3 className="text-lg font-bold text-purple-400 font-mono">Database</h3>
                  <p className="text-xs text-terminal-green/60">Persistencia</p>
                </div>
                <div className="space-y-2">
                  {['PostgreSQL', 'Redis'].map((tech, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm bg-purple-500/10 border border-purple-400/30 rounded px-3 py-2">
                      {getTechIcon(tech)}
                      <span className="text-purple-300 font-mono">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Flow Arrows */}
            <div className="hidden md:block">
              <div className="flex justify-center mt-6 space-x-8">
                <div className="flex items-center space-x-2 text-terminal-green/60">
                  <div className="w-8 h-0.5 bg-terminal-green/40"></div>
                  <span className="text-xs font-mono">HTTP/REST</span>
                  <div className="w-8 h-0.5 bg-terminal-green/40"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Components */}
        <div className="grid lg:grid-cols-2 gap-8">
          {(architecture.microservices || []).map((service, index) => (
            <div key={index} className="bg-terminal-black/30 border border-terminal-green/30 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center ${
                  index === 0 
                    ? 'bg-blue-500/20 border-blue-400' 
                    : 'bg-green-500/20 border-green-400'
                }`}>
                  {index === 0 ? (
                    <Globe className="w-6 h-6 text-blue-400" />
                  ) : (
                    <Server className="w-6 h-6 text-green-400" />
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-terminal-green font-mono">{service.name}</h3>
                  <p className="text-terminal-green/70 text-sm">{service.description}</p>
                </div>
              </div>

              {/* Technologies */}
              <div className="mb-6">
                <h4 className="text-sm font-bold text-terminal-cyan mb-3 font-mono">
                  {t('architecture.technologies')}:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {service.tech.map((tech, techIndex) => (
                    <div key={techIndex} className="flex items-center gap-2 bg-terminal-green/10 border border-terminal-green/30 rounded px-2 py-1">
                      {getTechIcon(tech)}
                      <span className="text-xs font-mono text-terminal-green">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Responsibilities */}
              <div>
                <h4 className="text-sm font-bold text-terminal-cyan mb-3 font-mono">
                  {t('architecture.responsibilities')}:
                </h4>
                <ul className="space-y-2">
                  {service.responsibilities.slice(0, 4).map((responsibility, respIndex) => (
                    <li key={respIndex} className="flex items-start gap-2 text-sm text-terminal-green/90">
                      <div className="w-1.5 h-1.5 rounded-full bg-terminal-cyan mt-2 flex-shrink-0"></div>
                      <span>{responsibility}</span>
                    </li>
                  ))}
                  {service.responsibilities.length > 4 && (
                    <li className="text-xs text-terminal-green/60 font-mono pl-4">
                      +{service.responsibilities.length - 4} {t('architecture.moreFeatures')}
                    </li>
                  )}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Technical Highlights */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-terminal-black/50 border border-terminal-green/30 rounded-lg p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-terminal-cyan/20 border-2 border-terminal-cyan mx-auto mb-4 flex items-center justify-center">
              <Shield className="w-6 h-6 text-terminal-cyan" />
            </div>
            <h3 className="text-lg font-bold text-terminal-cyan mb-2 font-mono">
              {t('architecture.highlights.security.title')}
            </h3>
            <p className="text-sm text-terminal-green/80">
              {t('architecture.highlights.security.description')}
            </p>
          </div>

          <div className="bg-terminal-black/50 border border-terminal-green/30 rounded-lg p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-terminal-yellow/20 border-2 border-terminal-yellow mx-auto mb-4 flex items-center justify-center">
              <Zap className="w-6 h-6 text-terminal-yellow" />
            </div>
            <h3 className="text-lg font-bold text-terminal-yellow mb-2 font-mono">
              {t('architecture.highlights.performance.title')}
            </h3>
            <p className="text-sm text-terminal-green/80">
              {t('architecture.highlights.performance.description')}
            </p>
          </div>

          <div className="bg-terminal-black/50 border border-terminal-green/30 rounded-lg p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-terminal-green/20 border-2 border-terminal-green mx-auto mb-4 flex items-center justify-center">
              <Code className="w-6 h-6 text-terminal-green" />
            </div>
            <h3 className="text-lg font-bold text-terminal-green mb-2 font-mono">
              {t('architecture.highlights.maintainability.title')}
            </h3>
            <p className="text-sm text-terminal-green/80">
              {t('architecture.highlights.maintainability.description')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}