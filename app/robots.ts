import { MetadataRoute } from 'next'

// Robots.txt optimizado
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/', 
        '/_next/', 
        '/admin/',
        '/*.json$', // Archivos de configuración
        '/node_modules/',
      ],
    },
    sitemap: 'https://luna-facundo.com/sitemap.xml',
  }
}
