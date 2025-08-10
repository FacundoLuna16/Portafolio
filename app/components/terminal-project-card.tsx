"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, FileText, Expand } from "lucide-react"
import { getProjectSlug, hasDetailedPage } from "@/lib/utils/project-utils"
import { useTranslation } from "../hooks/use-translation"
import { ImageModal } from "./image-modal"

interface ProjectCardProps {
  id: string
  title: string
  description: string
  techStack: string[]
  imgSrc: string
  codeUrl: string | null
  demoUrl?: string | null
  category: string
}

interface FileStructure {
  name: string
  type: 'file' | 'folder'
  icon: string
}

export function TerminalProjectCard({ id, title, description, techStack, imgSrc, codeUrl, demoUrl, category }: ProjectCardProps) {
  const { t } = useTranslation()
  const [showDescription, setShowDescription] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)
  
  const projectSlug = getProjectSlug(id)
  const hasDetails = hasDetailedPage(id)
  
  // Estados del proyecto
  const getProjectStatus = () => {
    switch (id) {
      case 'shopup':
        return { status: 'development', icon: '🚧', label: t('projects.status.development'), color: 'yellow' }
      case 'isidoro':
        return { status: 'production', icon: '🚀', label: t('projects.status.production'), color: 'green' }
      case 'logistica':
        return { status: 'completed', icon: '🏢', label: t('projects.status.client'), color: 'purple' }
      case 'security':
        return { status: 'archived', icon: '🛡️', label: t('projects.status.training'), color: 'red' }
      default:
        return { status: 'stable', icon: '✅', label: t('projects.status.completed'), color: 'blue' }
    }
  }

  // Estructura de archivos basada en el tipo de proyecto
  const getFileStructure = (): FileStructure[] => {
    // Estructura específica para ShopUp
    if (id === 'shopup') {
      return [
        { name: 'README.md', type: 'file', icon: '📄' },
        { name: 'docker-compose.yml', type: 'file', icon: '🐳' },
        { name: 'frontend/', type: 'folder', icon: '⚛️' },
        { name: 'microservices/', type: 'folder', icon: '🚀' },
        { name: 'ai-engine/', type: 'folder', icon: '🤖' },
      ]
    }

    const baseStructure: FileStructure[] = [
      { name: 'README.md', type: 'file', icon: '📄' },
      { name: '.gitignore', type: 'file', icon: '🚫' },
    ]

    switch (category) {
      case 'Backend':
        return [
          ...baseStructure,
          { name: 'src/', type: 'folder', icon: '📁' },
          { name: 'pom.xml', type: 'file', icon: '☕' },
          { name: 'Dockerfile', type: 'file', icon: '🐳' },
        ]
      case 'Frontend':
        return [
          ...baseStructure,
          { name: 'src/', type: 'folder', icon: '📁' },
          { name: 'package.json', type: 'file', icon: '📦' },
          { name: 'tailwind.config.js', type: 'file', icon: '🎨' },
        ]
      case 'DevOps':
        return [
          ...baseStructure,
          { name: 'terraform/', type: 'folder', icon: '🏗️' },
          { name: 'gitlab-ci.yml', type: 'file', icon: '🔄' },
          { name: 'kubernetes/', type: 'folder', icon: '☸️' },
        ]
      case 'Security':
        return [
          ...baseStructure,
          { name: 'vulnerabilities/', type: 'folder', icon: '🔍' },
          { name: 'tools/', type: 'folder', icon: '🛠️' },
          { name: 'reports/', type: 'folder', icon: '📊' },
        ]
      default:
        return baseStructure
    }
  }

  const status = getProjectStatus()
  const fileStructure = getFileStructure()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleCatCommand = () => {
    if (showDescription) {
      // Si ya está desplegado, lo plegamos inmediatamente
      setShowDescription(false)
    } else {
      // Si está plegado, lo desplegamos INMEDIATAMENTE (sin demora artificial)
      setShowDescription(true)
    }
  }

  if (!mounted) {
    return (
      <div className="border border-terminal-green bg-background/50 rounded-lg p-4 h-[400px]">
        <div className="animate-pulse">
          <div className="h-6 bg-terminal-green/20 rounded mb-4"></div>
          <div className="h-32 bg-terminal-green/10 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="group relative h-full">
      {/* Terminal Window Frame */}
      <div className={`border border-terminal-green bg-terminal-black/95 rounded-lg overflow-hidden hover:border-terminal-cyan transition-all duration-300 hover:shadow-lg hover:shadow-terminal-green/20 flex flex-col h-full ${
        showDescription ? 'min-h-[700px] md:min-h-[800px]' : ''
      }`}>
        
        {/* Terminal Header */}
        <div className="flex items-center gap-2 px-3 py-2 bg-terminal-green/10 border-b border-terminal-green/30 flex-shrink-0">
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="flex-1 text-center min-w-0">
            <span className="font-mono text-sm text-terminal-green/80 truncate">
              📁 {title}/
            </span>
          </div>
        </div>

        {/* Status Badge - Fuera del header para evitar pisarse */}
        <div className="px-3 py-1 bg-terminal-green/5 border-b border-terminal-green/20">
          <div className="flex justify-end">
            <div className={`px-2 py-1 rounded text-xs font-mono font-bold border
              ${status.color === 'yellow' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                status.color === 'green' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                status.color === 'purple' ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' :
                status.color === 'red' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                'bg-blue-500/20 text-blue-400 border-blue-500/30'
              }`}>
              {status.icon} {status.label}
            </div>
          </div>
        </div>

        {/* Terminal Content - Con distribución flexible */}
        <div className="p-4 flex flex-col flex-grow">
          
          {/* Top Section - File Structure + Toggle (Fixed) */}
          <div className="space-y-3 flex-shrink-0">
            {/* File Structure */}
            <div className="space-y-1">
              <div className="font-mono text-terminal-green text-sm mb-1">
                <span className="text-terminal-cyan">$</span> ls -la
              </div>
              <div className="pl-4 space-y-1">
                {fileStructure.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 font-mono text-xs text-terminal-green/80">
                    <span>{item.icon}</span>
                    <span className={item.type === 'folder' ? 'text-terminal-cyan' : 'text-terminal-green'}>
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* README Command Toggle */}
            <div className="space-y-2">
              {/* Botón toggle que siempre está presente */}
              <button 
                onClick={handleCatCommand}
                className={`w-full text-left font-mono text-sm transition-all duration-200 rounded-lg p-3 border-2 group/button ${
                  showDescription 
                    ? 'text-terminal-cyan bg-terminal-cyan/10 border-terminal-cyan/40 hover:bg-terminal-cyan/15 hover:border-terminal-cyan/60 shadow-lg shadow-terminal-cyan/20' 
                    : 'text-terminal-green hover:text-terminal-cyan bg-terminal-green/5 hover:bg-terminal-green/10 border-terminal-green/30 hover:border-terminal-cyan/60 hover:shadow-lg hover:shadow-terminal-cyan/10'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">
                    {showDescription ? t('projects.card.showLess') : t('projects.card.showMore')}
                  </span>
                  <span className={`transition-transform duration-200 ${
                    showDescription ? 'rotate-180' : 'rotate-0'
                  } group-hover/button:scale-110`}>
                    {showDescription ? '🔽' : '▶️'}
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* Expandible Content - Flex grow section */}
          {showDescription && (
            <div className="flex-grow flex flex-col justify-between mt-4">
              {/* Description and content */}
              <div className="space-y-3 animate-in fade-in duration-200">
                <div className="pl-4 space-y-3">
                  <div className="font-mono text-sm text-terminal-green/90 leading-relaxed">
                    <span className="text-terminal-cyan">&gt;</span> {description}
                  </div>

                  {/* Status badge adicional específico por proyecto */}
                  {id === 'shopup' && (
                    <div className="pl-4">
                      <span className="inline-flex items-center gap-1 bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded text-xs font-mono border border-yellow-500/30">
                        📅 Sprint 8/∞ - Proyecto Final ISI
                      </span>
                    </div>
                  )}

                  {id === 'logistica' && (
                    <div className="pl-4">
                      <span className="inline-flex items-center gap-1 bg-purple-500/20 text-purple-400 px-2 py-1 rounded text-xs font-mono border border-purple-500/30">
                        🏢 Nov 2023 - Ene 2024 - Proyecto completado
                      </span>
                    </div>
                  )}

                  {id === 'security' && (
                    <div className="pl-4">
                      <span className="inline-flex items-center gap-1 bg-red-500/20 text-red-400 px-2 py-1 rounded text-xs font-mono border border-red-500/30">
                        🛡️ Abr 2025 - Presente - En desarrollo
                      </span>
                    </div>
                  )}

                  {id === 'isidoro' && (
                    <div className="pl-4">
                      <span className="inline-flex items-center gap-1 bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs font-mono border border-green-500/30">
                        🚀 Oct 2024 - Presente - En producción
                      </span>
                    </div>
                  )}

                  {id === 'devops' && (
                    <div className="pl-4">
                      <span className="inline-flex items-center gap-1 bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs font-mono border border-blue-500/30">
                        🏗️ Jul 2024 - Taller DevOps UTN
                      </span>
                    </div>
                  )}

                  {id === 'barberia' && (
                    <div className="pl-4">
                      <span className="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded text-xs font-mono border border-emerald-500/30">
                        💇‍♂️ Jul 2025 - Sistema completo operativo
                      </span>
                    </div>
                  )}
                  
                  {/* Tech Stack as "Dependencies" */}
                  <div>
                    <div className="font-mono text-sm text-terminal-green/70 mb-1">
                      <span className="text-terminal-cyan">&gt;</span> {t('projects.card.dependencies')}
                    </div>
                    <div className="pl-4 flex flex-wrap gap-1">
                      {techStack.slice(0, 3).map((tech, index) => (
                        <span key={index} className="font-mono text-xs px-2 py-1 bg-terminal-green/10 border border-terminal-green/30 rounded text-terminal-green/80">
                          {tech}
                        </span>
                      ))}
                      {techStack.length > 3 && (
                        <span className="font-mono text-xs px-2 py-1 bg-terminal-cyan/10 border border-terminal-cyan/30 rounded text-terminal-cyan/80">
                          +{techStack.length - 3} {t('projects.card.more')}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Preview Image */}
                  <div className="animate-in slide-in-from-top duration-300">
                    <div className="font-mono text-sm text-terminal-green/70 mb-2 flex items-center justify-between">
                      <span>
                        <span className="text-terminal-cyan">$</span> preview ./screenshot.png
                      </span>
                      <span className="text-xs text-terminal-green/50 flex items-center gap-1">
                        <Expand className="w-3 h-3" />
                        {t('projects.card.clickToExpand')}
                      </span>
                    </div>
                    <div 
                      className="relative aspect-video rounded border border-terminal-green/30 overflow-hidden cursor-pointer group/image"
                      onClick={() => setIsImageModalOpen(true)}
                    >
                      <Image
                        src={imgSrc || "/placeholder.svg"}
                        alt={title}
                        width={400}
                        height={225}
                        priority={false}
                        className="transition-all duration-300 group-hover:scale-105 group-hover/image:scale-110"
                      />
                      {/* Overlay indicator on hover */}
                      <div className="absolute inset-0 bg-terminal-green/10 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="bg-terminal-black/80 border border-terminal-green/50 rounded px-3 py-2 backdrop-blur-sm">
                          <div className="flex items-center gap-2 font-mono text-sm text-terminal-green">
                            <Expand className="w-4 h-4" />
                            {t('projects.card.viewFullSize')}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Terminal Commands (Buttons) - Fixed at bottom */}
              <div className="space-y-2 animate-in slide-in-from-bottom duration-500 flex-shrink-0 mt-4">
                <div className="font-mono text-sm text-terminal-green/70">
                  <span className="text-terminal-cyan">$</span> {t('projects.card.commands')}
                </div>
                <div className="pl-4 flex flex-wrap gap-2">
                
                {/* Details Command */}
                {hasDetails && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="font-mono text-xs border-2 border-terminal-cyan text-terminal-cyan hover:bg-terminal-cyan hover:text-terminal-black transition-all duration-200 hover:shadow-lg hover:shadow-terminal-cyan/30 hover:scale-105 active:scale-95"
                    asChild
                  >
                    <a href={`/projects/${projectSlug}`} className="flex items-center gap-2 px-3 py-2">
                      <FileText className="w-4 h-4" />
                      <span className="font-semibold">./details</span>
                    </a>
                  </Button>
                )}

                {/* Code Command */}
                {codeUrl && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="font-mono text-xs border-2 border-terminal-green text-terminal-green hover:bg-terminal-green hover:text-terminal-black transition-all duration-200 hover:shadow-lg hover:shadow-terminal-green/30 hover:scale-105 active:scale-95"
                    asChild
                  >
                    <a href={codeUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2">
                      <Github className="w-4 h-4" />
                      <span className="font-semibold">./source</span>
                    </a>
                  </Button>
                )}

                {/* Demo Command */}
                {demoUrl && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="font-mono text-xs border-2 border-terminal-yellow text-terminal-yellow hover:bg-terminal-yellow hover:text-terminal-black transition-all duration-200 hover:shadow-lg hover:shadow-terminal-yellow/30 hover:scale-105 active:scale-95"
                    asChild
                  >
                    <a href={demoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2">
                      <ExternalLink className="w-4 h-4" />
                      <span className="font-semibold">./demo</span>
                    </a>
                  </Button>
                )}
              </div>
            </div>
            </div>
          )}
        </div>
      </div>

      {/* Image Modal */}
      <ImageModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        imageSrc={imgSrc || "/placeholder.svg"}
        imageAlt={title}
        projectTitle={title}
      />
    </div>
  )
}
