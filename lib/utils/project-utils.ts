// Utilidad para convertir títulos de proyectos a slugs
export function titleToSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remover caracteres especiales
    .replace(/\s+/g, '-') // Espacios a guiones
    .replace(/-+/g, '-') // Múltiples guiones a uno
    .replace(/^-|-$/g, '') // Remover guiones al inicio/final
}

// Función para obtener el slug correcto usando el ID del proyecto
export function getProjectSlug(projectId: string): string {
  // Ahora usamos directamente el ID como slug
  return projectId
}

// Función para verificar si un proyecto tiene página detallada
export function hasDetailedPage(projectId: string): boolean {
  // ShopUp, Isidoro y SwiftLogix tienen páginas detalladas
  return ['shopup', 'isidoro', 'logistica'].includes(projectId)
}
