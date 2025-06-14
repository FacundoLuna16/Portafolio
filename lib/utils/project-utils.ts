// Utilidad para convertir títulos de proyectos a slugs
export function titleToSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remover caracteres especiales
    .replace(/\s+/g, '-') // Espacios a guiones
    .replace(/-+/g, '-') // Múltiples guiones a uno
    .replace(/^-|-$/g, '') // Remover guiones al inicio/final
}

// Mapeo específico de títulos a slugs para mejor control
export const PROJECT_SLUG_MAP: Record<string, string> = {
  'ShopUp – Plataforma E-commerce': 'shopup',
  'ShopUp - Sistema de Gestión de Emprendimientos': 'shopup',
  'Isidoro S.A. – Web Institucional': 'isidoro',
  'Sistema de Logística – Gestión de Envíos': 'logistica',
  'Training Ciberseguridad – GISSIC UTN': 'security-training',
  'Taller DevOps – Infraestructura & Despliegue': 'devops-workshop',
  'TPI Backend – Sistema de Alquiler de Bicicletas': 'tpi-backend'
}

// Función para obtener el slug correcto
export function getProjectSlug(title: string): string {
  // Buscar en el mapeo específico primero
  const mappedSlug = PROJECT_SLUG_MAP[title]
  if (mappedSlug) return mappedSlug
  
  // Fallback a conversión automática
  return titleToSlug(title)
}

// Función para verificar si un proyecto tiene página detallada
export function hasDetailedPage(title: string): boolean {
  const slug = getProjectSlug(title)
  // ShopUp, Isidoro y SwiftLogix tienen páginas detalladas
  return ['shopup', 'isidoro', 'logistica'].includes(slug)
}
