import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Network, Database, Shield, Zap, Cloud, Globe } from "lucide-react"

interface SimpleArchitectureProps {
  architecture: {
    description: string
    components?: any[]
    integrations: string[]
  }
  techStack: string[]
}

export function SimpleArchitecture({ architecture, techStack }: SimpleArchitectureProps) {
  const getTechCategory = (tech: string) => {
    // Frontend
    if (['React 18', 'Vite', 'TailwindCSS', 'Framer Motion'].includes(tech)) {
      return { category: 'Frontend', icon: <Globe className="h-4 w-4" />, color: 'text-blue-400' }
    }
    // Backend
    if (['Node.js', 'Express', 'Nodemailer'].includes(tech)) {
      return { category: 'Backend', icon: <Zap className="h-4 w-4" />, color: 'text-green-400' }
    }
    // DevOps
    if (['Docker', 'GitHub Actions', 'Nginx', 'SSL/HTTPS'].includes(tech)) {
      return { category: 'DevOps', icon: <Cloud className="h-4 w-4" />, color: 'text-orange-400' }
    }
    // Default
    return { category: 'Other', icon: <Network className="h-4 w-4" />, color: 'text-terminal-green' }
  }

  const groupedTech = techStack.reduce((acc, tech) => {
    const { category } = getTechCategory(tech)
    if (!acc[category]) acc[category] = []
    acc[category].push(tech)
    return acc
  }, {} as Record<string, string[]>)

  return (
    <section className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-mono font-bold text-terminal-green">
          <span className="text-terminal-cyan">$</span> tree -L 2 arquitectura/
        </h2>
        <p className="text-terminal-green/80 font-mono max-w-3xl mx-auto">
          {architecture.description}
        </p>
      </div>

      {/* Architecture Diagram - Simple */}
      <Card className="border-terminal-green bg-background/50">
        <CardHeader>
          <CardTitle className="font-mono text-terminal-green">
            🏗️ Arquitectura Simple y Eficiente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            
            {/* Frontend */}
            <div className="space-y-4">
              <h3 className="text-lg font-mono font-semibold text-blue-400 border-b border-blue-400/30 pb-2">
                Frontend Layer
              </h3>
              <div className="space-y-3">
                <div className="p-4 border border-blue-500/30 rounded bg-blue-500/5">
                  <div className="font-mono text-sm text-blue-400 font-semibold">React SPA</div>
                  <div className="font-mono text-xs text-terminal-green/60 mt-1">Vite + TailwindCSS</div>
                  <div className="mt-2 space-y-1">
                    <div className="text-xs font-mono text-terminal-green/80">• Landing page responsive</div>
                    <div className="text-xs font-mono text-terminal-green/80">• Multilenguaje (ES/EN)</div>
                    <div className="text-xs font-mono text-terminal-green/80">• Formulario de contacto</div>
                    <div className="text-xs font-mono text-terminal-green/80">• Animaciones Framer Motion</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Backend */}
            <div className="space-y-4">
              <h3 className="text-lg font-mono font-semibold text-green-400 border-b border-green-400/30 pb-2">
                Backend Layer
              </h3>
              <div className="space-y-3">
                <div className="p-4 border border-green-500/30 rounded bg-green-500/5">
                  <div className="font-mono text-sm text-green-400 font-semibold">Node.js API</div>
                  <div className="font-mono text-xs text-terminal-green/60 mt-1">Express + Nodemailer</div>
                  <div className="mt-2 space-y-1">
                    <div className="text-xs font-mono text-terminal-green/80">• API /contact</div>
                    <div className="text-xs font-mono text-terminal-green/80">• SMTP personalizado</div>
                    <div className="text-xs font-mono text-terminal-green/80">• Validaciones</div>
                    <div className="text-xs font-mono text-terminal-green/80">• CORS configurado</div>
                  </div>
                </div>
              </div>
            </div>

            {/* DevOps */}
            <div className="space-y-4">
              <h3 className="text-lg font-mono font-semibold text-orange-400 border-b border-orange-400/30 pb-2">
                DevOps Layer
              </h3>
              <div className="space-y-3">
                <div className="p-4 border border-orange-500/30 rounded bg-orange-500/5">
                  <div className="font-mono text-sm text-orange-400 font-semibold">GitHub Actions</div>
                  <div className="font-mono text-xs text-terminal-green/60 mt-1">Docker + DonWeb VPS</div>
                  <div className="mt-2 space-y-1">
                    <div className="text-xs font-mono text-terminal-green/80">• Deploy automático</div>
                    <div className="text-xs font-mono text-terminal-green/80">• SSL/HTTPS</div>
                    <div className="text-xs font-mono text-terminal-green/80">• Nginx reverse proxy</div>
                    <div className="text-xs font-mono text-terminal-green/80">• Zero downtime</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tech Stack by Category */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(groupedTech).map(([category, techs]) => {
          const { icon, color } = getTechCategory(techs[0])
          
          return (
            <Card key={category} className="border-terminal-green/30 bg-background/30">
              <CardHeader className="pb-3">
                <CardTitle className={`flex items-center gap-2 font-mono text-lg ${color}`}>
                  {icon}
                  {category}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {techs.map((tech, index) => (
                  <Badge 
                    key={index}
                    variant="outline"
                    className="border-terminal-green/50 text-terminal-green font-mono text-xs mr-2 mb-2"
                  >
                    {tech}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Project Stats */}
      <Card className="border-terminal-green bg-background/50">
        <CardContent className="p-6">
          <h3 className="text-lg font-mono font-bold text-terminal-green mb-4">
            📊 Estadísticas del Proyecto
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-mono font-bold text-terminal-green">
                5
              </div>
              <div className="text-sm font-mono text-terminal-green/60">
                Días de Desarrollo
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-mono font-bold text-blue-400">
                1
              </div>
              <div className="text-sm font-mono text-terminal-green/60">
                SPA React
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-mono font-bold text-green-400">
                100%
              </div>
              <div className="text-sm font-mono text-terminal-green/60">
                Deploy Automatizado
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-mono font-bold text-orange-400">
                ∞
              </div>
              <div className="text-sm font-mono text-terminal-green/60">
                En Producción
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Integration Points */}
      <Card className="border-terminal-green bg-background/50">
        <CardHeader>
          <CardTitle className="font-mono text-terminal-green">
            🔌 Integraciones y Servicios
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {architecture.integrations.map((integration, index) => (
              <div 
                key={index}
                className="p-3 border border-terminal-cyan/30 rounded bg-terminal-cyan/5"
              >
                <div className="font-mono text-sm text-terminal-cyan">
                  {integration}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
