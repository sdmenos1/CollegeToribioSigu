
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

export async function fetchStudentGrades(studentId: string): Promise<StudentGradesData> {
  try {
    const response = await fetch(`/api/students/${studentId}/grades`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",

      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch grades")
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching student grades:", error)
    throw error
  }
}

export async function fetchCourseGrades(studentId: string, courseId: string): Promise<CourseGrades> {
  try {
    const response = await fetch(`/api/students/${studentId}/courses/${courseId}/grades`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch course grades")
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching course grades:", error)
    throw error
  }
}