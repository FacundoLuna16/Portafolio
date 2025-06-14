import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, ArrowRight, Target } from "lucide-react"

interface LessonsLearnedProps {
  lessons: string[]
  nextSteps: string[]
}

export function LessonsLearned({ lessons, nextSteps }: LessonsLearnedProps) {
  return (
    <section className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-mono font-bold text-terminal-green">
          <span className="text-terminal-cyan">$</span> git log --grep="lesson:" --pretty=format:"%s"
        </h2>
        <p className="text-terminal-green/80 font-mono">
          Reflexiones y próximos pasos en el desarrollo
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        
        {/* Lessons Learned */}
        <Card className="border-purple-500/30 bg-purple-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-purple-400 font-mono">
              <Lightbulb className="h-6 w-6" />
              Lecciones Aprendidas
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {lessons.map((lesson, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-purple-500/10 rounded border border-purple-500/20">
                <span className="text-purple-400 mt-1 text-lg">💡</span>
                <p className="text-terminal-green/80 font-mono text-sm leading-relaxed">
                  {lesson}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="border-blue-500/30 bg-blue-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-blue-400 font-mono">
              <Target className="h-6 w-6" />
              Próximos Pasos
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {nextSteps.map((step, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-blue-500/10 rounded border border-blue-500/20">
                <ArrowRight className="h-4 w-4 text-blue-400 mt-1 flex-shrink-0" />
                <p className="text-terminal-green/80 font-mono text-sm leading-relaxed">
                  {step}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Development Philosophy */}
      <Card className="border-terminal-green bg-background/50">
        <CardContent className="p-6">
          <h3 className="text-lg font-mono font-bold text-terminal-green mb-4">
            🎯 Filosofía de Desarrollo
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center space-y-3">
              <div className="text-3xl">🏗️</div>
              <h4 className="font-mono font-semibold text-terminal-green">Arquitectura Limpia</h4>
              <p className="text-sm font-mono text-terminal-green/70">
                Separación clara de responsabilidades con arquitectura hexagonal
              </p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="text-3xl">🔧</div>
              <h4 className="font-mono font-semibold text-terminal-green">Iteración Continua</h4>
              <p className="text-sm font-mono text-terminal-green/70">
                Desarrollo ágil con sprints de 2 semanas y mejora constante
              </p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="text-3xl">📚</div>
              <h4 className="font-mono font-semibold text-terminal-green">Aprendizaje Activo</h4>
              <p className="text-sm font-mono text-terminal-green/70">
                Cada desafío es una oportunidad de crecimiento técnico
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="border-terminal-cyan bg-terminal-cyan/5">
        <CardContent className="p-6 text-center space-y-4">
          <h3 className="text-xl font-mono font-bold text-terminal-cyan">
            ¿Interesado en los detalles técnicos?
          </h3>
          <p className="text-terminal-green/80 font-mono text-sm max-w-2xl mx-auto">
            Este proyecto está en desarrollo activo como parte de mi Proyecto Final de Ingeniería en Sistemas. 
            Si tienes preguntas sobre la implementación o quieres discutir sobre arquitectura de microservicios, 
            ¡no dudes en contactarme!
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Badge variant="outline" className="border-terminal-green text-terminal-green font-mono">
              📧 Disponible para consultas
            </Badge>
            <Badge variant="outline" className="border-terminal-cyan text-terminal-cyan font-mono">
              🤝 Abierto a colaboraciones
            </Badge>
            <Badge variant="outline" className="border-yellow-500 text-yellow-400 font-mono">
              🚀 En desarrollo activo
            </Badge>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
