import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"
// import { PerformanceMonitor } from "./components/performance-monitor"
// import { PageOptimizer } from "./components/page-optimizer"
// import { PWAManager } from "./components/pwa-manager"
// import { MicroOptimizations } from "./components/micro-optimizations"
// import { MetricsDashboard } from "./components/metrics-dashboard"

// Font optimization con display swap para evitar FOIT
const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap', // ⚡ CRÍTICO: Evita FOIT/FOUT
  preload: true,
  variable: '--font-inter',
})

// ⚡ CRITICAL CSS INLINE para fastest FCP
const criticalStyles = `
  /* Critical CSS inline para hero section */
  .hero-critical {
    font-family: var(--font-inter), system-ui, -apple-system, sans-serif;
    background: #0d0d0d;
    color: #39ff14;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .terminal-text {
    font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
    text-shadow: 0 0 5px #39ff14;
  }

  .terminal-glow {
    text-shadow: 0 0 5px #39ff14;
  }

  /* Optimización inicial del navbar */
  .navbar-critical {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 50;
    background: rgba(13, 13, 13, 0.95);
    backdrop-filter: blur(8px);
  }
`

export const metadata: Metadata = {
  metadataBase: new URL('https://luna-facundo.com'), // ⚡ Fix para Open Graph
  title: {
    template: '%s | Facundo Luna Developer',
    default: 'Facundo Luna Developer - Backend | DevOps | Security'
  },
  description: "Backend Developer especializado en DevOps y Seguridad. Spring Boot, Microservicios, Docker, Kubernetes, AWS. Córdoba, Argentina.",
  keywords: ["Backend Developer", "DevOps", "Seguridad", "Spring Boot", "Java", "Docker", "Kubernetes", "Córdoba", "Argentina"],
  authors: [{ name: "Facundo Luna" }],
  creator: "Facundo Luna",
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: 'https://luna-facundo.com',
    siteName: 'Facundo Luna Developer',
    title: 'Facundo Luna - Backend Developer',
    description: 'Backend Developer especializado en DevOps y Seguridad con experiencia en Java, Spring Boot, Docker y Kubernetes',
    images: [
      {
        url: '/og-image.webp', // Necesitaremos crear esta imagen
        width: 1200,
        height: 630,
        alt: 'Facundo Luna Developer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Facundo Luna - Backend Developer',
    description: 'Backend Developer especializado en DevOps y Seguridad',
    images: ['/og-image.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <head>
        {/* ⚡ PWA MANIFEST AND META TAGS */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#39ff14" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="FacuDev" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#0d0d0d" />
        <meta name="msapplication-TileImage" content="/favicon-32x32.ico" />
        
        {/* Apple Touch Icons - usando favicons existentes temporalmente */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.ico" />
        <link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon.ico" />
        <link rel="apple-touch-icon" sizes="144x144" href="/favicon-32x32.ico" />
        <link rel="apple-touch-icon" sizes="120x120" href="/favicon-32x32.ico" />
        
        {/* ⚡ CRITICAL CSS INLINE - Fastest FCP */}
        <style dangerouslySetInnerHTML={{ __html: criticalStyles }} />
        
        {/* Resource Hints Optimizados */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* Preload recursos críticos de hero */}
        <link rel="preload" href="/Luna-Facundo-CV.pdf" as="document" />
        <link rel="preload" href="/ProyectoLogistica/principal.webp" as="image" type="image/webp" />
        {/* TODO: Crear /ShopUp/hero.webp cuando esté disponible */}
        
        {/* Preload rutas críticas */}
        <link rel="prefetch" href="/projects/shopup" />
        <link rel="prefetch" href="/projects/logistica" />
        
        {/* DNS Prefetch para recursos externos */}
        <link rel="dns-prefetch" href="//cdn.jsdelivr.net" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://luna-facundo.com" />
        
        {/* Hreflang para SEO internacional */}
        <link rel="alternate" hrefLang="es" href="https://luna-facundo.com" />
        <link rel="alternate" hrefLang="en" href="https://luna-facundo.com?lang=en" />
        <link rel="alternate" hrefLang="x-default" href="https://luna-facundo.com" />
        
        {/* ⚡ JSON-LD Structured Data para SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Facundo Luna",
              "jobTitle": "Backend Developer",
              "description": "Backend Developer especializado en DevOps y Seguridad con experiencia en Java, Spring Boot, Docker y Kubernetes",
              "url": "https://luna-facundo.com",
              "email": "mailto:facundoluna.dev@gmail.com",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Córdoba",
                "addressRegion": "Córdoba",
                "addressCountry": "AR"
              },
              "sameAs": [
                "https://github.com/FacundoLuna16",
                "https://linkedin.com/in/facundo-luna-dev"
              ],
              "knowsAbout": [
                "Java Programming",
                "Spring Boot",
                "Docker",
                "Kubernetes",
                "DevOps",
                "Cybersecurity",
                "Backend Development",
                "Microservices Architecture",
                "REST APIs",
                "MySQL",
                "PostgreSQL"
              ],
              "alumniOf": {
                "@type": "Organization",
                "name": "Universidad Tecnológica Nacional - Facultad Regional Córdoba",
                "sameAs": "https://www.frc.utn.edu.ar/"
              },
              "worksFor": {
                "@type": "Organization",
                "name": "UTN FRC",
                "description": "Ayudante de Sistemas Operativos"
              },
              "hasOccupation": {
                "@type": "Occupation",
                "name": "Backend Developer",
                "occupationLocation": {
                  "@type": "City",
                  "name": "Córdoba, Argentina"
                }
              }
            })
          }}
        />
        
        {/* Schema.org para Website */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Facundo Luna Developer Portfolio",
              "description": "Portfolio personal de Facundo Luna, Backend Developer especializado en DevOps y Seguridad",
              "url": "https://luna-facundo.com",
              "author": {
                "@type": "Person",
                "name": "Facundo Luna"
              },
              "inLanguage": ["es-AR", "en-US"],
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://luna-facundo.com/projects?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>
          {/* <PageOptimizer /> */}
          {/* <PWAManager /> */}
          {/* <MicroOptimizations /> */}
          {/* <PerformanceMonitor /> */}
          {/* <MetricsDashboard /> */}
          {children}
        </Providers>
      </body>
    </html>
  )
}
