// ⚡ SERVICE WORKER ULTRA-AVANZADO
// Facundo Luna Portfolio - Enterprise Level PWA

const CACHE_NAME = 'facudev-portfolio-v1'
const STATIC_CACHE = 'facudev-static-v1'
const DYNAMIC_CACHE = 'facudev-dynamic-v1'
const IMAGE_CACHE = 'facudev-images-v1'

// ⚡ Assets críticos para cache inmediato
const CRITICAL_ASSETS = [
  '/',
  '/manifest.json',
  '/Luna-Facundo-CV.pdf',
  '/favicon.ico',
  '/offline.html', // Página offline que crearemos
]

// ⚡ Assets estáticos para cache
const STATIC_ASSETS = [
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/og-image.webp'
]

// ⚡ Rutas para cache con network-first strategy
const NETWORK_FIRST_ROUTES = [
  '/api/',
  '/projects/',
  '/_next/static/'
]

// ⚡ Imágenes para cache con stale-while-revalidate
const IMAGE_EXTENSIONS = ['.webp', '.png', '.jpg', '.jpeg', '.svg', '.avif']

// ==================== INSTALL EVENT ====================
self.addEventListener('install', (event) => {
  console.log('🚀 Service Worker: Installing...')
  
  event.waitUntil(
    Promise.all([
      // Cache crítico inmediato
      caches.open(CACHE_NAME).then(cache => {
        return cache.addAll(CRITICAL_ASSETS)
      }),
      // Cache estático
      caches.open(STATIC_CACHE).then(cache => {
        return cache.addAll(STATIC_ASSETS)
      }),
      // Skip waiting para activación inmediata
      self.skipWaiting()
    ])
  )
})

// ==================== ACTIVATE EVENT ====================
self.addEventListener('activate', (event) => {
  console.log('⚡ Service Worker: Activating...')
  
  event.waitUntil(
    Promise.all([
      // Limpiar caches viejos
      cleanupOldCaches(),
      // Claim todos los clientes
      self.clients.claim()
    ])
  )
})

// ==================== FETCH EVENT ====================
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)
  
  // Solo manejar requests HTTP/HTTPS
  if (!request.url.startsWith('http')) return
  
  // ⚡ Estrategias de cache por tipo de recurso
  if (isImageRequest(request)) {
    event.respondWith(imageStrategy(request))
  } else if (isStaticAsset(request)) {
    event.respondWith(cacheFirstStrategy(request))
  } else if (isAPIRequest(request)) {
    event.respondWith(networkFirstStrategy(request))
  } else if (isPageRequest(request)) {
    event.respondWith(staleWhileRevalidateStrategy(request))
  } else {
    event.respondWith(networkFirstStrategy(request))
  }
})

// ==================== CACHE STRATEGIES ====================

// ⚡ Cache First - Para assets estáticos
async function cacheFirstStrategy(request) {
  try {
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      return cachedResponse
    }
    
    const networkResponse = await fetch(request)
    const cache = await caches.open(STATIC_CACHE)
    cache.put(request, networkResponse.clone())
    
    return networkResponse
  } catch (error) {
    console.error('Cache first strategy failed:', error)
    return new Response('Asset not available offline', { status: 503 })
  }
}

// ⚡ Network First - Para content dinámico
async function networkFirstStrategy(request) {
  try {
    const networkResponse = await fetch(request, {
      timeout: 5000 // 5 second timeout
    })
    
    // Cache successful responses
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE)
      cache.put(request, networkResponse.clone())
    }
    
    return networkResponse
  } catch (error) {
    // Fallback to cache
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      return cachedResponse
    }
    
    // Ultimate fallback for navigation requests
    if (request.destination === 'document') {
      return caches.match('/offline.html')
    }
    
    return new Response('Content not available offline', { status: 503 })
  }
}

// ⚡ Stale While Revalidate - Para páginas
async function staleWhileRevalidateStrategy(request) {
  const cache = await caches.open(CACHE_NAME)
  const cachedResponse = await cache.match(request)
  
  const fetchPromise = fetch(request).then(networkResponse => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone())
    }
    return networkResponse
  }).catch(() => cachedResponse)
  
  return cachedResponse || fetchPromise
}

// ⚡ Image Strategy - Optimizado para imágenes
async function imageStrategy(request) {
  try {
    const cache = await caches.open(IMAGE_CACHE)
    const cachedResponse = await cache.match(request)
    
    if (cachedResponse) {
      // Return cached pero update en background
      fetch(request).then(networkResponse => {
        if (networkResponse.ok) {
          cache.put(request, networkResponse.clone())
        }
      }).catch(() => {})
      
      return cachedResponse
    }
    
    // Network request for new images
    const networkResponse = await fetch(request)
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone())
    }
    
    return networkResponse
  } catch (error) {
    // Fallback image placeholder
    return new Response(
      createPlaceholderSVG(),
      { 
        headers: { 'Content-Type': 'image/svg+xml' }
      }
    )
  }
}

// ==================== UTILITY FUNCTIONS ====================

function isImageRequest(request) {
  return IMAGE_EXTENSIONS.some(ext => request.url.includes(ext))
}

function isStaticAsset(request) {
  return request.url.includes('/_next/static/') || 
         request.url.includes('/icons/') ||
         request.url.includes('/favicon')
}

function isAPIRequest(request) {
  return request.url.includes('/api/')
}

function isPageRequest(request) {
  return request.destination === 'document'
}

async function cleanupOldCaches() {
  const cacheNames = await caches.keys()
  const validCaches = [CACHE_NAME, STATIC_CACHE, DYNAMIC_CACHE, IMAGE_CACHE]
  
  return Promise.all(
    cacheNames
      .filter(cacheName => !validCaches.includes(cacheName))
      .map(cacheName => caches.delete(cacheName))
  )
}

function createPlaceholderSVG() {
  return `
    <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#0d0d0d"/>
      <rect x="20%" y="40%" width="60%" height="20%" fill="#39ff14" opacity="0.3"/>
      <text x="50%" y="50%" text-anchor="middle" fill="#39ff14" font-family="monospace" font-size="14">
        📷 IMAGE CACHED OFFLINE
      </text>
    </svg>
  `
}

// ==================== BACKGROUND SYNC ====================
self.addEventListener('sync', (event) => {
  if (event.tag === 'performance-metrics') {
    event.waitUntil(syncPerformanceMetrics())
  }
})

async function syncPerformanceMetrics() {
  try {
    // Send cached performance metrics when online
    const metrics = await getStoredMetrics()
    if (metrics) {
      await sendMetricsToAnalytics(metrics)
    }
  } catch (error) {
    console.error('Background sync failed:', error)
  }
}

// ==================== PUSH NOTIFICATIONS ====================
self.addEventListener('push', (event) => {
  if (!event.data) return
  
  const data = event.data.json()
  const options = {
    body: data.body,
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    vibrate: [200, 100, 200],
    data: {
      url: data.url || '/'
    },
    actions: [
      {
        action: 'open',
        title: 'Ver Portfolio',
        icon: '/icons/action-open.png'
      },
      {
        action: 'close',
        title: 'Cerrar',
        icon: '/icons/action-close.png'
      }
    ]
  }
  
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  )
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  
  if (event.action === 'open' || !event.action) {
    event.waitUntil(
      clients.openWindow(event.notification.data.url || '/')
    )
  }
})

// ==================== PERFORMANCE MONITORING ====================
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'PERFORMANCE_METRICS') {
    storeMetrics(event.data.metrics)
  }
})

function storeMetrics(metrics) {
  // Store metrics in IndexedDB for offline sync
  // Implementation would go here
}

function getStoredMetrics() {
  // Retrieve stored metrics from IndexedDB
  // Implementation would go here
}

function sendMetricsToAnalytics(metrics) {
  // Send to analytics service when online
  // Implementation would go here
}

console.log('🚀 Service Worker loaded successfully - Facundo Luna Portfolio PWA')
