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
    if (!currentStudent) {
      router.push("/")
    }
  }, [currentStudent, router])

  if (!currentStudent) {
    return <LoadingScreen />
  }

  return <StudentInterface />
}
