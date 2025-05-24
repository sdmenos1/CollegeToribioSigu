"use client"

import { useState, useEffect } from "react"

export interface StudentGrade {
  id: string
  type: string
  date: string
  score: number
  maxScore: number
  weight: number
  description?: string
}

export interface CourseGrades {
  courseId: string
  courseName: string
  teacher: string
  grades: StudentGrade[]
  finalGrade: number
  period: string
  status: "active" | "completed" | "pending"
}

export interface StudentGradesData {
  studentId: string
  courses: CourseGrades[]
  overallGPA: number
  academicPeriod: string
  totalCredits: number
}

const mockGradesData: Record<string, StudentGradesData> = {
  student_004: {
    studentId: "student_004",
    overallGPA: 16.8,
    academicPeriod: "I Bimestre 2024",
    totalCredits: 25,
    courses: [
      {
        courseId: "ALG001",
        courseName: "ALGEBRA",
        teacher: "Prof. María López Hernández",
        finalGrade: 17.2,
        period: "I Bimestre",
        status: "active",
        grades: [
          {
            id: "grade_001",
            type: "Examen Parcial",
            date: "2024-03-15",
            score: 18,
            maxScore: 20,
            weight: 30,
            description: "Primer examen parcial - Ecuaciones lineales",
          },
          {
            id: "grade_002",
            type: "Práctica Calificada",
            date: "2024-03-08",
            score: 16,
            maxScore: 20,
            weight: 20,
            description: "Ejercicios de factorización",
          },
          {
            id: "grade_003",
            type: "Tarea",
            date: "2024-03-01",
            score: 19,
            maxScore: 20,
            weight: 10,
            description: "Problemas de aplicación",
          },
          {
            id: "grade_004",
            type: "Participación",
            date: "2024-02-28",
            score: 17,
            maxScore: 20,
            weight: 15,
            description: "Participación en clase",
          },
        ],
      },
      {
        courseId: "FIS001",
        courseName: "FISICA",
        teacher: "Prof. Roberto Silva Vargas",
        finalGrade: 15.8,
        period: "I Bimestre",
        status: "active",
        grades: [
          {
            id: "grade_005",
            type: "Examen Parcial",
            date: "2024-03-12",
            score: 15,
            maxScore: 20,
            weight: 35,
            description: "Cinemática y dinámica",
          },
          {
            id: "grade_006",
            type: "Laboratorio",
            date: "2024-03-05",
            score: 18,
            maxScore: 20,
            weight: 25,
            description: "Práctica de laboratorio - Movimiento rectilíneo",
          },
          {
            id: "grade_007",
            type: "Informe",
            date: "2024-02-26",
            score: 14,
            maxScore: 20,
            weight: 20,
            description: "Informe de experimento",
          },
        ],
      },
      {
        courseId: "QUI001",
        courseName: "QUIMICA",
        teacher: "Prof. Diego Morales Castro",
        finalGrade: 18.1,
        period: "I Bimestre",
        status: "active",
        grades: [
          {
            id: "grade_008",
            type: "Examen Parcial",
            date: "2024-03-14",
            score: 19,
            maxScore: 20,
            weight: 40,
            description: "Tabla periódica y enlaces químicos",
          },
          {
            id: "grade_009",
            type: "Práctica de Lab",
            date: "2024-03-07",
            score: 17,
            maxScore: 20,
            weight: 30,
            description: "Reacciones químicas básicas",
          },
          {
            id: "grade_010",
            type: "Proyecto",
            date: "2024-02-29",
            score: 18,
            maxScore: 20,
            weight: 20,
            description: "Modelo molecular 3D",
          },
        ],
      },
      {
        courseId: "HIS001",
        courseName: "HISTORIA UNIVERSAL",
        teacher: "Prof. Carmen Flores Ruiz",
        finalGrade: 16.5,
        period: "I Bimestre",
        status: "active",
        grades: [
          {
            id: "grade_011",
            type: "Examen Parcial",
            date: "2024-03-13",
            score: 16,
            maxScore: 20,
            weight: 35,
            description: "Civilizaciones antiguas",
          },
          {
            id: "grade_012",
            type: "Ensayo",
            date: "2024-03-06",
            score: 17,
            maxScore: 20,
            weight: 25,
            description: "Ensayo sobre el Imperio Romano",
          },
          {
            id: "grade_013",
            type: "Exposición",
            date: "2024-02-27",
            score: 16,
            maxScore: 20,
            weight: 20,
            description: "Presentación grupal",
          },
        ],
      },
      {
        courseId: "COM001",
        courseName: "COMUNICACION",
        teacher: "Prof. Ana Beatriz Torres",
        finalGrade: 17.3,
        period: "I Bimestre",
        status: "active",
        grades: [
          {
            id: "grade_014",
            type: "Examen Parcial",
            date: "2024-03-11",
            score: 17,
            maxScore: 20,
            weight: 30,
            description: "Comprensión lectora y gramática",
          },
          {
            id: "grade_015",
            type: "Redacción",
            date: "2024-03-04",
            score: 18,
            maxScore: 20,
            weight: 25,
            description: "Ensayo argumentativo",
          },
          {
            id: "grade_016",
            type: "Oratoria",
            date: "2024-02-25",
            score: 17,
            maxScore: 20,
            weight: 20,
            description: "Discurso persuasivo",
          },
        ],
      },
      {
        courseId: "ING001",
        courseName: "INGLES",
        teacher: "Prof. Jennifer Smith",
        finalGrade: 15.9,
        period: "I Bimestre",
        status: "active",
        grades: [
          {
            id: "grade_017",
            type: "Examen Oral",
            date: "2024-03-10",
            score: 16,
            maxScore: 20,
            weight: 30,
            description: "Speaking test - Daily routines",
          },
          {
            id: "grade_018",
            type: "Examen Escrito",
            date: "2024-03-03",
            score: 15,
            maxScore: 20,
            weight: 35,
            description: "Grammar and vocabulary test",
          },
          {
            id: "grade_019",
            type: "Listening",
            date: "2024-02-24",
            score: 16,
            maxScore: 20,
            weight: 20,
            description: "Audio comprehension",
          },
        ],
      },
    ],
  }
}

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
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const data = mockGradesData[studentId]
        if (data) {
          setGradesData(data)
        } else {
          setGradesData({
            studentId,
            overallGPA: 0,
            academicPeriod: "I Bimestre 2024",
            totalCredits: 0,
            courses: [],
          })
        }
      } catch (err) {
        setError("Error al cargar las calificaciones")
        console.error("Error loading grades:", err)
      } finally {
        setLoading(false)
      }
    }

    loadGrades()
  }, [studentId])

  const refetch = () => {
    if (studentId) {
      setGradesData(null)
      setLoading(true)
      setTimeout(() => {
        const data = mockGradesData[studentId]
        if (data) {
          setGradesData(data)
        }
        setLoading(false)
      }, 500)
    }
  }

  return { gradesData, loading, error, refetch }
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
        await new Promise((resolve) => setTimeout(resolve, 800))

        const studentData = mockGradesData[studentId]
        if (studentData) {
          const course = studentData.courses.find((c) => c.courseId === courseId)
          if (course) {
            setCourseGrades(course)
          } else {
            setError("Curso no encontrado")
          }
        } else {
          setError("Estudiante no encontrado")
        }
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
