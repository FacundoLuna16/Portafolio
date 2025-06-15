"use client"

import { useState, useEffect, useRef, useCallback, useMemo } from 'react'

// Simple intersection observer hook
interface UseIntersectionOptions {
  threshold?: number | number[]
  rootMargin?: string
  triggerOnce?: boolean
  enabled?: boolean
}

export const useIntersection = (options: UseIntersectionOptions = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '50px',
    triggerOnce = true,
    enabled = true
  } = options

  const [isIntersecting, setIsIntersecting] = useState(false)
  const [hasIntersected, setHasIntersected] = useState(false)
  const elementRef = useRef<Element>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element || !enabled) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        const isIntersecting = entry.isIntersecting

        setIsIntersecting(isIntersecting)

        if (isIntersecting && triggerOnce && !hasIntersected) {
          setHasIntersected(true)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [threshold, rootMargin, triggerOnce, hasIntersected, enabled])

  return {
    elementRef,
    isIntersecting: hasIntersected || isIntersecting,
    hasIntersected
  }
}

// Simple lazy section hook
export const useLazySection = (options: UseIntersectionOptions = {}) => {
  const { elementRef, isIntersecting } = useIntersection(options)
  const [hasLoaded, setHasLoaded] = useState(false)

  useEffect(() => {
    if (isIntersecting && !hasLoaded) {
      setHasLoaded(true)
    }
  }, [isIntersecting, hasLoaded])

  return {
    ref: elementRef,
    isVisible: isIntersecting,
    shouldLoad: hasLoaded || isIntersecting
  }
}

// Simple viewport hook
export const useViewport = () => {
  const [viewport, setViewport] = useState({
    width: 0,
    height: 0,
    isMobile: false,
    isTablet: false,
    isDesktop: false
  })

  useEffect(() => {
    const updateViewport = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      
      setViewport({
        width,
        height,
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024
      })
    }

    updateViewport()

    const debouncedResize = () => {
      setTimeout(updateViewport, 150)
    }

    window.addEventListener('resize', debouncedResize, { passive: true })
    return () => {
      window.removeEventListener('resize', debouncedResize)
    }
  }, [])

  return viewport
}

// Placeholder hooks for compatibility
export const usePerformanceMonitoring = () => ({
  metrics: {},
  isSupported: false,
  grade: 'pending',
  exportMetrics: () => null,
  mounted: true
})

export const useIntelligentPreload = () => ({
  preloadResource: () => {},
  preloadImage: () => {},
  isSlowConnection: false,
  loadedResources: [],
  mounted: true
})

export const useStaggeredAnimation = (itemCount: number, delay = 100) => {
  const [visibleItems, setVisibleItems] = useState(new Set<number>())
  const { elementRef, isIntersecting } = useIntersection()

  useEffect(() => {
    if (isIntersecting) {
      for (let i = 0; i < itemCount; i++) {
        setTimeout(() => {
          setVisibleItems(prev => new Set(prev.add(i)))
        }, i * delay)
      }
    }
  }, [isIntersecting, itemCount, delay])

  return {
    ref: elementRef,
    isItemVisible: (index: number) => visibleItems.has(index)
  }
}
