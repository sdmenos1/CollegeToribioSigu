import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { StudentProvider } from "@/contexts/student-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Portal Estudiantil",
  description: "Sistema de gestión estudiantil",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <StudentProvider>{children}</StudentProvider>
      </body>
    </html>
  )
}
