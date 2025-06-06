"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useTranslation } from "../hooks/use-translation"
interface MiniTimelineProps {
  className?: string
}

export function MiniTimeline({ className }: MiniTimelineProps) {
  const { t } = useTranslation()

const timelineItems = [
  {
    year: "Ene 2024\nNov 2024",
    title: t("timeline.qatitle"),
    description: t("timeline.qadescription"),
    summary: t("timeline.qasummary"),
  },
  {
    year: "Nov 202\nEne 2024",
    title: t("timeline.logistics.title"),
    description: t("timeline.logistics.description"),
    summary: t("timeline.logistics.summary"),
  },
  {
    year: "2024\nActualidad",
    title: t("timeline.utn.title"),
    description: t("timeline.utn.description"),
    summary: t("timeline.utn.summary"),
  },
  {
    year: t("timeline.soon.year"), // Nueva key para mostrar "Próximamente"
    title: t("timeline.soon.title"),
    description: t("timeline.soon.description"),
    summary: t("timeline.soon.summary"),
  }
]


  return (
    <Card className={cn("bg-terminal-black border-terminal-green h-full", className)}>
      <CardHeader>
        <CardTitle className="text-terminal-green font-mono text-lg">
          <span className="text-terminal-cyan">$</span> history | tail -n 4

        </CardTitle>
      </CardHeader>
      
      <CardContent className="h-full flex flex-col overflow-hidden py-12">
        <div className="relative h-full">
          {/* Línea timeline */}
          {/* <div className="absolute left-6 inset-y-0 w-0.5 bg-terminal-green" /> */}
          {/* Contenedor items distribuidos */}
          <div className="flex-1 flex flex-col space-y-14 h-full">
            {timelineItems.map((item, index) => (
              <div key={index} className="relative flex items-start space-x-4 ">
                {/* Año */}
                <div className="flex-shrink-0 w-20 min-h-[48px] bg-terminal-black border border-terminal-green rounded flex flex-col items-center justify-center px-1">
                  <span className="text-terminal-cyan font-mono text-xs font-bold whitespace-pre-line text-center">{item.year}</span>
                </div>
                {/* Contenido */}
                <div className="flex-grow min-w-0">
                  <div className="text-terminal-green font-mono text-sm font-semibold">{item.title}</div>
                  <div className="text-terminal-green/80 font-mono text-xs mt-2">{item.description}</div>
                  <div className="text-terminal-green/80 font-mono text-xs mt-2">{item.summary}</div>
                </div>
                {/* Línea vertical SÓLO SI no es el último */}
                {index < timelineItems.length - 1 && (
                  <div className="absolute left-6 top-1/2 w-0.5 bg-terminal-green"
                    style={{ height: "calc(100% + 2rem)" }} // 2rem ≈ separacion entre los puntos
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
