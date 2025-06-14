"use client"

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ProjectImage {
  src: string
  alt: string
  title: string
}

interface ProjectGalleryProps {
  images: ProjectImage[]
  projectTitle: string
}

export function ProjectGallery({ images, projectTitle }: ProjectGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)

  const openModal = (index: number) => {
    setSelectedImageIndex(index)
  }

  const closeModal = () => {
    setSelectedImageIndex(null)
  }

  const nextImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % images.length)
    }
  }

  const prevImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(selectedImageIndex === 0 ? images.length - 1 : selectedImageIndex - 1)
    }
  }

  return (
    <section className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-mono font-bold text-terminal-green">
          <span className="text-terminal-cyan">$</span> ls -la capturas/
        </h2>
        <p className="text-lg text-terminal-green/80 font-mono">
          Interfaces y funcionalidades del sistema
        </p>
      </div>

      {/* Grid de imágenes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image, index) => (
          <div
            key={index}
            className="group cursor-pointer border border-terminal-green/30 rounded-lg overflow-hidden hover:border-terminal-cyan transition-all duration-300"
            onClick={() => openModal(index)}
          >
            <div className="aspect-video relative overflow-hidden">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
            </div>
            <div className="p-4 bg-terminal-black border-t border-terminal-green/20">
              <h3 className="font-mono text-terminal-green font-medium">
                {image.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Modal para imagen ampliada */}
      {selectedImageIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="relative max-w-5xl max-h-full">
            {/* Controles */}
            <div className="absolute top-4 right-4 z-10">
              <Button
                variant="outline"
                size="sm"
                onClick={closeModal}
                className="border-terminal-green text-terminal-green hover:bg-terminal-green hover:text-terminal-black"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Navegación */}
            {images.length > 1 && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 border-terminal-green text-terminal-green hover:bg-terminal-green hover:text-terminal-black"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 border-terminal-green text-terminal-green hover:bg-terminal-green hover:text-terminal-black"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            )}

            {/* Imagen */}
            <div className="relative">
              <Image
                src={images[selectedImageIndex].src}
                alt={images[selectedImageIndex].alt}
                width={1200}
                height={800}
                className="max-h-[80vh] w-auto rounded border border-terminal-green"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <h3 className="text-terminal-green font-mono font-medium">
                  {images[selectedImageIndex].title}
                </h3>
                <p className="text-terminal-green/60 font-mono text-sm">
                  {selectedImageIndex + 1} / {images.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}