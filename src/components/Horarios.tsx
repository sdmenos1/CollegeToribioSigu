"use client"

import { useState, useMemo } from "react"
import { Calendar, Clock, User, CheckCircle, MapPin, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useStudent } from "@/contexts/student-context"

const timeSlots = ["08:00 - 09:30", "09:45 - 11:15", "10:00 - 11:30", "11:30 - 13:00", "14:00 - 15:30", "15:45 - 17:15"]
const weekDays = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"]

export default function SchedulePage() {
  const { currentStudent, courses } = useStudent()
  const [selectedPeriod, setSelectedPeriod] = useState("2024")

  // Generate weekly schedule from courses
  const weeklySchedule = useMemo(() => {
    const schedule: Record<string, Record<string, (typeof courses)[0] | null>> = {}

    timeSlots.forEach((slot) => {
      schedule[slot] = {}
      weekDays.forEach((day) => {
        schedule[slot][day] = null
      })
    })

    courses.forEach((course) => {
      course.schedule.forEach(({ day, time }) => {
        const timeSlot = timeSlots.find((slot) => {
          const [start] = slot.split(" - ")
          return time.includes(start)
        })

        if (timeSlot && schedule[timeSlot]) {
          schedule[timeSlot][day] = course
        }
      })
    })

    return schedule
  }, [courses])

  if (!currentStudent) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-500 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">MIS CURSOS</h1>
              <p className="text-sm text-gray-600">
                {currentStudent.grade} {currentStudent.section} - {currentStudent.level}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700">PERIODO:</span>
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        {courses.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No hay cursos disponibles</p>
          </div>
        ) : (
          courses.map((course) => (
            <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
              {/* Course Header */}
              <CardHeader className={`${course.color} text-white p-4`}>
                <CardTitle className="text-lg font-bold">{course.name}</CardTitle>
                {course.credits && (
                  <Badge variant="secondary" className="bg-white/20 text-white w-fit">
                    {course.credits} créditos
                  </Badge>
                )}
              </CardHeader>

              <CardContent className="p-6 space-y-4">
                {/* Teacher */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                    <User className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">DOCENTE:</p>
                    <p className="text-gray-900 font-medium">{course.teacher}</p>
                  </div>
                </div>

                {/* Room */}
                {course.room && (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">AULA:</p>
                      <p className="text-gray-900 font-medium">{course.room}</p>
                    </div>
                  </div>
                )}

                {/* Schedule */}
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

                {/* Course Details */}
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

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button className="flex-1 bg-green-500 hover:bg-green-600 text-white" size="sm">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Mi Asistencia
                  </Button>
                  <Button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white" size="sm">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Ver Contenido
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Weekly Schedule Overview */}
      {courses.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-500 rounded-lg flex items-center justify-center">
              <Calendar className="w-4 h-4 text-white" />
            </div>
            Mi Horario Semanal - {currentStudent.grade} {currentStudent.section}
          </h2>

          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-amber-400 to-amber-500 text-white">
                    <tr>
                      <th className="px-4 py-3 text-left font-medium">Hora</th>
                      {weekDays.map((day) => (
                        <th key={day} className="px-4 py-3 text-left font-medium">
                          {day}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {timeSlots.map((timeSlot) => (
                      <tr key={timeSlot} className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-900">{timeSlot}</td>
                        {weekDays.map((day) => {
                          const course = weeklySchedule[timeSlot]?.[day]
                          return (
                            <td key={day} className="px-4 py-3">
                              {course ? (
                                <div className="space-y-1">
                                  <Badge
                                    className={`${course.color.replace("bg-", "bg-").replace("-500", "-100")} ${course.color.replace("bg-", "text-").replace("-500", "-800")} text-xs`}
                                  >
                                    {course.name}
                                  </Badge>
                                  {course.room && <p className="text-xs text-gray-500">{course.room}</p>}
                                </div>
                              ) : (
                                <span className="text-gray-400">-</span>
                              )}
                            </td>
                          )
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
