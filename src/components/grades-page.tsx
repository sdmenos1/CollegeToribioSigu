"use client"

import { useState } from "react"
import { GraduationCap, FileText, Eye, TrendingUp, Calendar, Award, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useStudent } from "@/contexts/student-context"
import { useStudentGrades } from "@/hooks/user-grade"
import CourseGradesWindow from "./course-grades-window"

// Loading skeleton component
function GradesLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
          <div>
            <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mb-2"></div>
            <div className="h-4 w-64 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Summary Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                <div>
                  <div className="h-4 w-20 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-6 w-12 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Table Skeleton */}
      <Card>
        <CardHeader>
          <div className="h-6 w-48 bg-gray-200 rounded animate-pulse"></div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Error component
function GradesError({ error, onRetry }: { error: string; onRetry: () => void }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error al cargar calificaciones</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button onClick={onRetry} className="bg-amber-500 hover:bg-amber-600">
            Intentar nuevamente
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default function GradesPage() {
  const { currentStudent } = useStudent()
  const { gradesData, loading, error, refetch } = useStudentGrades(currentStudent?.id || null)
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null)

  // Show loading state
  if (loading) {
    return <GradesLoadingSkeleton />
  }

  // Show error state
  if (error) {
    return <GradesError error={error} onRetry={refetch} />
  }

  // Show empty state if no student
  if (!currentStudent) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">No hay información del estudiante disponible</p>
      </div>
    )
  }

  // Show empty state if no grades data
  if (!gradesData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <GraduationCap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No hay calificaciones disponibles</h2>
            <p className="text-gray-600">Las calificaciones aparecerán aquí una vez que sean registradas.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const openGradesWindow = (courseId: string) => {
    setSelectedCourse(courseId)
  }

  const closeGradesWindow = () => {
    setSelectedCourse(null)
  }

  const getGradeStatus = (grade: number) => {
    if (grade >= 18) return { label: "Excelente", class: "bg-green-100 text-green-800" }
    if (grade >= 15) return { label: "Bueno", class: "bg-blue-100 text-blue-800" }
    if (grade >= 11) return { label: "Regular", class: "bg-yellow-100 text-yellow-800" }
    return { label: "Deficiente", class: "bg-red-100 text-red-800" }
  }

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
                <p className="text-2xl font-bold text-gray-900">{gradesData.overallGPA.toFixed(1)}</p>
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
                <p className="text-2xl font-bold text-gray-900">{gradesData.courses.length}</p>
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
                <p className="text-lg font-bold text-gray-900">{gradesData.academicPeriod}</p>
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
                <p className="text-sm font-medium text-gray-500">Créditos Totales</p>
                <p className="text-lg font-bold text-gray-900">{gradesData.totalCredits}</p>
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
          {gradesData.courses.length === 0 ? (
            <div className="text-center py-8">
              <GraduationCap className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No hay cursos registrados</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Curso</TableHead>
                  <TableHead>Docente</TableHead>
                  <TableHead>Período</TableHead>
                  <TableHead>Evaluaciones</TableHead>
                  <TableHead>Nota Final</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {gradesData.courses.map((course) => {
                  const status = getGradeStatus(course.finalGrade)

                  return (
                    <TableRow key={course.courseId} className="hover:bg-gray-50">
                      <TableCell>
                        <div>
                          <p className="font-medium text-gray-900">{course.courseName}</p>
                          <p className="text-sm text-gray-500">{course.courseId}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm text-gray-900">{course.teacher}</p>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm text-gray-900">{course.period}</p>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{course.grades.length} evaluaciones</Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-lg font-bold text-gray-900">{course.finalGrade.toFixed(1)}</span>
                      </TableCell>
                      <TableCell>
                        <Badge className={status.class}>{status.label}</Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          onClick={() => openGradesWindow(course.courseId)}
                          size="sm"
                          className="bg-amber-500 hover:bg-amber-600 text-white"
                          disabled={course.grades.length === 0}
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
          )}
        </CardContent>
      </Card>

      {/* Grade Distribution Chart */}
      {gradesData.courses.length > 0 && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Distribución de Calificaciones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {gradesData.courses.map((course) => {
                const percentage = (course.finalGrade / 20) * 100

                return (
                  <div key={course.courseId} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-900">{course.courseName}</h4>
                      <span className="text-lg font-bold text-gray-900">{course.finalGrade.toFixed(1)}</span>
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
                    
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Course Grades Modal */}
      {selectedCourse && (
        <CourseGradesWindow studentId={currentStudent.id} courseId={selectedCourse} onClose={closeGradesWindow} />
      )}
    </div>
  )
}
