# 📋 Instrucciones del Proyecto: Portafolio Terminal Retro

## 🎯 Contexto del Proyecto

**Nombre:** facu@portfolio:~$ — Portafolio Terminal Retro  
**Desarrollador:** Facundo Luna  
**Ubicación:** `D:\Proyectos\Portafolio`  
**URL Producción:** [luna-facundo.com](https://luna-facundo.com)  
**Estado:** Producción activa - Mantenimiento continuo  

## 🏗️ Arquitectura & Stack

### **Framework Principal**
- **Next.js 15** con App Router y TypeScript
- **React 18** con hooks modernos
- **TailwindCSS** + **shadcn/ui** para UI components
- **Framer Motion** para animaciones

### **Estructura de Carpetas**
```
D:\Proyectos\Portafolio/
├── app/
│   ├── components/          # Componentes específicos del app
│   ├── sections/           # Secciones principales (Hero, About, etc.)
│   ├── projects/[slug]/    # Páginas detalladas de proyectos
│   │   ├── components/     # Componentes específicos de proyectos
│   │   └── page.tsx        # Página dinámica de proyectos
│   ├── hooks/              # Custom hooks
│   └── globals.css
├── components/             # UI components reutilizables
├── lib/
│   ├── data/              # Datos estáticos (proyectos, etc.)
│   │   └── projects/      # Datos detallados de proyectos
│   └── utils/             # Utilidades (project-utils, etc.)
├── locales/               # Archivos de traducción (es.json, en.json)
├── types/                 # Definiciones de tipos TypeScript
└── public/                # Assets estáticos
    ├── ProyectoLogistica/ # Capturas del sistema de logística
    ├── Seguridad/         # Imágenes del proyecto de seguridad
    ├── Isidoro/           # Capturas del sitio Isidoro
    ├── ShopUp/            # Assets del proyecto ShopUp
    └── TallerDevOps/      # Imágenes del taller DevOps
```

## 🎨 Filosofía de Diseño

### **Concepto Central**
- **Estética terminal retro** con tipografía monoespaciada
- **Colores neón** (verde terminal) con soporte dark/light mode
- **Animaciones CLI** que simulan escritura de código
- **Metáforas de terminal** en toda la experiencia

### **Principios de UX**
1. **Nostalgia técnica** que conecte con developers
2. **Funcionalidad sobre forma** - siempre accesible
3. **Progressive enhancement** - móvil first
4. **Microinteracciones** que deleiten al usuario
5. **Consistencia visual** - navbar uniforme en todas las páginas

## 📝 Secciones & Funcionalidades

### **Hero Section**
- Animación de typing con snippets de código rotatorios
- Presentación con tagline "Backend | DevOps | Seguridad"
- CTA para descarga de CV

### **About Section**
- Descripción profesional con formato terminal
- Información sobre background y especialización
- Enlaces a redes sociales

### **History Section**
- Timeline vertical con experiencia profesional
- Ayudante UTN, QA Automation, Freelance Backend
- Formato de terminal con fechas y descripciones

### **Projects Section**
- Grid de proyectos con filtros por categoría
- Categorías: Backend, Frontend, DevOps, Security
- Cards con tecnologías, demos y repositorios
- **Páginas detalladas** para proyectos principales

### **Contact Section**
- Información de contacto estilo CLI
- Enlaces directos a email, LinkedIn, GitHub

## 🔧 Sistema de Proyectos Detallados

### **Proyectos con Páginas Completas**
1. **ShopUp** (`/projects/shopup`) - E-commerce con IA y búsqueda semántica
2. **Isidoro S.A.** (`/projects/isidoro`) - Web institucional agropecuaria  
3. **Sistema Logística** (`/projects/logistica`) - Gestión de envíos para Ferretería Siglo21
4. **Training Ciberseguridad** (`/projects/security`) - GISSIC UTN con análisis de seguridad

### **Componentes de Páginas de Proyectos**
- **ProjectHero**: Header con información básica del proyecto
- **SimpleArchitecture**: Arquitectura adaptable (web vs seguridad)
- **MicroserviceDetails**: Detalles técnicos de componentes
- **ProjectGallery**: Galería interactiva de capturas
- **ChallengesSection**: Desafíos técnicos y soluciones
- **CodeShowcase**: Snippets de código con syntax highlighting
- **LessonsLearned**: Aprendizajes y próximos pasos

### **Sistema de Identificación Único**
- Cada proyecto tiene un **ID único** independiente del idioma
- URLs consistentes: `/projects/{id}` sin importar la traducción
- Mapeo robusto en `project-utils.ts`

## 🌍 Internacionalización

### **Idiomas Soportados**
- **Español (es):** Idioma principal
- **Inglés (en):** Traducción completa

### **Archivos de Traducción**
- `locales/es.json` - Español
- `locales/en.json` - Inglés
- Hook personalizado: `useTranslation()` con patrón `mounted`

### **Estructura de Keys**
```json
{
  "navbar.home": "inicio",
  "hero.tagline": "...",
  "projects.categoria.title": "...",
  "timeline.puesto.description": "..."
}
```

### **Características de Internacionalización**
- ✅ **Navegación bilingüe** funcionando correctamente
- ✅ **URLs consistentes** independientes del idioma
- ✅ **Hidratación sin errores** con localStorage seguro
- ✅ **Fallback a español** como idioma por defecto

## 📊 Datos & Contenido

### **Proyectos Destacados**
1. **ShopUp** - E-commerce con IA, microservicios, búsqueda semántica (EN DESARROLLO)
2. **Isidoro S.A.** - Web institucional agropecuaria (EN PRODUCCIÓN)
3. **Sistema Logística** - Gestión de envíos para Ferretería Siglo21 (COMPLETADO)
4. **Training Ciberseguridad** - GISSIC UTN con análisis de vulnerabilidades (ARCHIVADO)
5. **Taller DevOps** - Infraestructura y CI/CD con AWS y Terraform
6. **TPI Backend** - Sistema de alquiler de bicicletas con microservicios

### **Experiencia Profesional**
- **UTN FRC** - Ayudante de Sistemas Operativos (2024-presente)
- **TestingDeSoftwareArg** - QA Automation (Ene 2024-Nov 2024)
- **Freelance** - Backend Developer (Nov 2023-Ene 2024)

### **Galerías de Imágenes**
- **Sistema Logística**: 6 capturas del sistema real (login, dashboard, gestión)
- **Seguridad**: Portada del repositorio de training
- **Isidoro**: Capturas del sitio web en producción
- **TallerDevOps**: Diagramas de infraestructura

## 🔧 Configuración Técnica

### **Variables de Entorno**
- `NEXT_PUBLIC_SITE_URL` - URL base del sitio
- Configuración de analytics (si aplica)

### **Scripts Disponibles**
```bash
npm run dev          # Desarrollo local
npm run build        # Build de producción
npm run start        # Servidor de producción
npm run lint         # Linting con ESLint
```

### **Deploy & CI/CD**
- **Plataforma:** Vercel
- **Branch principal:** desarrollo (actualmente)
- **Auto-deploy:** Habilitado en push a main
- **Preview deploys:** En pull requests

## 📱 Responsive & Accesibilidad

### **Breakpoints**
- **Mobile:** < 768px
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px

### **Consideraciones de Accesibilidad**
- Contraste de colores WCAG AA
- Navegación por teclado completa
- Screen reader friendly
- Semantic HTML structure

## 🛠️ Soluciones Técnicas Implementadas

### **Hidratación SSR/CSR**
- ✅ **Patrón `mounted`** en componentes dinámicos
- ✅ **TerminalBackground** con valores determinísticos iniciales
- ✅ **FloatingPanelsBackground** con renderizado controlado
- ✅ **TypingEffect** con fallback estático durante SSR
- ✅ **useTranslation** con localStorage seguro

### **Navegación Robusta**
- ✅ **IDs únicos** por proyecto independientes del idioma
- ✅ **Navbar consistente** sin botones contextuales
- ✅ **URLs estables** que funcionan en ambos idiomas
- ✅ **Project-utils** simplificados sin mapeos complejos

### **Arquitectura Adaptable**
- ✅ **SimpleArchitecture** detecta tipo de proyecto automáticamente
- ✅ **Layout específico** para proyectos de seguridad vs web
- ✅ **CodeShowcase** adaptado para diferentes dominios técnicos
- ✅ **Categorización inteligente** de tecnologías por dominio

## 🎯 Objetivos de Mantenimiento

### **Performance**
- Lighthouse score > 95 en todas las métricas
- Bundle size optimizado con componentes lazy
- First Contentful Paint < 1.5s
- Sin errores de hidratación en desarrollo/producción

### **SEO**
- Meta tags optimizados por página
- Open Graph para redes sociales
- Sitemap.xml generado automáticamente
- Structured data JSON-LD

### **Contenido**
- Actualizar proyectos regularmente
- Mantener información profesional actualizada
- Agregar nuevas tecnologías y certificaciones
- Documentar casos prácticos con capturas reales

## 🚀 Próximas Mejoras

### **Funcionalidades Pendientes**
- [ ] Blog integrado para artículos técnicos
- [ ] Comando de terminal real interactivo
- [ ] Analytics de visitantes con privacy-first
- [ ] PWA capabilities (offline mode)
- [ ] Easter eggs adicionales con temática hacker

### **Optimizaciones Técnicas**
- [ ] Implementar ISR para contenido dinámico
- [ ] Optimizar imágenes con Next.js Image
- [ ] Implementar lazy loading para componentes pesados
- [ ] A/B testing para mejoras de conversión
- [ ] Agregar más páginas detalladas de proyectos

### **Expansión de Contenido**
- [ ] Página detallada para Taller DevOps
- [ ] Página detallada para TPI Backend
- [ ] Casos de estudio más profundos con métricas
- [ ] Sección de certificaciones y logros

## 💡 Guías de Desarrollo

### **Convenciones de Código**
- **Componentes:** PascalCase (ej: `ProjectGallery.tsx`)
- **Hooks:** camelCase con prefijo `use` (ej: `useTranslation`)
- **Utilidades:** camelCase (ej: `getProjectSlug`)
- **Constantes:** UPPER_SNAKE_CASE
- **IDs de proyecto:** lowercase (ej: `'logistica'`, `'security'`)

### **Estructura de Componentes**
```typescript
"use client" // Si usa hooks o estado

import { FC, useState, useEffect } from 'react'

// Types/Interfaces
interface ComponentProps {
  // props definition
}

// Component
export const Component: FC<ComponentProps> = ({ prop }) => {
  const [mounted, setMounted] = useState(false)
  
  // Patrón mounted para hidratación
  useEffect(() => {
    setMounted(true)
  }, [])

  // Early return para SSR
  if (!mounted && hasClientOnlyContent) {
    return <div>Loading...</div>
  }

  // render
}
```

### **Manejo de Estado**
- **Local state:** useState para estado de componente
- **Global state:** Context API para temas y idioma
- **Server state:** No aplica (contenido estático)
- **Client-only:** Patrón `mounted` para localStorage/window

### **Agregando Nuevos Proyectos**
1. Crear archivo en `lib/data/projects/{proyecto}.ts`
2. Agregar ID único en `lib/data/projects.ts`
3. Incluir en `project-utils.ts` si tendrá página detallada
4. Actualizar mapeo en `app/projects/[slug]/page.tsx`
5. Agregar imágenes en `public/{Proyecto}/`
6. Actualizar traducciones en `locales/`

---

**Nota:** Este proyecto representa mi identidad profesional digital. La robustez técnica, performance optimizada y contenido actualizado son prioritarios para oportunidades profesionales. Cada cambio debe mantener la consistencia visual y funcional del concepto terminal retro.

## 📈 Estado Actual del Proyecto

### **✅ Funcionalidades Completadas**
- 🏠 **Portafolio base** con todas las secciones principales
- 🌐 **Internacionalización completa** (ES/EN) sin errores
- 📱 **Responsive design** optimizado para todos los dispositivos
- 🎨 **Tema terminal retro** consistente en toda la aplicación
- 📄 **4 páginas detalladas** de proyectos principales
- 🖼️ **Galerías interactivas** con capturas reales de proyectos
- 🔧 **Sistema robusto** sin errores de hidratación
- 🧭 **Navegación unificada** con navbar consistente

### **🎯 Próximos Hitos**
1. **Optimización SEO** con meta tags específicos por proyecto
2. **Análisis de performance** con Core Web Vitals
3. **Expansión de contenido** con más casos de estudio
4. **Certificaciones y logros** en sección dedicada