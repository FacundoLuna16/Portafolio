import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Network, Database, Shield, Zap, Cloud } from "lucide-react"

interface ArchitectureOverviewProps {
  architecture: {
    description: string
    microservices?: any[]
    integrations: string[]
  }
  techStack: string[]
}

export function ArchitectureOverview({ architecture, techStack }: ArchitectureOverviewProps) {
  const getTechCategory = (tech: string) => {
    // Backend
    if (['Java 24', 'Spring Boot 3.4+', 'Spring Cloud Gateway', 'Spring Security', 'Spring Data JPA'].includes(tech)) {
      return { category: 'Backend', icon: <Zap className="h-4 w-4" />, color: 'text-green-400' }
    }
    // Frontend
    if (['React 19', 'Vite', 'Material-UI v7', 'Redux Toolkit'].includes(tech)) {
      return { category: 'Frontend', icon: <Network className="h-4 w-4" />, color: 'text-cyan-400' }
    }
    // Database
    if (['PostgreSQL', 'OpenSearch'].includes(tech)) {
      return { category: 'Database', icon: <Database className="h-4 w-4" />, color: 'text-blue-400' }
    }
    // Security
    if (['Keycloak', 'JWT', 'Spring Security'].includes(tech)) {
      return { category: 'Security', icon: <Shield className="h-4 w-4" />, color: 'text-red-400' }
    }
    // AI/ML
    if (['Python', 'FastAPI', 'OpenAI API', 'Whisper', 'Embeddings'].includes(tech)) {
      return { category: 'AI/ML', icon: <Zap className="h-4 w-4" />, color: 'text-purple-400' }
    }
    // Infrastructure
    if (['Docker', 'Docker Compose', 'Nginx', 'Maven', 'Swagger/OpenAPI'].includes(tech)) {
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
          <span className="text-terminal-cyan">$</span> docker-compose ps --services
        </h2>
        <p className="text-terminal-green/80 font-mono max-w-3xl mx-auto">
          {architecture.description}
        </p>
      </div>

      {/* Architecture Diagram */}
      <Card className="border-terminal-green bg-background/50">
        <CardHeader>
          <CardTitle className="font-mono text-terminal-green">
            🏗️ Arquitectura de Microservicios
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            
            {/* Gateway Layer */}
            <div className="space-y-4">
              <h3 className="text-lg font-mono font-semibold text-terminal-cyan border-b border-terminal-cyan/30 pb-2">
                Gateway Layer
              </h3>
              <div className="space-y-3">
                <div className="p-4 border border-terminal-cyan/30 rounded bg-terminal-cyan/5">
                  <div className="font-mono text-sm text-terminal-cyan font-semibold">API Gateway</div>
                  <div className="font-mono text-xs text-terminal-green/60 mt-1">:8080</div>
                  <div className="mt-2 space-y-1">
                    <div className="text-xs font-mono text-terminal-green/80">• Enrutamiento</div>
                    <div className="text-xs font-mono text-terminal-green/80">• Autenticación JWT</div>
                    <div className="text-xs font-mono text-terminal-green/80">• Rate Limiting</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Services Layer */}
            <div className="space-y-4">
              <h3 className="text-lg font-mono font-semibold text-terminal-green border-b border-terminal-green/30 pb-2">
                Services Layer
              </h3>
              <div className="space-y-3">
                <div className="p-4 border border-terminal-green/30 rounded bg-terminal-green/5">
                  <div className="font-mono text-sm text-terminal-green font-semibold">Core Service</div>
                  <div className="font-mono text-xs text-terminal-green/60 mt-1">:8081</div>
                  <div className="mt-2 space-y-1">
                    <div className="text-xs font-mono text-terminal-green/80">• Emprendimientos</div>
                    <div className="text-xs font-mono text-terminal-green/80">• Productos</div>
                    <div className="text-xs font-mono text-terminal-green/80">• Arquitectura Hexagonal</div>
                  </div>
                </div>
                
                <div className="p-4 border border-purple-500/30 rounded bg-purple-500/5">
                  <div className="font-mono text-sm text-purple-400 font-semibold">AI Service</div>
                  <div className="font-mono text-xs text-terminal-green/60 mt-1">:8082</div>
                  <div className="mt-2 space-y-1">
                    <div className="text-xs font-mono text-terminal-green/80">• Audio-to-Text</div>
                    <div className="text-xs font-mono text-terminal-green/80">• Embeddings</div>
                    <div className="text-xs font-mono text-terminal-green/80">• Búsqueda Semántica</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Layer */}
            <div className="space-y-4">
              <h3 className="text-lg font-mono font-semibold text-blue-400 border-b border-blue-400/30 pb-2">
                Data Layer
              </h3>
              <div className="space-y-3">
                <div className="p-4 border border-blue-500/30 rounded bg-blue-500/5">
                  <div className="font-mono text-sm text-blue-400 font-semibold">PostgreSQL</div>
                  <div className="font-mono text-xs text-terminal-green/60 mt-1">:5432</div>
                  <div className="mt-2 space-y-1">
                    <div className="text-xs font-mono text-terminal-green/80">• Datos principales</div>
                    <div className="text-xs font-mono text-terminal-green/80">• Triggers</div>
                  </div>
                </div>
                
                <div className="p-4 border border-yellow-500/30 rounded bg-yellow-500/5">
                  <div className="font-mono text-sm text-yellow-400 font-semibold">OpenSearch</div>
                  <div className="font-mono text-xs text-terminal-green/60 mt-1">:9200</div>
                  <div className="mt-2 space-y-1">
                    <div className="text-xs font-mono text-terminal-green/80">• Búsquedas vectoriales</div>
                    <div className="text-xs font-mono text-terminal-green/80">• Embeddings</div>
                  </div>
                </div>

                <div className="p-4 border border-red-500/30 rounded bg-red-500/5">
                  <div className="font-mono text-sm text-red-400 font-semibold">Keycloak</div>
                  <div className="font-mono text-xs text-terminal-green/60 mt-1">:8083</div>
                  <div className="mt-2 space-y-1">
                    <div className="text-xs font-mono text-terminal-green/80">• OAuth2/JWT</div>
                    <div className="text-xs font-mono text-terminal-green/80">• Gestión usuarios</div>
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

      {/* Integration Points */}
      <Card className="border-terminal-green bg-background/50">
        <CardHeader>
          <CardTitle className="font-mono text-terminal-green">
            🔌 Integraciones Externas
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
