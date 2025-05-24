"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

export interface Student {
  id: string
  name: string
  grade: string
  section: string
  level: string
  avatar?: string
  academicYear: string
  email?: string
  studentCode?: string
}

export interface Course {
  id: string
  name: string
  teacher: string
  schedule: Array<{
    day: string
    time: string
  }>
  level: string
  grade: string
  section: string
  color: string
  room?: string
  credits?: number
}

interface StudentContextType {
  currentStudent: Student | null
  courses: Course[]
  loading: boolean
  error: string | null
  setStudentData: (student: Student, courses: Course[]) => void
  clearStudentData: () => void
  initializeStudent: (username: string) => Promise<void>
}

const StudentContext = createContext<StudentContextType | undefined>(undefined)

export function StudentProvider({ children }: { children: React.ReactNode }) {
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null)
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const setStudentData = (student: Student, studentCourses: Course[]) => {
    setCurrentStudent(student)
    setCourses(studentCourses)
    setError(null)
  }

  const clearStudentData = () => {
    setCurrentStudent(null)
    setCourses([])
    setError(null)
  }

  const initializeStudent = async (username: string) => {
    setLoading(true)
    setError(null)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      const mockStudentData: Record<string, { student: Student; courses: Course[] }> = {
        "carlos.mendoza": {
          student: {
            id: "student_004",
            name: "Carlos Mendoza López",
            grade: "4°",
            section: "B",
            level: "SECUNDARIA",
            academicYear: "2024",
            email: "carlos.mendoza@colegio.edu",
            studentCode: "2024-4B-015",
          },
          courses: [
            {
              id: "ALG001",
              name: "ALGEBRA",
              teacher: "Prof. María López Hernández",
              schedule: [
                { day: "Lunes", time: "08:00:00 - 09:30:00" },
                { day: "Miércoles", time: "10:00:00 - 11:30:00" },
                { day: "Viernes", time: "08:00:00 - 09:30:00" },
              ],
              level: "SECUNDARIA",
              grade: "4°",
              section: "B",
              color: "bg-blue-600",
              room: "Aula 205",
              credits: 5,
            },
            {
              id: "FIS001",
              name: "FISICA",
              teacher: "Prof. Roberto Silva Vargas",
              schedule: [
                { day: "Martes", time: "08:00:00 - 09:30:00" },
                { day: "Jueves", time: "10:00:00 - 11:30:00" },
              ],
              level: "SECUNDARIA",
              grade: "4°",
              section: "B",
              color: "bg-purple-500",
              room: "Lab 301",
              credits: 4,
            },
            {
              id: "HIS001",
              name: "HISTORIA UNIVERSAL",
              teacher: "Prof. Carmen Flores Ruiz",
              schedule: [
                { day: "Martes", time: "10:30:00 - 12:00:00" },
                { day: "Viernes", time: "10:00:00 - 11:30:00" },
              ],
              level: "SECUNDARIA",
              grade: "4°",
              section: "B",
              color: "bg-emerald-500",
              room: "Aula 203",
              credits: 3,
            },
            {
              id: "QUI001",
              name: "QUIMICA",
              teacher: "Prof. Diego Morales Castro",
              schedule: [
                { day: "Lunes", time: "10:00:00 - 11:30:00" },
                { day: "Miércoles", time: "08:00:00 - 09:30:00" },
                { day: "Jueves", time: "08:00:00 - 09:30:00" },
              ],
              level: "SECUNDARIA",
              grade: "4°",
              section: "B",
              color: "bg-orange-500",
              room: "Lab 302",
              credits: 4,
            },
            {
              id: "COM001",
              name: "COMUNICACION",
              teacher: "Prof. Ana Beatriz Torres",
              schedule: [
                { day: "Lunes", time: "11:30:00 - 13:00:00" },
                { day: "Jueves", time: "11:30:00 - 13:00:00" },
              ],
              level: "SECUNDARIA",
              grade: "4°",
              section: "B",
              color: "bg-indigo-500",
              room: "Aula 104",
              credits: 4,
            },
            {
              id: "ING001",
              name: "INGLES",
              teacher: "Prof. Jennifer Smith",
              schedule: [
                { day: "Martes", time: "11:30:00 - 13:00:00" },
                { day: "Viernes", time: "11:30:00 - 13:00:00" },
              ],
              level: "SECUNDARIA",
              grade: "4°",
              section: "B",
              color: "bg-cyan-500",
              room: "Aula 106",
              credits: 3,
            },
          ],
        }
      }

      const studentData = mockStudentData[username]
      if (studentData) {
        setStudentData(studentData.student, studentData.courses)
      } else {
        throw new Error("Student not found")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error loading student data")
    } finally {
      setLoading(false)
    }
  }

  return (
    <StudentContext.Provider
      value={{
        currentStudent,
        courses,
        loading,
        error,
        setStudentData,
        clearStudentData,
        initializeStudent,
      }}
    >
      {children}
    </StudentContext.Provider>
  )
}

export function useStudent() {
  const context = useContext(StudentContext)
  if (context === undefined) {
    throw new Error("useStudent must be used within a StudentProvider")
  }
  return context
}
