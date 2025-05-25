"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

export interface Teacher {
  id: string
  name: string
  email: string
  department: string
  employeeCode: string
  avatar?: string
}

export interface Student {
  id: string
  name: string
  grade: string
  section: string
  level: string
  studentCode: string
  email?: string
  avatar?: string
}

export interface TeacherCourse {
  id: string
  name: string
  grade: string
  section: string
  level: string
  schedule: Array<{
    day: string
    time: string
  }>
  room: string
  students: Student[]
  color: string
}

export interface AttendanceRecord {
  studentId: string
  date: string
  status: "present" | "absent" | "late"
  notes?: string
}

export interface GradeRecord {
  id: string
  studentId: string
  courseId: string
  type: string
  score: number
  maxScore: number
  date: string
  description?: string
  weight: number
}

interface TeacherContextType {
  currentTeacher: Teacher | null
  courses: TeacherCourse[]
  loading: boolean
  error: string | null
  setTeacherData: (teacher: Teacher, courses: TeacherCourse[]) => void
  clearTeacherData: () => void
  initializeTeacher: (email: string) => Promise<void>
  updateAttendance: (courseId: string, date: string, records: AttendanceRecord[]) => void
  addGrade: (grade: GradeRecord) => void
  updateGrade: (gradeId: string, updates: Partial<GradeRecord>) => void
}

const TeacherContext = createContext<TeacherContextType | undefined>(undefined)

export function TeacherProvider({ children }: { children: React.ReactNode }) {
  const [currentTeacher, setCurrentTeacher] = useState<Teacher | null>(null)
  const [courses, setCourses] = useState<TeacherCourse[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const setTeacherData = (teacher: Teacher, teacherCourses: TeacherCourse[]) => {
    setCurrentTeacher(teacher)
    setCourses(teacherCourses)
    setError(null)
  }

  const clearTeacherData = () => {
    setCurrentTeacher(null)
    setCourses([])
    setError(null)
  }

  const initializeTeacher = async (email: string) => {
    setLoading(true)
    setError(null)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      const mockTeacherData: Record<string, { teacher: Teacher; courses: TeacherCourse[] }> = {
        "maria.lopez@colegio.edu": {
          teacher: {
            id: "teacher_001",
            name: "Prof. María López Hernández",
            email: "maria.lopez@colegio.edu",
            department: "Matemáticas",
            employeeCode: "PROF-2024-001",
          },
          courses: [
            {
              id: "ALG001",
              name: "ALGEBRA",
              grade: "4°",
              section: "B",
              level: "SECUNDARIA",
              schedule: [
                { day: "Lunes", time: "08:00:00 - 09:30:00" },
                { day: "Miércoles", time: "10:00:00 - 11:30:00" },
                { day: "Viernes", time: "08:00:00 - 09:30:00" },
              ],
              room: "Aula 205",
              color: "bg-blue-600",
              students: [
                {
                  id: "student_004",
                  name: "Carlos Mendoza López",
                  grade: "4°",
                  section: "B",
                  level: "SECUNDARIA",
                  studentCode: "2024-4B-015",
                  email: "carlos.mendoza@colegio.edu",
                }
              ],
            }
          ],
        }
      }

      const teacherData = mockTeacherData[email]
      if (teacherData) {
        setTeacherData(teacherData.teacher, teacherData.courses)
      } else {
        throw new Error("Teacher not found")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error loading teacher data")
    } finally {
      setLoading(false)
    }
  }

  const updateAttendance = (courseId: string, date: string, records: AttendanceRecord[]) => {
    console.log("Updating attendance:", { courseId, date, records })
  }

  const addGrade = (grade: GradeRecord) => {
    console.log("Adding grade:", grade)
  }

  const updateGrade = (gradeId: string, updates: Partial<GradeRecord>) => {
    console.log("Updating grade:", { gradeId, updates })
  }

  return (
    <TeacherContext.Provider
      value={{
        currentTeacher,
        courses,
        loading,
        error,
        setTeacherData,
        clearTeacherData,
        initializeTeacher,
        updateAttendance,
        addGrade,
        updateGrade,
      }}
    >
      {children}
    </TeacherContext.Provider>
  )
}

export function useTeacher() {
  const context = useContext(TeacherContext)
  if (context === undefined) {
    throw new Error("useTeacher must be used within a TeacherProvider")
  }
  return context
}
