"use client"

import { useState } from "react"
import { Calendar, CheckCircle, XCircle, Clock, Save, Users, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useTeacher, type AttendanceRecord } from "@/contexts/teacher-context"

export default function TeacherAttendancePage() {
  const { currentTeacher, courses, updateAttendance } = useTeacher()
  const [selectedCourse, setSelectedCourse] = useState<string>("")
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split("T")[0])
  const [attendanceRecords, setAttendanceRecords] = useState<Record<string, AttendanceRecord>>({})
  const [notes, setNotes] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState(false)

  if (!currentTeacher) {
    return null
  }

  const selectedCourseData = courses.find((course) => course.id === selectedCourse)

  const handleAttendanceChange = (studentId: string, status: "present" | "absent" | "late") => {
    setAttendanceRecords((prev) => ({
      ...prev,
      [studentId]: {
        studentId,
        date: selectedDate,
        status,
        notes: notes[studentId] || "",
      },
    }))
  }

  const handleNotesChange = (studentId: string, note: string) => {
    setNotes((prev) => ({
      ...prev,
      [studentId]: note,
    }))

    if (attendanceRecords[studentId]) {
      setAttendanceRecords((prev) => ({
        ...prev,
        [studentId]: {
          ...prev[studentId],
          notes: note,
        },
      }))
    }
  }

  const handleSaveAttendance = async () => {
    if (!selectedCourse || !selectedCourseData) return

    setSaving(true)
    try {
      const records = Object.values(attendanceRecords)
      await updateAttendance(selectedCourse, selectedDate, records)

      alert("Asistencia guardada exitosamente")

      // Reset form
      setAttendanceRecords({})
      setNotes({})
    } catch (error) {
      alert("Error al guardar la asistencia")
    } finally {
      setSaving(false)
    }
  }

  const getAttendanceStats = () => {
    if (!selectedCourseData) return { present: 0, absent: 0, late: 0, total: 0 }

    const total = selectedCourseData.students.length
    const present = Object.values(attendanceRecords).filter((record) => record.status === "present").length
    const absent = Object.values(attendanceRecords).filter((record) => record.status === "absent").length
    const late = Object.values(attendanceRecords).filter((record) => record.status === "late").length

    return { present, absent, late, total }
  }

  const stats = getAttendanceStats()

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-lg flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">REGISTRO DE ASISTENCIA</h1>
            <p className="text-sm text-gray-600">Gestiona la asistencia de tus estudiantes</p>
          </div>
        </div>
      </div>

      {/* Course and Date Selection */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Seleccionar Curso y Fecha
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Curso</label>
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un curso" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((course) => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.name} - {course.grade} {course.section}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Fecha</label>
              <Input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
            </div>
          </div>
        </CardContent>
      </Card>

      {selectedCourseData && (
        <>
          {/* Attendance Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="text-xl font-bold text-gray-900">{stats.total}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Presentes</p>
                    <p className="text-xl font-bold text-gray-900">{stats.present}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                    <XCircle className="w-4 h-4 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Ausentes</p>
                    <p className="text-xl font-bold text-gray-900">{stats.absent}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-4 h-4 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Tardanzas</p>
                    <p className="text-xl font-bold text-gray-900">{stats.late}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Student Attendance List */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Lista de Estudiantes - {selectedCourseData.name}
                </CardTitle>
                <Badge variant="outline">
                  {selectedCourseData.grade} {selectedCourseData.section}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {selectedCourseData.students.map((student) => {
                  const currentRecord = attendanceRecords[student.id]
                  const currentStatus = currentRecord?.status

                  return (
                    <div key={student.id} className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-600">
                              {student.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .slice(0, 2)}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{student.name}</p>
                            <p className="text-sm text-gray-500">{student.studentCode}</p>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant={currentStatus === "present" ? "default" : "outline"}
                            onClick={() => handleAttendanceChange(student.id, "present")}
                            className={
                              currentStatus === "present"
                                ? "bg-green-500 hover:bg-green-600"
                                : "hover:bg-green-50 hover:text-green-600 hover:border-green-300"
                            }
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Presente
                          </Button>

                          <Button
                            size="sm"
                            variant={currentStatus === "late" ? "default" : "outline"}
                            onClick={() => handleAttendanceChange(student.id, "late")}
                            className={
                              currentStatus === "late"
                                ? "bg-yellow-500 hover:bg-yellow-600"
                                : "hover:bg-yellow-50 hover:text-yellow-600 hover:border-yellow-300"
                            }
                          >
                            <Clock className="w-4 h-4 mr-1" />
                            Tardanza
                          </Button>

                          <Button
                            size="sm"
                            variant={currentStatus === "absent" ? "default" : "outline"}
                            onClick={() => handleAttendanceChange(student.id, "absent")}
                            className={
                              currentStatus === "absent"
                                ? "bg-red-500 hover:bg-red-600"
                                : "hover:bg-red-50 hover:text-red-600 hover:border-red-300"
                            }
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Ausente
                          </Button>
                        </div>
                      </div>

                      {/* Notes section */}
                      <div className="mt-3">
                        <Textarea
                          placeholder="Observaciones (opcional)"
                          value={notes[student.id] || ""}
                          onChange={(e) => handleNotesChange(student.id, e.target.value)}
                          className="text-sm"
                          rows={2}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Save Button */}
              <div className="mt-6 flex justify-end">
                <Button
                  onClick={handleSaveAttendance}
                  disabled={saving || Object.keys(attendanceRecords).length === 0}
                  className="bg-emerald-500 hover:bg-emerald-600"
                >
                  {saving ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Guardando...
                    </div>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Guardar Asistencia
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {!selectedCourse && (
        <Card>
          <CardContent className="p-12 text-center">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Selecciona un curso</h3>
            <p className="text-gray-600">Elige un curso y fecha para comenzar a registrar la asistencia</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
