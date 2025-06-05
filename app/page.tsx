"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, Github, Linkedin, Mail } from "lucide-react"
import { TerminalNavbar } from "./components/terminal-navbar"
import { TypingEffect } from "./components/typing-effect"
import { ProjectCard } from "./components/project-card"
import { CodeRotator } from "./components/code-rotator"
import { MiniTimeline } from "./components/mini-timeline"
import { useTranslation } from "./hooks/use-translation"

const homeTitle = "LUNA FACUNDO DEVELOPER"

export default function Portfolio() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [activeFilter, setActiveFilter] = useState("All")
  const { t, locale, setLocale } = useTranslation()

  const skills = {
    Backend: ["Node.js", "Python", "Go", "PostgreSQL", "Redis", "GraphQL"],
    DevOps: ["Docker", "Kubernetes", "AWS", "Terraform", "Jenkins", "Monitoring"],
    Security: ["OWASP", "Penetration Testing", "SSL/TLS", "OAuth", "Encryption"],
    Languages: ["Java", "Python", "TypeScript", "JavaScript", "Bash", "SQL"],
  }

  const projects = [
    {
      title: "Microservices API Gateway",
      description: t("projects.apiGateway.description"),
      techStack: ["Go", "Redis", "Docker", "Kubernetes"],
      imgSrc: "/placeholder.svg?height=200&width=300",
      codeUrl: "https://github.com/username/api-gateway",
      demoUrl: "https://api-gateway-demo.com",
      category: "Backend",
    },
    {
      title: "Infrastructure as Code",
      description: t("projects.infrastructure.description"),
      techStack: ["Terraform", "AWS", "CloudFormation", "Ansible"],
      imgSrc: "/placeholder.svg?height=200&width=300",
      codeUrl: "https://github.com/username/terraform-aws",
      demoUrl: null,
      category: "DevOps",
    },
    {
      title: "Security Scanner",
      description: t("projects.security.description"),
      techStack: ["Python", "OWASP ZAP", "Docker", "CI/CD"],
      imgSrc: "/placeholder.svg?height=200&width=300",
      codeUrl: "https://github.com/username/security-scanner",
      demoUrl: "https://scanner-demo.com",
      category: "Security",
    },
  ]


  const filteredProjects =
    activeFilter === "All" ? projects : projects.filter((project) => project.category === activeFilter)

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
  }

  const toggleLanguage = () => {
    const newLocale = locale === "en" ? "es" : "en"
    setLocale(newLocale)
    console.log(`$ sudo locale set ${newLocale === "es" ? "es_AR" : "en_US"} && exec bash`)
  }

  return (
    <div className={`min-h-screen transition-all duration-200 ${isDarkMode ? "dark bg-terminal-black" : "bg-gray-50"}`}>
      <TerminalNavbar
        isDarkMode={isDarkMode}
        toggleLanguage={toggleLanguage}
        setIsDarkMode={setIsDarkMode}
        onNavigate={scrollToSection}
      />
          

        {/* Hero Section */}
        <section id="hero" className="min-h-screen w-full flex flex-col items-center justify-center px-4 relative">
            {/* Background Code Rotator */}
          <div className="relative z-10 flex flex-col items-center py-0 text-center space-y-6 w-full max-w-2xl">
              <div className="space-y-4">
                <pre className="font-mono text-terminal-green whitespace-pre leading-none font-bold text-4xl sm:text-5xl lg:text-7xl">
                  <TypingEffect text={homeTitle} speed={50} />
                </pre>
                <div className="text-xl md:text-2xl text-terminal-cyan font-mono">{t("hero.tags")}</div>
                <div className="text-terminal-green font-mono text-lg">
                  <span className="text-terminal-cyan">$</span> echo "{t("hero.tagline")}"
                  <span className="animate-pulse">_</span>
                </div>
              </div>
              <Button
                className="bg-terminal-green text-terminal-black hover:bg-terminal-cyan hover:text-terminal-black font-mono"
                size="lg"
              >
                <Download className="mr-2 h-4 w-4" />
              {t("hero.downloadCV")}
              </Button>
            {/* <div className="absolute w-full left-0 right-0 flex opacity-15 pointer-events-none">
              <div className="whitespace-nowrap overflow-ellipsis">
                <CodeRotator />
              </div>
            </div> */}
          </div>
          {/* Background Image */}
        </section>

        {/* About Section */}
        <section id="about" className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-mono font-bold text-terminal-green mb-8">
              <span className="text-terminal-cyan">$</span> whoami
            </h2>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <Card className="bg-terminal-black border-terminal-green">
                  <CardContent className="p-6">
                    <p className="text-terminal-green font-mono leading-relaxed">{t("about.description")}</p>
                  </CardContent>
                </Card>

                <div className="space-y-4">
                  {Object.entries(skills).map(([category, skillList]) => (
                    <div key={category}>
                      <h3 className="text-terminal-cyan font-mono font-semibold mb-2">{category}:</h3>
                      <div className="flex flex-wrap gap-2">
                        {skillList.map((skill) => (
                          <Badge
                            key={skill}
                            variant="outline"
                            className="border-terminal-green text-terminal-green hover:bg-terminal-green hover:text-terminal-black font-mono"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                {/* Mini Timeline */}
                <MiniTimeline />

                {/* ASCII Avatar */}
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-mono font-bold text-terminal-green mb-8">
              <span className="text-terminal-cyan">$</span> ls projects/
            </h2>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              {["All", "Backend", "DevOps", "Security"].map((filter) => (
                <Button
                  key={filter}
                  variant={activeFilter === filter ? "default" : "outline"}
                  className={`font-mono ${
                    activeFilter === filter
                      ? "bg-terminal-green text-terminal-black"
                      : "border-terminal-green text-terminal-green hover:bg-terminal-green hover:text-terminal-black"
                  }`}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </Button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, index) => (
                <ProjectCard key={index} {...project} />
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-mono font-bold text-terminal-green mb-8">
              <span className="text-terminal-cyan">$</span> curl --data "message" https://contact.api
            </h2>

            <div className="space-y-8">
              <Card className="bg-terminal-black border-terminal-green">
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="text-center">
                      <Mail className="h-8 w-8 text-terminal-cyan mx-auto mb-4" />
                      <p className="font-mono text-terminal-green">
                        <a href="mailto:fakkuluna98@gmail.com" className="hover:text-terminal-cyan transition-colors">
                          fakkuluna98@gmail.com
                        </a>
                      </p>
                    </div>

                    <div className="text-center">
                      <Github className="h-8 w-8 text-terminal-cyan mx-auto mb-4" />
                      <p className="font-mono text-terminal-green">
                        <a href="https://github.com/FacundoLuna16" className="hover:text-terminal-cyan transition-colors">
                          github.com/FacundoLuna16
                        </a>
                      </p>
                    </div>

                    <div className="text-center">
                      <Linkedin className="h-8 w-8 text-terminal-cyan mx-auto mb-4" />
                      <p className="font-mono text-terminal-green">
                        <a
                          href="https://linkedin.com/in/luna-facundo"
                          className="hover:text-terminal-cyan transition-colors"
                        >
                          linkedin.com/in/luna-facundo
                        </a>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="font-mono text-terminal-green">
                <span className="text-terminal-cyan">$</span> echo "{t("contact.thanks")}"
                <span className="animate-pulse">_</span>
              </div>
            </div>
          </div>
        </section>
    </div>
  )
}
