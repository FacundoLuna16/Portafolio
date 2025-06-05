"use client"

import { useState } from "react"

export function useCommandAnimation() {
  const [command, setCommand] = useState<string | null>(null)

  const runCommand = (cmd: string) => {
    setCommand(cmd)
    setTimeout(() => setCommand(null), 1000)
  }

  return { command, runCommand }
}
