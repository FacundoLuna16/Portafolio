"use client"

import { ThemeProvider } from "next-themes"
import { TranslationProvider } from "./hooks/use-translation"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <TranslationProvider>{children}</TranslationProvider>
    </ThemeProvider>
  )
}
