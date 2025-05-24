"use client"

import { useState, useEffect } from "react"
import { fetchStudentGrades, fetchCourseGrades, type StudentGradesData, type CourseGrades } from "@/lib/api"

export function useStudentGrades(studentId: string | null) {
  const [gradesData, setGradesData] = useState<StudentGradesData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!studentId) return

    const loadGrades = async () => {
      setLoading(true)
      setError(null)

      try {
        const data = await fetchStudentGrades(studentId)
        setGradesData(data)
      } catch (err) {
        setError("Error al cargar las calificaciones")
        console.error("Error loading grades:", err)
      } finally {
        setLoading(false)
      }
    }

    loadGrades()
  }, [studentId])

  return { gradesData, loading, error, refetch: () => setGradesData(null) }
}

export function useCourseGrades(studentId: string | null, courseId: string | null) {
  const [courseGrades, setCourseGrades] = useState<CourseGrades | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!studentId || !courseId) return

    const loadCourseGrades = async () => {
      setLoading(true)
      setError(null)

      try {
        const data = await fetchCourseGrades(studentId, courseId)
        setCourseGrades(data)
      } catch (err) {
        setError("Error al cargar las calificaciones del curso")
        console.error("Error loading course grades:", err)
      } finally {
        setLoading(false)
      }
    }

    loadCourseGrades()
  }, [studentId, courseId])

  return { courseGrades, loading, error }
}
