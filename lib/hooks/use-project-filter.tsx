"use client"

import { useState } from "react"
import type { Project } from "../data/projects"

export function useProjectFilter(projects: Project[]) {
  const [activeFilter, setActiveFilter] = useState("All")

  const filteredProjects =
    activeFilter === "All" ? projects : projects.filter((p) => p.category === activeFilter)

  return { activeFilter, setActiveFilter, filteredProjects }
}
