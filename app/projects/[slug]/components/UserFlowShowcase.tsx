"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, Expand, Check } from 'lucide-react'
import { ImageModal } from '@/app/components/image-modal'
import { useTranslation } from '@/app/hooks/use-translation'

interface UserFlowStep {
  id: number
  title: string
  description: string
  image: string
  features: string[]
}

interface UserFlowShowcaseProps {
  userFlow: {
    description: string
    steps: UserFlowStep[]
  }
}

export function UserFlowShowcase({ userFlow }: UserFlowShowcaseProps) {
  const { t } = useTranslation()
  const [currentStep, setCurrentStep] = useState(0)
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)

  const currentStepData = userFlow.steps[currentStep]

  const nextStep = () => {
    setCurrentStep((prev) => (prev + 1) % userFlow.steps.length)
  }

  const prevStep = () => {
    setCurrentStep((prev) => (prev - 1 + userFlow.steps.length) % userFlow.steps.length)
  }

  const goToStep = (stepIndex: number) => {
    setCurrentStep(stepIndex)
  }

  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-terminal-green mb-4 font-mono">
            <span className="text-terminal-cyan">$</span> {t('projects.barberia.userFlow.title')}
          </h2>
          <p className="text-terminal-green/80 text-lg max-w-3xl mx-auto leading-relaxed">
            {userFlow.description}
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8 overflow-x-auto pb-2">
          <div className="flex space-x-2 md:space-x-4 min-w-max px-4">
            {userFlow.steps.map((step, index) => (
              <button
                key={step.id}
                onClick={() => goToStep(index)}
                className={`flex items-center space-x-2 px-3 md:px-4 py-2 rounded-lg transition-all duration-200 font-mono text-sm ${
                  index === currentStep
                    ? 'bg-terminal-green text-terminal-black border-2 border-terminal-green'
                    : index < currentStep
                    ? 'bg-terminal-green/20 text-terminal-green border-2 border-terminal-green/40'
                    : 'bg-terminal-gray text-terminal-green/60 border-2 border-terminal-green/20 hover:border-terminal-green/40'
                }`}
              >
                <div className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                  index === currentStep
                    ? 'bg-terminal-black text-terminal-green'
                    : index < currentStep
                    ? 'bg-terminal-green text-terminal-black'
                    : 'bg-terminal-green/20 text-terminal-green/60'
                }`}>
                  {index < currentStep ? <Check className="w-3 h-3" /> : step.id}
                </div>
                <span className="hidden md:inline">{step.title}</span>
                <span className="md:hidden">{step.id}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Image Section */}
          <div className="relative">
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
                    {t('projects.barberia.userFlow.terminal.title')} - {currentStepData.title}
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
                  src={currentStepData.image}
                  alt={currentStepData.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover/image:scale-105"
                  priority
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-terminal-green/10 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-terminal-black/90 border border-terminal-green/50 rounded px-4 py-2 backdrop-blur-sm">
                    <div className="flex items-center gap-2 font-mono text-sm text-terminal-green">
                      <Expand className="w-4 h-4" />
                      {t('projects.card.viewFullSize')}
                    </div>
                  </div>
                </div>
              </div>

              {/* Step Counter */}
              <div className="absolute bottom-4 right-4 bg-terminal-black/90 border border-terminal-green/50 rounded px-3 py-1 backdrop-blur-sm">
                <span className="font-mono text-xs text-terminal-green">
                  {currentStep + 1} / {userFlow.steps.length}
                </span>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-4">
              <Button
                onClick={prevStep}
                variant="outline"
                size="sm"
                className="font-mono text-sm border-terminal-green text-terminal-green hover:bg-terminal-green hover:text-terminal-black transition-all duration-200"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                {t('projects.barberia.userFlow.navigation.prev')}
              </Button>

              <Button
                onClick={nextStep}
                variant="outline"
                size="sm"
                className="font-mono text-sm border-terminal-green text-terminal-green hover:bg-terminal-green hover:text-terminal-black transition-all duration-200"
              >
                {t('projects.barberia.userFlow.navigation.next')}
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>

          {/* Content Section */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-terminal-green mb-3 font-mono">
                <span className="text-terminal-cyan">{currentStepData.id}.</span> {currentStepData.title}
              </h3>
              <p className="text-terminal-green/80 text-lg leading-relaxed">
                {currentStepData.description}
              </p>
            </div>

            {/* Features */}
            <div className="space-y-3">
              <h4 className="text-lg font-bold text-terminal-cyan font-mono">
                {t('projects.barberia.userFlow.features.title')}:
              </h4>
              <ul className="space-y-2">
                {currentStepData.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3 text-terminal-green/90">
                    <div className="w-5 h-5 rounded-full bg-terminal-green/20 border border-terminal-green/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-terminal-green" />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technical Info */}
            <div className="bg-terminal-black/50 border border-terminal-green/30 rounded-lg p-4">
              <div className="font-mono text-sm space-y-2">
                <div className="text-terminal-cyan">
                  <span className="text-terminal-green">$</span> {t('projects.barberia.userFlow.technical.status')}
                </div>
                <div className="pl-4 space-y-1 text-terminal-green/80">
                  <div>✅ {t('projects.barberia.userFlow.technical.responsive')}</div>
                  <div>✅ {t('projects.barberia.userFlow.technical.validation')}</div>
                  <div>✅ {t('projects.barberia.userFlow.technical.realTime')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Image Modal */}
        <ImageModal
          isOpen={isImageModalOpen}
          onClose={() => setIsImageModalOpen(false)}
          imageSrc={currentStepData.image}
          imageAlt={currentStepData.title}
          projectTitle={`FADE ROOM - ${currentStepData.title}`}
        />
      </div>
    </section>
  )
}