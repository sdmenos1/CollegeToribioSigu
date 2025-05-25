"use client"

import { useState } from "react"
import { Users, Search, Filter, Mail, Phone, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTeacher } from "@/contexts/teacher-context"

export default function TeacherStudentsPage() {
  const { currentTeacher, courses } = useTeacher()
  const [selectedCourse, setSelectedCourse] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")

  if (!currentTeacher) {
    return null
  }

  // Get all students from all courses or filtered by course
  const allStudents =
    selectedCourse === "all"
      ? courses.flatMap((course) =>
          course.students.map((student) => ({
            ...student,
            courseName: course.name,
            courseGrade: course.grade,
            courseSection: course.section,
            courseColor: course.color,
          })),
        )
      : courses
          .filter((course) => course.id === selectedCourse)
          .flatMap((course) =>
            course.students.map((student) => ({
              ...student,
              courseName: course.name,
              courseGrade: course.grade,
              courseSection: course.section,
              courseColor: course.color,
            })),
          )

  // Filter students by search term
  const filteredStudents = allStudents.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Get unique students (in case a student appears in multiple courses)
  const uniqueStudents = filteredStudents.reduce(
    (acc, student) => {
      const existing = acc.find((s) => s.id === student.id)
      if (!existing) {
        acc.push(student)
      }
      return acc
    },
    [] as typeof filteredStudents,
  )

  const totalStudents = courses.reduce((sum, course) => sum + course.students.length, 0)

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-lg flex items-center justify-center">
            <Users className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">MIS ESTUDIANTES</h1>
            <p className="text-sm text-gray-600">Gestiona la información de tus estudiantes</p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Estudiantes</p>
                <p className="text-2xl font-bold text-gray-900">{totalStudents}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Cursos Asignados</p>
                <p className="text-2xl font-bold text-gray-900">{courses.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Filter className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Filtrados</p>
                <p className="text-2xl font-bold text-gray-900">{uniqueStudents.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Buscar estudiante</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Nombre, código o email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filtrar por curso</label>
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los cursos</SelectItem>
                  {courses.map((course) => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.name} - {course.grade} {course.section}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Students List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Lista de Estudiantes
            <Badge variant="outline" className="ml-auto">
              {uniqueStudents.length} estudiantes
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {uniqueStudents.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No se encontraron estudiantes</h3>
              <p className="text-gray-600">
                {searchTerm
                  ? "Intenta con otros términos de búsqueda"
                  : "No hay estudiantes en los cursos seleccionados"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {uniqueStudents.map((student) => (
                <div key={student.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  {/* Student Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-600">
                        {student.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{student.name}</h4>
                      <p className="text-sm text-gray-500">{student.studentCode}</p>
                    </div>
                  </div>

                  {/* Student Info */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <GraduationCap className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">
                        {student.courseGrade} {student.courseSection} - {student.level}
                      </span>
                    </div>

                    {student.email && (
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600 truncate">{student.email}</span>
                      </div>
                    )}
                  </div>

                  {/* Course Badge */}
                  <div className="flex items-center justify-between">
                    <Badge
                      className={`${student.courseColor.replace("bg-", "bg-").replace("-500", "-100")} ${student.courseColor.replace("bg-", "text-").replace("-500", "-800")} text-xs`}
                    >
                      {student.courseName}
                    </Badge>

                    <div className="flex gap-1">
                      <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                        <Mail className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                        <Phone className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
