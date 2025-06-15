"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useStaggeredAnimation, useIntelligentPreload } from '@/app/hooks/use-performance'

interface ProjectImage {
  src: string
  alt: string
  title: string
  caption?: string
}

interface ProjectGalleryProps {
  images: ProjectImage[]
  projectTitle: string
}

export function ProjectGallery({ images, projectTitle }: ProjectGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)
  
  // ⚡ Animaciones staggered para las imágenes
  const { ref: galleryRef, isItemVisible } = useStaggeredAnimation(images.length, 150)
  
  // ⚡ Preload inteligente de imágenes
  const { preloadImage } = useIntelligentPreload()

  useEffect(() => {
    setMounted(true)
    
    // ⚡ Precargar las primeras 3 imágenes de alta prioridad
    images.slice(0, 3).forEach(image => {
      preloadImage()
    })
  }, [images, preloadImage])

  // ⚡ Precargar imagen siguiente cuando se abre el modal
  useEffect(() => {
    if (selectedImageIndex !== null && selectedImageIndex < images.length - 1) {
      preloadImage()
    }
  }, [selectedImageIndex, images, preloadImage])

  const openModal = (index: number) => {
    setSelectedImageIndex(index)
    // ⚡ Precargar imagen anterior y siguiente
    if (index > 0) preloadImage()
    if (index < images.length - 1) preloadImage()
  }

  const closeModal = () => {
    setSelectedImageIndex(null)
  }

  const nextImage = () => {
    if (selectedImageIndex !== null) {
      const nextIndex = (selectedImageIndex + 1) % images.length
      setSelectedImageIndex(nextIndex)
      // ⚡ Precargar siguiente imagen
      const nextNextIndex = (nextIndex + 1) % images.length
      preloadImage()
    }
  }

  const prevImage = () => {
    if (selectedImageIndex !== null) {
      const prevIndex = selectedImageIndex === 0 ? images.length - 1 : selectedImageIndex - 1
      setSelectedImageIndex(prevIndex)
      // ⚡ Precargar imagen anterior
      const prevPrevIndex = prevIndex === 0 ? images.length - 1 : prevIndex - 1
      preloadImage()
    }
  }

  // ⚡ Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (selectedImageIndex === null) return
      
      switch (event.key) {
        case 'ArrowLeft':
          prevImage()
          break
        case 'ArrowRight':
          nextImage()
          break
        case 'Escape':
          closeModal()
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedImageIndex])

  if (!mounted) {
    return (
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <div className="h-8 bg-terminal-green/20 rounded w-64 mx-auto animate-pulse"></div>
          <div className="h-6 bg-terminal-green/10 rounded w-96 mx-auto animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="aspect-video bg-terminal-green/10 rounded animate-pulse"></div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className="space-y-8" ref={galleryRef as any}>
      {/* ⚡ Header con animación */}
      <div className="text-center space-y-4 animate-in fade-in slide-in-from-bottom duration-700">
        <h2 className="text-3xl font-mono font-bold text-terminal-green">
          <span className="text-terminal-cyan">$</span> ls -la screenshots/
        </h2>
        <p className="text-lg text-terminal-green/80 font-mono">
          📸 Capturas del sistema en funcionamiento
        </p>
        <div className="font-mono text-sm text-terminal-green/60">
          {images.length} archivos encontrados • Click para ampliar
        </div>
      </div>

      {/* ⚡ Grid de imágenes con animaciones staggered */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image, index) => (
          <div
            key={`${image.src}-${index}`}
            className={`group cursor-pointer border border-terminal-green/30 rounded-lg overflow-hidden hover:border-terminal-cyan hover:shadow-lg hover:shadow-terminal-green/20 transition-all duration-500 ${
              isItemVisible(index) 
                ? 'animate-in fade-in slide-in-from-bottom duration-700' 
                : 'opacity-0 translate-y-4'
            }`}
            style={{ 
              animationDelay: `${index * 150}ms`,
              animationFillMode: 'both'
            }}
            onClick={() => openModal(index)}
          >
            {/* ⚡ Terminal header */}
            <div className="bg-terminal-green/5 border-b border-terminal-green/20 px-3 py-2 flex items-center gap-2">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
              </div>
              <span className="font-mono text-xs text-terminal-green/70 truncate flex-1">
                ~/screenshots/{image.title.toLowerCase().replace(/\s+/g, '_')}.png
              </span>
              <ZoomIn className="w-3 h-3 text-terminal-green/50 group-hover:text-terminal-cyan transition-colors" />
            </div>

            {/* ⚡ Image container */}
            <div className="aspect-video relative overflow-hidden bg-terminal-black">
              <Image
                src={image.src}
                alt={image.alt}
                width={400}
                height={225}
                priority={index < 3} // ⚡ Primeras 3 con prioridad para LCP
                className="group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              
              {/* ⚡ Overlay effects */}
              <div className="absolute inset-0 bg-gradient-to-t from-terminal-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* ⚡ Hover indicator */}
              <div className="absolute top-2 right-2 bg-terminal-cyan/20 text-terminal-cyan px-2 py-1 rounded text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Click to expand
              </div>
            </div>

            {/* ⚡ Image info */}
            <div className="p-4 bg-terminal-black/50 border-t border-terminal-green/20">
              <h3 className="font-mono text-terminal-green font-medium mb-1">
                {image.title}
              </h3>
              {image.caption && (
                <p className="font-mono text-xs text-terminal-green/60 line-clamp-2">
                  {image.caption}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ⚡ Modal ultra-optimizado */}
      {selectedImageIndex !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={closeModal}
        >
          <div className="relative max-w-6xl max-h-full" onClick={(e) => e.stopPropagation()}>
            
            {/* ⚡ Terminal-style controls */}
            <div className="absolute -top-12 left-0 right-0 flex justify-between items-center">
              <div className="font-mono text-terminal-green text-sm">
                <span className="text-terminal-cyan">$</span> viewing {images[selectedImageIndex].title}
                <span className="ml-4 text-terminal-green/60">
                  [{selectedImageIndex + 1}/{images.length}]
                </span>
              </div>
              <div className="flex gap-2">
                {images.length > 1 && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={prevImage}
                      className="border-terminal-green text-terminal-green hover:bg-terminal-green hover:text-terminal-black font-mono"
                    >
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      PREV
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={nextImage}
                      className="border-terminal-green text-terminal-green hover:bg-terminal-green hover:text-terminal-black font-mono"
                    >
                      NEXT
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={closeModal}
                  className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white font-mono"
                >
                  <X className="h-4 w-4 mr-1" />
                  ESC
                </Button>
              </div>
            </div>

            {/* ⚡ Main image */}
            <div className="relative border border-terminal-green/50 rounded-lg overflow-hidden">
              <Image
                src={images[selectedImageIndex].src}
                alt={images[selectedImageIndex].alt}
                width={1400}
                height={900}
                priority={true}
                quality={95}
                className="max-h-[85vh] w-auto"
              />
              
              {/* ⚡ Image caption overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-terminal-black/90 via-terminal-black/60 to-transparent p-6">
                <h3 className="text-terminal-green font-mono font-bold text-lg mb-2">
                  {images[selectedImageIndex].title}
                </h3>
                {images[selectedImageIndex].caption && (
                  <p className="text-terminal-green/80 font-mono text-sm">
                    {images[selectedImageIndex].caption}
                  </p>
                )}
                
                {/* ⚡ Keyboard shortcuts hint */}
                <div className="mt-3 flex gap-4 text-xs text-terminal-green/50 font-mono">
                  <span>← → Navigate</span>
                  <span>ESC Close</span>
                  <span>Click outside to close</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}