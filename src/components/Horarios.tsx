"use client"

import { useState } from "react"
import { Calendar, Clock, User, Users, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const coursesData = [
  {
    id: 1,
    name: "MATEMATICA I",
    teacher: "Andres Rojas Cruz",
    schedule: [
      { day: "Martes", time: "08:00:00 - 09:30:00" },
      { day: "Miércoles", time: "09:45:00 - 11:15:00" },
      { day: "Viernes", time: "08:00:00 - 09:30:00" },
    ],
    level: "SECUNDARIA",
    grade: "5° A",
    section: "1",
    color: "bg-blue-500",
  },
  {
    id: 2,
    name: "FISICA GENERAL",
    teacher: "Andres Rojas Cruz",
    schedule: [
      { day: "Lunes", time: "08:00:00 - 09:30:00" },
      { day: "Martes", time: "11:30:00 - 13:00:00" },
    ],
    level: "SECUNDARIA",
    grade: "5° A",
    section: "1",
    color: "bg-blue-600",
  },
  {
    id: 3,
    name: "HISTORIA DEL PERU",
    teacher: "Maria Elena Vargas",
    schedule: [
      { day: "Lunes", time: "10:00:00 - 11:30:00" },
      { day: "Jueves", time: "08:00:00 - 09:30:00" },
    ],
    level: "SECUNDARIA",
    grade: "5° A",
    section: "1",
    color: "bg-emerald-500",
  },
  {
    id: 4,
    name: "COMUNICACION",
    teacher: "Carlos Rodriguez Silva",
    schedule: [
      { day: "Miércoles", time: "08:00:00 - 09:30:00" },
      { day: "Viernes", time: "10:00:00 - 11:30:00" },
    ],
    level: "SECUNDARIA",
    grade: "5° A",
    section: "1",
    color: "bg-purple-500",
  },
]

export default function SchedulePage() {
  const [selectedPeriod, setSelectedPeriod] = useState("2024")

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-500 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">MIS CURSOS</h1>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {coursesData.map((course) => (
          <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
            <CardHeader className={`${course.color} text-white p-4`}>
              <CardTitle className="text-lg font-bold">{course.name}</CardTitle>
            </CardHeader>

            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                  <User className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">DOCENTE:</p>
                  <p className="text-gray-900 font-medium">{course.teacher}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <p className="text-sm font-medium text-gray-500">HORARIO:</p>
                </div>
                <div className="ml-6 space-y-1">
                  {course.schedule.map((slot, index) => (
                    <p key={index} className="text-sm text-gray-700">
                      - {slot.day}: {slot.time}
                    </p>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-1">NIVEL:</p>
                  <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                    {course.level}
                  </Badge>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-1">GRADO:</p>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    {course.grade}
                  </Badge>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-1">SECCIÓN:</p>
                  <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                    {course.section}
                  </Badge>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button className="flex-1 bg-green-500 hover:bg-green-600 text-white" size="sm">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Asistencia
                </Button>
                <Button className="flex-1 bg-red-500 hover:bg-red-600 text-white" size="sm">
                  <Users className="w-4 h-4 mr-2" />
                  Ver Alumnos
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-500 rounded-lg flex items-center justify-center">
            <Calendar className="w-4 h-4 text-white" />
          </div>
          Horario Semanal
        </h2>

        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-amber-400 to-amber-500 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium">Hora</th>
                    <th className="px-4 py-3 text-left font-medium">Lunes</th>
                    <th className="px-4 py-3 text-left font-medium">Martes</th>
                    <th className="px-4 py-3 text-left font-medium">Miércoles</th>
                    <th className="px-4 py-3 text-left font-medium">Jueves</th>
                    <th className="px-4 py-3 text-left font-medium">Viernes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">08:00 - 09:30</td>
                    <td className="px-4 py-3">
                      <Badge className="bg-blue-100 text-blue-800">FISICA GENERAL</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge className="bg-blue-100 text-blue-800">MATEMATICA I</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge className="bg-purple-100 text-purple-800">COMUNICACION</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge className="bg-emerald-100 text-emerald-800">HISTORIA DEL PERU</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge className="bg-blue-100 text-blue-800">MATEMATICA I</Badge>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">09:45 - 11:15</td>
                    <td className="px-4 py-3">-</td>
                    <td className="px-4 py-3">-</td>
                    <td className="px-4 py-3">
                      <Badge className="bg-blue-100 text-blue-800">MATEMATICA I</Badge>
                    </td>
                    <td className="px-4 py-3">-</td>
                    <td className="px-4 py-3">-</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">10:00 - 11:30</td>
                    <td className="px-4 py-3">
                      <Badge className="bg-emerald-100 text-emerald-800">HISTORIA DEL PERU</Badge>
                    </td>
                    <td className="px-4 py-3">-</td>
                    <td className="px-4 py-3">-</td>
                    <td className="px-4 py-3">-</td>
                    <td className="px-4 py-3">
                      <Badge className="bg-purple-100 text-purple-800">COMUNICACION</Badge>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">11:30 - 13:00</td>
                    <td className="px-4 py-3">-</td>
                    <td className="px-4 py-3">
                      <Badge className="bg-blue-100 text-blue-800">FISICA GENERAL</Badge>
                    </td>
                    <td className="px-4 py-3">-</td>
                    <td className="px-4 py-3">-</td>
                    <td className="px-4 py-3">-</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}