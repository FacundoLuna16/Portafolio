/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // ⚡ OPTIMIZACIÓN DE IMÁGENES ULTRA-AVANZADA
  images: {
    formats: ['image/avif', 'image/webp'], // ⚡ AVIF primero (mejor compresión)
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365, // ⚡ Cache por 1 año
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // ⚡ COMPRESIÓN Y HEADERS OPTIMIZADOS
  compress: true,
  poweredByHeader: false, // Ocultar header X-Powered-By por seguridad
  
  // ⚡ HEADERS DE SEGURIDAD Y PERFORMANCE
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Security headers
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
        ],
      },
      {
        // ⚡ Cache static assets aggressively
        source: '/(.*)\\.(js|css|png|jpg|jpeg|gif|webp|avif|svg|ico|woff|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },

  // ⚡ EXPERIMENTAL FEATURES OPTIMIZADAS
  experimental: {
    // Package imports optimization
    optimizePackageImports: [
      'lucide-react',
      'framer-motion',
      'react-icons',
      '@radix-ui/react-dialog',
      '@radix-ui/react-slot'
    ],
    // Tree shaking más agresivo
    esmExternals: true,
  },

  // ⚡ OUTPUT FILE TRACING (movido fuera de experimental)
  outputFileTracingIncludes: {
    '/api/**/*': ['./node_modules/**/*.wasm', './node_modules/**/*.node'],
  },

  // ⚡ WEBPACK OPTIMIZATIONS AVANZADAS
  webpack: (config, { dev, isServer }) => {
    // Optimizaciones de producción
    if (!dev && !isServer) {
      // Bundle analyzer condicional
      if (process.env.ANALYZE === 'true') {
        const withBundleAnalyzer = require('@next/bundle-analyzer')({
          enabled: true,
        })
        return withBundleAnalyzer(config)
      }

      // ⚡ Tree shaking más agresivo
      config.optimization = {
        ...config.optimization,
        usedExports: true,
        sideEffects: false,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            // Vendor chunk separado
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
              maxSize: 244000, // 244KB max
            },
            // UI components chunk
            ui: {
              test: /[\\/]components[\\/]/,
              name: 'ui',
              chunks: 'all',
              maxSize: 144000, // 144KB max
            },
            // Utils chunk
            utils: {
              test: /[\\/]lib[\\/]/,
              name: 'utils',
              chunks: 'all',
              maxSize: 50000, // 50KB max
            }
          },
        },
      }

      // Exclude dev dependencies en producción
      config.externals = config.externals || []
      config.externals.push({
        '@next/bundle-analyzer': 'commonjs @next/bundle-analyzer',
        'bundlewatch': 'commonjs bundlewatch'
      })
    }

    // ⚡ SVG como componentes React
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },

  // ⚡ REDIRECTS OPTIMIZADOS
  async redirects() {
    return [
      // Redirect old URLs si existieran
      {
        source: '/portfolio',
        destination: '/',
        permanent: true,
      },
      {
        source: '/cv',
        destination: '/Luna-Facundo-CV.pdf',
        permanent: true,
      }
    ]
  },

  // ⚡ TRAILING SLASH CONSISTENCY
  trailingSlash: false,

  // ⚡ ALLOWED DEV ORIGINS
  allowedDevOrigins: [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://192.168.1.0/24' // Red local
  ],
}

export default nextConfig
