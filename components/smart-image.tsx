"use client"

import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'

interface UseIntersectionOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

// Hook de Intersection Observer optimizado (simplificado del artifact)
const useIntersection = (options: UseIntersectionOptions = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '50px',
    triggerOnce = true
  } = options

  const [isVisible, setIsVisible] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (triggerOnce) {
            setHasTriggered(true)
          }
        } else if (!triggerOnce && !hasTriggered) {
          setIsVisible(false)
        }
      },
      {
        threshold,
        rootMargin,
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [threshold, rootMargin, triggerOnce, hasTriggered])

  return { 
    ref, 
    isVisible: hasTriggered || isVisible 
  }
}

interface SmartImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  priority?: boolean
  className?: string
  quality?: number
  sizes?: string
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
}

// Generar placeholder blur automático
const generateBlurDataURL = (w: number, h: number) => 
  `data:image/svg+xml;base64,${Buffer.from(
    `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
       <rect width="100%" height="100%" fill="#0d0d0d"/>
       <rect x="20%" y="40%" width="60%" height="20%" fill="#39ff14" opacity="0.3"/>
     </svg>`
  ).toString('base64')}`

export function SmartImage({
  src,
  alt,
  width = 400,
  height = 300,
  priority = false,
  className = '',
  quality = 85,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  placeholder = 'blur',
  blurDataURL,
  ...props
}: SmartImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const { ref, isVisible } = useIntersection({ threshold: 0.1, rootMargin: '200px' })

  // Auto-generar blur placeholder si no se provee
  const autoBlurDataURL = blurDataURL || generateBlurDataURL(width, height)

  // Error fallback con temática terminal
  const ErrorFallback = () => (
    <div 
      className={`bg-terminal-black border border-terminal-green/30 rounded-lg flex items-center justify-center ${className}`}
      style={{ width, height }}
    >
      <div className="text-center text-terminal-green font-mono">
        <span className="text-2xl block mb-2">⚠️</span>
        <span className="text-sm">Image failed to load</span>
        <span className="text-xs block text-terminal-green/60 mt-1">{alt}</span>
      </div>
    </div>
  )

  if (hasError) {
    return <ErrorFallback />
  }

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* Skeleton durante carga */}
      {!isLoaded && (
        <div 
          className="absolute inset-0 bg-terminal-green/10 animate-pulse"
          style={{ width, height }}
        />
      )}

      {/* Imagen principal - solo cargar cuando es visible */}
      {(priority || isVisible) && (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          quality={quality}
          priority={priority}
          placeholder={placeholder}
          blurDataURL={autoBlurDataURL}
          sizes={sizes}
          className={`transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          {...props}
        />
      )}
    </div>
  )
}

// Hook para precargar imágenes críticas
export function useImagePreloader(images: string[]) {
  useEffect(() => {
    images.forEach(src => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = src
      document.head.appendChild(link)
    })
  }, [images])
}
