"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Github, Linkedin, Mail } from "lucide-react"
import { useTranslation } from "../hooks/use-translation"
import { motion } from "framer-motion"

export function ContactSection() {
  const { t } = useTranslation()
  return (
    <motion.section
      id="contact"
      className="py-20 px-2 sm:px-4 lg:px-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-mono font-bold text-terminal-green mb-8">
          <span className="text-terminal-cyan">$</span> curl --data &quot;message&quot; https://contact.api
        </h2>
        <div className="space-y-8">
          <Card className="border-terminal-green bg-background">
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
                    <a href="https://linkedin.com/in/luna-facundo" className="hover:text-terminal-cyan transition-colors">
                      linkedin.com/in/luna-facundo
                    </a>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="font-mono text-terminal-green">
            <span className="text-terminal-cyan">$</span> echo &quot;{t("contact.thanks")}&quot;<span className="animate-pulse">_</span>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
