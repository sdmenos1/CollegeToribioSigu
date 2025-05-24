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
  setStudentData: (student: Student, courses: Course[]) => void
  clearStudentData: () => void
}

const StudentContext = createContext<StudentContextType | undefined>(undefined)

export function StudentProvider({ children }: { children: React.ReactNode }) {
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null)
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(false)

  const setStudentData = (student: Student, studentCourses: Course[]) => {
    setCurrentStudent(student)
    setCourses(studentCourses)
  }

  const clearStudentData = () => {
    setCurrentStudent(null)
    setCourses([])
  }

  return (
    <StudentContext.Provider
      value={{
        currentStudent,
        courses,
        loading,
        setStudentData,
        clearStudentData,
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
