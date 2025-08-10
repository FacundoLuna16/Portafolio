"use client"

import React from 'react'
import { 
  Calendar, 
  Clock, 
  Shield, 
  Zap, 
  Users, 
  CreditCard, 
  Smartphone,
  Database,
  Lock,
  BarChart3,
  CheckCircle,
  Star
} from 'lucide-react'
import { useBarberiaTranslations } from '@/app/hooks/use-barberia-translations'

const featureIcons = {
  booking: Calendar,
  scheduling: Clock,
  security: Shield,
  performance: Zap,
  users: Users,
  payments: CreditCard,
  responsive: Smartphone,
  database: Database,
  auth: Lock,
  analytics: BarChart3
}

interface KeyFeaturesProps {
  highlights: string[]
}

export function KeyFeatures({ highlights }: KeyFeaturesProps) {
  const { t } = useBarberiaTranslations()

  const features = [
    {
      icon: Calendar,
      title: t('features.smartBooking.title'),
      description: t('features.smartBooking.description'),
      color: 'blue'
    },
    {
      icon: Clock,
      title: t('features.weeklyScheduling.title'),
      description: t('features.weeklyScheduling.description'),
      color: 'purple'
    },
    {
      icon: CreditCard,
      title: t('features.serviceIntegration.title'),
      description: t('features.serviceIntegration.description'),
      color: 'green'
    },
    {
      icon: Shield,
      title: t('features.authentication.title'),
      description: t('features.authentication.description'),
      color: 'red'
    },
    {
      icon: BarChart3,
      title: t('features.adminPanel.title'),
      description: t('features.adminPanel.description'),
      color: 'cyan'
    },
    {
      icon: Zap,
      title: t('features.performance.title'),
      description: t('features.performance.description'),
      color: 'yellow'
    }
  ]

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-500/20 border-blue-400 text-blue-400',
      purple: 'bg-purple-500/20 border-purple-400 text-purple-400',
      green: 'bg-green-500/20 border-green-400 text-green-400',
      red: 'bg-red-500/20 border-red-400 text-red-400',
      cyan: 'bg-cyan-500/20 border-cyan-400 text-cyan-400',
      yellow: 'bg-yellow-500/20 border-yellow-400 text-yellow-400'
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  return (
    <section className="py-12 px-4 bg-terminal-black/20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-terminal-green mb-4 font-mono">
            <Star className="inline w-8 h-8 mr-3 text-terminal-cyan" />
            <span className="text-terminal-cyan">$</span> {t('keyFeatures.title')}
          </h2>
          <p className="text-terminal-green/80 text-lg max-w-3xl mx-auto leading-relaxed">
            {t('keyFeatures.description')}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            const colorClasses = getColorClasses(feature.color)
            
            return (
              <div key={index} className="bg-terminal-black/50 border border-terminal-green/30 rounded-lg p-6 hover:border-terminal-green/60 transition-all duration-300 group">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200 ${colorClasses}`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-terminal-green mb-2 font-mono">
                      {feature.title}
                    </h3>
                    <p className="text-terminal-green/80 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>


        {/* Technology Stack Summary */}
        <div className="mt-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-terminal-green mb-2 font-mono">
              <Database className="inline w-6 h-6 mr-2 text-terminal-cyan" />
              {t('keyFeatures.techStack.title')}
            </h3>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-blue-500/10 border border-blue-400/30 rounded-lg p-4 text-center">
              <Smartphone className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <h4 className="text-blue-300 font-mono font-bold mb-1">Frontend</h4>
              <p className="text-xs text-terminal-green/70">React 18 + Vite</p>
            </div>

            <div className="bg-green-500/10 border border-green-400/30 rounded-lg p-4 text-center">
              <Database className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <h4 className="text-green-300 font-mono font-bold mb-1">Backend</h4>
              <p className="text-xs text-terminal-green/70">Spring Boot 3</p>
            </div>

            <div className="bg-purple-500/10 border border-purple-400/30 rounded-lg p-4 text-center">
              <Shield className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <h4 className="text-purple-300 font-mono font-bold mb-1">Security</h4>
              <p className="text-xs text-terminal-green/70">JWT + Spring Security</p>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-400/30 rounded-lg p-4 text-center">
              <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <h4 className="text-yellow-300 font-mono font-bold mb-1">Performance</h4>
              <p className="text-xs text-terminal-green/70">PostgreSQL + Redis</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}