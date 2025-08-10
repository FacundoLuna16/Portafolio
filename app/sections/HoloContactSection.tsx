"use client"

import React, { useState, useEffect, useRef } from "react"
import { Mail, Github, Linkedin, Zap, Wifi, RotateCcw } from "lucide-react"
import { useTranslation } from "../hooks/use-translation"

interface BotMessage {
  id: string
  text: string
  type: 'bot' | 'system'
  timestamp: number
}

interface ContactMethod {
  id: string
  name: string
  icon: React.ReactNode
  url: string
  description: string
  color: string
}

export function HoloContactSection() {
  const { t } = useTranslation()
  const [mounted, setMounted] = useState(false)
  const [botMessages, setBotMessages] = useState<BotMessage[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null)
  const [initialMessagesLoaded, setInitialMessagesLoaded] = useState(false)
  
  // Contador único para generar IDs únicos
  const messageIdCounter = useRef(0)
  // Referencia al contenedor de chat para auto-scroll
  const chatContainerRef = useRef<HTMLDivElement>(null)

  const contactMethods: ContactMethod[] = [
    {
      id: 'email',
      name: 'Email',
      icon: <Mail className="w-4 h-4" />,
      url: 'mailto:fakkuluna98@gmail.com',
      description: t('contact.methods.email'),
      color: 'cyan'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: <Linkedin className="w-4 h-4" />,
      url: 'https://linkedin.com/in/luna-facundo',
      description: t('contact.methods.linkedin'),
      color: 'blue'
    },
    {
      id: 'github',
      name: 'GitHub',
      icon: <Github className="w-4 h-4" />,
      url: 'https://github.com/FacundoLuna16',
      description: t('contact.methods.github'),
      color: 'green'
    }
  ]

  useEffect(() => {
    setMounted(true)
  }, [])

  // Efecto separado para cargar mensajes iniciales solo una vez
  useEffect(() => {
    if (!mounted || initialMessagesLoaded) return
    
    const loadInitialMessages = () => {
      const greeting1 = t("contact.bot.greeting1")
      const greeting2 = t("contact.bot.greeting2")
      const greeting3 = t("contact.bot.greeting3")
      
      addBotMessage(greeting1)
      setTimeout(() => {
        addBotMessage(greeting2)
        setTimeout(() => {
          addBotMessage(greeting3)
          setInitialMessagesLoaded(true)
        }, 1000)
      }, 1500)
    }

    const timeoutId = setTimeout(loadInitialMessages, 500)
    return () => clearTimeout(timeoutId)
  }, [mounted, initialMessagesLoaded, t])

  // Auto-scroll cuando se agregan nuevos mensajes
  useEffect(() => {
    if (chatContainerRef.current && botMessages.length > 0) {
      const container = chatContainerRef.current
      // Scroll inmediato
      container.scrollTop = container.scrollHeight
      // Segundo scroll para asegurar que llegue al final
      const timeoutId = setTimeout(() => {
        container.scrollTop = container.scrollHeight
      }, 100)
      return () => clearTimeout(timeoutId)
    }
  }, [botMessages])

  const addBotMessage = (text: string, type: 'bot' | 'system' = 'bot') => {
    messageIdCounter.current += 1
    const newMessage: BotMessage = {
      id: `message-${messageIdCounter.current}-${Date.now()}`,
      text,
      type,
      timestamp: Date.now()
    }
    setBotMessages(prev => [...prev, newMessage])
    
    // Auto-scroll inmediato y con delay para asegurar que el DOM se actualice
    setTimeout(() => {
      if (chatContainerRef.current) {
        const container = chatContainerRef.current
        container.scrollTop = container.scrollHeight
        // Segundo scroll para asegurar que llegue al final
        setTimeout(() => {
          container.scrollTop = container.scrollHeight
        }, 50)
      }
    }, 10)
  }

  const handleContactMethod = (method: ContactMethod) => {
    if (isProcessing) return

    setSelectedMethod(method.id)
    setIsProcessing(true)
    
    addBotMessage(`Iniciando conexión ${method.name}...`, 'system')
    
    setTimeout(() => {
      if (method.id === 'email') {
        // Comportamiento especial para email
        addBotMessage(`📧 Copiando email al portapapeles...`, 'system')
        
        // Copiar email al portapapeles
        const email = 'fakkuluna98@gmail.com'
        navigator.clipboard.writeText(email).then(() => {
          setTimeout(() => {
            addBotMessage(`✅ Email copiado: ${email}`)
            setIsProcessing(false)
            setSelectedMethod(null)
            
            setTimeout(() => {
              addBotMessage("¡Listo! Ahora puedes pegar el email donde necesites 📋")
            }, 1000)
          }, 1000)
        }).catch(() => {
          // Fallback si clipboard no funciona
          setTimeout(() => {
            addBotMessage(`📧 Email: ${email}`)
            addBotMessage("Por favor copia manualmente el email de arriba")
            setIsProcessing(false)
            setSelectedMethod(null)
          }, 1000)
        })
      } else {
        // Comportamiento normal para otros métodos
        addBotMessage(`🚀 Conectando con ${method.name}...`, 'system')
        
        setTimeout(() => {
          addBotMessage(`✅ Enlace establecido. Redirigiendo...`)
          
          setTimeout(() => {
            window.open(method.url, '_blank')
            setIsProcessing(false)
            setSelectedMethod(null)
            
            setTimeout(() => {
              addBotMessage("¡Conexión completada! ¿Necesitas algo más?")
            }, 1000)
          }, 1000)
        }, 1200)
      }
    }, 800)
  }

  const resetChat = () => {
    if (isProcessing) return
    
    setBotMessages([])
    setInitialMessagesLoaded(false)
    setSelectedMethod(null)
    
    // Recargar mensajes iniciales con traducciones actuales
    setTimeout(() => {
      const greeting1 = t("contact.bot.greeting1")
      const greeting2 = t("contact.bot.greeting2") 
      const greeting3 = t("contact.bot.greeting3")
      
      addBotMessage(greeting1)
      setTimeout(() => {
        addBotMessage(greeting2)
        setTimeout(() => {
          addBotMessage(greeting3)
          setInitialMessagesLoaded(true)
        }, 1000)
      }, 1500)
    }, 500)
  }

  if (!mounted) {
    return (
      <section id="contact" className="py-20 px-2 sm:px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-terminal-green/20 rounded mb-8 w-64 mx-auto"></div>
            <div className="h-96 bg-terminal-green/10 rounded"></div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="contact" className="py-20 px-2 sm:px-4 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-mono font-bold text-terminal-green mb-8 text-center">
          <span className="text-terminal-cyan">$</span> connect --interface=holo
        </h2>

        {/* Holo Interface Container */}
        <div className="relative">
          {/* Holographic Effect Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-terminal-cyan/5 via-terminal-green/5 to-terminal-cyan/5 rounded-2xl animate-pulse"></div>
          
          {/* Main Interface */}
          <div className="relative border-2 border-terminal-cyan bg-terminal-black/90 rounded-2xl overflow-hidden">
            
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-terminal-cyan/20 via-terminal-green/20 to-terminal-cyan/20 border-b border-terminal-cyan/30">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-terminal-green to-terminal-cyan flex items-center justify-center">
                    <span className="text-terminal-black font-mono font-bold text-lg">FL</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-terminal-black"></div>
                </div>
                <div>
                  <h3 className="font-mono text-terminal-green font-bold">FACUNDO LUNA</h3>
                  <div className="flex items-center gap-2 text-terminal-cyan text-sm">
                    <Wifi className="w-3 h-3" />
                    <span>{t('contact.status.online')}</span>
                    <span className="animate-pulse">●</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button 
                  onClick={resetChat}
                  disabled={isProcessing}
                  className="p-1 rounded hover:bg-terminal-green/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Reiniciar chat"
                >
                  <RotateCcw className="w-4 h-4 text-terminal-green" />
                </button>
                <Zap className="w-5 h-5 text-terminal-yellow animate-pulse" />
                <span className="font-mono text-terminal-green text-sm">FacuBot v2.1</span>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row">
              
              {/* Chat Area */}
              <div className="flex-1 p-6">
                <div 
                  ref={chatContainerRef}
                  className="chat-container space-y-3 min-h-[200px] max-h-[400px] overflow-y-auto pr-2"
                >
                  {botMessages.map((message) => (
                    <div
                      key={message.id}
                      className="flex items-start gap-3 animate-in fade-in slide-in-from-left duration-500 w-full"
                    >
                      <div className="w-6 h-6 rounded-full bg-terminal-cyan/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-terminal-cyan text-xs">🤖</span>
                      </div>
                      <div className={`chat-message font-mono text-sm ${
                        message.type === 'system' 
                          ? 'text-terminal-yellow' 
                          : 'text-terminal-green'
                      }`}>
                        {message.text}
                      </div>
                    </div>
                  ))}
                  
                  {isProcessing && (
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-terminal-cyan/20 flex items-center justify-center">
                        <span className="text-terminal-cyan text-xs">🤖</span>
                      </div>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-terminal-green rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-terminal-green rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-terminal-green rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Contact Methods */}
              <div className="lg:w-80 p-6 border-t lg:border-t-0 lg:border-l border-terminal-cyan/30">
                <h4 className="font-mono text-terminal-cyan font-bold mb-4 text-center">
                  {t('contact.methods.title')}
                </h4>
                
                <div className="space-y-3">
                  {contactMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => handleContactMethod(method)}
                      disabled={isProcessing}
                      className={`w-full p-4 rounded-lg border-2 transition-all duration-300 font-mono text-left ${
                        selectedMethod === method.id
                          ? 'border-terminal-yellow bg-terminal-yellow/10 text-terminal-yellow'
                          : isProcessing
                          ? 'border-terminal-green/30 bg-terminal-green/5 text-terminal-green/50 cursor-not-allowed'
                          : method.color === 'cyan'
                          ? 'border-terminal-cyan bg-terminal-cyan/10 text-terminal-cyan hover:bg-terminal-cyan/20'
                          : method.color === 'blue'
                          ? 'border-blue-500 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20'
                          : 'border-terminal-green bg-terminal-green/10 text-terminal-green hover:bg-terminal-green/20'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg border border-current flex items-center justify-center ${
                          selectedMethod === method.id ? 'animate-pulse' : ''
                        }`}>
                          {method.icon}
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-sm">{method.name}</div>
                          <div className="text-xs opacity-80">{method.description}</div>
                        </div>
                        <div className="text-lg">
                          {selectedMethod === method.id ? '🚀' : '▶'}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {/* System Status */}
                <div className="mt-6 p-4 border border-terminal-green/30 rounded-lg bg-terminal-green/5">
                  <h5 className="font-mono text-terminal-green font-bold text-sm mb-2">{t('contact.system.title')}</h5>
                  <div className="space-y-1 text-xs font-mono">
                    <div className="flex justify-between">
                      <span className="text-terminal-green/70">{t('contact.system.location')}</span>
                      <span className="text-terminal-green">{t('contact.status.location')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-terminal-green/70">{t('contact.system.response')}</span>
                      <span className="text-terminal-green">{t('contact.status.response')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-terminal-green/70">{t('contact.system.status')}</span>
                      <span className="text-green-400">{t('contact.status.available')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Holographic Glow Effect */}
          <div className="absolute inset-0 border-2 border-terminal-cyan/20 rounded-2xl pointer-events-none"></div>
          <div className="absolute inset-0 border border-terminal-green/10 rounded-2xl pointer-events-none"></div>
        </div>

        {/* Terminal Signature */}
        <div className="mt-8 text-center font-mono text-terminal-green/60">
          <span className="text-terminal-cyan">$</span> echo &quot;{t('contact.thanks')}&quot; 
          <span className="animate-pulse text-terminal-green">█</span>
        </div>

      </div>
    </section>
  )
}
