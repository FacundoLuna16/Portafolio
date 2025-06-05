"use client"

import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { TranslationProvider } from "./hooks/use-translation"
import { DarkModeProvider, useDarkMode } from "./hooks/use-dark-mode"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Facundo Luna Developer - Backend | DevOps | Security",
  description: "Personal portfolio of a backend developer specializing in DevOps and Security",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DarkModeProvider>
      <LayoutInner>{children}</LayoutInner>
    </DarkModeProvider>
  )
}

function LayoutInner({ children }: { children: React.ReactNode }) {
  const { isDarkMode } = useDarkMode()
  return (
    <html lang="en" className={isDarkMode ? "dark" : ""}>
      <body className={`${inter.className} overflow-x-hidden`}>
        <TranslationProvider>{children}</TranslationProvider>
      </body>
    </html>
  )
}
