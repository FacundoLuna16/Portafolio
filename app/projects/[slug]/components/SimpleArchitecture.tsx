import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Network, Database, Shield, Zap, Cloud, Globe, Lock, Terminal, FileSearch, Bug, Eye } from "lucide-react"

interface SimpleArchitectureProps {
  architecture: {
    description: string
    components?: any[]
    integrations: string[]
  }
  techStack: string[]
}

export function SimpleArchitecture({ architecture, techStack }: SimpleArchitectureProps) {
  const getTechCategory = (tech: string) => {
    // Web Security Tools
    if (['Burp Suite Professional', 'OWASP ZAP', 'SQLmap', 'Nikto', 'DirBuster'].includes(tech)) {
      return { category: 'Web Security', icon: <Globe className="h-4 w-4" />, color: 'text-red-400' }
    }
    // Network Security Tools
    if (['Nmap', 'Metasploit', 'Wireshark', 'Hydra', 'Netcat'].includes(tech)) {
      return { category: 'Network Security', icon: <Network className="h-4 w-4" />, color: 'text-blue-400' }
    }
    // Cryptography Tools
    if (['John the Ripper', 'Hashcat', 'OpenSSL'].includes(tech)) {
      return { category: 'Cryptography', icon: <Lock className="h-4 w-4" />, color: 'text-purple-400' }
    }
    // OSINT Tools
    if (['Maltego', 'theHarvester', 'Shodan'].includes(tech)) {
      return { category: 'OSINT', icon: <Eye className="h-4 w-4" />, color: 'text-yellow-400' }
    }
    // Forensics Tools
    if (['Volatility', 'Autopsy', 'FTK Imager', 'binwalk'].includes(tech)) {
      return { category: 'Forensics', icon: <FileSearch className="h-4 w-4" />, color: 'text-cyan-400' }
    }
    // Operating Systems
    if (['Kali Linux', 'Ubuntu Server', 'Windows Server', 'Parrot Security OS'].includes(tech)) {
      return { category: 'Operating Systems', icon: <Terminal className="h-4 w-4" />, color: 'text-green-400' }
    }
    // Programming & Scripting
    if (['Python 3', 'Bash', 'PowerShell', 'JavaScript'].includes(tech)) {
      return { category: 'Programming', icon: <Zap className="h-4 w-4" />, color: 'text-orange-400' }
    }
    // Frontend (for web projects)
    if (['React 18', 'Vite', 'TailwindCSS', 'Framer Motion'].includes(tech)) {
      return { category: 'Frontend', icon: <Globe className="h-4 w-4" />, color: 'text-blue-400' }
    }
    // Backend (for web projects)
    if (['Node.js', 'Express', 'Nodemailer'].includes(tech)) {
      return { category: 'Backend', icon: <Database className="h-4 w-4" />, color: 'text-green-400' }
    }
    // DevOps
    if (['Docker', 'GitHub Actions', 'Nginx', 'SSL/HTTPS', 'Git', 'Markdown'].includes(tech)) {
      return { category: 'DevOps', icon: <Cloud className="h-4 w-4" />, color: 'text-orange-400' }
    }
    // Default
    return { category: 'Other', icon: <Shield className="h-4 w-4" />, color: 'text-terminal-green' }
  }

  const groupedTech = techStack.reduce((acc, tech) => {
    const { category } = getTechCategory(tech)
    if (!acc[category]) acc[category] = []
    acc[category].push(tech)
    return acc
  }, {} as Record<string, string[]>)

  // Detectar si es un proyecto de seguridad
  const isSecurityProject = techStack.some(tech => 
    ['Burp Suite Professional', 'Metasploit', 'Kali Linux', 'Nmap'].includes(tech)
  )

  return (
    <section className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-mono font-bold text-terminal-green">
          <span className="text-terminal-cyan">$</span> tree -L 2 {isSecurityProject ? 'security-domains' : 'arquitectura'}/
        </h2>
        <p className="text-terminal-green/80 font-mono max-w-3xl mx-auto">
          {architecture.description}
        </p>
      </div>

      {/* Architecture Diagram - Adaptable */}
      <Card className="border-terminal-green bg-background/50">
        <CardHeader>
          <CardTitle className="font-mono text-terminal-green">
            {isSecurityProject ? '🛡️ Dominios de Ciberseguridad' : '🏗️ Arquitectura Simple y Eficiente'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isSecurityProject ? (
            // Security Project Layout
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Web Security */}
              <div className="space-y-4">
                <h3 className="text-lg font-mono font-semibold text-red-400 border-b border-red-400/30 pb-2">
                  Web Security
                </h3>
                <div className="space-y-3">
                  <div className="p-4 border border-red-500/30 rounded bg-red-500/5">
                    <div className="font-mono text-sm text-red-400 font-semibold">OWASP Top 10</div>
                    <div className="font-mono text-xs text-terminal-green/60 mt-1">Burp Suite + SQLmap</div>
                    <div className="mt-2 space-y-1">
                      <div className="text-xs font-mono text-terminal-green/80">• SQL Injection</div>
                      <div className="text-xs font-mono text-terminal-green/80">• XSS Attacks</div>
                      <div className="text-xs font-mono text-terminal-green/80">• CSRF Exploits</div>
                      <div className="text-xs font-mono text-terminal-green/80">• File Inclusion</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Network Security */}
              <div className="space-y-4">
                <h3 className="text-lg font-mono font-semibold text-blue-400 border-b border-blue-400/30 pb-2">
                  Network Security
                </h3>
                <div className="space-y-3">
                  <div className="p-4 border border-blue-500/30 rounded bg-blue-500/5">
                    <div className="font-mono text-sm text-blue-400 font-semibold">Penetration Testing</div>
                    <div className="font-mono text-xs text-terminal-green/60 mt-1">Nmap + Metasploit</div>
                    <div className="mt-2 space-y-1">
                      <div className="text-xs font-mono text-terminal-green/80">• Network Recon</div>
                      <div className="text-xs font-mono text-terminal-green/80">• Service Exploitation</div>
                      <div className="text-xs font-mono text-terminal-green/80">• MITM Attacks</div>
                      <div className="text-xs font-mono text-terminal-green/80">• Post-Exploitation</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Forensics & OSINT */}
              <div className="space-y-4">
                <h3 className="text-lg font-mono font-semibold text-cyan-400 border-b border-cyan-400/30 pb-2">
                  Forensics & OSINT
                </h3>
                <div className="space-y-3">
                  <div className="p-4 border border-cyan-500/30 rounded bg-cyan-500/5">
                    <div className="font-mono text-sm text-cyan-400 font-semibold">Digital Analysis</div>
                    <div className="font-mono text-xs text-terminal-green/60 mt-1">Volatility + Shodan</div>
                    <div className="mt-2 space-y-1">
                      <div className="text-xs font-mono text-terminal-green/80">• Memory Analysis</div>
                      <div className="text-xs font-mono text-terminal-green/80">• Intelligence Gathering</div>
                      <div className="text-xs font-mono text-terminal-green/80">• Malware Detection</div>
                      <div className="text-xs font-mono text-terminal-green/80">• Evidence Recovery</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Web Project Layout (original)
            <div className="grid md:grid-cols-3 gap-6">
              
              {/* Frontend */}
              <div className="space-y-4">
                <h3 className="text-lg font-mono font-semibold text-blue-400 border-b border-blue-400/30 pb-2">
                  Frontend Layer
                </h3>
                <div className="space-y-3">
                  <div className="p-4 border border-blue-500/30 rounded bg-blue-500/5">
                    <div className="font-mono text-sm text-blue-400 font-semibold">React SPA</div>
                    <div className="font-mono text-xs text-terminal-green/60 mt-1">Vite + TailwindCSS</div>
                    <div className="mt-2 space-y-1">
                      <div className="text-xs font-mono text-terminal-green/80">• Landing page responsive</div>
                      <div className="text-xs font-mono text-terminal-green/80">• Multilenguaje (ES/EN)</div>
                      <div className="text-xs font-mono text-terminal-green/80">• Formulario de contacto</div>
                      <div className="text-xs font-mono text-terminal-green/80">• Animaciones Framer Motion</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Backend */}
              <div className="space-y-4">
                <h3 className="text-lg font-mono font-semibold text-green-400 border-b border-green-400/30 pb-2">
                  Backend Layer
                </h3>
                <div className="space-y-3">
                  <div className="p-4 border border-green-500/30 rounded bg-green-500/5">
                    <div className="font-mono text-sm text-green-400 font-semibold">Node.js API</div>
                    <div className="font-mono text-xs text-terminal-green/60 mt-1">Express + Nodemailer</div>
                    <div className="mt-2 space-y-1">
                      <div className="text-xs font-mono text-terminal-green/80">• API /contact</div>
                      <div className="text-xs font-mono text-terminal-green/80">• SMTP personalizado</div>
                      <div className="text-xs font-mono text-terminal-green/80">• Validaciones</div>
                      <div className="text-xs font-mono text-terminal-green/80">• CORS configurado</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* DevOps */}
              <div className="space-y-4">
                <h3 className="text-lg font-mono font-semibold text-orange-400 border-b border-orange-400/30 pb-2">
                  DevOps Layer
                </h3>
                <div className="space-y-3">
                  <div className="p-4 border border-orange-500/30 rounded bg-orange-500/5">
                    <div className="font-mono text-sm text-orange-400 font-semibold">GitHub Actions</div>
                    <div className="font-mono text-xs text-terminal-green/60 mt-1">Docker + DonWeb VPS</div>
                    <div className="mt-2 space-y-1">
                      <div className="text-xs font-mono text-terminal-green/80">• Deploy automático</div>
                      <div className="text-xs font-mono text-terminal-green/80">• SSL/HTTPS</div>
                      <div className="text-xs font-mono text-terminal-green/80">• Nginx reverse proxy</div>
                      <div className="text-xs font-mono text-terminal-green/80">• Zero downtime</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tech Stack by Category */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(groupedTech).map(([category, techs]) => {
          const { icon, color } = getTechCategory(techs[0])
          
          return (
            <Card key={category} className="border-terminal-green/30 bg-background/30">
              <CardHeader className="pb-3">
                <CardTitle className={`flex items-center gap-2 font-mono text-lg ${color}`}>
                  {icon}
                  {category}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {techs.map((tech, index) => (
                  <Badge 
                    key={index}
                    variant="outline"
                    className="border-terminal-green/50 text-terminal-green font-mono text-xs mr-2 mb-2"
                  >
                    {tech}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Integration Points */}
      <Card className="border-terminal-green bg-background/50">
        <CardHeader>
          <CardTitle className="font-mono text-terminal-green">
            {isSecurityProject ? '🔒 Frameworks y Metodologías' : '🔌 Integraciones y Servicios'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {architecture.integrations.map((integration, index) => (
              <div 
                key={index}
                className="p-3 border border-terminal-cyan/30 rounded bg-terminal-cyan/5"
              >
                <div className="font-mono text-sm text-terminal-cyan">
                  {integration}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
