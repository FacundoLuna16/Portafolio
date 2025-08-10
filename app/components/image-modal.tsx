"use client"

import React from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useTranslation } from "../hooks/use-translation"

interface ImageModalProps {
  isOpen: boolean
  onClose: () => void
  imageSrc: string
  imageAlt: string
  projectTitle: string
}

export function ImageModal({ isOpen, onClose, imageSrc, imageAlt, projectTitle }: ImageModalProps) {
  const { t } = useTranslation()

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-[95vw] max-h-[95vh] overflow-hidden p-0 bg-terminal-black border-2 border-terminal-green">
        {/* Header with terminal styling */}
        <DialogHeader className="px-6 py-4 border-b border-terminal-green/30 bg-terminal-green/5">
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <DialogTitle className="font-mono text-terminal-green flex-1 text-left">
              <span className="text-terminal-cyan">$</span> preview {projectTitle}
            </DialogTitle>
          </div>
        </DialogHeader>

        {/* Image content */}
        <div className="relative w-full h-auto max-h-[calc(95vh-120px)] overflow-hidden bg-terminal-black">
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={1200}
              height={800}
              className="max-w-full max-h-full w-auto h-auto object-contain rounded border border-terminal-green/20"
              priority
              quality={95}
            />
          </div>
          
          {/* Terminal command at bottom */}
          <div className="absolute bottom-2 left-4 right-4">
            <div className="bg-terminal-black/90 border border-terminal-green/30 rounded px-3 py-2 backdrop-blur-sm">
              <div className="font-mono text-xs text-terminal-green/70">
                <span className="text-terminal-cyan">$</span> {t('projects.modal.viewing')} {projectTitle}
                <span className="ml-4 text-terminal-green/50">
                  [{t('projects.modal.pressEscape')}]
                </span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}