"use client"

import { useEffect, useState, useCallback, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { useViewport, usePerformanceMonitoring } from './use-performance'

// ⚡ ANALYTICS SYSTEM ULTRA-AVANZADO
interface AnalyticsEvent {
  event: string
  category: string
  action: string
  label?: string
  value?: number
  custom_parameters?: Record<string, any>
  timestamp: number
  session_id: string
  user_agent: string
  viewport: { width: number; height: number }
  page_url: string
  referrer: string
  performance_metrics?: any
}

interface UserSession {
  session_id: string
  start_time: number
  page_views: number
  total_time: number
  events: AnalyticsEvent[]
  user_type: 'new' | 'returning'
  device_type: 'mobile' | 'tablet' | 'desktop'
  connection_type?: string
}

class AnalyticsManager {
  public session: UserSession
  private queue: AnalyticsEvent[] = []
  private isOnline = true
  private flushInterval: NodeJS.Timeout | null = null

  constructor() {
    this.session = this.initializeSession()
    this.setupOnlineListener()
    this.startPeriodicFlush()
  }

  private initializeSession(): UserSession {
    const sessionId = this.generateSessionId()
    
    // Verificar si estamos en el cliente antes de usar localStorage
    let isReturning = false
    if (typeof window !== 'undefined' && window.localStorage) {
      isReturning = !!localStorage.getItem('portfolio_visited')
      
      if (!isReturning) {
        localStorage.setItem('portfolio_visited', 'true')
      }
    }

    return {
      session_id: sessionId,
      start_time: Date.now(),
      page_views: 0,
      total_time: 0,
      events: [],
      user_type: isReturning ? 'returning' : 'new',
      device_type: this.getDeviceType(),
      connection_type: this.getConnectionType()
    }
  }

  private generateSessionId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }

  private getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
    if (typeof window === 'undefined') return 'desktop'
    
    const width = window.innerWidth
    if (width < 768) return 'mobile'
    if (width < 1024) return 'tablet'
    return 'desktop'
  }

  private getConnectionType(): string {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') return 'unknown'
    
    if ('connection' in navigator) {
      return (navigator as any).connection?.effectiveType || 'unknown'
    }
    return 'unknown'
  }

  private setupOnlineListener() {
    if (typeof window === 'undefined') return
    
    window.addEventListener('online', () => {
      this.isOnline = true
      this.flushQueue()
    })
    
    window.addEventListener('offline', () => {
      this.isOnline = false
    })
  }

  private startPeriodicFlush() {
    this.flushInterval = setInterval(() => {
      if (this.isOnline && this.queue.length > 0) {
        this.flushQueue()
      }
    }, 30000) // Flush every 30 seconds
  }

  // ⚡ TRACK EVENTS
  track(
    event: string,
    category: string,
    action: string,
    label?: string,
    value?: number,
    customParams?: Record<string, any>
  ) {
    // Solo trackear si estamos en el cliente
    if (typeof window === 'undefined') return
    
    const analyticsEvent: AnalyticsEvent = {
      event,
      category,
      action,
      label,
      value,
      custom_parameters: customParams,
      timestamp: Date.now(),
      session_id: this.session.session_id,
      user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      },
      page_url: window.location.href,
      referrer: typeof document !== 'undefined' ? document.referrer : ''
    }

    this.queue.push(analyticsEvent)
    this.session.events.push(analyticsEvent)

    // Flush immediately for important events
    if (this.isImportantEvent(event)) {
      this.flushQueue()
    }
  }

  // ⚡ TRACK PAGE VIEW
  trackPageView(path: string) {
    this.session.page_views++
    
    this.track(
      'page_view',
      'navigation',
      'page_visit',
      path,
      undefined,
      {
        page_path: path,
        user_type: this.session.user_type,
        device_type: this.session.device_type,
        session_page_views: this.session.page_views
      }
    )
  }

  // ⚡ TRACK PERFORMANCE METRICS
  trackPerformance(metrics: any) {
    this.track(
      'performance_metrics',
      'technical',
      'core_web_vitals',
      undefined,
      undefined,
      {
        lcp: metrics.lcp,
        fid: metrics.fid,
        cls: metrics.cls,
        fcp: metrics.fcp,
        ttfb: metrics.ttfb,
        device_type: this.session.device_type,
        connection_type: this.session.connection_type
      }
    )
  }

  // ⚡ TRACK USER ENGAGEMENT
  trackEngagement(action: string, element?: string, duration?: number) {
    this.track(
      'user_engagement',
      'interaction',
      action,
      element,
      duration,
      {
        engagement_type: action,
        element_type: element,
        session_duration: Date.now() - this.session.start_time
      }
    )
  }

  // ⚡ TRACK ERRORS
  trackError(error: string, category: 'javascript' | 'network' | 'other' = 'other') {
    this.track(
      'error',
      'technical',
      category,
      error,
      undefined,
      {
        error_message: error,
        user_agent: navigator.userAgent,
        url: window.location.href
      }
    )
  }

  // ⚡ TRACK CUSTOM EVENTS
  trackProjectView(projectId: string) {
    this.track(
      'project_view',
      'portfolio',
      'project_detail',
      projectId,
      undefined,
      {
        project_id: projectId,
        referrer_section: document.referrer.includes('projects') ? 'projects_list' : 'direct'
      }
    )
  }

  trackCVDownload() {
    this.track(
      'cv_download',
      'conversion',
      'download',
      'curriculum_vitae',
      1,
      {
        file_type: 'pdf',
        download_source: 'portfolio'
      }
    )
  }

  trackContactInteraction(method: 'email' | 'linkedin' | 'github') {
    this.track(
      'contact_interaction',
      'conversion',
      'contact_attempt',
      method,
      1,
      {
        contact_method: method,
        session_duration: Date.now() - this.session.start_time
      }
    )
  }

  // ⚡ PRIVATE METHODS
  private isImportantEvent(event: string): boolean {
    const importantEvents = [
      'cv_download',
      'contact_interaction',
      'error',
      'project_view'
    ]
    return importantEvents.includes(event)
  }

  private async flushQueue() {
    if (this.queue.length === 0 || !this.isOnline) return

    const events = [...this.queue]
    this.queue = []

    try {
      // En producción, aquí enviarías a tu servicio de analytics
      if (process.env.NODE_ENV === 'development') {
        console.group('📊 Analytics Events')
        events.forEach(event => {
          // Event logged in development mode
        })
        console.groupEnd()
      }

      // Store in localStorage as backup
      this.storeEventsLocally(events)

      // If you have Google Analytics, send there too
      this.sendToGoogleAnalytics(events)

    } catch (error) {
      // Analytics flush failed - silent in production
      // Re-queue events for retry
      this.queue.unshift(...events)
    }
  }

  private storeEventsLocally(events: AnalyticsEvent[]) {
    if (typeof window === 'undefined' || !window.localStorage) return
    
    try {
      const stored = localStorage.getItem('analytics_events') || '[]'
      const existing = JSON.parse(stored)
      const updated = [...existing, ...events].slice(-100) // Keep last 100 events
      localStorage.setItem('analytics_events', JSON.stringify(updated))
    } catch (error) {
      // Failed to store analytics locally - silent in production
    }
  }

  private sendToGoogleAnalytics(events: AnalyticsEvent[]) {
    if (typeof window !== 'undefined' && 'gtag' in window && typeof (window as any).gtag === 'function') {
      events.forEach(event => {
        (window as any).gtag('event', event.action, {
          event_category: event.category,
          event_label: event.label,
          value: event.value,
          custom_map: event.custom_parameters
        })
      })
    }
  }

  // ⚡ CLEANUP
  destroy() {
    if (this.flushInterval) {
      clearInterval(this.flushInterval)
    }
    this.flushQueue() // Final flush
  }
}

// ⚡ ANALYTICS HOOK
export function useAnalytics() {
  const [analytics] = useState(() => new AnalyticsManager())
  const pathname = usePathname()
  const { metrics } = usePerformanceMonitoring()
  const viewport = useViewport()
  const lastPath = useRef<string>('')

  // Track page views
  useEffect(() => {
    if (pathname && pathname !== lastPath.current) {
      analytics.trackPageView(pathname)
      lastPath.current = pathname
    }
  }, [pathname, analytics])

  // Track performance metrics
  useEffect(() => {
    if (metrics && typeof metrics === 'object' && 'lcp' in metrics && 'fid' in metrics && 'cls' in metrics) {
      const { lcp, fid, cls } = metrics as any
      if (lcp && fid && cls !== undefined) {
        analytics.trackPerformance(metrics)
      }
    }
  }, [metrics, analytics])

  // Track scroll depth
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    let maxScroll = 0
    let scrollTimeout: NodeJS.Timeout

    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      )
      
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent
        
        clearTimeout(scrollTimeout)
        scrollTimeout = setTimeout(() => {
          if (maxScroll >= 25 && maxScroll < 50) {
            analytics.trackEngagement('scroll_25_percent')
          } else if (maxScroll >= 50 && maxScroll < 75) {
            analytics.trackEngagement('scroll_50_percent')
          } else if (maxScroll >= 75 && maxScroll < 90) {
            analytics.trackEngagement('scroll_75_percent')
          } else if (maxScroll >= 90) {
            analytics.trackEngagement('scroll_complete')
          }
        }, 1000)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(scrollTimeout)
    }
  }, [analytics])

  // Track time on page
  useEffect(() => {
    const startTime = Date.now()
    
    return () => {
      const timeOnPage = Date.now() - startTime
      if (timeOnPage > 10000) { // Only track if > 10 seconds
        analytics.trackEngagement('time_on_page', pathname, timeOnPage)
      }
    }
  }, [pathname, analytics])

  // Cleanup on unmount
  useEffect(() => {
    return () => analytics.destroy()
  }, [analytics])

  return {
    // Core tracking
    track: analytics.track.bind(analytics),
    trackPageView: analytics.trackPageView.bind(analytics),
    trackPerformance: analytics.trackPerformance.bind(analytics),
    trackEngagement: analytics.trackEngagement.bind(analytics),
    trackError: analytics.trackError.bind(analytics),
    
    // Specific portfolio tracking
    trackProjectView: analytics.trackProjectView.bind(analytics),
    trackCVDownload: analytics.trackCVDownload.bind(analytics),
    trackContactInteraction: analytics.trackContactInteraction.bind(analytics),
    
    // Session info
    sessionInfo: {
      device_type: analytics.session.device_type,
      user_type: analytics.session.user_type,
      page_views: analytics.session.page_views
    }
  }
}

// ⚡ ERROR BOUNDARY ANALYTICS
export function trackErrorBoundary(error: Error, errorInfo: any) {
  const analytics = new AnalyticsManager()
  analytics.trackError(
    `${error.name}: ${error.message}`,
    'javascript'
  )
}

// ⚡ GLOBAL ERROR HANDLER
if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
    const analytics = new AnalyticsManager()
    analytics.trackError(
      `${event.error?.name}: ${event.error?.message}`,
      'javascript'
    )
  })

  window.addEventListener('unhandledrejection', (event) => {
    const analytics = new AnalyticsManager()
    analytics.trackError(
      `Unhandled Promise Rejection: ${event.reason}`,
      'javascript'
    )
  })
}
