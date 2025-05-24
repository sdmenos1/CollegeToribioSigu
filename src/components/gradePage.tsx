"use client"

import { useState } from "react"
import { GraduationCap, FileText, Eye, TrendingUp, Calendar, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useStudent } from "@/contexts/student-context"

// Mock grades data
const mockGradesData: Record<string, any> = {
  ALG001: {
    courseName: "ALGEBRA",
    teacher: "Prof. María López Hernández",
    grades: [
      { type: "Examen Parcial", date: "2024-03-15", score: 18, maxScore: 20, weight: 30 },
      { type: "Práctica Calificada 1", date: "2024-03-08", score: 16, maxScore: 20, weight: 15 },
      { type: "Práctica Calificada 2", date: "2024-03-22", score: 17, maxScore: 20, weight: 15 },
      { type: "Tarea 1", date: "2024-03-01", score: 19, maxScore: 20, weight: 10 },
      { type: "Tarea 2", date: "2024-03-10", score: 18, maxScore: 20, weight: 10 },
      { type: "Participación", date: "2024-03-25", score: 20, maxScore: 20, weight: 20 },
    ],
    finalGrade: 17.8,
    period: "I Bimestre",
  },
  FIS001: {
    courseName: "FISICA",
    teacher: "Prof. Roberto Silva Vargas",
    grades: [
      { type: "Examen Parcial", date: "2024-03-18", score: 16, maxScore: 20, weight: 35 },
      { type: "Laboratorio 1", date: "2024-03-05", score: 19, maxScore: 20, weight: 20 },
      { type: "Laboratorio 2", date: "2024-03-12", score: 18, maxScore: 20, weight: 20 },
      { type: "Proyecto", date: "2024-03-20", score: 17, maxScore: 20, weight: 15 },
      { type: "Participación", date: "2024-03-25", score: 19, maxScore: 20, weight: 10 },
    ],
    finalGrade: 17.2,
    period: "I Bimestre",
  },
  QUI001: {
    courseName: "QUIMICA",
    teacher: "Prof. Diego Morales Castro",
    grades: [
      { type: "Examen Parcial", date: "2024-03-16", score: 15, maxScore: 20, weight: 40 },
      { type: "Práctica de Lab 1", date: "2024-03-06", score: 18, maxScore: 20, weight: 25 },
      { type: "Práctica de Lab 2", date: "2024-03-13", score: 17, maxScore: 20, weight: 25 },
      { type: "Informe", date: "2024-03-21", score: 16, maxScore: 20, weight: 10 },
    ],
    finalGrade: 16.3,
    period: "I Bimestre",
  },
  HIS001: {
    courseName: "HISTORIA UNIVERSAL",
    teacher: "Prof. Carmen Flores Ruiz",
    grades: [
      { type: "Examen Parcial", date: "2024-03-14", score: 17, maxScore: 20, weight: 30 },
      { type: "Ensayo 1", date: "2024-03-07", score: 18, maxScore: 20, weight: 25 },
      { type: "Ensayo 2", date: "2024-03-21", score: 16, maxScore: 20, weight: 25 },
      { type: "Exposición", date: "2024-03-19", score: 19, maxScore: 20, weight: 20 },
    ],
    finalGrade: 17.4,
    period: "I Bimestre",
  },
  COM001: {
    courseName: "COMUNICACION",
    teacher: "Prof. Ana Beatriz Torres",
    grades: [
      { type: "Examen Parcial", date: "2024-03-17", score: 19, maxScore: 20, weight: 30 },
      { type: "Redacción 1", date: "2024-03-04", score: 18, maxScore: 20, weight: 20 },
      { type: "Redacción 2", date: "2024-03-11", score: 17, maxScore: 20, weight: 20 },
      { type: "Comprensión Lectora", date: "2024-03-18", score: 20, maxScore: 20, weight: 15 },
      { type: "Oratoria", date: "2024-03-23", score: 18, maxScore: 20, weight: 15 },
    ],
    finalGrade: 18.3,
    period: "I Bimestre",
  },
  ING001: {
    courseName: "INGLES",
    teacher: "Prof. Jennifer Smith",
    grades: [
      { type: "Oral Exam", date: "2024-03-15", score: 17, maxScore: 20, weight: 25 },
      { type: "Written Exam", date: "2024-03-20", score: 18, maxScore: 20, weight: 25 },
      { type: "Listening Test", date: "2024-03-08", score: 16, maxScore: 20, weight: 20 },
      { type: "Grammar Quiz", date: "2024-03-12", score: 19, maxScore: 20, weight: 15 },
      { type: "Vocabulary Quiz", date: "2024-03-22", score: 18, maxScore: 20, weight: 15 },
    ],
    finalGrade: 17.6,
    period: "I Bimestre",
  },
}

function CourseGradesWindow({ courseId, onClose }: { courseId: string; onClose: () => void }) {
  const gradeData = mockGradesData[courseId]

  if (!gradeData) return null

  const getGradeColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100
    if (percentage >= 90) return "text-green-600"
    if (percentage >= 75) return "text-blue-600"
    if (percentage >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getGradeBadge = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100
    if (percentage >= 90) return "bg-green-100 text-green-800"
    if (percentage >= 75) return "bg-blue-100 text-blue-800"
    if (percentage >= 60) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-400 to-amber-500 text-white p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold mb-2">{gradeData.courseName}</h2>
              <p className="text-amber-100">{gradeData.teacher}</p>
              <p className="text-amber-100 text-sm">{gradeData.period}</p>
            </div>
            <div className="text-right">
              <div className="bg-white bg-opacity-20 rounded-lg p-3">
                <p className="text-sm text-amber-100">Nota Final</p>
                <p className="text-3xl font-bold">{gradeData.finalGrade}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Award className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Promedio</p>
                    <p className="text-xl font-bold text-gray-900">{gradeData.finalGrade}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Evaluaciones</p>
                    <p className="text-xl font-bold text-gray-900">{gradeData.grades.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Período</p>
                    <p className="text-lg font-bold text-gray-900">{gradeData.period}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Grades Table */}
          <Card>
            <CardHeader>
              <CardTitle>Detalle de Calificaciones</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Evaluación</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Nota</TableHead>
                    <TableHead>Peso (%)</TableHead>
                    <TableHead>Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {gradeData.grades.map((grade: any, index: number) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{grade.type}</TableCell>
                      <TableCell>{new Date(grade.date).toLocaleDateString("es-ES")}</TableCell>
                      <TableCell>
                        <span className={`font-bold ${getGradeColor(grade.score, grade.maxScore)}`}>
                          {grade.score}/{grade.maxScore}
                        </span>
                      </TableCell>
                      <TableCell>{grade.weight}%</TableCell>
                      <TableCell>
                        <Badge className={getGradeBadge(grade.score, grade.maxScore)}>
                          {((grade.score / grade.maxScore) * 100).toFixed(0)}%
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Grade Distribution */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Distribución de Notas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {gradeData.grades.map((grade: any, index: number) => {
                  const percentage = (grade.score / grade.maxScore) * 100
                  return (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-32 text-sm font-medium">{grade.type}</div>
                      <div className="flex-1 bg-gray-200 rounded-full h-3">
                        <div
                          className={`h-3 rounded-full ${
                            percentage >= 90
                              ? "bg-green-500"
                              : percentage >= 75
                                ? "bg-blue-500"
                                : percentage >= 60
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                          }`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <div className="w-16 text-sm font-bold text-right">{percentage.toFixed(0)}%</div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="border-t bg-gray-50 p-4 flex justify-end gap-3">
          <Button onClick={onClose} variant="outline">
            Cerrar
          </Button>
          <Button onClick={() => window.print()} className="bg-amber-500 hover:bg-amber-600">
            Imprimir
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function GradesPage() {
  const { currentStudent, courses } = useStudent()
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null)

  if (!currentStudent) {
    return null
  }

  const openGradesWindow = (courseId: string) => {
    setSelectedCourse(courseId)
  }

  const closeGradesWindow = () => {
    setSelectedCourse(null)
  }

  // Calculate overall GPA
  const overallGPA =
    courses.length > 0
      ? courses.reduce((sum, course) => {
          const gradeData = mockGradesData[course.id]
          return sum + (gradeData?.finalGrade || 0)
        }, 0) / courses.length
      : 0

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-500 rounded-lg flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">MIS CALIFICACIONES</h1>
            <p className="text-sm text-gray-600">
              {currentStudent.grade} {currentStudent.section} - Año Académico {currentStudent.academicYear}
            </p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Promedio General</p>
                <p className="text-2xl font-bold text-gray-900">{overallGPA.toFixed(1)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Award className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Cursos</p>
                <p className="text-2xl font-bold text-gray-900">{courses.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Período Actual</p>
                <p className="text-lg font-bold text-gray-900">I Bimestre</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Año Académico</p>
                <p className="text-lg font-bold text-gray-900">{currentStudent.academicYear}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Courses Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Mis Cursos y Calificaciones
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Curso</TableHead>
                <TableHead>Docente</TableHead>
                <TableHead>Aula</TableHead>
                <TableHead>Créditos</TableHead>
                <TableHead>Nota Final</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.map((course) => {
                const gradeData = mockGradesData[course.id]
                const finalGrade = gradeData?.finalGrade || 0
                const getGradeStatus = (grade: number) => {
                  if (grade >= 18) return { label: "Excelente", class: "bg-green-100 text-green-800" }
                  if (grade >= 15) return { label: "Bueno", class: "bg-blue-100 text-blue-800" }
                  if (grade >= 11) return { label: "Regular", class: "bg-yellow-100 text-yellow-800" }
                  return { label: "Deficiente", class: "bg-red-100 text-red-800" }
                }

                const status = getGradeStatus(finalGrade)

                return (
                  <TableRow key={course.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 ${course.color} rounded-full`}></div>
                        <div>
                          <p className="font-medium text-gray-900">{course.name}</p>
                          <p className="text-sm text-gray-500">{course.level}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm text-gray-900">{course.teacher}</p>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm text-gray-900">{course.room}</p>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{course.credits} créditos</Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-lg font-bold text-gray-900">{finalGrade}</span>
                    </TableCell>
                    <TableCell>
                      <Badge className={status.class}>{status.label}</Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => openGradesWindow(course.id)}
                        size="sm"
                        className="bg-amber-500 hover:bg-amber-600 text-white"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Ver Detalle
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Grade Distribution Chart */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Distribución de Calificaciones</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.map((course) => {
              const gradeData = mockGradesData[course.id]
              const finalGrade = gradeData?.finalGrade || 0
              const percentage = (finalGrade / 20) * 100

              return (
                <div key={course.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900">{course.name}</h4>
                    <span className="text-lg font-bold text-gray-900">{finalGrade}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full ${
                        percentage >= 90
                          ? "bg-green-500"
                          : percentage >= 75
                            ? "bg-blue-500"
                            : percentage >= 55
                              ? "bg-yellow-500"
                              : "bg-red-500"
                      }`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">{percentage.toFixed(0)}% del máximo</p>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Course Grades Modal */}
      {selectedCourse && <CourseGradesWindow courseId={selectedCourse} onClose={closeGradesWindow} />}
    </div>
  )
}
