"use client"

import { useEffect } from "react"
import { useParams } from "next/navigation"
import { useStudent } from "@/contexts/student-context"
import StudentInterface from "@/components/InterfaceAlumno"
import LoadingScreen from "@/components/loadingScreen"
import ErrorScreen from "@/components/errorScreen"

export default function UserDashboard() {
  const params = useParams()
  const { initializeStudent, loading, error, currentStudent } = useStudent()

  const username = Array.isArray(params.user) ? params.user.join(".") : params.user

  useEffect(() => {
    if (username) {
      initializeStudent(username)
    }
  }, [username, initializeStudent])

  if (loading) {
    return <LoadingScreen />
  }

  if (error) {
    return <ErrorScreen error={error} username={username} />
  }

  if (!currentStudent) {
    return <ErrorScreen error="Student not found" username={username} />
  }

  return <StudentInterface />
}
