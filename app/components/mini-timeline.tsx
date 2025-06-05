"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useTranslation } from "../hooks/use-translation"

export function MiniTimeline() {
  const { t } = useTranslation()

  const timelineItems = [
    {
      year: "2019",
      title: t("timeline.utn.title"),
      description: t("timeline.utn.description"),
    },
    {
      year: "2023",
      title: t("timeline.shopup.title"),
      description: t("timeline.shopup.description"),
    },
    {
      year: "2024",
      title: t("timeline.hacklab.title"),
      description: t("timeline.hacklab.description"),
    },
    {
      year: "2025",
      title: t("timeline.ai.title"),
      description: t("timeline.ai.description"),
    },
  ]

  return (
    <Card className="bg-terminal-black border-terminal-green">
      <CardHeader>
        <CardTitle className="text-terminal-green font-mono text-lg">
          <span className="text-terminal-cyan">$</span> history | tail -n 4
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-terminal-green"></div>
          {timelineItems.map((item, index) => (
            <div key={index} className="relative flex items-start space-x-4 pb-4">
              <div className="flex-shrink-0 w-12 h-8 bg-terminal-black border border-terminal-green rounded flex items-center justify-center">
                <span className="text-terminal-cyan font-mono text-xs font-bold">{item.year}</span>
              </div>
              <div className="flex-grow min-w-0">
                <div className="text-terminal-green font-mono text-sm font-semibold">{item.title}</div>
                <div className="text-terminal-green/80 font-mono text-xs">{item.description}</div>
              </div>
              <div className="absolute left-6 top-4 w-2 h-2 bg-terminal-cyan rounded-full transform -translate-x-1/2"></div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
