"use client"

import { notFound } from 'next/navigation'
import { useParams } from 'next/navigation'
import { shopupProjectReal } from '@/lib/data/projects/shopup-real'
import { isidoroProject } from '@/lib/data/projects/isidoro'
import { swiftlogixProject } from '@/lib/data/projects/swiftlogix'
import { securityProject } from '@/lib/data/projects/security'
import { TerminalNavbar } from '../../components/terminal-navbar'
import { ProjectHero } from './components/ProjectHero'
import { SprintTimeline } from './components/SprintTimeline'
import { ArchitectureOverview } from './components/ArchitectureOverview'
import { SimpleArchitecture } from './components/SimpleArchitecture'
import { MicroserviceDetails } from './components/MicroserviceDetails'
import { ChallengesSection } from './components/ChallengesSection'
import { CodeShowcase } from './components/CodeShowcase'
import { LessonsLearned } from './components/LessonsLearned'
import { ProjectGallery } from './components/ProjectGallery'

// Mapeo de proyectos disponibles
const projectsMap = {
  'shopup': shopupProjectReal,
  'isidoro': isidoroProject,
  'logistica': swiftlogixProject,
  'security': securityProject,
  // Aquí puedes agregar otros proyectos después
}

export default function ProjectPage() {
  const params = useParams()
  const slug = params.slug as string
  const project = projectsMap[slug as keyof typeof projectsMap]
  
  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <TerminalNavbar />
      
      {/* Hero Section */}
      <ProjectHero project={project} />
      
      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        
        {/* Sprint Timeline solo para proyectos en desarrollo */}
        {project.status === 'development' && (
          <SprintTimeline 
            currentSprint={4}
            userStories={[
              {
                sprint: 1,
                title: "Gestión Básica de Emprendimientos",
                stories: [
                  "Registrar cuenta de emprendimiento con validaciones específicas",
                  "Consultar cuenta de emprendimiento (ver perfil completo)",
                  "Modificar cuenta de emprendimiento con restricciones", 
                  "Registrar baja de cuenta (eliminación lógica)"
                ],
                status: "completed",
                highlights: [
                  "Arquitectura hexagonal implementada",
                  "Keycloak configurado con OAuth2",
                  "Gateway con filtros JWT personalizados",
                  "Validaciones Bean Validation complejas",
                  "Patrón State para estados de emprendimiento"
                ]
              },
              {
                sprint: 2,
                title: "Gestión Completa de Productos",
                stories: [
                  "Registrar producto con atributos personalizados por tipo",
                  "Modificar producto existente con validaciones",
                  "Consultar producto (vista emprendedor)",
                  "Eliminar/Ocultar producto (lógica compleja)"
                ],
                status: "completed",
                highlights: [
                  "Sistema de productos con tipos dinámicos",
                  "Atributos personalizados por categoría",
                  "Validaciones de negocio avanzadas",
                  "CRUD completo con soft delete",
                  "Manejo de imágenes (5MB máx)"
                ]
              },
              {
                sprint: 3,
                title: "IA y Administración de Rubros",
                stories: [
                  "SPIKE: Definir ciclo completo para voz (STT + Validación + Prompt IA)",
                  "Registrar rubro (funcionalidad admin)",
                  "Consultar rubros disponibles",
                  "Modificar rubro existente",
                  "Integración completa audio-to-text con IA"
                ],
                status: "completed",
                highlights: [
                  "Microservicio Python con FastAPI",
                  "Integración OpenAI + Whisper",
                  "OpenSearch para embeddings vectoriales",
                  "Triggers PostgreSQL para sincronización",
                  "Administración de rubros parametrizables",
                  "Pipeline completo de procesamiento de audio"
                ]
              },
              {
                sprint: 4,
                title: "Funcionalidades Avanzadas con IA y Audio",
                stories: [
                  "Consultar producto (vista de emprendedor) con detalles completos",
                  "Modificar producto existente con validaciones avanzadas",
                  "Eliminar/Ocultar producto (eliminación lógica)",
                  "Registrar producto vía audio con transcripción IA",
                  "Modificar producto vía audio con identificación inteligente",
                  "Integración Keycloak con Google OAuth",
                  "Navbar del dashboard de emprendedores"
                ],
                status: "in-progress",
                highlights: [
                  "Audio-to-text con Whisper para CRUD",
                  "IA para análisis y extracción de datos",
                  "Google OAuth en Keycloak",
                  "Tokens de refresh de sesión", 
                  "Dashboard con métricas de negocio",
                  "UX mejorada con comandos de voz",
                  "Eliminación lógica vs física"
                ]
              }
            ]}
          />
        )}

        {/* Timeline para proyectos completados */}
        {project.status === 'production' && project.timeline && (
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-mono font-bold text-terminal-green">
              <span className="text-terminal-cyan">$</span> git log --oneline --since="{project.timeline}"
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

        {/* Technical Challenges */}
        <ChallengesSection 
          challenges={project.challenges}
        />

        {/* Code Showcase */}
        <CodeShowcase 
          microservices={project.architecture.microservices || project.architecture.components || []}
        />

        {/* Lessons Learned */}
        <LessonsLearned 
          lessons={project.lessonsLearned}
          nextSteps={project.nextSteps || []}
        />

      </div>
    </div>
  )
}
