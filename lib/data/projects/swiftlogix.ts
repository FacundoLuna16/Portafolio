import { DetailedProject } from './types'

export const swiftlogixProject: DetailedProject = {
  // Basic info
  slug: 'logistica',
  title: 'SwiftLogix - Sistema de Gestión de Envíos',
  description: 'Sistema integral de logística para ferretería con trazabilidad completa, gestión de rutas, estados automatizados y notificaciones WhatsApp.',
  category: 'Backend',
  status: 'archived',
  timeline: 'Noviembre 2023 - Enero 2024 (3 meses)',
  team: 'Facundo Luna + Matías Fuentes + Alejo Herrera',
  techStack: [
    // Backend Stack
    'Java 17', 'Spring Boot 3.2.0', 'Spring Security', 'Spring Data JPA',
    'MySQL 8.2.0', 'Keycloak', 'JWT', 'Bean Validation',
    // Frontend Stack  
    'Next.js 13', 'Material-UI', 'Keycloak.js', 'Google Maps API',
    'React', 'Axios', 'Recharts', 'jsPDF',
    // DevOps & Tools
    'Docker', 'Docker Compose', 'Maven', 'Swagger/OpenAPI',
    // Integrations
    'WhatsApp API', 'Keywind Theme', 'Cron Jobs'
  ],
  highlights: [
    'Arquitectura hexagonal completa',
    'Patrón State para gestión de envíos',
    'Hojas del día automáticas con Cron',
    'Hojas excepcionales personalizables',
    'Notificaciones WhatsApp automatizadas',
    'Keycloak con tema Keywind',
    'Trazabilidad completa de envíos',
    'Sistema de zonas geográficas Neuquén'
  ],
  imgSrc: '/ProyectoLogistica/principal.webp',
  demoUrl: undefined, // Sin demo - proyecto para cliente
  codeUrl: 'https://github.com/FacundoLuna16/ProyectoLogistica',

  // Detailed sections
  overview: {
    problemStatement: 'Ferretería Siglo21 necesitaba un sistema de trazabilidad completa para envíos y stock, con gestión por zonas geográficas de Neuquén, notificaciones automáticas y flexibilidad para crear hojas de ruta excepcionales.',
    solution: 'Sistema integral con arquitectura hexagonal, gestión automatizada de estados con patrón State, hojas del día por cron jobs, integración WhatsApp para notificaciones y Keycloak para autenticación segura.',
    impact: 'Primera experiencia profesional real con cliente, enfrentando cambios de requerimientos y desafíos de integración con sistemas legacy de ventas.'
  },

  // Galería de imágenes del proyecto
  gallery: [
    {
      src: '/ProyectoLogistica/login.webp',
      alt: 'Pantalla de login del sistema',
      title: 'Login con Keycloak'
    },
    {
      src: '/ProyectoLogistica/principal.webp',
      alt: 'Dashboard principal del sistema',
      title: 'Dashboard Principal'
    },
    {
      src: '/ProyectoLogistica/agregarCliente.webp',
      alt: 'Formulario para agregar clientes',
      title: 'Gestión de Clientes'
    },
    {
      src: '/ProyectoLogistica/agregarEnvio.webp',
      alt: 'Formulario para crear envíos',
      title: 'Creación de Envíos'
    },
    {
      src: '/ProyectoLogistica/HojasDelDiaRutas.webp',
      alt: 'Vista de hojas del día y rutas',
      title: 'Hojas del Día y Rutas'
    },
    {
      src: '/ProyectoLogistica/reportes.webp',
      alt: 'Sistema de reportes',
      title: 'Generación de Reportes'
    }
  ],

  architecture: {
    description: 'Arquitectura robusta basada en contenedores Docker con Spring Boot backend, Next.js frontend, autenticación centralizada con Keycloak y base de datos MySQL compartida. Diseñada para escalabilidad y mantenibilidad.',
    components: [
      {
        name: 'SwiftLogix Backend',
        description: 'API REST con arquitectura hexagonal para gestión integral de logística y envíos',
        tech: ['Spring Boot 3.2.0', 'Java 17', 'Spring Security', 'Spring Data JPA', 'Bean Validation', 'MySQL Connector'],
        responsibilities: [
          'API REST completa para gestión de envíos',
          'CRUD de clientes, repartidores, camiones, zonas',
          'Patrón State para estados de envíos',
          'Hojas del día automáticas (Cron) y excepcionales',
          'Integración WhatsApp para notificaciones',
          'Autenticación JWT con Keycloak',
          'Gestión de zonas geográficas de Neuquén'
        ],
        database: 'MySQL 8.2.0',
        challenges: [
          {
            title: 'Patrón State para Gestión de Envíos',
            problem: 'Necesidad de manejar transiciones complejas de estados de envíos con notificaciones automáticas',
            solution: 'Implementación de State Pattern con clases por cada estado y triggers para WhatsApp',
            impact: 'Gestión automatizada y consistente de estados con notificaciones en tiempo real',
            techDetails: [
              'Estados: Pendiente → En Camino → Entregado/No Entregado/Cancelado',
              'CambioEstado entity para auditoría completa',
              'Triggers automáticos para notificaciones WhatsApp',
              'Validaciones de transiciones permitidas'
            ]
          }
        ],
        codeSnippet: {
          title: 'Implementación de State Pattern para Envíos',
          language: 'java',
          code: `// EstadoEnvio.java - State Pattern
public abstract class EstadoEnvio {
    protected String nombre;
    
    public abstract boolean puedeTransicionarA(EstadoEnvio nuevoEstado);
    public abstract void ejecutarAccion(Envio envio);
    
    // Método para cambiar estado con validaciones
    public void cambiarEstado(Envio envio, EstadoEnvio nuevoEstado) {
        if (this.puedeTransicionarA(nuevoEstado)) {
            // Registrar cambio para auditoría
            CambioEstado cambio = new CambioEstado(
                envio, this, nuevoEstado, LocalDateTime.now()
            );
            
            // Actualizar estado del envío
            envio.setEstado(nuevoEstado);
            
            // Ejecutar acciones específicas del nuevo estado
            nuevoEstado.ejecutarAccion(envio);
            
            // Disparar notificación WhatsApp
            whatsappService.notificarCambioEstado(envio, nuevoEstado);
        } else {
            throw new TransicionNoPermitidaException();
        }
    }
}

// Estados concretos
public class EnCamino extends EstadoEnvio {
    public EnCamino() { this.nombre = "EN_CAMINO"; }
    
    @Override
    public boolean puedeTransicionarA(EstadoEnvio nuevoEstado) {
        return nuevoEstado instanceof Entregado || 
               nuevoEstado instanceof NoEntregado ||
               nuevoEstado instanceof Cancelado;
    }
    
    @Override
    public void ejecutarAccion(Envio envio) {
        // Lógica específica cuando el envío está en camino
        envio.setFechaInicioEnvio(LocalDateTime.now());
    }
}`,
          explanation: 'State Pattern que garantiza transiciones válidas entre estados y ejecuta acciones específicas como notificaciones WhatsApp automáticas'
        }
      },
      {
        name: 'Frontend Next.js',
        description: 'Dashboard administrativo con Material-UI para gestión completa del sistema logístico',
        tech: ['Next.js 13', 'Material-UI', 'Keycloak.js', 'Google Maps API', 'Recharts', 'jsPDF', 'Axios'],
        responsibilities: [
          'Dashboard principal con métricas de envíos',
          'CRUD completo para clientes, repartidores, camiones',
          'Gestión de hojas del día automáticas y excepcionales',
          'Visualización de rutas con Google Maps',
          'Generación de reportes en PDF',
          'Autenticación SSO con Keycloak'
        ],
        challenges: [
          {
            title: 'Integración Keycloak.js en Next.js',
            problem: 'Configurar autenticación SSO manteniendo estado entre páginas y refreshes',
            solution: 'Setup de Keycloak provider con manejo de tokens y refresh automático',
            impact: 'Experiencia de usuario fluida con autenticación centralizada',
            techDetails: [
              'Keycloak.js configurado con Next.js SSR',
              'Protected routes con HOCs',
              'Token refresh automático',
              'Logout coordinado entre frontend y Keycloak'
            ]
          }
        ]
      },
      {
        name: 'MySQL Database',
        description: 'Base de datos relacional compartida entre Spring Boot y Keycloak',
        tech: ['MySQL 8.2.0', 'Docker Volume', 'Schema swiftlogix'],
        responsibilities: [
          'Almacenamiento de todas las entidades del sistema',
          'Datos de envíos, clientes, repartidores, camiones',
          'Gestión de zonas geográficas de Neuquén',
          'Auditoría completa con tabla cambio_estado',
          'Hojas del día automáticas y excepcionales',
          'Base de datos compartida con Keycloak'
        ]
      },
      {
        name: 'Keycloak Authentication',
        description: 'Servidor de autenticación con tema Keywind y configuración para Docker',
        tech: ['Keycloak (JBoss)', 'Keywind Theme', 'MySQL Backend', 'Docker'],
        responsibilities: [
          'Gestión centralizada de usuarios y roles',
          'SSO para frontend y backend',
          'Tema Keywind personalizado montado',
          'Realm "siglo21" configurado',
          'Client "siglo21-client-api-rest"',
          'Integración con MySQL compartida'
        ],
        challenges: [
          {
            title: 'Comunicación Inter-Contenedores Docker',
            problem: 'Keycloak rechazaba conexiones desde otros contenedores Docker a pesar de puertos correctos',
            solution: 'Configuración de Docker networks y URLs internas para comunicación entre contenedores',
            impact: 'Stack completo funcionando en Docker con comunicación estable',
            techDetails: [
              'Docker network "mynetwork" para todos los servicios',
              'URLs internas: http://keycloak:8080, http://swiftlogix:8080',
              'Variables de entorno diferentes para desarrollo vs Docker',
              'Orden de inicio con depends_on en docker-compose.yml'
            ]
          }
        ]
      }
    ],
    integrations: [
      'WhatsApp API para notificaciones automáticas',
      'Google Maps API para visualización de rutas',
      'Tema Keywind para personalización Keycloak',
      'Cron Jobs para hojas del día automáticas',
      'MySQL compartida entre Spring Boot y Keycloak'
    ]
  },

  challenges: [
    {
      title: 'Evolución de Requerimientos en Desarrollo',
      problem: 'Cliente pidió "hojas del día excepcionales" personalizables a mitad del proyecto, además de las automáticas por zonas',
      solution: 'Refactoring de arquitectura para soportar dos tipos de hojas: automáticas (con cron) y excepcionales (manuales)',
      impact: 'Sistema flexible que cumple ambos casos de uso sin comprometer funcionalidad existente',
      techDetails: [
        'HojaDelDia entity para hojas automáticas por zonas',
        'HojaDelDiaExcepcional entity para hojas manuales',
        'Cron job para generación automática por zonas geográficas',
        'Interface unificada en frontend para ambos tipos',
        'Lógica de negocio separada por tipo de hoja'
      ],
      learnings: [
        'Los requerimientos del cliente pueden cambiar drásticamente durante desarrollo',
        'La arquitectura flexible permite adaptarse a cambios sin reescribir todo',
        'Es crucial documentar y validar requerimientos antes de implementar'
      ]
    },
    {
      title: 'Comunicación Docker Inter-Contenedores',
      problem: 'Keycloak rechazaba conexiones desde Spring Boot y Next.js a pesar de configurar puertos correctamente',
      solution: 'Configuración de Docker networks y URLs internas para comunicación entre contenedores',
      impact: 'Stack completo funcional con Docker Compose sin necesidad de desarrollo en localhost',
      techDetails: [
        'Docker network "mynetwork" para todos los servicios',
        'URLs internas: http://keycloak:8080, http://swiftlogix:8080',
        'Variables de entorno diferentes para desarrollo vs Docker',
        'Orden de inicio con depends_on en docker-compose.yml'
      ],
      learnings: [
        'Docker containers tienen su propia red interna',
        'localhost != nombre del contenedor en Docker networks',
        'Las variables de entorno son clave para diferentes contextos'
      ]
    },
    {
      title: 'Integración con Sistema Legacy de Ventas',
      problem: 'Cliente requería sincronización con sistema de ventas existente para stock, pero no había documentación ni APIs',
      solution: 'Diseño de interfaces preparadas para futura integración, manteniendo sistema independiente por el momento',
      impact: 'Sistema funcional sin dependencias externas, preparado para integración futura',
      techDetails: [
        'Repository pattern preparado para múltiples fuentes de datos',
        'DTOs diseñados para mapear con sistema externo',
        'Interfaz StockService preparada para implementación externa',
        'Sistema de envíos independiente del stock por el momento'
      ]
    },
    {
      title: 'Gestión de Estados con Notificaciones WhatsApp',
      problem: 'Necesidad de notificar automáticamente cada cambio de estado de envío via WhatsApp',
      solution: 'Patrón State integrado con servicio de WhatsApp, disparando notificaciones en cada transición',
      impact: 'Cliente y destinatarios informados automáticamente sin intervención manual',
      techDetails: [
        'WhatsappService como puerto en arquitectura hexagonal',
        'Adapter para API de WhatsApp en infrastructure',
        'Templates de mensajes por cada estado',
        'Manejo de errores y reintentos para notificaciones fallidas'
      ]
    }
  ],

  metrics: {
    performance: {
      responseTime: 'Sistema local - Docker Compose',
      throughput: 'Diseñado para ferretería pequeña-mediana',
      uptime: 'Proyecto completado y archivado'
    },
    business: {
      usersImpacted: 'Ferretería Siglo21 - Neuquén',
      conversionImprovement: 'Primera experiencia con cliente real',
      costReduction: 'Aprendizaje sobre gestión de proyectos'
    }
  },

  lessonsLearned: [
    'Los requerimientos del cliente pueden cambiar drásticamente durante el desarrollo',
    'Docker inter-container communication requiere configuración específica de networks',
    'La arquitectura hexagonal facilita enormemente la adaptación a cambios de requerimientos',
    'El patrón State es perfecto para gestión de estados complejos con acciones automáticas',
    'Keycloak es poderoso pero complejo de configurar en contenedores',
    'Los sistemas legacy sin APIs presentan desafíos de integración significativos',
    'Los primeros proyectos con clientes reales enseñan más que muchos proyectos académicos',
    'La comunicación con el cliente debe ser constante para evitar sorpresas en requerimientos',
    'Docker Compose simplifica el desarrollo pero requiere conocimiento de redes'
  ],

  nextSteps: [
    'Proyecto archivado - sin desarrollo futuro planificado',
    'Experiencia adquirida aplicada en proyectos posteriores',
    'Aprendizajes sobre comunicación con cliente incorporados',
    'Conocimientos de Docker y arquitectura hexagonal consolidados'
  ]
}
