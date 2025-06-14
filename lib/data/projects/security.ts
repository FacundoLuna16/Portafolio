import { DetailedProject } from './types'

export const securityProject: DetailedProject = {
  // Basic info
  slug: 'security',
  title: 'Training Ciberseguridad – GISSIC UTN',
  description: 'Repositorio técnico con análisis, scripts y soluciones a desafíos de ciberseguridad ofensiva y desarrollo seguro. Alineado a prácticas DevSecOps.',
  category: 'Security',
  status: 'development',
  timeline: 'Abril 2025 - Presente (en desarrollo)',
  team: 'Facundo Luna (Individual)',
  techStack: [
    // Web Security Tools
    'Burp Suite Professional', 'OWASP ZAP', 'SQLmap', 'Nikto', 'DirBuster',
    // Network Security Tools  
    'Nmap', 'Metasploit', 'Wireshark', 'Hydra', 'Netcat',
    // Password & Crypto Tools
    'John the Ripper', 'Hashcat', 'OpenSSL',
    // Operating Systems
    'Kali Linux', 'Ubuntu Server', 'Windows Server', 'Parrot Security OS',
    // Programming & Scripting
    'Python 3', 'Bash', 'PowerShell', 'JavaScript',
    // Forensics & Analysis
    'Volatility', 'Autopsy', 'FTK Imager', 'binwalk',
    // OSINT Tools
    'Maltego', 'theHarvester', 'Shodan',
    // Documentation
    'Markdown', 'Git', 'Docker'
  ],
  highlights: [
    'Análisis completo de vulnerabilidades OWASP Top 10',
    'Implementación de ataques Man-in-the-Middle avanzados',
    'Desarrollo de exploits personalizados en Python',
    'Análisis forense digital de sistemas comprometidos',
    'Documentación detallada con metodología step-by-step',
    'Integración de herramientas OSINT para reconocimiento',
    'Casos prácticos reales de Red Team vs Blue Team',
    'Aplicación de marcos OWASP, NIST y MITRE ATT&CK'
  ],
  imgSrc: '/Seguridad/portada.webp',
  demoUrl: null, // Repositorio de training - sin demo
  codeUrl: 'https://github.com/FacundoLuna16/Seguridad',

  // Detailed sections
  overview: {
    problemStatement: 'El programa GISSIC (Grupo de Investigación en Sistemas y Seguridad de la Información y las Comunicaciones) de UTN FRC requería formar especialistas en ciberseguridad ofensiva con experiencia práctica en identificación, explotación y mitigación de vulnerabilidades reales.',
    solution: 'Desarrollo de un repositorio técnico integral con casos prácticos reales, documentación step-by-step, scripts automatizados y análisis detallados que cubren desde reconocimiento hasta post-explotación, siguiendo metodologías de ethical hacking y frameworks de seguridad reconocidos.',
    impact: 'Formación práctica en ciberseguridad ofensiva, contribución al programa académico UTN FRC, y desarrollo de habilidades aplicables en entornos empresariales de Red Team y pentesting profesional.'
  },

  // Sin galería de capturas - proyecto de training técnico

  architecture: {
    description: 'Estructura modular organizada por dominios de ciberseguridad, cada caso práctico con documentación completa, evidencias visuales y scripts reproducibles. Metodología basada en Kill Chain y frameworks reconocidos.',
    components: [
      {
        name: 'Web Security',
        description: 'Análisis y explotación de vulnerabilidades en aplicaciones web',
        tech: ['Burp Suite Professional', 'OWASP ZAP', 'SQLmap', 'Nikto', 'DirBuster', 'Custom Python Scripts'],
        responsibilities: [
          'SQL Injection: Union-based, Boolean-based, Time-based',
          'Cross-Site Scripting (XSS): Reflected, Stored, DOM-based',
          'Cross-Site Request Forgery (CSRF) y bypass de tokens',
          'Local File Inclusion (LFI) y Remote File Inclusion (RFI)',
          'Command Injection y OS Command Execution',
          'Authentication Bypass y Session Management flaws',
          'Directory Traversal y Path Manipulation attacks',
          'File Upload vulnerabilities y web shell deployment'
        ],
        challenges: [
          {
            title: 'SQL Injection Avanzada con WAF Bypass',
            problem: 'Aplicación web con Web Application Firewall que bloquea payloads básicos de SQL injection',
            solution: 'Desarrollo de técnicas de evasión usando encoding, comentarios SQL y time-based attacks',
            impact: 'Acceso completo a base de datos, extracción de credenciales y escalación de privilegios',
            techDetails: [
              'Union-based injection con bypass de detección',
              'Boolean-based blind SQL injection automatizado',
              'Time-based attacks para extraer datos',
              'WAF evasion usando URL encoding y SQL comments',
              'Automated tools con custom wordlists'
            ]
          }
        ]
      },
      {
        name: 'Network Security',
        description: 'Evaluación de seguridad de redes corporativas y servicios de red',
        tech: ['Nmap', 'Metasploit', 'Wireshark', 'Hydra', 'Netcat', 'Custom Bash Scripts'],
        responsibilities: [
          'Network reconnaissance y service enumeration',
          'Port scanning avanzado con evasión de IDS/IPS',
          'Service exploitation usando Metasploit Framework',
          'Man-in-the-Middle attacks en redes switching',
          'Wireless security assessment (WEP/WPA/WPA2)',
          'Post-exploitation y lateral movement',
          'Network pivoting y tunneling techniques',
          'Active Directory enumeration y privilege escalation'
        ],
        challenges: [
          {
            title: 'Man-in-the-Middle en Red Switching',
            problem: 'Intercepción de tráfico en red con switches modernos que implementan port security',
            solution: 'Implementación de ARP poisoning, MAC flooding y VLAN hopping para bypass de seguridad',
            impact: 'Captura de credenciales, sesiones web y datos sensibles en tránsito',
            techDetails: [
              'ARP spoofing automatizado con detección de targets',
              'CAM table overflow para forcing hub mode',
              'VLAN hopping usando DTP negotiation',
              'SSL strip attacks para downgrade HTTPS',
              'Packet capture analysis con Wireshark'
            ]
          }
        ]
      },
      {
        name: 'Cryptography',
        description: 'Análisis de implementaciones criptográficas y ataques a sistemas de autenticación',
        tech: ['John the Ripper', 'Hashcat', 'OpenSSL', 'Custom Python Scripts'],
        responsibilities: [
          'Hash cracking usando rainbow tables y brute force',
          'Weak cryptographic implementation analysis',
          'Password policy assessment y dictionary attacks',
          'Certificate validation y PKI security review',
          'Custom hash algorithm reverse engineering',
          'Steganography detection y analysis',
          'Wireless encryption cracking (WEP/WPA/WPA2)'
        ]
      },
      {
        name: 'OSINT',
        description: 'Técnicas de inteligencia de fuentes abiertas para reconocimiento pasivo',
        tech: ['Maltego', 'theHarvester', 'Shodan', 'Google Dorking', 'Custom Python Scripts'],
        responsibilities: [
          'Domain enumeration y subdomain discovery',
          'Email harvesting y social media intelligence',
          'Public database mining para información sensible',
          'Dark web monitoring y threat intelligence',
          'Social engineering preparation via OSINT',
          'Infrastructure mapping y technology stack identification',
          'Metadata extraction de documentos públicos',
          'Geolocation intelligence y physical security assessment'
        ]
      },
      {
        name: 'Forensics',
        description: 'Análisis forense digital y respuesta a incidentes de seguridad',
        tech: ['Volatility', 'Autopsy', 'FTK Imager', 'dd (GNU)', 'binwalk', 'Yara Rules'],
        responsibilities: [
          'Memory dump analysis para detection de malware',
          'Disk imaging y timeline reconstruction',
          'Network traffic analysis durante incidentes',
          'Malware reverse engineering básico',
          'Evidence preservation y chain of custody',
          'Incident documentation y reporting',
          'IOCs (Indicators of Compromise) identification',
          'Steganography analysis y hidden data recovery'
        ]
      }
    ],
    integrations: [
      'OWASP Top 10 methodology integration',
      'NIST Cybersecurity Framework alignment',
      'PTES (Penetration Testing Execution Standard) compliance',
      'Kill Chain methodology implementation',
      'CVE database integration para vulnerability research',
      'MITRE ATT&CK framework mapping'
    ]
  },

  challenges: [
    {
      title: 'Implementación de Laboratorio Virtualizado Seguro',
      problem: 'Necesidad de crear un entorno de práctica aislado que permita ejecutar ataques reales sin comprometer sistemas de producción',
      solution: 'Diseño de laboratorio con VMs vulnerables, red aislada y herramientas de monitoreo para análisis del comportamiento de ataques',
      impact: 'Entorno seguro para práctica de técnicas ofensivas con documentación completa de cada vector de ataque',
      techDetails: [
        'VirtualBox/VMware con redes NAT aisladas',
        'Metasploitable, DVWA, WebGoat para targets vulnerables',
        'Kali Linux como attack platform principal',
        'Windows Server vulnerable para AD attacks',
        'Network monitoring con pfSense y Suricata IDS'
      ],
      learnings: [
        'La práctica controlada es esencial para entender el impacto real de vulnerabilidades',
        'La documentación step-by-step facilita la reproducibilidad de ataques',
        'El análisis de logs es crucial para understanding attack patterns'
      ]
    },
    {
      title: 'Desarrollo de Scripts de Automatización Personalizados',
      problem: 'Herramientas comerciales limitadas para casos específicos, necesidad de automatización custom',
      solution: 'Desarrollo de scripts Python y Bash personalizados para automatizar reconnaissance, exploitation y post-exploitation',
      impact: 'Eficiencia mejorada en procesos repetitivos y capacidad de customización total para escenarios específicos',
      techDetails: [
        'Python scripts para automated SQL injection testing',
        'Bash scripts para network enumeration workflows',
        'Custom payload generators para specific attack vectors',
        'Automated reporting tools para vulnerability documentation',
        'Integration con APIs de herramientas como Shodan y VirusTotal'
      ],
      learnings: [
        'La automatización es clave en pentesting profesional',
        'Scripts personalizados proporcionan ventajas sobre tools comerciales',
        'La documentación de código es crucial para reproducibilidad'
      ]
    },
    {
      title: 'Análisis de Malware en Entorno Controlado',
      problem: 'Necesidad de analizar comportamiento de malware sin riesgo de infección del sistema host',
      solution: 'Implementación de sandbox aislado con monitoring completo para análisis dinámico y estático de malware',
      impact: 'Comprensión profunda de técnicas de malware y desarrollo de contramedidas efectivas',
      techDetails: [
        'Isolated VM environments para dynamic analysis',
        'Volatility para memory forensics post-infection',
        'IDA Free y Ghidra para static analysis',
        'Network monitoring durante malware execution',
        'IOCs extraction y YARA rules development'
      ]
    },
    {
      title: 'Documentación Técnica Comprehensiva',
      problem: 'Necesidad de documentar metodologías complejas de forma clara y reproducible para fines académicos',
      solution: 'Desarrollo de templates de documentación con screenshots, comandos exactos y explicaciones técnicas detalladas',
      impact: 'Material de referencia de alta calidad para training y casos de estudio académicos',
      techDetails: [
        'Markdown documentation con syntax highlighting',
        'Step-by-step screenshots con annotations',
        'Command-line examples con expected outputs',
        'Vulnerability assessment templates',
        'Risk rating metodologies alignment con CVSS'
      ]
    }
  ],

  lessonsLearned: [
    'La ciberseguridad ofensiva requiere un entendimiento profundo de sistemas y redes subyacentes',
    'La documentación meticulosa es tan importante como la ejecución técnica del ataque',
    'Los laboratorios virtualizados son esenciales para práctica segura de técnicas ofensivas',
    'La automatización mediante scripting acelera significativamente los procesos de pentesting',
    'El análisis forense post-ataque proporciona insights valiosos sobre el impacto real',
    'La colaboración con frameworks establecidos (OWASP, NIST) mejora la credibilidad profesional',
    'El ethical hacking requiere un fuerte fundamento ético y legal',
    'La evolución constante de vulnerabilidades demanda actualización continua de conocimientos',
    'Las soft skills en comunicación son cruciales para reportar findings técnicos',
    'La experiencia hands-on es irreemplazable para el desarrollo de expertise en ciberseguridad'
  ],

  nextSteps: [
    // Ataques pendientes por agregar según README
    'Buffer Overflow exploitation y development de exploits',
    'Advanced Persistent Threat (APT) simulation',
    'Mobile application security testing (Android/iOS)',
    'Cloud security assessment (AWS, Azure, GCP)',
    'Container security y Docker exploitation',
    'IoT device security assessment',
    'Social Engineering campaigns y phishing simulations',
    'Red Team operations y threat hunting',
    'Malware analysis y reverse engineering avanzado',
    'Zero-day vulnerability research y development',
    // Certificaciones y desarrollo profesional
    'Certificaciones profesionales: CEH, OSCP, CISSP',
    'Contribución a proyectos open source de ciberseguridad',
    'Investigación en AI/ML applications para cybersecurity',
    'Mentoring y training de nuevos profesionales en seguridad'
  ]
}
