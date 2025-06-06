import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { TranslationProvider } from "./hooks/use-translation"

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
    <html lang="en">
      <body className={inter.className}>
        <TranslationProvider>{children}</TranslationProvider>
      </body>
    </html>
  )
}
