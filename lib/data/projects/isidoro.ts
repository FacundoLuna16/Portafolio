import { DetailedProject } from './types'

export const isidoroProject: DetailedProject = {
  // Basic info
  slug: 'isidoro',
  title: 'Isidoro S.A. - Web Institucional',
  description: 'Landing page profesional para empresa agropecuaria especializada en soja desactivada para ganado, con estética John Deere y deploy automatizado.',
  category: 'Frontend',
  status: 'production',
  timeline: 'Marzo 2025 - 5 días (Lunes a Viernes)',
  team: 'Facundo Luna + Lautaro Gregorat',
  techStack: [
    // Frontend Stack
    'React 18', 'Vite', 'TailwindCSS', 'Framer Motion',
    'React Hook Form', 'Yup Validation', 'React Icons',
    // Backend Stack
    'Node.js', 'Express', 'Nodemailer', 'SMTP',
    // DevOps Stack
    'Docker', 'GitHub Actions', 'Nginx', 'SSL/HTTPS',
    // Deploy
    'DonWeb VPS', 'Docker Compose', 'Automated CI/CD'
  ],
  highlights: [
    'Deploy automático en 1 push a main',
    'Estética John Deere profesional',
    'Multilenguaje completo (ES/EN)',
    'SSL y HTTPS configurados',
    'Responsive design mobile-first',
    'Formulario de contacto funcional',
    'Docker multi-stage builds',
    'Servidor privado en DonWeb'
  ],
  imgSrc: '/Isidoro/isidoro.webp',
  demoUrl: 'https://isidorosas.com.ar/',
  // codeUrl: 'private' - Repositorio privado

  // Detailed sections
  overview: {
    problemStatement: 'Cliente del sector agropecuario necesitaba presencia web profesional para promocionar soja desactivada para ganado, con identidad visual inspirada en John Deere y soporte multilenguaje.',
    solution: 'Landing page moderna desarrollada en React con backend para formularios, deploy automatizado y diseño responsive que refleja la seriedad y profesionalismo del sector agropecuario.',
    impact: 'Sitio web profesional entregado en tiempo récord (5 días) con deploy automatizado, generando presencia digital inmediata para el cliente.'
  },

  architecture: {
    description: 'Arquitectura simple y eficiente: SPA React con backend Node.js para emails y pipeline CI/CD automatizado. Diseño monolítico perfecto para landing pages corporativas.',
    components: [
      {
        name: 'Frontend (React SPA)',
        description: 'Single Page Application optimizada con Vite, diseño responsivo y multilenguaje',
        tech: ['React 18', 'Vite', 'TailwindCSS', 'Framer Motion', 'React Hook Form'],
        responsibilities: [
          'Landing page con secciones: Home, Nosotros, Productos, Contacto',
          'Cambio de idioma dinámico (ES/EN) con Context API',
          'Formulario de contacto con validaciones Yup',
          'Animaciones suaves con Framer Motion',
          'Optimizaciones de rendimiento con Vite',
          'Diseño responsive mobile-first'
        ],
        codeSnippet: {
          title: 'Implementación de Context para Multilenguaje',
          language: 'javascript',
          code: `// LanguageContext.jsx
import React, { createContext, useState } from 'react';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('es');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'es' ? 'en' : 'es');
  };

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage, 
      toggleLanguage 
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Uso en componentes
const { language } = useContext(LanguageContext);
const t = translations[language];

return (
  <h1>{t.home.title}</h1>
  <p>{t.home.description}</p>
);`,
          explanation: 'Sistema de internacionalización simple pero efectivo usando Context API para cambio dinámico entre español e inglés'
        }
      },
      {
        name: 'Backend (Node.js API)',
        description: 'Servidor ligero para envío de emails del formulario de contacto con SMTP personalizado',
        tech: ['Node.js', 'Express', 'Nodemailer', 'CORS', 'SMTP'],
        responsibilities: [
          'API endpoint para formulario de contacto (/api/contact)',
          'Envío de emails con SMTP personalizado',
          'Validación de datos del formulario',
          'Configuración CORS para frontend',
          'Manejo de errores y respuestas HTTP'
        ],
        database: 'No requiere base de datos - solo envío de emails',
        codeSnippet: {
          title: 'API de Contacto con Nodemailer',
          language: 'javascript',
          code: `// server.js
const express = require('express');
const cors = require('cors');
const { sendContactEmail } = require('./service');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ 
      success: false, 
      message: 'Todos los campos son obligatorios' 
    });
  }

  const result = await sendContactEmail(name, email, message);
  
  if (result.success) {
    res.status(200).json({ 
      success: true, 
      message: 'Mensaje enviado correctamente' 
    });
  } else {
    res.status(500).json({ 
      success: false, 
      message: 'Error al enviar el mensaje' 
    });
  }
});`,
          explanation: 'API simple pero robusta para manejar formularios de contacto con validación y respuestas estructuradas'
        }
      },
      {
        name: 'CI/CD Pipeline (GitHub Actions)',
        description: 'Deploy completamente automatizado desde push a main hasta producción en servidor DonWeb',
        tech: ['GitHub Actions', 'Docker', 'SCP', 'SSH', 'Shell Scripts'],
        responsibilities: [
          'Build automático en push a main',
          'Empaquetado de archivos con tar.gz',
          'Transfer seguro al servidor con SCP',
          'Deploy automático con SSH',
          'Docker Compose en producción',
          'Limpieza de archivos temporales'
        ],
        codeSnippet: {
          title: 'Pipeline GitHub Actions para Deploy',
          language: 'yaml',
          code: `name: Deploy Frontend & Backend desde GitHub al Servidor

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout del código
        uses: actions/checkout@v3

      - name: Crear archivo comprimido para deploy
        run: |
          echo "📦 Empaquetando archivos..."
          tar -czf deploy-archive.tar.gz backend Frontend docker-compose.prod.yml

      - name: Enviar archivo comprimido al servidor
        uses: appleboy/scp-action@v0.1.4
        with:
          host: \${{ secrets.SERVER_HOST }}
          username: \${{ secrets.SERVER_USER }}
          key: \${{ secrets.SERVER_SSH_KEY }}
          source: deploy-archive.tar.gz
          target: /root/isidoro

      - name: Desplegar en el servidor vía SSH
        uses: appleboy/ssh-action@v1.0.0
        with:
          script: |
            cd /root/isidoro
            tar -xzf deploy-archive.tar.gz
            docker compose down
            docker compose build
            docker compose up -d`,
          explanation: 'Pipeline completamente automatizado que utiliza actions de la comunidad para transferir y desplegar en servidor privado'
        }
      }
    ],
    integrations: [
      'DonWeb VPS para hosting',
      'SMTP personalizado para emails',
      'Nginx como reverse proxy',
      'SSL/HTTPS certificates',
      'GitHub Actions para CI/CD'
    ]
  },

  challenges: [
    {
      title: 'Deploy Automatizado con GitHub Actions vs Jenkins/GitLab',
      problem: 'Necesidad de implementar CI/CD en un proyecto rápido (5 días) sin la infraestructura compleja de Jenkins o GitLab CI',
      solution: 'Adopción de GitHub Actions aprovechando actions pre-construidas de la comunidad para SCP y SSH',
      impact: 'Deploy completamente automatizado desde el primer día, sin configuración de servidores CI/CD adicionales',
      techDetails: [
        'appleboy/scp-action para transferencia segura de archivos',
        'appleboy/ssh-action para ejecución remota de comandos',
        'Uso de GitHub Secrets para credenciales',
        'Empaquetado inteligente con tar.gz',
        'Orchestration con Docker Compose en producción'
      ],
      learnings: [
        'GitHub Actions tiene un ecosistema de community actions muy maduro',
        'La simplicidad de setup vs Jenkins es abismal',
        'Las community actions ahorran días de configuración',
        'Los secretos de GitHub son más seguros que variables de entorno expuestas'
      ]
    },
    {
      title: 'Estética John Deere Personalizada',
      problem: 'Cliente requería identidad visual específica inspirada en John Deere con paleta de colores verde oscuro profesional',
      solution: 'Desarrollo de sistema de diseño custom con TailwindCSS usando paleta verde oscuro (#4F772D), crema (#FFF6DC) y blanco',
      impact: 'Identidad visual profesional que transmite confianza y seriedad del sector agropecuario',
      techDetails: [
        'Configuración personalizada de TailwindCSS',
        'Paleta de colores custom definida en config',
        'Componentes reutilizables con design system',
        'Optimización de imágenes en formato WebP',
        'Responsive design mobile-first'
      ]
    },
    {
      title: 'Multilenguaje con Context API',
      problem: 'Requerimiento del cliente para soporte completo EN/ES con cambio dinámico y banderas visuales',
      solution: 'Implementación de Context API con objeto de traducciones y toggle visual con banderas',
      impact: 'Experiencia completamente bilingüe sin recarga de página',
      techDetails: [
        'Context API para estado global de idioma',
        'Objeto de traducciones centralizado',
        'Toggle con banderas visuales (ES/EN)',
        'Persistencia de preferencia del usuario',
        'Traducción completa de todos los contenidos'
      ]
    },
    {
      title: 'SSL y HTTPS en Servidor Privado',
      problem: 'Configuración de certificados SSL en servidor DonWeb con Docker y Nginx',
      solution: 'Setup de Nginx como reverse proxy con certificados SSL montados como volúmenes en Docker',
      impact: 'Sitio completamente seguro con HTTPS desde el primer deploy',
      techDetails: [
        'Nginx configurado como reverse proxy',
        'Certificados SSL montados como volúmenes Docker',
        'Redirección automática HTTP → HTTPS',
        'Headers de seguridad configurados'
      ]
    }
  ],

  lessonsLearned: [
    'GitHub Actions es más accesible y rápido de configurar que Jenkins/GitLab CI',
    'Las community actions ahorran muchísimo tiempo de desarrollo',
    'Un buen pipeline CI/CD desde el día 1 vale más que weeks de trabajo manual',
    'TailwindCSS permite crear identidades visuales custom muy rápido',
    'El Context API es perfecto para features simples como multilenguaje',
    'Docker + Nginx + SSL es una combinación robusta para proyectos pequeños',
    'Los proyectos de 1 semana pueden tener calidad enterprise con las herramientas correctas',
    'La colaboración en pair programming acelera muchísimo el desarrollo'
  ],

  nextSteps: [
    'Agregar CMS para que el cliente edite contenido',
    'Implementar analytics para medir conversiones',
    'Optimizar SEO para búsquedas del sector agropecuario',
    'Agregar testimonios de clientes dinámicos',
    'Integrar catálogo de productos más detallado'
  ]
}
