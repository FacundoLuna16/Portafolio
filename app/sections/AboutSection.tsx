"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useTranslation } from "../hooks/use-translation"
import { skills } from "@/lib/data/skills"

export function AboutSection() {
  const { t } = useTranslation()
  return (
    <section id="about" className="py-20 px-2 sm:px-4 lg:px-8">
      <div className="max-w-6xl xl:max-w-screen-2xl mx-auto px-2 sm:px-8">
        <h2 className="text-4xl font-mono font-bold text-terminal-green mb-8">
          <span className="text-terminal-cyan">$</span> whoami
        </h2>
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-12 items-stretch min-h-[400px]">
          <div className="flex flex-col h-full space-y-6">
            <Card className="border-terminal-green bg-background">
              <CardContent className="p-6">
                <p className="font-mono leading-relaxed md:text-base text-foreground dark:text-terminal-green">
                  {t("about.description")}
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-4 overflow-y-auto max-h-[70vh]">
            {Object.entries(skills).map(([category, skillList]) => (
              <div key={category}>
                <h3 className="text-terminal-cyan font-mono font-semibold mb-2 md:text-base">
                  {category}:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillList.map((skill) => (
                    <Badge
                      key={skill}
                      variant="outline"
                      className="border-terminal-green text-terminal-green hover:bg-terminal-green hover:text-terminal-black font-mono text-sm md:text-base"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
