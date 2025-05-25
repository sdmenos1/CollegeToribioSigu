import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { StudentProvider } from "@/contexts/student-context"
import { TeacherProvider } from "@/contexts/teacher-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Portal Educativo",
  description: "Sistema de gestión estudiantil y docente",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <StudentProvider>
          <TeacherProvider>{children}</TeacherProvider>
        </StudentProvider>
      </body>
    </html>
  )
}
