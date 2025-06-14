import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ExternalLink, Github, Calendar, Users, Zap } from "lucide-react"
import { DetailedProject } from "@/lib/data/projects/types"

interface ProjectHeroProps {
  project: DetailedProject
}

export function ProjectHero({ project }: ProjectHeroProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'production': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'development': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'archived': return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
      default: return 'bg-terminal-green/20 text-terminal-green border-terminal-green/30'
    }
  }

  return (
    <section className="relative bg-terminal-black/90 border-b border-terminal-green">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full bg-gradient-to-br from-terminal-green/20 to-transparent" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Project Info */}
          <div className="space-y-8">
            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 text-terminal-green/60 font-mono text-sm">
              <span>$</span>
              <span>cd</span>
              <span>/projects</span>
              <span className="text-terminal-green">/{project.slug}</span>
            </div>

            {/* Title & Status */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 flex-wrap">
                <Badge className={`${getStatusColor(project.status)} font-mono px-3 py-1`}>
                  {project.status === 'development' ? '🚧 En Desarrollo Activo' : 
                   project.status === 'production' ? '🚀 En Producción' : 
                   '📚 Archivado'}
                </Badge>
                {project.category && (
                  <Badge variant="outline" className="border-terminal-cyan text-terminal-cyan font-mono">
                    {project.category}
                  </Badge>
                )}
                {project.status === 'development' && (
                  <Badge variant="outline" className="border-yellow-500 text-yellow-400 font-mono animate-pulse">
                    📅 Sprint 4/∞
                  </Badge>
                )}
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-mono font-bold text-terminal-green">
                {project.title}
              </h1>
              
              <p className="text-xl text-terminal-green/80 font-mono leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Meta Info */}
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-2 text-terminal-green/80">
                <Calendar className="h-4 w-4" />
                <span className="font-mono text-sm">{project.timeline}</span>
              </div>
              {project.team && (
                <div className="flex items-center gap-2 text-terminal-green/80">
                  <Users className="h-4 w-4" />
                  <span className="font-mono text-sm">{project.team}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-terminal-green/80">
                <Zap className="h-4 w-4" />
                <span className="font-mono text-sm">{project.techStack.length} tecnologías</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-4 flex-wrap">
              {project.demoUrl && (
                <Button 
                  size="lg"
                  className="bg-terminal-green text-terminal-black hover:bg-terminal-green/90 font-mono"
                  asChild
                >
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Ver Demo
                  </a>
                </Button>
              )}
              
              {project.codeUrl && project.codeUrl !== 'private' && (
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-terminal-green text-terminal-green hover:bg-terminal-green hover:text-terminal-black font-mono"
                  asChild
                >
                  <a href={project.codeUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    Ver Código
                  </a>
                </Button>
              )}
              
              {project.codeUrl === 'private' && (
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-gray-500 text-gray-400 cursor-not-allowed font-mono"
                  disabled
                >
                  <Github className="mr-2 h-4 w-4" />
                  Código Privado
                </Button>
              )}
            </div>
          </div>

          {/* Tech Stack Visualization */}
          <Card className="p-6 border-terminal-green bg-background/50 backdrop-blur">
            <h3 className="text-xl font-mono font-bold text-terminal-green mb-4">
              <span className="text-terminal-cyan">$</span> cat tech-stack.json
            </h3>
            
            <div className="space-y-4">
              {/* Highlights */}
              <div>
                <h4 className="text-sm font-mono text-terminal-green/80 mb-2">// Características destacadas</h4>
                <div className="flex flex-wrap gap-2">
                  {project.highlights.map((highlight, index) => (
                    <Badge 
                      key={index}
                      variant="outline" 
                      className="border-terminal-cyan/50 text-terminal-cyan text-xs"
                    >
                      {highlight}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div>
                <h4 className="text-sm font-mono text-terminal-green/80 mb-2">// Stack tecnológico</h4>
                <div className="grid grid-cols-2 gap-2">
                  {project.techStack.map((tech, index) => (
                    <div 
                      key={index}
                      className="text-xs font-mono text-terminal-green bg-terminal-green/10 px-2 py-1 rounded border border-terminal-green/20"
                    >
                      {tech}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

        </div>
        
        {/* Overview Section */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <Card className="p-6 border-terminal-green bg-background/30">
            <h3 className="text-lg font-mono font-bold text-terminal-green mb-3">
              🎯 Problema
            </h3>
            <p className="text-terminal-green/80 font-mono text-sm leading-relaxed">
              {project.overview.problemStatement}
            </p>
          </Card>
          
          <Card className="p-6 border-terminal-cyan bg-background/30">
            <h3 className="text-lg font-mono font-bold text-terminal-cyan mb-3">
              💡 Solución
            </h3>
            <p className="text-terminal-green/80 font-mono text-sm leading-relaxed">
              {project.overview.solution}
            </p>
          </Card>
          
          <Card className="p-6 border-yellow-500 bg-background/30">
            <h3 className="text-lg font-mono font-bold text-yellow-400 mb-3">
              📊 Impacto
            </h3>
            <p className="text-terminal-green/80 font-mono text-sm leading-relaxed">
              {project.overview.impact}
            </p>
          </Card>
        </div>
      </div>
    </section>
  )
}
