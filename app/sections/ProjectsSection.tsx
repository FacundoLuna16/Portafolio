"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { ProjectCard } from "../components/project-card"
import { useProjectFilter } from "@/lib/hooks/use-project-filter"
import { getProjects } from "@/lib/data/projects"
import { useTranslation } from "../hooks/use-translation"

export function ProjectsSection() {
  const { t } = useTranslation()
  const projects = React.useMemo(() => getProjects(t), [t])
  const { activeFilter, setActiveFilter, filteredProjects } = useProjectFilter(projects)

  return (
    <section id="projects" className="py-20 px-2 sm:px-4 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-mono font-bold text-terminal-green mb-8">
          <span className="text-terminal-cyan">$</span> ls projects/
        </h2>
        <div className="flex flex-wrap gap-2 mb-8">
          {["All", "Backend", "DevOps", "Security"].map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? "default" : "outline"}
              className={`font-mono text-base ${
                activeFilter === filter
                  ? "bg-terminal-green text-terminal-black"
                  : "border-terminal-green text-terminal-green hover:bg-terminal-green hover:text-terminal-black"
              }`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </Button>
          ))}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  )
}
