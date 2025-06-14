import { DetailedProject } from './types'

export const shopupProjectReal: DetailedProject = {
  // Basic info (basado en código real)
  slug: 'shopup',
  title: 'ShopUp - Sistema de Gestión de Emprendimientos',
  description: 'Proyecto Final de Ingeniería en Sistemas - PWA para gestión integral de emprendimientos con microservicios, IA y arquitectura hexagonal.',
  category: 'Backend',
  status: 'development',
  timeline: 'Marzo 2025 - En desarrollo (Sprint 4/∞)',
  team: 'Proyecto Final ISI - Equipo de 4 desarrolladores',
  techStack: [
    // Backend Stack (real)
    'Java 24', 'Spring Boot 3.4.5', 'Spring Cloud Gateway', 'Spring Security',
    'Spring Data JPA', 'PostgreSQL', 'OpenSearch', 'Keycloak',
    // IA Stack (real) 
    'Python', 'FastAPI', 'OpenAI API', 'Whisper', 'Embeddings',
    // Infraestructura (real)
    'Docker', 'Maven', 'Swagger/OpenAPI', 'JWT'
  ],
  highlights: [
    'Arquitectura Hexagonal completa',
    'Microservicios con Spring Cloud Gateway',
    'IA para búsquedas semánticas y audio-to-text',
    'Autenticación OAuth2 con Keycloak',
    'Filtros JWT personalizados',
    'OpenSearch para búsquedas vectoriales',
    'Documentación API automatizada'
  ],
  imgSrc: '/projects/shopup/architecture-real.webp',
  demoUrl: 'http://localhost:8080', // Gateway local
  codeUrl: 'private', // Proyecto académico

  // Detailed sections basadas en análisis real
  overview: {
    problemStatement: 'Desarrollar un sistema integral para la gestión de emprendimientos que permita registro, modificación, consulta y baja de cuentas, cumpliendo con user stories académicas específicas.',
    solution: 'Sistema distribuido con microservicios, implementando arquitectura hexagonal, autenticación OAuth2, procesamiento de IA para audio y búsquedas semánticas, con bases de datos relacionales y vectoriales.',
    impact: 'Sprint 4 completado con funcionalidades core de gestión de emprendimientos, integración de IA operativa, y sistema de autenticación/autorización robusto.'
  },

  architecture: {
    description: 'Arquitectura de microservicios distribuida con Gateway centralizado, servicios especializados y bases de datos dedicadas, implementando patrones DDD y arquitectura hexagonal.',
    microservices: [
      {
        name: 'API Gateway (Spring Cloud Gateway)',
        description: 'Punto de entrada único con enrutamiento, autenticación OAuth2 y filtros JWT personalizados',
        tech: ['Spring Cloud Gateway', 'Spring Security OAuth2', 'JWT', 'Keycloak Integration'],
        responsibilities: [
          'Enrutamiento a microservicios (Core:8081, IA:8082)',
          'Validación JWT con Keycloak (puerto 8083)',
          'Filtros de autorización por recurso con UUID matching',
          'Rate limiting y logging centralizado',
          'CORS y configuración de seguridad'
        ],
        endpoints: [
          '/api/core/** → Core Service (8081)',
          '/api/ai/** → AI Service (8082)',
          '/api/auth/** → Keycloak (8083)'
        ],
        challenges: [
          {
            title: 'Filtros JWT Personalizados con UUID Matching',
            problem: 'Necesidad de validar que el usuario solo acceda a recursos que le pertenecen usando UUIDs en path y query params',
            solution: 'Implementé GenericJwtIdMatchFilter con regex patterns configurables para extraer UUIDs y compararlos con claims JWT',
            impact: 'Seguridad granular por recurso sin duplicar lógica en cada microservicio',
            techDetails: [
              'Regex patterns para extraer UUIDs de paths: /emprendimientos/{uuid}',
              'Query param matching para /productos?idEmprendimiento={uuid}', 
              'Comparación automática con JWT claim "sub"',
              'Configuración declarativa en application.properties'
            ]
          }
        ],
        codeSnippet: {
          title: 'Configuración de Filtros JWT en Gateway',
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
          explanation: 'Configuración de filtros que permiten autorización granular comparando UUIDs del path/query con claims JWT'
        }
      },
      {
        name: 'Core Service (Microservicio Principal)',
        description: 'Servicio principal con arquitectura hexagonal para gestión de emprendimientos y productos',
        tech: ['Spring Boot 3.4.5', 'Spring Data JPA', 'PostgreSQL', 'MapStruct', 'Bean Validation'],
        responsibilities: [
          'CRUD completo de emprendimientos (User Stories Sprint 1)',
          'Gestión de productos con atributos dinámicos',
          'Integración con OpenSearch para embeddings',
          'Validaciones de negocio (DNI, emails, teléfonos)',
          'Manejo de estados (Patrón State): Aprobado, Pendiente, Suspendido, Eliminado',
          'Seeders para datos iniciales (provincias, rubros, tipos)'
        ],
        database: 'PostgreSQL con tablas normalizadas y triggers para embeddings',
        challenges: [
          {
            title: 'Arquitectura Hexagonal Pura',
            problem: 'Implementar Clean Architecture sin dependencias entre capas y mantener testabilidad',
            solution: 'Separación estricta en Application/Domain/Infrastructure con interfaces de repositorio y mappers automáticos',
            impact: 'Código testeable, mantenible y desacoplado de frameworks',
            techDetails: [
              'Application: Controllers, DTOs (Request/Response), Exception Handlers',
              'Domain: Models puros, Services con lógica de negocio, Repository interfaces',
              'Infrastructure: Entities JPA, DAOs, Repository adapters, Configuration'
            ]
          },
          {
            title: 'Patrón State para Estados de Emprendimiento',
            problem: 'Modelar transiciones de estado complejas (Pendiente → Aprobado → Suspendido → Eliminado)',
            solution: 'Implementé State Pattern con clases Estado concretas y validaciones de transición',
            impact: 'Lógica de estados centralizada y extensible',
            techDetails: [
              'Estado abstract class con método cambiarA()',
              'EstadoAprobado, EstadoPendiente, EstadoSuspendido, EstadoEliminado',
              'Validaciones de transiciones permitidas',
              'Auditoría de cambios con CambioEstado entity'
            ]
          }
        ],
        codeSnippet: {
          title: 'Estructura de Controller con Arquitectura Hexagonal',
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
          explanation: 'Controller que actúa como adaptador entre HTTP y el dominio, usando DTOs y delegando lógica al service'
        }
      },
      {
        name: 'AI Service (Microservicio de IA)',
        description: 'Servicio Python especializado en procesamiento de audio, embeddings y búsquedas semánticas',
        tech: ['Python', 'FastAPI', 'OpenAI API', 'Whisper', 'Pydantic', 'Docker'],
        responsibilities: [
          'Transcripción de audio a texto con Whisper',
          'Generación de embeddings para productos',
          'Búsquedas semánticas vectoriales',
          'Integración con Core Service para sincronización',
          'Procesamiento de lenguaje natural'
        ],
        challenges: [
          {
            title: 'Integración Audio-to-Text en Tiempo Real',
            problem: 'Procesar audio de usuario para búsquedas por voz con baja latencia',
            solution: 'Pipeline con Whisper optimizado y cache de transcripciones frecuentes',
            impact: 'Búsquedas por voz con latencia < 3 segundos',
            techDetails: [
              'Whisper model size optimizado para español',
              'Preprocessing de audio para mejor calidad',
              'Cache de transcripciones comunes',
              'Validación de formato de audio en entrada'
            ]
          }
        ]
      }
    ],
    integrations: [
      'Keycloak para SSO y gestión de usuarios',
      'PostgreSQL como base de datos principal',
      'OpenSearch para búsquedas vectoriales',
      'OpenAI API para procesamiento de IA',
      'Docker para containerización'
    ]
  },

  challenges: [
    {
      title: 'Implementación de User Stories Académicas',
      problem: 'Cumplir con especificaciones exactas de criterios de aceptación y validaciones complejas (DNI 8 dígitos, emails formato específico, nombres 2-30 caracteres)',
      solution: 'Bean Validation personalizada con anotaciones custom y validators específicos para cada regla de negocio',
      impact: 'Cumplimiento 100% de criterios de aceptación definidos',
      techDetails: [
        '@Pattern para DNI: "^[0-9]{8}$"',
        '@Email con validación personalizada xxxx@xxxx.com',
        '@Size para nombres (2-30 caracteres)',
        'Validators custom para teléfonos con código de área',
        'Validación de edad mínima 18 años'
      ],
      learnings: [
        'Bean Validation es poderoso pero requiere validators custom para reglas complejas',
        'Separar validaciones de formato de validaciones de negocio',
        'Documentar reglas de validación en OpenAPI para frontend'
      ]
    },
    {
      title: 'Sistema de Audio-to-Text para CRUD de Productos',
      problem: 'Permitir registro y modificación de productos mediante comandos de voz, con precisión en la extracción de datos y manejo de ambigüedades',
      solution: 'Pipeline completo con Whisper para transcripción, OpenAI para análisis semántico y validación de datos extraídos',
      impact: 'UX revolucionaria que permite gestión hands-free de inventario',
      techDetails: [
        'Whisper API para speech-to-text en español',
        'GPT para extraer JSON estructurado del texto',
        'Embedding similarity para identificar productos existentes',
        'Validación en dos fases: IA + confirmación humana',
        'Soporte para múltiples productos en un solo audio',
        'Manejo de ruido y transcripciones ambiguas'
      ],
      learnings: [
        'La IA debe ser asistente, no reemplazo: siempre confirmar con el usuario',
        'La similaridad semántica es clave para identificar productos existentes',
        'El manejo de errores de transcripción requiere UX cuidadoso'
      ]
    },
    {
      title: 'Configuración de Keycloak con Docker',
      problem: 'Configurar autenticación OAuth2 con Keycloak en contenedor para desarrollo local',
      solution: 'Setup de Keycloak con realm personalizado, clients configurados y integración JWT',
      impact: 'Autenticación robusta con refresh tokens y claims personalizados',
      techDetails: [
        'Keycloak realm "shopup" con users y roles',
        'Client configuration para Gateway y frontend',
        'JWT claims con UUID de usuario en "sub"',
        'CORS configuration para desarrollo local'
      ]
    },
    {
      title: 'Integración Google OAuth con Keycloak',
      problem: 'Permitir login con Google manteniendo la arquitectura de seguridad existente',
      solution: 'Configuración de Identity Provider en Keycloak con mapeo de claims y tokens de refresh',
      impact: 'Onboarding simplificado para usuarios finales',
      techDetails: [
        'Google OAuth 2.0 como Identity Provider',
        'Mapeo automático de claims de Google a Keycloak',
        'Refresh tokens para sesiones extendidas',
        'Sincronización de datos de perfil'
      ]
    },
    {
      title: 'Sincronización de Embeddings con Triggers',
      problem: 'Mantener embeddings de OpenSearch sincronizados cuando se actualizan productos en PostgreSQL',
      solution: 'Triggers de PostgreSQL que insertan en tabla de pendientes, procesada asíncronamente por servicio Python',
      impact: 'Consistencia eventual entre PostgreSQL y OpenSearch sin impacto en performance',
      techDetails: [
        'Trigger AFTER INSERT/UPDATE en tabla productos',
        'Tabla embeddings_pendientes como queue',
        'Servicio Python que procesa cola periódicamente',
        'Retry logic para fallos de OpenAI API'
      ]
    }
  ],

  metrics: {
    performance: {
      responseTime: '< 500ms para CRUD básico',
      throughput: 'Desarrollo local - no medido en producción',
      uptime: 'Docker compose stack estable'
    },
    business: {
      usersImpacted: 'Proyecto académico - demo con datos simulados',
      conversionImprovement: 'N/A - enfoque en cumplimiento de user stories',
      costReduction: 'Arquitectura preparada para escalabilidad'
    }
  },

  lessonsLearned: [
    'La arquitectura hexagonal facilita enormemente el testing y mantenimiento del código',
    'Spring Cloud Gateway es poderoso pero requiere configuración cuidadosa de filtros',
    'Los triggers de base de datos son útiles para sincronización pero complejizan debugging',
    'Keycloak tiene curva de aprendizaje alta pero vale la pena para autenticación enterprise',
    'Docker compose simplifica desarrollo local con múltiples servicios',
    'FastAPI con Python es excelente para servicios de IA especializados',
    'La validación Bean Validation debe complementarse con validaciones de negocio en services',
    'OpenAPI/Swagger es esencial para documentar APIs en equipos'
  ],

  nextSteps: [
    'Sprint 5: Implementar gestión de órdenes y carrito de compras',
    'Sprint 6: Sistema de notificaciones y emails',
    'Sprint 7: Dashboard de analytics para emprendedores',
    'Optimización: Implementar cache Redis para consultas frecuentes',
    'Testing: Aumentar cobertura de tests de integración',
    'Deploy: Configurar CI/CD pipeline con GitHub Actions'
  ]
}
