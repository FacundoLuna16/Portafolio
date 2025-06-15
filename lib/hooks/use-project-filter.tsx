"use client"

import { useState } from "react"
import type { Project } from "../data/projects"

export function useProjectFilter(projects: Project[]) {
  const [activeFilter, setActiveFilter] = useState("All")

  // Mapeo de filtros traducidos a categorías en inglés
  const getCategoryFromFilter = (filter: string): string => {
    const filterMap: Record<string, string> = {
      'All': 'All',
      'Todos': 'All',
      'Backend': 'Backend',
      'Frontend': 'Frontend', 
      'DevOps': 'DevOps',
      'Security': 'Security',
      'Seguridad': 'Security'
    }
    return filterMap[filter] || filter
  }

  const categoryFilter = getCategoryFromFilter(activeFilter)
  
  const filteredProjects = categoryFilter === "All" 
    ? projects 
    : projects.filter((p) => p.category === categoryFilter)

  return { activeFilter, setActiveFilter, filteredProjects }
}
