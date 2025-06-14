import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, FileText } from "lucide-react"
import Image from "next/image"
import { getProjectSlug, hasDetailedPage } from "@/lib/utils/project-utils"

interface ProjectCardProps {
  id: string // ID único del proyecto
  title: string
  description: string
  techStack: string[]
  imgSrc: string
  codeUrl: string | null
  demoUrl?: string | null
  category: string
}

export function ProjectCard({ id, title, description, techStack, imgSrc, codeUrl, demoUrl }: ProjectCardProps) {
  const projectSlug = getProjectSlug(id)
  const hasDetails = hasDetailedPage(id)
  const isShopUp = id === 'shopup'
  const isIsidoro = id === 'isidoro'
  const isSwiftLogix = id === 'logistica'
  const isSecurity = id === 'security'

  return (
    <Card className="border-terminal-green bg-background hover:border-terminal-cyan transition-all duration-300 group">
      <CardHeader className="p-4">
        <div className="aspect-video relative overflow-hidden rounded border border-terminal-green">
          <Image
            src={imgSrc || "/placeholder.svg"}
            alt={title}
            fill
            className="w-full object-cover rounded-lg mb-4 aspect-video"
          />
          
          {/* Badge de En Desarrollo para ShopUp */}
          {isShopUp && (
            <div className="absolute top-2 right-2 z-10">
              <div className="flex items-center gap-1 bg-yellow-500/90 text-yellow-900 px-2 py-1 rounded text-xs font-mono font-bold border border-yellow-600">
                <span className="animate-pulse">⚠️</span>
                EN DESARROLLO
              </div>
            </div>
          )}

          {/* Badge de Producción para Isidoro */}
          {isIsidoro && (
            <div className="absolute top-2 right-2 z-10">
              <div className="flex items-center gap-1 bg-green-500/90 text-green-900 px-2 py-1 rounded text-xs font-mono font-bold border border-green-600">
                <span>🚀</span>
                EN PRODUCCIÓN
              </div>
            </div>
          )}

          {/* Badge de Proyecto Real para SwiftLogix */}
          {isSwiftLogix && (
            <div className="absolute top-2 right-2 z-10">
              <div className="flex items-center gap-1 bg-purple-500/90 text-purple-900 px-2 py-1 rounded text-xs font-mono font-bold border border-purple-600">
                <span>🏢</span>
                CLIENTE REAL
              </div>
            </div>
          )}

          {/* Badge de Training para Security */}
          {isSecurity && (
            <div className="absolute top-2 right-2 z-10">
              <div className="flex items-center gap-1 bg-red-500/90 text-red-900 px-2 py-1 rounded text-xs font-mono font-bold border border-red-600">
                <span>🛡️</span>
                TRAINING UTN
              </div>
            </div>
          )}
          
          {/* Overlay para proyectos en desarrollo */}
          {isShopUp && (
            <div className="absolute inset-0 bg-gradient-to-t from-yellow-500/20 to-transparent pointer-events-none" />
          )}

          {/* Overlay para proyectos en producción */}
          {isIsidoro && (
            <div className="absolute inset-0 bg-gradient-to-t from-green-500/10 to-transparent pointer-events-none" />
          )}

          {/* Overlay para proyectos con cliente */}
          {isSwiftLogix && (
            <div className="absolute inset-0 bg-gradient-to-t from-purple-500/10 to-transparent pointer-events-none" />
          )}

          {/* Overlay para proyectos de training */}
          {isSecurity && (
            <div className="absolute inset-0 bg-gradient-to-t from-red-500/10 to-transparent pointer-events-none" />
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div>
          <CardTitle className="text-terminal-green font-mono text-2xl lg:text-3xl mb-2 flex items-center gap-2">
            {title}
            {isShopUp && (
              <span className="text-yellow-400 text-lg animate-pulse">🚧</span>
            )}
            {isIsidoro && (
              <span className="text-green-400 text-lg">✅</span>
            )}
            {isSwiftLogix && (
              <span className="text-purple-400 text-lg">🏢</span>
            )}
            {isSecurity && (
              <span className="text-red-400 text-lg">🛡️</span>
            )}
          </CardTitle>
          <CardDescription className="text-terminal-green/80 font-mono text-lg lg:text-xl">{description}</CardDescription>
          
          {/* Status badge adicional para ShopUp */}
          {isShopUp && (
            <div className="mt-2">
              <span className="inline-flex items-center gap-1 bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded text-xs font-mono border border-yellow-500/30">
                📅 Sprint 4/∞ - Proyecto Final ISI
              </span>
            </div>
          )}

          {/* Status badge adicional para SwiftLogix */}
          {isSwiftLogix && (
            <div className="mt-2">
              <span className="inline-flex items-center gap-1 bg-purple-500/20 text-purple-400 px-2 py-1 rounded text-xs font-mono border border-purple-500/30">
                🏢 Nov 2023 - Ene 2024 - Proyecto completado
              </span>
            </div>
          )}

          {/* Status badge adicional para Security */}
          {isSecurity && (
            <div className="mt-2">
              <span className="inline-flex items-center gap-1 bg-red-500/20 text-red-400 px-2 py-1 rounded text-xs font-mono border border-red-500/30">
                🛡️ Ago 2023 - Dic 2023 - GISSIC UTN FRC
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {techStack.map((tech) => (
            <Badge key={tech} variant="outline" className="border-terminal-cyan text-terminal-cyan text-base font-mono px-3 py-1">
              {tech}
            </Badge>
          ))}
        </div>

        <div className="flex gap-2">
          {/* Botón Ver Detalles - Solo si tiene página detallada */}
          {hasDetails && (
            <Button
              size="sm"
              variant="outline"
              className="border-terminal-cyan text-terminal-cyan hover:bg-terminal-cyan hover:text-terminal-black font-mono flex-1"
              asChild
            >
              <a href={`/projects/${projectSlug}`}>
                <FileText className="mr-2 h-4 w-4" />
                Ver Detalles
              </a>
            </Button>
          )}

          {/* Botón Code */}
          {codeUrl && (
            <Button
              size="sm"
              variant="outline"
              className="border-terminal-green text-terminal-green hover:bg-terminal-green hover:text-terminal-black font-mono flex-1 text-lg px-6 py-3"
              asChild
            >
              <a href={codeUrl ?? undefined} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-6 w-6" />
                Code
              </a>
            </Button>
          )}

          {/* Botón Demo Live */}
          {demoUrl && (
            <Button
              size="sm"
              variant="outline"
              className="border-terminal-green text-terminal-green hover:bg-terminal-green hover:text-terminal-black font-mono flex-1"
              asChild
            >
              <a href={demoUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-1 h-3 w-3" />
                Demo Live
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
