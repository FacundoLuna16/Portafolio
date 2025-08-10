import { DetailedProject } from './types'

export function getShopupProject(t: (key: string) => string): DetailedProject {
  return {
  // Basic info (basado en código real)
  slug: 'shopup',
  title: t('projects.shopup.title'),
  description: t('projects.shopup.description'),
  category: 'Backend',
  status: 'development',
  timeline: t('projects.shopup.timeline'),
  team: t('projects.shopup.team'),
  techStack: [
    // Backend Stack (from real project)
    'Java 24', 'Spring Boot 3.4+', 'Spring Cloud Gateway', 'Spring Security',
    'Spring Data JPA', 'PostgreSQL', 'OpenSearch', 'Keycloak',
    // Frontend Stack (from real project)
    'React 19', 'Vite', 'Material-UI v7', 'Redux Toolkit',
    // AI Stack (from real project) 
    'Python', 'FastAPI', 'OpenAI API', 'Whisper', 'Embeddings',
    // Infrastructure (from real project)
    'Docker', 'Docker Compose', 'Nginx', 'Maven', 'Swagger/OpenAPI', 'JWT',
    // External APIs
    'MercadoPago API', 'Google Maps API'
  ],
  highlights: [
    t('projects.shopup.highlights.1'),
    t('projects.shopup.highlights.2'),
    t('projects.shopup.highlights.3'),
    t('projects.shopup.highlights.4'),
    t('projects.shopup.highlights.5'),
    t('projects.shopup.highlights.6'),
    t('projects.shopup.highlights.7'),
    t('projects.shopup.highlights.8'),
    t('projects.shopup.highlights.9'),
    t('projects.shopup.highlights.10')
  ],
  imgSrc: '/projects/shopup/architecture-real.webp',
  demoUrl: 'https://shopup.com.ar', // Gateway local
  codeUrl: 'private', // Proyecto académico

  // Detailed sections based on real project architecture
  overview: {
    problemStatement: t('projects.shopup.overview.problemStatement'),
    solution: t('projects.shopup.overview.solution'),
    impact: t('projects.shopup.overview.impact')
  },

  architecture: {
    description: t('projects.shopup.architecture.description'),
    microservices: [
      {
        name: t('projects.shopup.microservices.gateway.name'),
        description: t('projects.shopup.microservices.gateway.description'),
        tech: ['Spring Cloud Gateway', 'Spring Security OAuth2', 'JWT', 'Keycloak Integration'],
        responsibilities: [
          t('projects.shopup.microservices.gateway.responsibilities.1'),
          t('projects.shopup.microservices.gateway.responsibilities.2'),
          t('projects.shopup.microservices.gateway.responsibilities.3'),
          t('projects.shopup.microservices.gateway.responsibilities.4'),
          t('projects.shopup.microservices.gateway.responsibilities.5')
        ],
        endpoints: [
          t('projects.shopup.microservices.gateway.endpoints.1'),
          t('projects.shopup.microservices.gateway.endpoints.2'),
          t('projects.shopup.microservices.gateway.endpoints.3'),
          t('projects.shopup.microservices.gateway.endpoints.4')
        ],
        challenges: [
          {
            title: t('projects.shopup.challenges.gateway.jwtFilters.title'),
            problem: t('projects.shopup.challenges.gateway.jwtFilters.problem'),
            solution: t('projects.shopup.challenges.gateway.jwtFilters.solution'),
            impact: t('projects.shopup.challenges.gateway.jwtFilters.impact'),
            techDetails: [
              t('projects.shopup.challenges.gateway.jwtFilters.techDetails.1'),
              t('projects.shopup.challenges.gateway.jwtFilters.techDetails.2'),
              t('projects.shopup.challenges.gateway.jwtFilters.techDetails.3'),
              t('projects.shopup.challenges.gateway.jwtFilters.techDetails.4')
            ]
          }
        ],
        codeSnippet: {
          title: t('projects.shopup.codeSnippets.gatewayJwtConfig.title'),
          language: 'properties',
          code: `# Filtro para emprendimientos y productos con UUID en path
shopup.gateway.filter.jwt-id-match.rules[0].name="EmprendimientoProductoGeneralPathUUID"
shopup.gateway.filter.jwt-id-match.rules[0].pathRegex=".*/(emprendimientos|productos)(?:/[a-zA-Z0-9_\\\\-]+)?/([a-fA-F0-9\\\\-]{36})(?:/.*)?$"
shopup.gateway.filter.jwt-id-match.rules[0].extractionStrategy=PATH_REGEX_GROUP
shopup.gateway.filter.jwt-id-match.rules[0].pathRegexGroupId=2
shopup.gateway.filter.jwt-id-match.rules[0].jwtClaimName="sub"

# Filtro para productos por query param
shopup.gateway.filter.jwt-id-match.rules[1].pathRegex=".*/productos$"
shopup.gateway.filter.jwt-id-match.rules[1].extractionStrategy=QUERY_PARAM
shopup.gateway.filter.jwt-id-match.rules[1].queryParamName="idEmprendimiento"`,
          explanation: t('projects.shopup.codeSnippets.gatewayJwtConfig.explanation')
        }
      },
      {
        name: t('projects.shopup.microservices.core.name'),
        description: t('projects.shopup.microservices.core.description'),
        tech: ['Spring Boot 3.4.5', 'Spring Data JPA', 'PostgreSQL', 'MapStruct', 'Bean Validation'],
        responsibilities: [
          t('projects.shopup.microservices.core.responsibilities.1'),
          t('projects.shopup.microservices.core.responsibilities.2'),
          t('projects.shopup.microservices.core.responsibilities.3'),
          t('projects.shopup.microservices.core.responsibilities.4'),
          t('projects.shopup.microservices.core.responsibilities.5'),
          t('projects.shopup.microservices.core.responsibilities.6'),
          t('projects.shopup.microservices.core.responsibilities.7'),
          t('projects.shopup.microservices.core.responsibilities.8'),
          t('projects.shopup.microservices.core.responsibilities.9')
        ],
        database: t('projects.shopup.microservices.core.database'),
        challenges: [
          {
            title: t('projects.shopup.challenges.core.hexagonal.title'),
            problem: t('projects.shopup.challenges.core.hexagonal.problem'),
            solution: t('projects.shopup.challenges.core.hexagonal.solution'),
            impact: t('projects.shopup.challenges.core.hexagonal.impact'),
            techDetails: [
              t('projects.shopup.challenges.core.hexagonal.techDetails.1'),
              t('projects.shopup.challenges.core.hexagonal.techDetails.2'),
              t('projects.shopup.challenges.core.hexagonal.techDetails.3')
            ]
          },
          {
            title: t('projects.shopup.challenges.core.statePattern.title'),
            problem: t('projects.shopup.challenges.core.statePattern.problem'),
            solution: t('projects.shopup.challenges.core.statePattern.solution'),
            impact: t('projects.shopup.challenges.core.statePattern.impact'),
            techDetails: [
              t('projects.shopup.challenges.core.statePattern.techDetails.1'),
              t('projects.shopup.challenges.core.statePattern.techDetails.2'),
              t('projects.shopup.challenges.core.statePattern.techDetails.3'),
              t('projects.shopup.challenges.core.statePattern.techDetails.4')
            ]
          }
        ],
        codeSnippet: {
          title: t('projects.shopup.codeSnippets.hexagonalController.title'),
          language: 'java',
          code: `@RestController
@RequestMapping("/api/emprendimientos")
@Tag(name = "Emprendimientos", description = "Gestión de cuentas de emprendimiento")
public class EmprendimientoController {

    private final EmprendimientoService emprendimientoService;
    private final ModelMapper modelMapper;

    @PostMapping
    @Operation(summary = "Registrar nuevo emprendimiento")
    public ResponseEntity<EmprendimientoResponseDto> registrarEmprendimiento(
            @Valid @RequestBody EmprendimientoRequestDto request) {
        
        // Mapeo a modelo de dominio
        Emprendimiento emprendimiento = modelMapper.map(request, Emprendimiento.class);
        
        // Lógica de negocio en el service
        Emprendimiento creado = emprendimientoService.registrar(emprendimiento);
        
        // Mapeo a DTO de respuesta
        EmprendimientoResponseDto response = modelMapper.map(creado, EmprendimientoResponseDto.class);
        
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}`,
          explanation: t('projects.shopup.codeSnippets.hexagonalController.explanation')
        }
      },
      {
        name: t('projects.shopup.microservices.ai.name'),
        description: t('projects.shopup.microservices.ai.description'),
        tech: ['Python', 'FastAPI', 'OpenAI API', 'Whisper', 'Pydantic', 'Docker'],
        responsibilities: [
          t('projects.shopup.microservices.ai.responsibilities.1'),
          t('projects.shopup.microservices.ai.responsibilities.2'),
          t('projects.shopup.microservices.ai.responsibilities.3'),
          t('projects.shopup.microservices.ai.responsibilities.4'),
          t('projects.shopup.microservices.ai.responsibilities.5')
        ],
        challenges: [
          {
            title: t('projects.shopup.challenges.ai.audioProcessing.title'),
            problem: t('projects.shopup.challenges.ai.audioProcessing.problem'),
            solution: t('projects.shopup.challenges.ai.audioProcessing.solution'),
            impact: t('projects.shopup.challenges.ai.audioProcessing.impact'),
            techDetails: [
              t('projects.shopup.challenges.ai.audioProcessing.techDetails.1'),
              t('projects.shopup.challenges.ai.audioProcessing.techDetails.2'),
              t('projects.shopup.challenges.ai.audioProcessing.techDetails.3'),
              t('projects.shopup.challenges.ai.audioProcessing.techDetails.4')
            ]
          }
        ]
      }
    ],
    integrations: [
      t('projects.shopup.integrations.1'),
      t('projects.shopup.integrations.2'),
      t('projects.shopup.integrations.3'),
      t('projects.shopup.integrations.4'),
      t('projects.shopup.integrations.5'),
      t('projects.shopup.integrations.6'),
      t('projects.shopup.integrations.7'),
      t('projects.shopup.integrations.8')
    ]
  },

  challenges: [
    {
      title: t('projects.shopup.challenges.main.rbac.title'),
      problem: t('projects.shopup.challenges.main.rbac.problem'),
      solution: t('projects.shopup.challenges.main.rbac.solution'),
      impact: t('projects.shopup.challenges.main.rbac.impact'),
      techDetails: [
        t('projects.shopup.challenges.main.rbac.techDetails.1'),
        t('projects.shopup.challenges.main.rbac.techDetails.2'),
        t('projects.shopup.challenges.main.rbac.techDetails.3'),
        t('projects.shopup.challenges.main.rbac.techDetails.4'),
        t('projects.shopup.challenges.main.rbac.techDetails.5')
      ],
      learnings: [
        t('projects.shopup.challenges.main.rbac.learnings.1'),
        t('projects.shopup.challenges.main.rbac.learnings.2'),
        t('projects.shopup.challenges.main.rbac.learnings.3'),
        t('projects.shopup.challenges.main.rbac.learnings.4')
      ]
    },
    {
      title: t('projects.shopup.challenges.main.aiVoice.title'),
      problem: t('projects.shopup.challenges.main.aiVoice.problem'),
      solution: t('projects.shopup.challenges.main.aiVoice.solution'),
      impact: t('projects.shopup.challenges.main.aiVoice.impact'),
      techDetails: [
        t('projects.shopup.challenges.main.aiVoice.techDetails.1'),
        t('projects.shopup.challenges.main.aiVoice.techDetails.2'),
        t('projects.shopup.challenges.main.aiVoice.techDetails.3'),
        t('projects.shopup.challenges.main.aiVoice.techDetails.4'),
        t('projects.shopup.challenges.main.aiVoice.techDetails.5'),
        t('projects.shopup.challenges.main.aiVoice.techDetails.6')
      ],
      learnings: [
        t('projects.shopup.challenges.main.aiVoice.learnings.1'),
        t('projects.shopup.challenges.main.aiVoice.learnings.2'),
        t('projects.shopup.challenges.main.aiVoice.learnings.3'),
        t('projects.shopup.challenges.main.aiVoice.learnings.4')
      ]
    },
    {
      title: t('projects.shopup.challenges.main.keycloak.title'),
      problem: t('projects.shopup.challenges.main.keycloak.problem'),
      solution: t('projects.shopup.challenges.main.keycloak.solution'),
      impact: t('projects.shopup.challenges.main.keycloak.impact'),
      techDetails: [
        t('projects.shopup.challenges.main.keycloak.techDetails.1'),
        t('projects.shopup.challenges.main.keycloak.techDetails.2'),
        t('projects.shopup.challenges.main.keycloak.techDetails.3'),
        t('projects.shopup.challenges.main.keycloak.techDetails.4'),
        t('projects.shopup.challenges.main.keycloak.techDetails.5')
      ]
    },
    {
      title: t('projects.shopup.challenges.main.googleOauth.title'),
      problem: t('projects.shopup.challenges.main.googleOauth.problem'),
      solution: t('projects.shopup.challenges.main.googleOauth.solution'),
      impact: t('projects.shopup.challenges.main.googleOauth.impact'),
      techDetails: [
        t('projects.shopup.challenges.main.googleOauth.techDetails.1'),
        t('projects.shopup.challenges.main.googleOauth.techDetails.2'),
        t('projects.shopup.challenges.main.googleOauth.techDetails.3'),
        t('projects.shopup.challenges.main.googleOauth.techDetails.4')
      ]
    },
    {
      title: t('projects.shopup.challenges.main.embeddings.title'),
      problem: t('projects.shopup.challenges.main.embeddings.problem'),
      solution: t('projects.shopup.challenges.main.embeddings.solution'),
      impact: t('projects.shopup.challenges.main.embeddings.impact'),
      techDetails: [
        t('projects.shopup.challenges.main.embeddings.techDetails.1'),
        t('projects.shopup.challenges.main.embeddings.techDetails.2'),
        t('projects.shopup.challenges.main.embeddings.techDetails.3'),
        t('projects.shopup.challenges.main.embeddings.techDetails.4')
      ]
    },
    {
      title: t('projects.shopup.challenges.main.mercadopago.title'),
      problem: t('projects.shopup.challenges.main.mercadopago.problem'),
      solution: t('projects.shopup.challenges.main.mercadopago.solution'),
      impact: t('projects.shopup.challenges.main.mercadopago.impact'),
      techDetails: [
        t('projects.shopup.challenges.main.mercadopago.techDetails.1'),
        t('projects.shopup.challenges.main.mercadopago.techDetails.2'),
        t('projects.shopup.challenges.main.mercadopago.techDetails.3'),
        t('projects.shopup.challenges.main.mercadopago.techDetails.4'),
        t('projects.shopup.challenges.main.mercadopago.techDetails.5'),
        t('projects.shopup.challenges.main.mercadopago.techDetails.6')
      ],
      learnings: [
        t('projects.shopup.challenges.main.mercadopago.learnings.1'),
        t('projects.shopup.challenges.main.mercadopago.learnings.2'),
        t('projects.shopup.challenges.main.mercadopago.learnings.3'),
        t('projects.shopup.challenges.main.mercadopago.learnings.4')
      ]
    },
    {
      title: t('projects.shopup.challenges.main.googleMaps.title'),
      problem: t('projects.shopup.challenges.main.googleMaps.problem'),
      solution: t('projects.shopup.challenges.main.googleMaps.solution'),
      impact: t('projects.shopup.challenges.main.googleMaps.impact'),
      techDetails: [
        t('projects.shopup.challenges.main.googleMaps.techDetails.1'),
        t('projects.shopup.challenges.main.googleMaps.techDetails.2'),
        t('projects.shopup.challenges.main.googleMaps.techDetails.3'),
        t('projects.shopup.challenges.main.googleMaps.techDetails.4'),
        t('projects.shopup.challenges.main.googleMaps.techDetails.5'),
        t('projects.shopup.challenges.main.googleMaps.techDetails.6')
      ],
      learnings: [
        t('projects.shopup.challenges.main.googleMaps.learnings.1'),
        t('projects.shopup.challenges.main.googleMaps.learnings.2'),
        t('projects.shopup.challenges.main.googleMaps.learnings.3'),
        t('projects.shopup.challenges.main.googleMaps.learnings.4')
      ]
    }
  ],

  metrics: {
    performance: {
      responseTime: t('projects.shopup.metrics.performance.responseTime'),
      throughput: t('projects.shopup.metrics.performance.throughput'),
      uptime: t('projects.shopup.metrics.performance.uptime')
    },
    business: {
      usersImpacted: t('projects.shopup.metrics.business.usersImpacted'),
      conversionImprovement: t('projects.shopup.metrics.business.conversionImprovement'),
      costReduction: t('projects.shopup.metrics.business.costReduction')
    }
  },

  sprintTimeline: {
    description: t('projects.shopup.sprints.description'),
    sprints: [
      {
        number: 1,
        title: t('projects.shopup.sprints.1.title'),
        status: 'completed' as const,
        duration: t('projects.shopup.sprints.1.duration'),
        description: t('projects.shopup.sprints.1.description'),
        achievements: [
          t('projects.shopup.sprints.1.achievements.1'),
          t('projects.shopup.sprints.1.achievements.2'),
          t('projects.shopup.sprints.1.achievements.3'),
          t('projects.shopup.sprints.1.achievements.4')
        ],
        userStories: [
          t('projects.shopup.sprints.1.userStories.1'),
          t('projects.shopup.sprints.1.userStories.2'),
          t('projects.shopup.sprints.1.userStories.3'),
          t('projects.shopup.sprints.1.userStories.4')
        ]
      },
      {
        number: 2,
        title: t('projects.shopup.sprints.2.title'),
        status: 'completed' as const,
        duration: t('projects.shopup.sprints.2.duration'),
        description: t('projects.shopup.sprints.2.description'),
        achievements: [
          t('projects.shopup.sprints.2.achievements.1'),
          t('projects.shopup.sprints.2.achievements.2'),
          t('projects.shopup.sprints.2.achievements.3'),
          t('projects.shopup.sprints.2.achievements.4')
        ],
        userStories: [
          t('projects.shopup.sprints.2.userStories.1'),
          t('projects.shopup.sprints.2.userStories.2'),
          t('projects.shopup.sprints.2.userStories.3'),
          t('projects.shopup.sprints.2.userStories.4')
        ]
      },
      {
        number: 3,
        title: t('projects.shopup.sprints.3.title'),
        status: 'completed' as const,
        duration: t('projects.shopup.sprints.3.duration'),
        description: t('projects.shopup.sprints.3.description'),
        achievements: [
          t('projects.shopup.sprints.3.achievements.1'),
          t('projects.shopup.sprints.3.achievements.2'),
          t('projects.shopup.sprints.3.achievements.3'),
          t('projects.shopup.sprints.3.achievements.4')
        ],
        userStories: [
          t('projects.shopup.sprints.3.userStories.1'),
          t('projects.shopup.sprints.3.userStories.2'),
          t('projects.shopup.sprints.3.userStories.3'),
          t('projects.shopup.sprints.3.userStories.4')
        ]
      },
      {
        number: 4,
        title: t('projects.shopup.sprints.4.title'),
        status: 'completed' as const,
        duration: t('projects.shopup.sprints.4.duration'),
        description: t('projects.shopup.sprints.4.description'),
        achievements: [
          t('projects.shopup.sprints.4.achievements.1'),
          t('projects.shopup.sprints.4.achievements.2'),
          t('projects.shopup.sprints.4.achievements.3'),
          t('projects.shopup.sprints.4.achievements.4')
        ],
        userStories: [
          t('projects.shopup.sprints.4.userStories.1'),
          t('projects.shopup.sprints.4.userStories.2'),
          t('projects.shopup.sprints.4.userStories.3'),
          t('projects.shopup.sprints.4.userStories.4')
        ]
      },
      {
        number: 5,
        title: t('projects.shopup.sprints.5.title'),
        status: 'completed' as const,
        duration: t('projects.shopup.sprints.5.duration'),
        description: t('projects.shopup.sprints.5.description'),
        achievements: [
          t('projects.shopup.sprints.5.achievements.1'),
          t('projects.shopup.sprints.5.achievements.2'),
          t('projects.shopup.sprints.5.achievements.3'),
          t('projects.shopup.sprints.5.achievements.4')
        ],
        userStories: [
          t('projects.shopup.sprints.5.userStories.1'),
          t('projects.shopup.sprints.5.userStories.2'),
          t('projects.shopup.sprints.5.userStories.3'),
          t('projects.shopup.sprints.5.userStories.4')
        ]
      },
      {
        number: 6,
        title: t('projects.shopup.sprints.6.title'),
        status: 'completed' as const,
        duration: t('projects.shopup.sprints.6.duration'),
        description: t('projects.shopup.sprints.6.description'),
        achievements: [
          t('projects.shopup.sprints.6.achievements.1'),
          t('projects.shopup.sprints.6.achievements.2'),
          t('projects.shopup.sprints.6.achievements.3'),
          t('projects.shopup.sprints.6.achievements.4')
        ],
        userStories: [
          t('projects.shopup.sprints.6.userStories.1'),
          t('projects.shopup.sprints.6.userStories.2'),
          t('projects.shopup.sprints.6.userStories.3'),
          t('projects.shopup.sprints.6.userStories.4'),
          t('projects.shopup.sprints.6.userStories.5')
        ]
      },
      {
        number: 7,
        title: t('projects.shopup.sprints.7.title'),
        status: 'completed' as const,
        duration: t('projects.shopup.sprints.7.duration'),
        description: t('projects.shopup.sprints.7.description'),
        achievements: [
          t('projects.shopup.sprints.7.achievements.1'),
          t('projects.shopup.sprints.7.achievements.2'),
          t('projects.shopup.sprints.7.achievements.3'),
          t('projects.shopup.sprints.7.achievements.4')
        ],
        userStories: [
          t('projects.shopup.sprints.7.userStories.1'),
          t('projects.shopup.sprints.7.userStories.2'),
          t('projects.shopup.sprints.7.userStories.3'),
          t('projects.shopup.sprints.7.userStories.4')
        ]
      },
      {
        number: 8,
        title: t('projects.shopup.sprints.8.title'),
        status: 'in_progress' as const,
        duration: t('projects.shopup.sprints.8.duration'),
        description: t('projects.shopup.sprints.8.description'),
        achievements: [
          t('projects.shopup.sprints.8.achievements.1'),
          t('projects.shopup.sprints.8.achievements.2'),
          t('projects.shopup.sprints.8.achievements.3'),
          t('projects.shopup.sprints.8.achievements.4')
        ],
        userStories: [
          t('projects.shopup.sprints.8.userStories.1'),
          t('projects.shopup.sprints.8.userStories.2'),
          t('projects.shopup.sprints.8.userStories.3'),
          t('projects.shopup.sprints.8.userStories.4'),
          t('projects.shopup.sprints.8.userStories.5'),
          t('projects.shopup.sprints.8.userStories.6')
        ],
        currentFocus: [
          t('projects.shopup.sprints.8.currentFocus.1'),
          t('projects.shopup.sprints.8.currentFocus.2'),
          t('projects.shopup.sprints.8.currentFocus.3'),
          t('projects.shopup.sprints.8.currentFocus.4')
        ]
      }
    ]
  },

  lessonsLearned: [
    t('projects.shopup.lessonsLearned.1'),
    t('projects.shopup.lessonsLearned.2'),
    t('projects.shopup.lessonsLearned.3'),
    t('projects.shopup.lessonsLearned.4'),
    t('projects.shopup.lessonsLearned.5'),
    t('projects.shopup.lessonsLearned.6'),
    t('projects.shopup.lessonsLearned.7'),
    t('projects.shopup.lessonsLearned.8'),
    t('projects.shopup.lessonsLearned.9'),
    t('projects.shopup.lessonsLearned.10')
  ],

  nextSteps: [
    t('projects.shopup.nextSteps.1'),
    t('projects.shopup.nextSteps.2'),
    t('projects.shopup.nextSteps.3'),
    t('projects.shopup.nextSteps.4'),
    t('projects.shopup.nextSteps.5'),
    t('projects.shopup.nextSteps.6'),
    t('projects.shopup.nextSteps.7'),
    t('projects.shopup.nextSteps.8'),
    t('projects.shopup.nextSteps.9'),
    t('projects.shopup.nextSteps.10')
  ]
  }
}
