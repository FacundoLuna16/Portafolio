"use client"

import TerminalTimeline from "../components/terminalTimeline"
import { useTranslation } from "../hooks/use-translation"

export function HistorySection() {
  const { t } = useTranslation()
  return (
    <section
      id="history"
      className="py-20 px-2 sm:px-4 lg:px-8 bg-white text-foreground dark:bg-terminal-black dark:text-terminal-green"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-mono font-bold mb-8">
          <span className="text-terminal-cyan">$</span> history
        </h2>
        <p className="font-mono text-base mb-6">{t("history.description")}</p>
        <TerminalTimeline />
      </div>
    </section>
  )
}
