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

  // Extract username from the dynamic route
  const username = Array.isArray(params.user) ? params.user.join(".") : params.user

  useEffect(() => {
    if (username) {
      initializeStudent(username)
    }
  }, [username, initializeStudent])

  // Show loading screen while fetching data
  if (loading) {
    return <LoadingScreen />
  }

  // Show error screen if there's an error
  if (error) {
    return <ErrorScreen error={error} username={username} />
  }

  // Show error if no student found
  if (!currentStudent) {
    return <ErrorScreen error="Student not found" username={username} />
  }

  // Render the main interface
  return <StudentInterface />
}
