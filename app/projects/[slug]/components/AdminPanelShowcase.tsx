"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Shield, Calendar, Clock, Users, ChevronLeft, ChevronRight, Expand } from 'lucide-react'
import { ImageModal } from '@/app/components/image-modal'
import { useBarberiaTranslations } from '@/app/hooks/use-barberia-translations'

interface AdminFeature {
  title: string
  description: string
  image: string
  capabilities: string[]
}

interface AdminPanelShowcaseProps {
  adminPanel: {
    description: string
    features: AdminFeature[]
  }
}

const featureIcons = {
  agenda: Calendar,
  weeklySchedules: Clock,
  appointments: Users
}

export function AdminPanelShowcase({ adminPanel }: AdminPanelShowcaseProps) {
  const { t, tGlobal } = useBarberiaTranslations()
  const [activeFeature, setActiveFeature] = useState(0)
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)

  const currentFeature = adminPanel.features[activeFeature]

  const nextFeature = () => {
    setActiveFeature((prev) => (prev + 1) % adminPanel.features.length)
  }

  const prevFeature = () => {
    setActiveFeature((prev) => (prev - 1 + adminPanel.features.length) % adminPanel.features.length)
  }

  return (
    <section className="py-12 px-4 bg-terminal-black/30 border-y border-terminal-green/20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-terminal-green mb-4 font-mono">
            <Shield className="inline w-8 h-8 mr-3 text-terminal-cyan" />
            <span className="text-terminal-cyan">$</span> {t('adminPanel.title')}
          </h2>
          <p className="text-terminal-green/80 text-lg max-w-3xl mx-auto leading-relaxed">
            {adminPanel.description}
          </p>
        </div>

        {/* Feature Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {adminPanel.features.map((feature, index) => {
            const IconComponent = Object.values(featureIcons)[index]
            return (
              <button
                key={index}
                onClick={() => setActiveFeature(index)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-200 font-mono text-sm ${
                  index === activeFeature
                    ? 'bg-terminal-green text-terminal-black border-2 border-terminal-green shadow-lg shadow-terminal-green/20'
                    : 'bg-terminal-gray text-terminal-green border-2 border-terminal-green/30 hover:border-terminal-green/60 hover:bg-terminal-green/10'
                }`}
              >
                <IconComponent className="w-5 h-5" />
                <span className="hidden sm:inline">{feature.title}</span>
                <span className="sm:hidden">{index + 1}</span>
              </button>
            )
          })}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Content Section */}
          <div className="space-y-6 lg:order-2">
            <div>
              <h3 className="text-2xl font-bold text-terminal-green mb-3 font-mono">
                <span className="text-terminal-cyan">#{activeFeature + 1}</span> {currentFeature.title}
              </h3>
              <p className="text-terminal-green/80 text-lg leading-relaxed">
                {currentFeature.description}
              </p>
            </div>

            {/* Capabilities */}
            <div className="space-y-3">
              <h4 className="text-lg font-bold text-terminal-cyan font-mono">
                {t('adminPanel.capabilities.title')}:
              </h4>
              <div className="grid gap-3">
                {currentFeature.capabilities.map((capability, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-terminal-black/50 border border-terminal-green/20 rounded-lg">
                    <div className="w-6 h-6 rounded-full bg-terminal-cyan/20 border border-terminal-cyan/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-terminal-cyan">{index + 1}</span>
                    </div>
                    <span className="text-terminal-green/90">{capability}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between pt-4">
              <Button
                onClick={prevFeature}
                variant="outline"
                size="sm"
                className="font-mono text-sm border-terminal-green text-terminal-green hover:bg-terminal-green hover:text-terminal-black transition-all duration-200"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                {t('adminPanel.navigation.prev')}
              </Button>

              <Button
                onClick={nextFeature}
                variant="outline"
                size="sm"
                className="font-mono text-sm border-terminal-green text-terminal-green hover:bg-terminal-green hover:text-terminal-black transition-all duration-200"
              >
                {t('adminPanel.navigation.next')}
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>

          {/* Image Section */}
          <div className="relative lg:order-1">
            <div className="relative bg-terminal-black border-2 border-terminal-green rounded-lg overflow-hidden group">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-terminal-green/10 border-b border-terminal-green/30">
                <div className="flex gap-1">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="flex-1 text-center">
                  <span className="font-mono text-sm text-terminal-green">
                    <Shield className="inline w-4 h-4 mr-1" />
                    Admin Panel - {currentFeature.title}
                  </span>
                </div>
                <button
                  onClick={() => setIsImageModalOpen(true)}
                  className="text-terminal-green/60 hover:text-terminal-green transition-colors duration-200 p-1 rounded hover:bg-terminal-green/10"
                >
                  <Expand className="w-4 h-4" />
                </button>
              </div>

              {/* Image */}
              <div 
                className="relative aspect-[16/10] cursor-pointer group/image"
                onClick={() => setIsImageModalOpen(true)}
              >
                <Image
                  src={currentFeature.image}
                  alt={currentFeature.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover/image:scale-105"
                  priority
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-terminal-green/10 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-terminal-black/90 border border-terminal-green/50 rounded px-4 py-2 backdrop-blur-sm">
                    <div className="flex items-center gap-2 font-mono text-sm text-terminal-green">
                      <Expand className="w-4 h-4" />
                      {tGlobal('projects.card.viewFullSize')}
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature Counter */}
              <div className="absolute bottom-4 right-4 bg-terminal-black/90 border border-terminal-green/50 rounded px-3 py-1 backdrop-blur-sm">
                <span className="font-mono text-xs text-terminal-green">
                  {activeFeature + 1} / {adminPanel.features.length}
                </span>
              </div>
            </div>

            {/* Technical Status */}
            <div className="mt-4 bg-terminal-black/50 border border-terminal-green/30 rounded-lg p-4">
              <div className="font-mono text-sm space-y-2">
                <div className="text-terminal-cyan flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span className="text-terminal-green">$</span> {t('adminPanel.technical.status')}
                </div>
                <div className="pl-6 space-y-1 text-terminal-green/80">
                  <div>🔐 {t('adminPanel.technical.auth')}</div>
                  <div>🔄 {t('adminPanel.technical.realTime')}</div>
                  <div>📊 {t('adminPanel.technical.analytics')}</div>
                  <div>🛡️ {t('adminPanel.technical.security')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Image Modal */}
        <ImageModal
          isOpen={isImageModalOpen}
          onClose={() => setIsImageModalOpen(false)}
          imageSrc={currentFeature.image}
          imageAlt={currentFeature.title}
          projectTitle={`FADE ROOM Admin - ${currentFeature.title}`}
        />
      </div>
    </section>
  )
}