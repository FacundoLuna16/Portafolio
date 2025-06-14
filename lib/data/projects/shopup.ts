import { DetailedProject } from './types'

export const shopupProject: DetailedProject = {
  // Basic info
  slug: 'shopup',
  title: 'ShopUp - Plataforma E-commerce',
  description: 'PWA para ayudar a pequeños emprendimientos a gestionar catálogos, ventas y reputación.',
  category: 'Backend',
  status: 'production',
  timeline: 'Nov 2023 - Feb 2024',
  team: '4 developers',
  techStack: [
    'Java', 'Node.js', 'Spring Boot', 'React', 'PostgreSQL', 
    'MariaDB', 'Docker', 'Kubernetes', 'Keycloak', 'OpenAI'
  ],
  highlights: [
    'Búsqueda semántica con IA',
    'Arquitectura de microservicios',
    'Integración Mercado Pago',
    'PWA con offline support'
  ],
  imgSrc: '/projects/shopup/hero.webp',
  demoUrl: 'https://kzmlebtfsrefxoyqvjgl.lite.vusercontent.net/',

  // Detailed sections
  overview: {
    problemStatement: 'Los pequeños emprendimientos necesitan una plataforma accesible para gestionar su negocio online sin conocimientos técnicos avanzados.',
    solution: 'Desarrollo de una PWA completa con microservicios backend que automatiza la gestión de catálogos, procesa pagos y mejora la experiencia de compra con IA.',
    impact: 'Reducción del 60% en tiempo de setup para nuevos comercios, mejora del 40% en precisión de búsquedas.'
  },

  architecture: {
    description: 'Arquitectura de microservicios con API Gateway, servicios especializados y bases de datos dedicadas.',
    microservices: [
      {
        name: 'API Gateway',
        description: 'Punto de entrada único con autenticación, rate limiting y enrutamiento',
        tech: ['Spring Cloud Gateway', 'Redis', 'JWT'],
        responsibilities: [
          'Autenticación y autorización',
          'Rate limiting por usuario',
          'Enrutamiento de requests',
          'Logging centralizado'
        ],
        endpoints: ['/api/auth', '/api/products', '/api/orders', '/api/payments'],
        challenges: [
          {
            title: 'Rate Limiting Distribuido',
            problem: 'Necesidad de rate limiting consistente entre múltiples instancias',
            solution: 'Implementación con Redis usando sliding window algorithm',
            impact: 'Protección efectiva contra abuso de API',
            techDetails: [
              'Redis para estado compartido',
              'Sliding window counter',
              'Configuración por endpoint y usuario'
            ]
          }
        ]
      },
      {
        name: 'Product Service',
        description: 'Gestión de catálogo con búsqueda semántica y recomendaciones IA',
        tech: ['Spring Boot', 'PostgreSQL', 'OpenAI API', 'pgvector'],
        responsibilities: [
          'CRUD de productos',
          'Búsqueda semántica',
          'Recomendaciones con IA',
          'Gestión de inventario'
        ],
        database: 'PostgreSQL con extensión pgvector',
        codeSnippet: {
          title: 'Implementación de Búsqueda Semántica',
          language: 'java',
          code: `@Service
public class SemanticSearchService {
    
    @Autowired 
    private OpenAIClient openAIClient;
    
    @Autowired 
    private ProductRepository productRepository;
    
    @Cacheable(value = "semantic-search", key = "#query")
    public List<ProductDTO> semanticSearch(String query, int limit) {
        try {
            // Generar embedding de la consulta
            EmbeddingRequest request = EmbeddingRequest.builder()
                .input(query)
                .model("text-embedding-ada-002")
                .build();
                
            List<Float> queryEmbedding = openAIClient
                .createEmbedding(request)
                .getData()
                .get(0)
                .getEmbedding();
            
            // Buscar productos similares usando cosine similarity
            return productRepository
                .findBySimilarEmbedding(queryEmbedding, limit)
                .stream()
                .map(this::toProductDTO)
                .collect(Collectors.toList());
                
        } catch (Exception e) {
            log.error("Error en búsqueda semántica: {}", e.getMessage());
            // Fallback a búsqueda tradicional
            return productRepository.findByNameContaining(query);
        }
    }
}`,
          explanation: 'El servicio convierte consultas en texto a embeddings vectoriales y usa similaridad coseno para encontrar productos relevantes, con fallback a búsqueda tradicional.'
        }
      },
      {
        name: 'Payment Service',
        description: 'Procesamiento de pagos con Mercado Pago y gestión de órdenes',
        tech: ['Spring Boot', 'MariaDB', 'Mercado Pago SDK', 'Circuit Breaker'],
        responsibilities: [
          'Integración con Mercado Pago',
          'Gestión de órdenes',
          'Webhooks de notificación',
          'Reconciliación de pagos'
        ],
        challenges: [
          {
            title: 'Resiliencia en Pagos',
            problem: 'Garantizar consistencia ante fallos de servicios externos',
            solution: 'Implementación de circuit breaker y saga pattern',
            impact: 'Reducción del 90% en órdenes inconsistentes',
            techDetails: [
              'Resilience4j para circuit breaker',
              'Saga pattern para transacciones distribuidas',
              'Queue de retry con backoff exponencial'
            ]
          }
        ]
      },
      {
        name: 'User Service',
        description: 'Gestión de usuarios, autenticación y perfiles de vendedores',
        tech: ['Spring Boot', 'PostgreSQL', 'Keycloak', 'Spring Security'],
        responsibilities: [
          'Gestión de usuarios',
          'Perfiles de vendedores',
          'Integración con Keycloak',
          'Roles y permisos'
        ]
      }
    ],
    integrations: [
      'Keycloak para SSO',
      'Mercado Pago para pagos',
      'OpenAI para IA',
      'Google Maps para geolocalización',
      'Whisper para búsqueda por voz'
    ]
  },

  challenges: [
    {
      title: 'Búsqueda Semántica Eficiente',
      problem: 'Los usuarios describían productos de forma natural pero el sistema no entendía la intención',
      solution: 'Implementé búsqueda semántica usando embeddings de OpenAI y pgvector para similarity search',
      impact: 'Mejora del 40% en precisión de resultados, reducción del 25% en búsquedas sin resultados',
      techDetails: [
        'Embeddings generados con text-embedding-ada-002',
        'PostgreSQL con extensión pgvector',
        'Cosine similarity para ranking',
        'Cache de embeddings frecuentes',
        'Fallback a búsqueda tradicional'
      ],
      learnings: [
        'Los embeddings requieren normalización para mejor performance',
        'El cache de embeddings reduce costos de API significativamente',
        'La combinación de búsqueda semántica + tradicional da mejores resultados'
      ]
    },
    {
      title: 'Escalabilidad de Microservicios',
      problem: 'El sistema debía manejar picos de tráfico durante promociones',
      solution: 'Implementé auto-scaling con Kubernetes y optimización de bases de datos',
      impact: 'Soporte para 10x más usuarios concurrentes durante Black Friday',
      techDetails: [
        'Horizontal Pod Autoscaler en Kubernetes',
        'Connection pooling optimizado',
        'Read replicas para consultas',
        'Redis para cache distribuido'
      ]
    }
  ],

  metrics: {
    performance: {
      responseTime: '< 200ms p95',
      throughput: '1000 req/sec',
      uptime: '99.8%'
    },
    business: {
      usersImpacted: '500+ small businesses',
      conversionImprovement: '15% increase in sales',
      costReduction: '40% reduction in setup time'
    }
  },

  lessonsLearned: [
    'La búsqueda semántica mejora significativamente UX pero requiere estrategia de caching inteligente',
    'El circuit breaker pattern es esencial para servicios de pago',
    'Los microservicios requieren observabilidad desde el día 1',
    'La documentación de API con OpenAPI acelera la integración frontend',
    'Los tests de integración son críticos en arquitecturas distribuidas'
  ],

  nextSteps: [
    'Implementar machine learning para recomendaciones personalizadas',
    'Agregar analytics avanzados para vendedores',
    'Optimizar SEO para catálogos públicos',
    'Implementar notificaciones push progresivas'
  ]
}
