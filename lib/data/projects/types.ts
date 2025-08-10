// Types para el sistema de proyectos detallados

export interface ProjectOverview {
  slug: string
  title: string
  description: string
  category: string
  status: 'production' | 'development' | 'archived'
  timeline: string
  team?: string
  techStack: string[]
  highlights: string[]
  imgSrc: string
  demoUrl?: string
  codeUrl?: string
}

export interface Microservice {
  name: string
  description: string
  tech: string[]
  responsibilities: string[]
  endpoints?: string[]
  database?: string
  challenges?: Challenge[]
  codeSnippet?: CodeSnippet
}

export interface Challenge {
  title: string
  problem: string
  solution: string
  impact?: string
  techDetails: string[]
  learnings?: string[]
}

export interface CodeSnippet {
  title: string
  language: string
  code: string
  explanation?: string
}

export interface ProjectMetrics {
  performance?: {
    responseTime: string
    throughput: string
    uptime: string
  }
  business?: {
    usersImpacted?: string
    conversionImprovement?: string
    costReduction?: string
  }
}

export interface ProjectImage {
  src: string
  alt: string
  title: string
}

export interface Sprint {
  number: number
  title: string
  status: 'completed' | 'in_progress' | 'planned'
  duration: string
  description: string
  achievements: string[]
  userStories: string[]
  currentFocus?: string[]
}

export interface SprintTimeline {
  description: string
  sprints: Sprint[]
}

export interface UserFlowStep {
  title: string
  description: string
  image: string
  features: string[]
}

export interface AdminFeature {
  title: string
  description: string
  image: string
  capabilities: string[]
}

export interface DetailedProject extends ProjectOverview {
  overview: {
    problemStatement: string
    solution: string
    impact: string
  }
  gallery?: ProjectImage[]
  architecture: {
    diagram?: string
    description: string
    microservices?: Microservice[]
    components?: Microservice[]
    integrations: string[]
  }
  userFlow?: {
    description: string
    steps: UserFlowStep[]
  }
  adminPanel?: {
    description: string
    features: AdminFeature[]
  }
  challenges: Challenge[]
  sprintTimeline?: SprintTimeline
  metrics?: ProjectMetrics
  lessonsLearned: string[]
  nextSteps?: string[]
}
