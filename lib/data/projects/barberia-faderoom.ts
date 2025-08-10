import { DetailedProject } from './types'

export function getBarberiaProject(t: (key: string) => string): DetailedProject {
  return {
  // Basic info (basado en proyecto real)
  slug: 'barberia',
  title: t('projects.barberia.title'),
  description: t('projects.barberia.description'),
  category: 'Backend',
  status: 'production',
  timeline: t('projects.barberia.timeline'),
  team: t('projects.barberia.team'),
  techStack: [
    // Frontend Stack (from real project)
    'React 18', 'Vite', 'Tailwind CSS', 'Zustand', 'React Router DOM',
    // Backend Stack (from real project)
    'Spring Boot 3', 'Spring Security', 'Spring Data JPA', 'JWT', 'PostgreSQL',
    // Infrastructure and Additional
    'Redis', 'Docker', 'Maven', 'Swagger/OpenAPI', 'Hexagonal Architecture'
  ],
  highlights: [
    t('projects.barberia.highlights.1'),
    t('projects.barberia.highlights.2'),
    t('projects.barberia.highlights.3'),
    t('projects.barberia.highlights.4'),
    t('projects.barberia.highlights.5'),
    t('projects.barberia.highlights.6'),
    t('projects.barberia.highlights.7'),
    t('projects.barberia.highlights.8')
  ],
  imgSrc: '/Barberia-Faderoom/1-PaginaPrincipal.webp',
  demoUrl: undefined, // No hay demo pública
  codeUrl: undefined, // Repositorio privado

  // Detailed sections based on real project implementation
  overview: {
    problemStatement: t('projects.barberia.overview.problemStatement'),
    solution: t('projects.barberia.overview.solution'),
    impact: t('projects.barberia.overview.impact')
  },

  architecture: {
    description: t('projects.barberia.architecture.description'),
    integrations: ['JWT Authentication', 'PostgreSQL Database', 'Redis Cache', 'Swagger API'],
    microservices: [
      {
        name: t('projects.barberia.architecture.frontend.name'),
        description: t('projects.barberia.architecture.frontend.description'),
        tech: ['React 18', 'Vite', 'Tailwind CSS', 'Zustand', 'React Router DOM'],
        responsibilities: [
          t('projects.barberia.architecture.frontend.responsibilities.1'),
          t('projects.barberia.architecture.frontend.responsibilities.2'),
          t('projects.barberia.architecture.frontend.responsibilities.3'),
          t('projects.barberia.architecture.frontend.responsibilities.4'),
          t('projects.barberia.architecture.frontend.responsibilities.5')
        ]
      },
      {
        name: t('projects.barberia.architecture.backend.name'),
        description: t('projects.barberia.architecture.backend.description'),
        tech: ['Spring Boot 3', 'Spring Security', 'Spring Data JPA', 'PostgreSQL', 'Redis', 'JWT'],
        responsibilities: [
          t('projects.barberia.architecture.backend.responsibilities.1'),
          t('projects.barberia.architecture.backend.responsibilities.2'),
          t('projects.barberia.architecture.backend.responsibilities.3'),
          t('projects.barberia.architecture.backend.responsibilities.4'),
          t('projects.barberia.architecture.backend.responsibilities.5'),
          t('projects.barberia.architecture.backend.responsibilities.6')
        ]
      }
    ]
  },

  challenges: [],

  metrics: {
    performance: {
      responseTime: t('projects.barberia.metrics.performance.responseTime'),
      throughput: t('projects.barberia.metrics.performance.throughput'),
      uptime: t('projects.barberia.metrics.performance.uptime')
    },
    business: {
      usersImpacted: t('projects.barberia.metrics.business.usersImpacted'),
      conversionImprovement: t('projects.barberia.metrics.business.conversionImprovement'),
      costReduction: t('projects.barberia.metrics.business.costReduction')
    }
  },

  lessonsLearned: [
    t('projects.barberia.lessonsLearned.1'),
    t('projects.barberia.lessonsLearned.2'),
    t('projects.barberia.lessonsLearned.3'),
    t('projects.barberia.lessonsLearned.4'),
    t('projects.barberia.lessonsLearned.5')
  ],

  nextSteps: [
    t('projects.barberia.nextSteps.1'),
    t('projects.barberia.nextSteps.2'),
    t('projects.barberia.nextSteps.3'),
    t('projects.barberia.nextSteps.4'),
    t('projects.barberia.nextSteps.5')
  ],

  // Flujo específico para FADE ROOM
  userFlow: {
    description: t('projects.barberia.userFlow.description'),
    steps: [
      {
        title: t('projects.barberia.userFlow.steps.1.title'),
        description: t('projects.barberia.userFlow.steps.1.description'),
        image: '/Barberia-Faderoom/1-PaginaPrincipal.webp',
        features: [
          t('projects.barberia.userFlow.steps.1.features.1'),
          t('projects.barberia.userFlow.steps.1.features.2'),
          t('projects.barberia.userFlow.steps.1.features.3')
        ]
      },
      {
        title: t('projects.barberia.userFlow.steps.2.title'),
        description: t('projects.barberia.userFlow.steps.2.description'),
        image: '/Barberia-Faderoom/1-SeleccionarElServicio.webp',
        features: [
          t('projects.barberia.userFlow.steps.2.features.1'),
          t('projects.barberia.userFlow.steps.2.features.2'),
          t('projects.barberia.userFlow.steps.2.features.3')
        ]
      },
      {
        title: t('projects.barberia.userFlow.steps.3.title'),
        description: t('projects.barberia.userFlow.steps.3.description'),
        image: '/Barberia-Faderoom/1-SeleccionarBarbero.webp',
        features: [
          t('projects.barberia.userFlow.steps.3.features.1'),
          t('projects.barberia.userFlow.steps.3.features.2'),
          t('projects.barberia.userFlow.steps.3.features.3')
        ]
      },
      {
        title: t('projects.barberia.userFlow.steps.4.title'),
        description: t('projects.barberia.userFlow.steps.4.description'),
        image: '/Barberia-Faderoom/1-SeleccionarDia.webp',
        features: [
          t('projects.barberia.userFlow.steps.4.features.1'),
          t('projects.barberia.userFlow.steps.4.features.2'),
          t('projects.barberia.userFlow.steps.4.features.3')
        ]
      },
      {
        title: t('projects.barberia.userFlow.steps.5.title'),
        description: t('projects.barberia.userFlow.steps.5.description'),
        image: '/Barberia-Faderoom/1-SeleccionamosHorario.webp',
        features: [
          t('projects.barberia.userFlow.steps.5.features.1'),
          t('projects.barberia.userFlow.steps.5.features.2'),
          t('projects.barberia.userFlow.steps.5.features.3')
        ]
      },
      {
        title: t('projects.barberia.userFlow.steps.6.title'),
        description: t('projects.barberia.userFlow.steps.6.description'),
        image: '/Barberia-Faderoom/1-ResumenYConfirmacion.webp',
        features: [
          t('projects.barberia.userFlow.steps.6.features.1'),
          t('projects.barberia.userFlow.steps.6.features.2'),
          t('projects.barberia.userFlow.steps.6.features.3')
        ]
      }
    ]
  },

  // Panel administrativo
  adminPanel: {
    description: t('projects.barberia.adminPanel.description'),
    features: [
      {
        title: t('projects.barberia.adminPanel.features.agenda.title'),
        description: t('projects.barberia.adminPanel.features.agenda.description'),
        image: '/Barberia-Faderoom/AgendaVistaAdmin.webp',
        capabilities: [
          t('projects.barberia.adminPanel.features.agenda.capabilities.1'),
          t('projects.barberia.adminPanel.features.agenda.capabilities.2'),
          t('projects.barberia.adminPanel.features.agenda.capabilities.3')
        ]
      },
      {
        title: t('projects.barberia.adminPanel.features.weeklySchedules.title'),
        description: t('projects.barberia.adminPanel.features.weeklySchedules.description'),
        image: '/Barberia-Faderoom/Planilla-Semanal.webp',
        capabilities: [
          t('projects.barberia.adminPanel.features.weeklySchedules.capabilities.1'),
          t('projects.barberia.adminPanel.features.weeklySchedules.capabilities.2'),
          t('projects.barberia.adminPanel.features.weeklySchedules.capabilities.3')
        ]
      },
      {
        title: t('projects.barberia.adminPanel.features.appointments.title'),
        description: t('projects.barberia.adminPanel.features.appointments.description'),
        image: '/Barberia-Faderoom/Turnos.webp',
        capabilities: [
          t('projects.barberia.adminPanel.features.appointments.capabilities.1'),
          t('projects.barberia.adminPanel.features.appointments.capabilities.2'),
          t('projects.barberia.adminPanel.features.appointments.capabilities.3')
        ]
      }
    ]
  }
  }
}