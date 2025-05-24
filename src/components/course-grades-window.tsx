"use client"

import { GraduationCap, Award, TrendingUp, Calendar, Loader2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useCourseGrades } from "@/hooks/user-grade"

interface CourseGradesWindowProps {
  studentId: string
  courseId: string
  onClose: () => void
}

export default function CourseGradesWindow({ studentId, courseId, onClose }: CourseGradesWindowProps) {
  const { courseGrades, loading, error } = useCourseGrades(studentId, courseId)

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
              <h2 className="text-2xl font-bold mb-2">
                {loading ? "Cargando..." : courseGrades?.courseName || "Curso"}
              </h2>
              {courseGrades && (
                <>
                  <p className="text-amber-100">{courseGrades.teacher}</p>
                  <p className="text-amber-100 text-sm">{courseGrades.period}</p>
                </>
              )}
            </div>
            {courseGrades && (
              <div className="text-right">
                <div className="bg-white bg-opacity-20 rounded-lg p-3">
                  <p className="text-sm text-amber-100">Nota Final</p>
                  <p className="text-3xl font-bold">{courseGrades.finalGrade.toFixed(1)}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <Loader2 className="w-8 h-8 animate-spin text-amber-500 mx-auto mb-4" />
                <p className="text-gray-600">Cargando calificaciones del curso...</p>
              </div>
            </div>
          )}

          {error && (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-4" />
                <p className="text-red-600 mb-4">{error}</p>
                <Button onClick={onClose} variant="outline">
                  Cerrar
                </Button>
              </div>
            </div>
          )}

          {courseGrades && (
            <>
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
                        <p className="text-xl font-bold text-gray-900">{courseGrades.finalGrade.toFixed(1)}</p>
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
                        <p className="text-xl font-bold text-gray-900">{courseGrades.grades.length}</p>
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
                        <p className="text-lg font-bold text-gray-900">{courseGrades.period}</p>
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
                  {courseGrades.grades.length === 0 ? (
                    <div className="text-center py-8">
                      <GraduationCap className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No hay evaluaciones registradas para este curso</p>
                    </div>
                  ) : (
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
                        {courseGrades.grades.map((grade) => (
                          <TableRow key={grade.id}>
                            <TableCell>
                              <div>
                                <p className="font-medium">{grade.type}</p>
                                {grade.description && <p className="text-sm text-gray-500">{grade.description}</p>}
                              </div>
                            </TableCell>
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
                  )}
                </CardContent>
              </Card>

              {/* Grade Distribution */}
              {courseGrades.grades.length > 0 && (
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Distribución de Notas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {courseGrades.grades.map((grade) => {
                        const percentage = (grade.score / grade.maxScore) * 100
                        return (
                          <div key={grade.id} className="flex items-center gap-4">
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
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="border-t bg-gray-50 p-4 flex justify-end gap-3">
          <Button onClick={onClose} variant="outline">
            Cerrar
          </Button>
          {courseGrades && (
            <Button onClick={() => window.print()} className="bg-amber-500 hover:bg-amber-600">
              Imprimir
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
