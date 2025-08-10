"use client"

import { notFound } from 'next/navigation'
import { useParams } from 'next/navigation'
import { getShopupProject } from '@/lib/data/projects/shopup-real'
import { getBarberiaProject } from '@/lib/data/projects/barberia-faderoom'
import { isidoroProject } from '@/lib/data/projects/isidoro'
import { swiftlogixProject } from '@/lib/data/projects/swiftlogix'
import { securityProject } from '@/lib/data/projects/security'
import { useTranslation } from '@/app/hooks/use-translation'
import { TerminalNavbar } from '../../components/terminal-navbar'
import { ProjectHero } from './components/ProjectHero'
import { SprintTimeline } from './components/SprintTimeline'
import { ArchitectureOverview } from './components/ArchitectureOverview'
import { SimpleArchitecture } from './components/SimpleArchitecture'
import { MicroserviceDetails } from './components/MicroserviceDetails'
import { CodeShowcase } from './components/CodeShowcase'
import { LessonsLearned } from './components/LessonsLearned'
import { ProjectGallery } from './components/ProjectGallery'
import { UserFlowShowcase } from './components/UserFlowShowcase'
import { AdminPanelShowcase } from './components/AdminPanelShowcase'
import { BarberiaArchitecture } from './components/BarberiaArchitecture'

// Mapeo de proyectos disponibles (sin shopup, se maneja especialmente)
const staticProjectsMap = {
  'isidoro': isidoroProject,
  'logistica': swiftlogixProject,
  'security': securityProject,
  // Aquí puedes agregar otros proyectos después
}

export default function ProjectPage() {
  const params = useParams()
  const slug = params.slug as string
  const { t } = useTranslation()
  
  // Handle projects with i18n support
  const project = slug === 'shopup' 
    ? getShopupProject(t) 
    : slug === 'barberia'
    ? getBarberiaProject(t)
    : staticProjectsMap[slug as keyof typeof staticProjectsMap]
  
  if (!project) {
    notFound()
  }

  // Determinar el tipo de proyecto para personalizar el componente LessonsLearned
  const getProjectType = (projectSlug: string) => {
    switch (projectSlug) {
      case 'shopup':
      case 'security':
        return 'development' as const
      case 'barberia':
        return 'development' as const
      case 'isidoro':
        return 'web' as const
      default:
        return 'other' as const
    }
  }

  const projectType = getProjectType(slug)

  return (
    <div className="min-h-screen bg-background">
      <TerminalNavbar />
      
      {/* Hero Section */}
      <ProjectHero project={project} />
      
      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        
        {/* FADE ROOM Specific Sections */}
        {slug === 'barberia' && (
          <>
            {/* User Flow Showcase - Principal feature for FADE ROOM */}
            {(project as any).userFlow && (
              <UserFlowShowcase userFlow={(project as any).userFlow} />
            )}


            {/* Admin Panel Showcase */}
            {(project as any).adminPanel && (
              <AdminPanelShowcase adminPanel={(project as any).adminPanel} />
            )}

            {/* FADE ROOM Architecture */}
            <BarberiaArchitecture architecture={project.architecture} />
          </>
        )}

        {/* Standard sections for other projects */}
        {slug !== 'barberia' && (
          <>
            {/* Sprint Timeline solo para proyectos en desarrollo */}
            {project.status === 'development' && project.sprintTimeline && (
              <SprintTimeline 
                sprints={project.sprintTimeline.sprints}
                description={project.sprintTimeline.description}
              />
            )}

            {/* Timeline para proyectos completados */}
            {project.status === 'production' && project.timeline && (
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-mono font-bold text-terminal-green">
                  <span className="text-terminal-cyan">$</span> git log --oneline --since=&quot;{project.timeline}&quot;
                </h2>
                <div className="bg-terminal-green/10 border border-terminal-green/30 rounded-lg p-6">
                  <div className="flex items-center justify-center gap-4 text-terminal-green font-mono">
                    <span className="text-2xl">🚀</span>
                    <span className="text-lg">Proyecto completado en: <strong>{project.timeline}</strong></span>
                    <span className="text-2xl">✅</span>
                  </div>
                  {project.team && (
                    <div className="mt-3 text-terminal-green/80 font-mono text-sm">
                      Desarrollado por: <span className="text-terminal-cyan">{project.team}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}

        {/* Common sections for all projects except FADE ROOM (which has custom flow) */}
        {slug !== 'barberia' && (
          <>
            {/* Architecture Overview */}
            {project.architecture.microservices ? (
              <ArchitectureOverview 
                architecture={project.architecture}
                techStack={project.techStack}
              />
            ) : (
              <SimpleArchitecture 
                architecture={project.architecture}
                techStack={project.techStack}
              />
            )}

            {/* Microservices Deep Dive - Solo para proyectos con microservicios */}
            {project.architecture.microservices && (
              <MicroserviceDetails 
                microservices={project.architecture.microservices}
              />
            )}

            {/* Components Deep Dive - Para proyectos simples */}
            {project.architecture.components && (
              <MicroserviceDetails 
                microservices={project.architecture.components}
              />
            )}

            {/* Project Gallery - Si tiene imágenes */}
            {project.gallery && project.gallery.length > 0 && (
              <ProjectGallery 
                images={project.gallery}
                projectTitle={project.title}
              />
            )}

            {/* Code Showcase */}
            <CodeShowcase 
              microservices={project.architecture.microservices || project.architecture.components || []}
              projectSlug={slug}
            />
          </>
        )}

        {/* Common sections for ALL projects */}
        {/* Lessons Learned */}
        <LessonsLearned 
          lessons={project.lessonsLearned}
          nextSteps={project.nextSteps || []}
          projectType={projectType}
        />

      </div>
    </div>
  )
}
