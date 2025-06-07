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
        <CardTitle className="text-terminal-green font-mono">
          <span className="text-terminal-cyan md:text-xl">$</span> history | tail -n 4
        </CardTitle>
      </CardHeader>
      
      <CardContent className="h-full flex flex-col overflow-hidden py-8">
        <div className="relative h-full">
          <div className="flex-1 flex flex-col space-y-10 sm:space-y-12 h-full overflow-y-auto px-2 sm:px-6 md:px-12">
            {timelineItems.map((item, index) => (
              <div key={index} className="relative flex items-start space-x-2 sm:space-x-4">
                {/* Año */}
                <div className="flex-shrink-0 w-12 sm:w-20 min-h-[40px] sm:min-h-[60px] bg-terminal-black border border-terminal-green rounded flex flex-col items-center justify-center px-1">
                  <span className="text-terminal-cyan font-mono text-xs sm:text-sm font-bold whitespace-pre-line text-center">
                    {item.year}
                  </span>
                </div>
                {/* Contenido */}
                <div className="flex-grow min-w-0">
                  <div className="text-terminal-green font-mono text-xs sm:text-sm md:text-xl font-semibold">
                    {item.title}
                  </div>
                  <div className="text-terminal-green/80 font-mono text-[11px] sm:text-xs md:text-base mt-2">
                    {item.description}
                  </div>
                  <div className="text-terminal-green/80 font-mono text-[11px] sm:text-xs md:text-base mt-2">
                    {item.summary}
                  </div>
                </div>
                {/* Línea vertical SÓLO SI no es el último */}
                {index < timelineItems.length - 1 && (
                  <div
                    className="absolute left-5 sm:left-6 top-1/4 w-0.5 bg-terminal-green"
                    style={{ height: "calc(100% + 0rem)" }}
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
