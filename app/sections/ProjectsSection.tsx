"use client"

import React from "react"
import { TerminalProjectCard } from "../components/terminal-project-card"
import { TerminalFilter } from "../components/terminal-filter"
import { useProjectFilter } from "@/lib/hooks/use-project-filter"
import { getProjects } from "@/lib/data/projects"
import { useTranslation } from "../hooks/use-translation"

export function ProjectsSection() {
  const { t } = useTranslation()
  const projects = React.useMemo(() => getProjects(t), [t])
  const { activeFilter, setActiveFilter, filteredProjects } = useProjectFilter(projects)
  
  const filters = [
    t("projects.filter.all"), 
    t("projects.filter.backend"), 
    t("projects.filter.frontend"), 
    t("projects.filter.devops"), 
    t("projects.filter.security")
  ]

  return (
    <section id="projects" className="py-20 px-2 sm:px-4 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-mono font-bold text-terminal-green mb-8">
          <span className="text-terminal-cyan">$</span> ls projects/
        </h2>
        
        <TerminalFilter 
          filters={filters}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          filteredCount={filteredProjects.length}
        />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <TerminalProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  )
}
