import type React from "react"
import { TeacherProvider } from "@/contexts/teacher-context"

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <TeacherProvider>{children}</TeacherProvider>
}
