import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, AlertCircle } from "lucide-react"

interface UserStory {
  sprint: number
  title: string
  stories: string[]
  status: 'completed' | 'in-progress' | 'planned'
  highlights: string[]
}

interface SprintTimelineProps {
  currentSprint: number
  userStories: UserStory[]
}

export function SprintTimeline({ currentSprint, userStories }: SprintTimelineProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-5 w-5 text-green-400" />
      case 'in-progress': return <Clock className="h-5 w-5 text-yellow-400" />
      case 'planned': return <AlertCircle className="h-5 w-5 text-blue-400" />
      default: return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'border-green-500/50 bg-green-500/10'
      case 'in-progress': return 'border-yellow-500/50 bg-yellow-500/10'
      case 'planned': return 'border-blue-500/50 bg-blue-500/10'
      default: return 'border-terminal-green/50 bg-terminal-green/10'
    }
  }

  return (
    <section className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-mono font-bold text-terminal-green">
          <span className="text-terminal-cyan">$</span> git log --oneline --graph sprints/
        </h2>
        <p className="text-terminal-green/80 font-mono">
          Desarrollo ágil con sprints de 2 semanas • Actualmente en Sprint {currentSprint}
        </p>
      </div>

      <div className="grid gap-6">
        {userStories.map((sprint, index) => (
          <Card 
            key={sprint.sprint}
            className={`${getStatusColor(sprint.status)} border transition-all duration-300 hover:shadow-lg`}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-3 text-terminal-green font-mono">
                  {getStatusIcon(sprint.status)}
                  <span>Sprint {sprint.sprint}: {sprint.title}</span>
                  {sprint.sprint === currentSprint && (
                    <Badge className="bg-terminal-green text-terminal-black font-mono text-xs">
                      ACTUAL
                    </Badge>
                  )}
                </CardTitle>
                
                <Badge 
                  variant="outline" 
                  className={`font-mono text-xs ${
                    sprint.status === 'completed' ? 'border-green-500 text-green-400' :
                    sprint.status === 'in-progress' ? 'border-yellow-500 text-yellow-400' :
                    'border-blue-500 text-blue-400'
                  }`}
                >
                  {sprint.status === 'completed' ? 'Completado' :
                   sprint.status === 'in-progress' ? 'En Progreso' :
                   'Planificado'}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* User Stories */}
              <div>
                <h4 className="text-sm font-mono font-semibold text-terminal-green/80 mb-3">
                  📋 User Stories:
                </h4>
                <ul className="space-y-2">
                  {sprint.stories.map((story, storyIndex) => (
                    <li 
                      key={storyIndex}
                      className="flex items-start gap-2 text-terminal-green/80 font-mono text-sm"
                    >
                      <span className="text-terminal-cyan mt-1">•</span>
                      <span>{story}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technical Highlights */}
              <div>
                <h4 className="text-sm font-mono font-semibold text-terminal-green/80 mb-3">
                  🔧 Logros Técnicos:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {sprint.highlights.map((highlight, highlightIndex) => (
                    <Badge 
                      key={highlightIndex}
                      variant="outline"
                      className="border-terminal-cyan/50 text-terminal-cyan text-xs font-mono"
                    >
                      {highlight}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Progress Indicator */}
              <div className="pt-4 border-t border-terminal-green/20">
                <div className="flex items-center justify-between text-xs font-mono text-terminal-green/60">
                  <span>Sprint {sprint.sprint}/∞</span>
                  <span>
                    {sprint.status === 'completed' ? '100% completado' :
                     sprint.status === 'in-progress' ? 'En desarrollo...' :
                     'Próximamente'}
                  </span>
                </div>
                <div className="mt-2 h-2 bg-terminal-green/20 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-1000 ${
                      sprint.status === 'completed' ? 'w-full bg-green-500' :
                      sprint.status === 'in-progress' ? 'w-3/4 bg-yellow-500' :
                      'w-0 bg-blue-500'
                    }`}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Development Stats */}
      <Card className="border-terminal-green bg-background/50">
        <CardContent className="p-6">
          <h3 className="text-lg font-mono font-bold text-terminal-green mb-4">
            📊 Estadísticas de Desarrollo
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-mono font-bold text-terminal-green">
                {userStories.filter(s => s.status === 'completed').length}
              </div>
              <div className="text-sm font-mono text-terminal-green/60">
                Sprints Completados
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-mono font-bold text-yellow-400">
                {userStories.filter(s => s.status === 'in-progress').length}
              </div>
              <div className="text-sm font-mono text-terminal-green/60">
                En Progreso
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-mono font-bold text-terminal-cyan">
                {userStories.reduce((acc, sprint) => acc + sprint.stories.length, 0)}
              </div>
              <div className="text-sm font-mono text-terminal-green/60">
                User Stories Total
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-mono font-bold text-green-400">
                8
              </div>
              <div className="text-sm font-mono text-terminal-green/60">
                Semanas de Desarrollo
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
