"use client"

import { Calendar, CheckCircle, XCircle, Clock, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useStudent } from "@/contexts/student-context"

const mockAttendanceData = {
  totalClasses: 120,
  attendedClasses: 114,
  absences: 6,
  tardiness: 3,
  attendancePercentage: 95,
  recentAttendance: [
    { date: "2024-01-15", course: "ALGEBRA", status: "present", time: "08:00" },
    { date: "2024-01-15", course: "FISICA", status: "present", time: "10:00" },
    { date: "2024-01-14", course: "QUIMICA", status: "absent", time: "08:00" },
    { date: "2024-01-14", course: "HISTORIA UNIVERSAL", status: "present", time: "10:30" },
    { date: "2024-01-13", course: "COMUNICACION", status: "late", time: "11:30" },
    { date: "2024-01-13", course: "INGLES", status: "present", time: "11:30" },
  ],
}

export default function AttendancePage() {
  const { currentStudent, courses } = useStudent()

  if (!currentStudent) {
    return null
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "present":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "absent":
        return <XCircle className="w-4 h-4 text-red-600" />
      case "late":
        return <Clock className="w-4 h-4 text-yellow-600" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "present":
        return <Badge className="bg-green-100 text-green-800">Presente</Badge>
      case "absent":
        return <Badge className="bg-red-100 text-red-800">Ausente</Badge>
      case "late":
        return <Badge className="bg-yellow-100 text-yellow-800">Tardanza</Badge>
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-500 rounded-lg flex items-center justify-center">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">MI ASISTENCIA</h1>
            <p className="text-sm text-gray-600">
              {currentStudent.grade} {currentStudent.section} - Año Académico {currentStudent.academicYear}
            </p>
          </div>
        </div>
      </div>

      {/* Attendance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total de Clases</p>
                <p className="text-2xl font-bold text-gray-900">{mockAttendanceData.totalClasses}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Clases Asistidas</p>
                <p className="text-2xl font-bold text-gray-900">{mockAttendanceData.attendedClasses}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <XCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Faltas</p>
                <p className="text-2xl font-bold text-gray-900">{mockAttendanceData.absences}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Porcentaje</p>
                <p className="text-2xl font-bold text-gray-900">{mockAttendanceData.attendancePercentage}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Attendance by Course */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Asistencia por Curso</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {courses.map((course) => {
                const courseAttendance = Math.floor(Math.random() * 10) + 80
                return (
                  <div key={course.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 ${course.color} rounded-full`}></div>
                      <div>
                        <p className="font-medium text-gray-900">{course.name}</p>
                        <p className="text-sm text-gray-600">{course.teacher}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">{courseAttendance}%</p>
                      <p className="text-xs text-gray-500">{Math.floor((courseAttendance / 100) * 20)}/20 clases</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Asistencia Reciente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockAttendanceData.recentAttendance.map((record, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(record.status)}
                    <div>
                      <p className="font-medium text-gray-900">{record.course}</p>
                      <p className="text-sm text-gray-600">
                        {record.date} - {record.time}
                      </p>
                    </div>
                  </div>
                  {getStatusBadge(record.status)}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Resumen Mensual</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="text-white">
                <p className="text-3xl font-bold">{mockAttendanceData.attendancePercentage}%</p>
                <p className="text-sm">Asistencia</p>
              </div>
            </div>
            <p className="text-gray-600 mb-2">Excelente asistencia este mes, {currentStudent.name.split(" ")[0]}!</p>
            <p className="text-sm text-gray-500">
              Has asistido a {mockAttendanceData.attendedClasses} de {mockAttendanceData.totalClasses} clases
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
