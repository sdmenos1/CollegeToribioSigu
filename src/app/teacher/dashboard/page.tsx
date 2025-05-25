"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useTeacher } from "@/contexts/teacher-context"
import TeacherInterface from "@/components/teacher-interface"
import LoadingScreen from "@/components/loadingScreen"

export default function TeacherDashboard() {
  const { currentTeacher } = useTeacher()
  const router = useRouter()

  useEffect(() => {
    // Redirect to login if no teacher is logged in
    if (!currentTeacher) {
      router.push("/teacher/login")
    }
  }, [currentTeacher, router])

  // Show loading while checking authentication
  if (!currentTeacher) {
    return <LoadingScreen />
  }

  return <TeacherInterface />
}
