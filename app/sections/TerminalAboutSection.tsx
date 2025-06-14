"use client"

import React, { useState, useEffect } from "react"
import { useTranslation } from "../hooks/use-translation"
import { skills } from "@/lib/data/skills"

interface Command {
  id: string
  command: string
  description: string
  executed: boolean
}

interface SkillProgress {
  name: string
  percentage: number
  icon: string
}

export function TerminalAboutSection() {
  const { t } = useTranslation()
  const [mounted, setMounted] = useState(false)
  const [executedCommands, setExecutedCommands] = useState<string[]>([])

  // Comandos disponibles
  const commands: Command[] = [
    { id: 'whoami', command: 'whoami', description: 'Información personal', executed: false },
    { id: 'motd', command: 'cat /etc/motd', description: 'Sobre mí', executed: false },
    { id: 'processes', command: 'ps aux | grep passion', description: 'Procesos activos', executed: false },
    { id: 'skills', command: 'ls -la ~/skills/', description: 'Habilidades técnicas', executed: false },
  ]

  // Skills con porcentajes y iconos
  const skillsWithProgress: SkillProgress[] = [
    { name: 'Backend', percentage: 85, icon: '⚙️' },
    { name: 'DevOps', percentage: 75, icon: '🚀' },
    { name: 'Security', percentage: 65, icon: '🛡️' },
    { name: 'QA', percentage: 70, icon: '🧪' },
  ]

  useEffect(() => {
    setMounted(true)
  }, [])

  const executeCommand = (commandId: string) => {
    if (executedCommands.includes(commandId)) {
      // Si ya está ejecutado, lo "deseleccionamos" (ocultamos) inmediatamente
      setExecutedCommands(prev => prev.filter(id => id !== commandId))
    } else {
      // Si no está ejecutado, lo ejecutamos inmediatamente
      setExecutedCommands(prev => [...prev, commandId])
    }
  }

  const generateProgressBar = (percentage: number): string => {
    const filled = Math.round(percentage / 10)
    const empty = 10 - filled
    return '█'.repeat(filled) + '░'.repeat(empty)
  }

  if (!mounted) {
    return (
      <section id="about" className="py-20 px-2 sm:px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-terminal-green/20 rounded mb-8 w-48"></div>
            <div className="h-96 bg-terminal-green/10 rounded"></div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="about" className="py-20 px-2 sm:px-4 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-mono font-bold text-terminal-green mb-8">
          <span className="text-terminal-cyan">$</span> about --interactive
        </h2>

        {/* Terminal Window */}
        <div className="border border-terminal-green bg-terminal-black/95 rounded-lg overflow-hidden">
          
          {/* Terminal Header */}
          <div className="flex items-center gap-2 px-4 py-2 bg-terminal-green/10 border-b border-terminal-green/30">
            <div className="flex gap-1">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="flex-1 text-center">
              <span className="font-mono text-sm text-terminal-green/80">
                facundo@portfolio:~$
              </span>
            </div>
          </div>

          {/* Terminal Content */}
          <div className="p-6 space-y-4 min-h-[500px]">
            
            {/* Comandos disponibles */}
            <div className="space-y-2">
              <div className="font-mono text-terminal-green/70 text-sm">
                <span className="text-terminal-cyan">#</span> Comandos disponibles - Click para ejecutar/ocultar:
              </div>
              <div className="flex flex-wrap gap-2">
                {commands.map((cmd) => (
                  <button
                    key={cmd.id}
                    onClick={() => executeCommand(cmd.id)}
                    className={`font-mono text-sm px-3 py-1 rounded border transition-all duration-200 ${
                      executedCommands.includes(cmd.id)
                        ? 'bg-terminal-green/20 text-terminal-green border-terminal-green/40 hover:bg-terminal-green/30'
                        : 'bg-terminal-cyan/10 text-terminal-cyan border-terminal-cyan/30 hover:bg-terminal-cyan/20'
                    }`}
                  >
                    {executedCommands.includes(cmd.id) ? '✗' : '▶'} {cmd.command}
                  </button>
                ))}
              </div>
            </div>

            {/* Resultados de comandos ejecutados */}
            <div className="space-y-6">
              
              {/* whoami */}
              {executedCommands.includes('whoami') && (
                <div className="space-y-2 animate-in fade-in duration-500">
                  <div className="font-mono text-terminal-green text-sm">
                    <span className="text-terminal-cyan">$</span> whoami
                  </div>
                  <div className="pl-4 space-y-1">
                    <div className="font-mono text-terminal-green/90">
                      <span className="text-terminal-cyan">&gt;</span> Facundo Luna - Backend Developer & DevOps Engineer
                    </div>
                    <div className="font-mono text-terminal-green/80 text-sm">
                      <span className="text-terminal-cyan">&gt;</span> UTN FRC - Estudiante de Ingeniería en Sistemas
                    </div>
                    <div className="font-mono text-terminal-green/80 text-sm">
                      <span className="text-terminal-cyan">&gt;</span> Córdoba, Argentina 🇦🇷
                    </div>
                  </div>
                </div>
              )}

              {/* motd */}
              {executedCommands.includes('motd') && (
                <div className="space-y-2 animate-in fade-in duration-500">
                  <div className="font-mono text-terminal-green text-sm">
                    <span className="text-terminal-cyan">$</span> cat /etc/motd
                  </div>
                  <div className="pl-4">
                    <div className="font-mono text-terminal-green/90 text-sm leading-relaxed">
                      <span className="text-terminal-cyan">&gt;</span> {t("about.description")}
                    </div>
                  </div>
                </div>
              )}

              {/* processes */}
              {executedCommands.includes('processes') && (
                <div className="space-y-2 animate-in fade-in duration-500">
                  <div className="font-mono text-terminal-green text-sm">
                    <span className="text-terminal-cyan">$</span> ps aux | grep passion
                  </div>
                  <div className="pl-4 space-y-1">
                    <div className="font-mono text-terminal-green/80 text-sm">
                      <span className="text-terminal-green">facundo</span>&nbsp;&nbsp;PID:001&nbsp;&nbsp;backend_development&nbsp;&nbsp;&nbsp;&nbsp;[running]
                    </div>
                    <div className="font-mono text-terminal-green/80 text-sm">
                      <span className="text-terminal-green">facundo</span>&nbsp;&nbsp;PID:002&nbsp;&nbsp;devops_automation&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[running]
                    </div>
                    <div className="font-mono text-terminal-green/80 text-sm">
                      <span className="text-terminal-green">facundo</span>&nbsp;&nbsp;PID:003&nbsp;&nbsp;cybersecurity&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[running]
                    </div>
                    <div className="font-mono text-terminal-green/80 text-sm">
                      <span className="text-terminal-green">facundo</span>&nbsp;&nbsp;PID:004&nbsp;&nbsp;continuous_learning&nbsp;&nbsp;[running]
                    </div>
                    <div className="font-mono text-terminal-green/80 text-sm">
                      <span className="text-terminal-green">facundo</span>&nbsp;&nbsp;PID:005&nbsp;&nbsp;problem_solving&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[running]
                    </div>
                  </div>
                </div>
              )}

              {/* skills */}
              {executedCommands.includes('skills') && (
                <div className="space-y-2 animate-in fade-in duration-500">
                  <div className="font-mono text-terminal-green text-sm">
                    <span className="text-terminal-cyan">$</span> ls -la ~/skills/
                  </div>
                  <div className="pl-4 space-y-1">
                    {skillsWithProgress.map((skill, index) => (
                      <div key={skill.name} className="font-mono text-terminal-green/80 text-sm flex items-center">
                        <span className="text-terminal-cyan">drwxr-xr-x</span>&nbsp;
                        <span className="text-terminal-green w-20">{skill.icon} {skill.name}/</span>&nbsp;&nbsp;&nbsp;
                        <span className="text-terminal-yellow">{generateProgressBar(skill.percentage)}</span>&nbsp;
                        <span className="text-terminal-green/60">{skill.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Prompt final */}
            <div className="pt-4">
              <div className="font-mono text-terminal-green/50 text-sm">
                <span className="text-terminal-cyan">facundo@portfolio</span>:<span className="text-terminal-green">~</span>$ 
                <span className="animate-pulse">█</span>
              </div>
            </div>

          </div>
        </div>

        {/* Skills detalladas (se muestran solo después de ejecutar ls -la ~/skills/) */}
        {executedCommands.includes('skills') && (
          <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-4 gap-4 animate-in slide-in-from-bottom duration-700">
            {Object.entries(skills).map(([category, skillList]) => (
              <div key={category} className="border border-terminal-green/30 bg-terminal-black/50 rounded-lg p-4">
                <h3 className="text-terminal-cyan font-mono font-semibold mb-3 text-sm">
                  {skillsWithProgress.find(s => s.name === category)?.icon} {category}:
                </h3>
                <div className="space-y-1">
                  {skillList.map((skill) => (
                    <div key={skill} className="font-mono text-xs text-terminal-green/80">
                      <span className="text-terminal-green/60">├─</span> {skill}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  )
}
