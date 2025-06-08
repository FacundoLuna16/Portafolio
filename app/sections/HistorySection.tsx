"use client"

import TerminalTimeline from "../components/terminalTimeline"
import { useTranslation } from "../hooks/use-translation"
import { motion } from "framer-motion"

export function HistorySection() {
  const { t } = useTranslation()
  return (
    <motion.section
      id="history"
      className="py-20 px-2 sm:px-4 lg:px-8 bg-background text-foreground dark:text-terminal-green"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-mono font-bold mb-8">
          <span className="text-terminal-cyan">$</span> history
        </h2>
        <p className="font-mono text-base mb-6">{t("history.description")}</p>
        <TerminalTimeline />
      </div>
    </motion.section>
  )
}
