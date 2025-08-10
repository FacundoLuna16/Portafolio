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
  const [secretInput, setSecretInput] = useState("")
  const [secretCommands, setSecretCommands] = useState<string[]>([])
  const [showSecretInput, setShowSecretInput] = useState(false)
  const secretTerminalRef = React.useRef<HTMLDivElement>(null)

  // Comandos disponibles (comandos en inglés, descripciones traducidas)
  const commands: Command[] = [
    { id: 'whoami', command: 'whoami', description: t('about.commands.whoami.desc'), executed: false },
    { id: 'motd', command: 'cat /etc/motd', description: t('about.commands.motd.desc'), executed: false },
    { id: 'processes', command: 'ps aux | grep passion', description: t('about.commands.processes.desc'), executed: false },
    { id: 'skills', command: 'ls -la ~/skills/', description: t('about.commands.skills.desc'), executed: false },
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

  const handleSecretCommand = (command: string) => {
    const cmd = command.toLowerCase().trim()
    setSecretCommands(prev => [...prev, cmd])
    setSecretInput("")

    // Scroll automático después de agregar el comando
    setTimeout(() => {
      secretTerminalRef.current?.scrollTo({
        top: secretTerminalRef.current.scrollHeight,
        behavior: 'smooth'
      })
    }, 100)

    // Respuestas a comandos secretos
    switch (cmd) {
      case 'sudo whoami':
        setSecretCommands(prev => [...prev, 'output:Root access granted 🔑 Welcome, admin!'])
        break
      case 'htop':
        setSecretCommands(prev => [...prev, 
          'output:PID  USER      COMMAND                     CPU%  MEM%',
          'output:001  facundo   coffee_addiction.exe        95%   100%',
          'output:002  facundo   bug_generator.sh            78%   45%',
          'output:003  facundo   stackoverflow_browser       82%   60%',
          'output:004  facundo   deadline_panic_mode         99%   90%',
          'output:005  facundo   ctrl_z_ctrl_z_ctrl_z        12%   5%'
        ])
        break
      case 'neofetch':
        setSecretCommands(prev => [...prev,
          'output:                    -`                 facundo@portfolio',
          'output:                   .o+`                -----------------',
          'output:                  `ooo/                OS: Developer Linux 3.0',
          'output:                 `+oooo:               Kernel: Brain v25.0',
          'output:                `+oooooo:              Uptime: 3 años programando',
          'output:               -+oooooo+:              Shell: coffee-driven-bash',
          'output:              `/:-:++oooo+:            Resolution: 1920x1080@∞fps',
          'output:             `/++++/+++++++:           DE: VS Code',
          'output:            `/++++++++++++++:          CPU: Intel i7-Caffeine',
          'output:           `/+++ooooooooo++++/         Memory: 8GB (7.9GB used by Chrome)',
        ])
        break
      case 'ls /secrets':
        setSecretCommands(prev => [...prev,
          'output:drwx------ classified_projects/',
          'output:-rw------- secret_sauce.recipe',
          'output:-rw------- real_coffee_consumption.log',
          'output:-rw------- actual_bugs_per_day.txt',
          'output:-rw------- impostor_syndrome.md',
          'output:-rw------- stack_overflow_history.db'
        ])
        break
      case 'cat /etc/shadow':
        setSecretCommands(prev => [...prev, 'output:Access denied. Nice try, hacker! 😏🕵️'])
        break
      case 'history':
        setSecretCommands(prev => [...prev,
          'output:1  git commit -m "fix bug"',
          'output:2  git commit -m "actually fix bug"', 
          'output:3  git commit -m "fix bug for real this time"',
          'output:4  git push --force',
          'output:5  sudo rm -rf node_modules',
          'output:6  npm install',
          'output:7  prayer --to=gods-of-javascript',
          'output:8  coffee --size=extra-large'
        ])
        break
      case 'fortune':
        const fortunes = [
          'output:"La vida es demasiado corta para usar Windows" - Linus Torvalds',
          'output:"99 pequeños bugs en el código, 99 pequeños bugs..."',
          'output:"No hay lugar como ~/home"',
          'output:"Funciona en mi máquina ¯\\_(ツ)_/¯"',
          'output:"Programar es como hacer chistes. Si tienes que explicarlo, es malo."',
          'output:"El café es para cerrar los ojos que la programación abre"'
        ]
        const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)]
        setSecretCommands(prev => [...prev, randomFortune])
        break
      case 'uptime':
        setSecretCommands(prev => [...prev, 
          'output:Sistema activo desde: Nacimiento',
          'output:Tiempo programando: 3 años, 2847 horas',
          'output:Bugs creados: ∞',
          'output:Bugs resueltos: ∞ - 1',
          'output:Café consumido: 9847 tazas'
        ])
        break
      case 'clear':
        setSecretCommands([])
        break
      case 'help':
        setSecretCommands(prev => [...prev,
          'output:🕵️ Comandos secretos disponibles:',
          'output:• sudo whoami    - Acceso root',
          'output:• htop          - Procesos del sistema',
          'output:• neofetch      - Info del sistema', 
          'output:• ls /secrets   - Archivos clasificados',
          'output:• cat /etc/shadow - Intenta acceder (spoiler: no puedes)',
          'output:• history       - Historial de comandos',
          'output:• fortune       - Sabiduría aleatoria',
          'output:• uptime        - Estadísticas del desarrollador',
          'output:• clear         - Limpiar terminal secreto',
          'output:• help          - Esta ayuda'
        ])
        break
      default:
        setSecretCommands(prev => [...prev, `output:bash: ${cmd}: command not found. Try 'help' for available commands.`])
    }

    // Scroll automático después de agregar la respuesta
    setTimeout(() => {
      secretTerminalRef.current?.scrollTo({
        top: secretTerminalRef.current.scrollHeight,
        behavior: 'smooth'
      })
    }, 200)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSecretCommand(secretInput)
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
          <div className="p-6 space-y-3 min-h-[400px] max-h-[600px] flex flex-col">
            
            {/* Comandos disponibles */}
            <div className="space-y-2 flex-shrink-0">
              <div className="font-mono text-terminal-green/70 text-sm">
                <span className="text-terminal-cyan">#</span> {t('about.commands.available')}
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
                    {executedCommands.includes(cmd.id) ? '✗' : '▶'} {cmd.description}
                  </button>
                ))}
              </div>
            </div>

            {/* Resultados de comandos ejecutados */}
            <div className="space-y-6 flex-1 overflow-y-auto">
              
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

            {/* Terminal Secreto */}
            <div className="flex-shrink-0 border-t border-terminal-green/20 pt-4">
              
              {/* Comandos secretos ejecutados */}
              {secretCommands.length > 0 && (
                <div 
                  ref={secretTerminalRef}
                  className="space-y-1 max-h-60 overflow-y-auto border border-terminal-green/30 rounded p-3 mb-3 bg-terminal-black/50"
                >
                  {secretCommands.map((cmd, index) => (
                    <div key={index} className="font-mono text-sm">
                      {cmd.startsWith('output:') ? (
                        <div className="text-terminal-green/80 pl-2">
                          {cmd.replace('output:', '')}
                        </div>
                      ) : (
                        <div className="text-terminal-cyan">
                          <span className="text-terminal-cyan">facundo@portfolio</span>:<span className="text-terminal-green">~</span>$ {cmd}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Input secreto */}
              <div className="flex items-center gap-1">
                <span className="font-mono text-terminal-green/50 text-sm">
                  <span className="text-terminal-cyan">facundo@portfolio</span>:<span className="text-terminal-green">~</span>$ 
                </span>
                <input
                  type="text"
                  value={secretInput}
                  onChange={(e) => setSecretInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  onFocus={() => setShowSecretInput(true)}
                  placeholder={t('about.terminal.placeholder')}
                  className="flex-1 bg-transparent border-none outline-none font-mono text-sm text-terminal-green placeholder-terminal-green/40"
                />
                <span className="animate-pulse font-mono text-terminal-green text-sm">█</span>
              </div>
              
              {/* Hint para descubrir el input */}
              {!showSecretInput && secretCommands.length === 0 && (
                <div className="text-center mt-2">
                  <button 
                    onClick={() => setShowSecretInput(true)}
                    className="font-mono text-xs text-terminal-green/40 hover:text-terminal-green/60 transition-colors"
                  >
                    {t('about.terminal.unlock')}
                  </button>
                </div>
              )}
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
