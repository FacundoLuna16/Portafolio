"use client"

import React, { useEffect, useState, useRef } from 'react'

interface MatrixRainProps {
  active: boolean
}

export function MatrixRain({ active }: MatrixRainProps) {
  const [mounted, setMounted] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!active || !mounted) {
      // Cleanup canvas si existe
      if (canvasRef.current && document.body.contains(canvasRef.current)) {
        document.body.removeChild(canvasRef.current)
        canvasRef.current = null
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
      return
    }

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvasRef.current = canvas

    // Configurar canvas con mejor performance
    canvas.style.position = 'fixed'
    canvas.style.top = '0'
    canvas.style.left = '0'
    canvas.style.width = '100vw'
    canvas.style.height = '100vh'
    canvas.style.pointerEvents = 'none'
    canvas.style.zIndex = '9999'
    canvas.style.background = 'transparent'
    
    // Usar devicePixelRatio para mejor calidad
    const dpr = window.devicePixelRatio || 1
    canvas.width = window.innerWidth * dpr
    canvas.height = window.innerHeight * dpr
    ctx.scale(dpr, dpr)

    document.body.appendChild(canvas)

    // Caracteres matrix optimizados
    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()".split("")
    const font_size = 12
    const columns = Math.floor(window.innerWidth / font_size)
    const drops: number[] = Array(columns).fill(1)

    // Función de dibujo optimizada
    function draw() {
      if (!ctx || !canvasRef.current) return
      
      // Fondo semi-transparente para efecto trail
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

      ctx.fillStyle = '#0F0' // Verde matrix
      ctx.font = `${font_size}px monospace`

      // Dibujar caracteres con performance mejorada
      for (let i = 0; i < drops.length; i++) {
        const text = matrix[Math.floor(Math.random() * matrix.length)]
        const x = i * font_size
        const y = drops[i] * font_size
        
        ctx.fillText(text, x, y)

        // Reset drop con probabilidad optimizada
        if (y > window.innerHeight && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }

      // Usar requestAnimationFrame en lugar de setInterval
      animationRef.current = requestAnimationFrame(draw)
    }

    // Iniciar animación
    animationRef.current = requestAnimationFrame(draw)

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
      if (canvasRef.current && document.body.contains(canvasRef.current)) {
        document.body.removeChild(canvasRef.current)
        canvasRef.current = null
      }
    }
  }, [active, mounted])

  return null // Canvas se agrega directamente al DOM
}

interface GlitchEffectProps {
  active: boolean
  children: React.ReactNode
}

export function GlitchEffect({ active, children }: GlitchEffectProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Renderizar siempre children para evitar hidratación mismatch
  // Solo aplicar efectos si está montado y activo
  if (!mounted) {
    return <>{children}</>
  }

  if (!active) {
    return <>{children}</>
  }

  return (
    <div className="relative">
      {/* Capa roja con offset */}
      <div 
        className="absolute inset-0 text-red-500 animate-pulse"
        style={{ 
          transform: 'translate(-1px, 0)',
          filter: 'blur(0.3px)',
          mixBlendMode: 'screen',
          opacity: 0.7
        }}
        aria-hidden="true"
      >
        {children}
      </div>
      
      {/* Capa azul con offset */}
      <div 
        className="absolute inset-0 text-blue-400"
        style={{ 
          transform: 'translate(1px, 0)',
          filter: 'blur(0.3px)',
          mixBlendMode: 'screen',
          opacity: 0.7
        }}
        aria-hidden="true"
      >
        {children}
      </div>
      
      {/* Contenido original */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

interface HackerModeProps {
  active: boolean
}

export function HackerMode({ active }: HackerModeProps) {
  const [commands, setCommands] = useState<string[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!active || !mounted) {
      setCommands([])
      return
    }

    const hackerCommands = [
      "INITIATING BREACH PROTOCOL...",
      "SCANNING NETWORK TOPOLOGY...", 
      "BYPASSING FIREWALL RULES...",
      "INJECTING PAYLOAD VECTORS...",
      "ESCALATING PRIVILEGES...",
      "ACCESSING MAINFRAME...",
      "DOWNLOADING DATABASE SCHEMAS...",
      "COVERING DIGITAL FOOTPRINTS...",
      "BREACH COMPLETE - WELCOME HACKER"
    ]

    let index = 0
    const interval = setInterval(() => {
      if (index < hackerCommands.length) {
        setCommands(prev => [...prev, hackerCommands[index]])
        index++
      } else {
        clearInterval(interval)
        // Auto-hide después de completar
        setTimeout(() => {
          setCommands([])
        }, 3000)
      }
    }, 600) // Velocidad optimizada

    return () => clearInterval(interval)
  }, [active, mounted])

  if (!mounted || !active || commands.length === 0) return null

  return (
    <div className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="max-w-2xl w-full mx-4">
        <div className="bg-black border-2 border-red-500 rounded-lg p-6 font-mono shadow-2xl">
          <div className="text-red-500 text-center mb-4 text-xl animate-pulse">
            🔴 UNAUTHORIZED ACCESS DETECTED 🔴
          </div>
          <div className="space-y-1 max-h-64 overflow-y-auto">
            {commands.map((cmd, index) => (
              <div 
                key={`${cmd}-${index}`}
                className="text-green-400 text-sm md:text-base animate-in fade-in duration-300"
              >
                <span className="text-red-500">root@matrix:~#</span> {cmd}
                {index === commands.length - 1 && (
                  <span className="animate-pulse text-white">█</span>
                )}
              </div>
            ))}
          </div>
          
          {/* Progress bar visual */}
          <div className="mt-4 bg-gray-800 rounded-full h-2">
            <div 
              className="bg-red-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(commands.length / 9) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

interface TimeBasedMessageProps {
  type: 'nightOwl' | 'friday'
  active: boolean
}

export function TimeBasedMessage({ type, active }: TimeBasedMessageProps) {
  const [show, setShow] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    
    if (active) {
      setShow(true)
      const timer = setTimeout(() => setShow(false), 6000) // 6 segundos
      return () => clearTimeout(timer)
    } else {
      setShow(false)
    }
  }, [active, mounted])

  if (!mounted || !show) return null

  const messages = {
    nightOwl: {
      emoji: "🦉",
      title: "Night Owl Detected!",
      message: "¿Programando a las 3am? ¡Eres mi tipo de developer!",
      bgColor: "bg-blue-600/90",
      borderColor: "border-blue-400"
    },
    friday: {
      emoji: "🍻", 
      title: "Friday Night Coder!",
      message: "¿Programando un viernes por la noche? ¡Eres imparable!",
      bgColor: "bg-purple-600/90",
      borderColor: "border-purple-400"
    }
  }

  const msg = messages[type]

  return (
    <div className="fixed top-20 right-4 z-50 animate-in slide-in-from-right duration-500">
      <div className={`${msg.bgColor} ${msg.borderColor} border rounded-lg p-4 max-w-sm font-mono text-white shadow-lg backdrop-blur-sm`}>
        <div className="flex items-center gap-3">
          <span className="text-2xl animate-bounce">{msg.emoji}</span>
          <div>
            <div className="font-bold text-sm">{msg.title}</div>
            <div className="text-xs opacity-90 mt-1">{msg.message}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ⚡ COMPONENTE PRINCIPAL CON EXPORT DEFAULT
interface EasterEggEffectsProps {
  matrixActive?: boolean
  hackerActive?: boolean
  nightOwlActive?: boolean
  fridayActive?: boolean
}

export default function EasterEggEffects({
  matrixActive = false,
  hackerActive = false,
  nightOwlActive = false,
  fridayActive = false
}: EasterEggEffectsProps) {
  return (
    <>
      <MatrixRain active={matrixActive} />
      <HackerMode active={hackerActive} />
      <TimeBasedMessage type="nightOwl" active={nightOwlActive} />
      <TimeBasedMessage type="friday" active={fridayActive} />
    </>
  )
}
