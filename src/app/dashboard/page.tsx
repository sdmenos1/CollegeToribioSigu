"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useStudent } from "@/contexts/student-context"
import StudentInterface from "@/components/InterfaceAlumno"
import LoadingScreen from "@/components/loadingScreen"

export default function DashboardPage() {
  const { currentStudent } = useStudent()
  const router = useRouter()

  useEffect(() => {
    // Redirect to login if no student is logged in
    if (!currentStudent) {
      router.push("/")
    }
  }, [currentStudent, router])

  // Show loading while checking authentication
  if (!currentStudent) {
    return <LoadingScreen />
  }

  return <StudentInterface />
}
