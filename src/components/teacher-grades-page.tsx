"use client"

import { useState } from "react"
import { GraduationCap, Plus, Edit, Save, Trash2, Filter, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useTeacher, type GradeRecord } from "@/contexts/teacher-context"

// Mock grades data
const mockGrades: Record<string, GradeRecord[]> = {
  ALG001: [
    {
      id: "grade_001",
      studentId: "student_004",
      courseId: "ALG001",
      type: "Examen Parcial",
      score: 18,
      maxScore: 20,
      date: "2024-03-15",
      description: "Primer examen parcial - Ecuaciones lineales",
      weight: 30,
    },
    {
      id: "grade_002",
      studentId: "student_005",
      courseId: "ALG001",
      type: "Examen Parcial",
      score: 16,
      maxScore: 20,
      date: "2024-03-15",
      description: "Primer examen parcial - Ecuaciones lineales",
      weight: 30,
    },
  ],
}

export default function TeacherGradesPage() {
  const { currentTeacher, courses, addGrade, updateGrade } = useTeacher()
  const [selectedCourse, setSelectedCourse] = useState<string>("")
  const [selectedStudent, setSelectedStudent] = useState<string>("")
  const [gradeType, setGradeType] = useState<string>("all")
  const [isAddingGrade, setIsAddingGrade] = useState(false)
  const [editingGrade, setEditingGrade] = useState<GradeRecord | null>(null)

  // Form state
  const [formData, setFormData] = useState({
    type: "",
    score: "",
    maxScore: "20",
    description: "",
    weight: "",
    date: new Date().toISOString().split("T")[0],
  })

  if (!currentTeacher) {
    return null
  }

  const selectedCourseData = courses.find((course) => course.id === selectedCourse)
  const courseGrades = selectedCourse ? mockGrades[selectedCourse] || [] : []

  const handleAddGrade = () => {
    if (!selectedCourse || !selectedStudent) return

    const newGrade: GradeRecord = {
      id: `grade_${Date.now()}`,
      studentId: selectedStudent,
      courseId: selectedCourse,
      type: formData.type,
      score: Number.parseFloat(formData.score),
      maxScore: Number.parseFloat(formData.maxScore),
      date: formData.date,
      description: formData.description,
      weight: Number.parseFloat(formData.weight),
    }

    addGrade(newGrade)

    // Reset form
    setFormData({
      type: "",
      score: "",
      maxScore: "20",
      description: "",
      weight: "",
      date: new Date().toISOString().split("T")[0],
    })
    setIsAddingGrade(false)
    setSelectedStudent("")
  }

  const handleEditGrade = (grade: GradeRecord) => {
    setEditingGrade(grade)
    setFormData({
      type: grade.type,
      score: grade.score.toString(),
      maxScore: grade.maxScore.toString(),
      description: grade.description || "",
      weight: grade.weight.toString(),
      date: grade.date,
    })
  }

  const handleUpdateGrade = () => {
    if (!editingGrade) return

    const updates: Partial<GradeRecord> = {
      type: formData.type,
      score: Number.parseFloat(formData.score),
      maxScore: Number.parseFloat(formData.maxScore),
      description: formData.description,
      weight: Number.parseFloat(formData.weight),
      date: formData.date,
    }

    updateGrade(editingGrade.id, updates)
    setEditingGrade(null)
    setFormData({
      type: "",
      score: "",
      maxScore: "20",
      description: "",
      weight: "",
      date: new Date().toISOString().split("T")[0],
    })
  }

  const getStudentName = (studentId: string) => {
    const student = selectedCourseData?.students.find((s) => s.id === studentId)
    return student?.name || "Estudiante no encontrado"
  }

  const getGradeColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100
    if (percentage >= 90) return "text-green-600"
    if (percentage >= 75) return "text-blue-600"
    if (percentage >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">GESTIÓN DE NOTAS</h1>
              <p className="text-sm text-gray-600">Administra las calificaciones de tus estudiantes</p>
            </div>
          </div>

          <Dialog open={isAddingGrade} onOpenChange={setIsAddingGrade}>
            <DialogTrigger asChild>
              <Button className="bg-emerald-500 hover:bg-emerald-600">
                <Plus className="w-4 h-4 mr-2" />
                Agregar Nota
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Agregar Nueva Calificación</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
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

                {selectedCourse && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Estudiante</label>
                    <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un estudiante" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedCourseData?.students.map((student) => (
                          <SelectItem key={student.id} value={student.id}>
                            {student.name} - {student.studentCode}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Evaluación</label>
                    <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Examen Parcial">Examen Parcial</SelectItem>
                        <SelectItem value="Práctica Calificada">Práctica Calificada</SelectItem>
                        <SelectItem value="Tarea">Tarea</SelectItem>
                        <SelectItem value="Proyecto">Proyecto</SelectItem>
                        <SelectItem value="Participación">Participación</SelectItem>
                        
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Fecha</label>
                    <Input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nota</label>
                    <Input
                      type="number"
                      min="0"
                      max={formData.maxScore}
                      step="0.1"
                      value={formData.score}
                      onChange={(e) => setFormData({ ...formData, score: e.target.value })}
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nota Máxima</label>
                    <Input
                      type="number"
                      min="1"
                      value={formData.maxScore}
                      onChange={(e) => setFormData({ ...formData, maxScore: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Peso (%)</label>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={formData.weight}
                      onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                      placeholder="30"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Descripción de la evaluación..."
                    rows={3}
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={handleAddGrade}
                    disabled={!selectedCourse || !selectedStudent || !formData.type || !formData.score}
                    className="flex-1 bg-emerald-500 hover:bg-emerald-600"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Guardar Nota
                  </Button>
                  <Button variant="outline" onClick={() => setIsAddingGrade(false)}>
                    Cancelar
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Course Selection */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Seleccionar Curso
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Evaluación</label>
              <Select value={gradeType} onValueChange={setGradeType}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos los tipos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los tipos</SelectItem>
                  <SelectItem value="Examen Parcial">Examen Parcial</SelectItem>
                  <SelectItem value="Práctica Calificada">Práctica Calificada</SelectItem>
                  <SelectItem value="Tarea">Tarea</SelectItem>
                  <SelectItem value="Proyecto">Proyecto</SelectItem>
                  <SelectItem value="Participación">Participación</SelectItem>
                  
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {selectedCourseData && (
        <>
          {/* Course Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <GraduationCap className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Estudiantes</p>
                    <p className="text-xl font-bold text-gray-900">{selectedCourseData.students.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Evaluaciones</p>
                    <p className="text-xl font-bold text-gray-900">{courseGrades.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Edit className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Promedio</p>
                    <p className="text-xl font-bold text-gray-900">
                      {courseGrades.length > 0
                        ? (
                            courseGrades.reduce((sum, grade) => sum + (grade.score / grade.maxScore) * 20, 0) /
                            courseGrades.length
                          ).toFixed(1)
                        : "0.0"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 ${selectedCourseData.color.replace("bg-", "bg-").replace("-500", "-100")} rounded-lg flex items-center justify-center`}
                  >
                    <div
                      className={`w-4 h-4 ${selectedCourseData.color.replace("bg-", "bg-").replace("-500", "-600")} rounded-full`}
                    ></div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Curso</p>
                    <p className="text-lg font-bold text-gray-900">
                      {selectedCourseData.grade}
                      {selectedCourseData.section}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Grades Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Calificaciones - {selectedCourseData.name}
                </CardTitle>
                <Badge variant="outline">
                  {selectedCourseData.grade} {selectedCourseData.section}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              {courseGrades.length === 0 ? (
                <div className="text-center py-12">
                  <GraduationCap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No hay calificaciones registradas</h3>
                  <p className="text-gray-600 mb-4">Comienza agregando calificaciones para tus estudiantes</p>
                  <Button onClick={() => setIsAddingGrade(true)} className="bg-emerald-500 hover:bg-emerald-600">
                    <Plus className="w-4 h-4 mr-2" />
                    Agregar Primera Nota
                  </Button>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Estudiante</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Nota</TableHead>
                      <TableHead>Peso</TableHead>
                      <TableHead>Descripción</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {courseGrades
                      .filter((grade) => !gradeType || gradeType === "all" || grade.type === gradeType)
                      .map((grade) => (
                        <TableRow key={grade.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium text-gray-900">{getStudentName(grade.studentId)}</p>
                              <p className="text-sm text-gray-500">
                                {selectedCourseData.students.find((s) => s.id === grade.studentId)?.studentCode}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{grade.type}</Badge>
                          </TableCell>
                          <TableCell>{new Date(grade.date).toLocaleDateString("es-ES")}</TableCell>
                          <TableCell>
                            <span className={`font-bold ${getGradeColor(grade.score, grade.maxScore)}`}>
                              {grade.score}/{grade.maxScore}
                            </span>
                            <p className="text-xs text-gray-500">
                              {((grade.score / grade.maxScore) * 100).toFixed(0)}%
                            </p>
                          </TableCell>
                          <TableCell>{grade.weight}%</TableCell>
                          <TableCell>
                            <p className="text-sm text-gray-600 max-w-xs truncate">
                              {grade.description || "Sin descripción"}
                            </p>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button size="sm" variant="outline" onClick={() => handleEditGrade(grade)}>
                                    <Edit className="w-3 h-3" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-md">
                                  <DialogHeader>
                                    <DialogTitle>Editar Calificación</DialogTitle>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700 mb-2">Estudiante</label>
                                      <Input value={getStudentName(grade.studentId)} disabled />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Tipo</label>
                                        <Select
                                          value={formData.type}
                                          onValueChange={(value) => setFormData({ ...formData, type: value })}
                                        >
                                          <SelectTrigger>
                                            <SelectValue />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="Examen Parcial">Examen Parcial</SelectItem>
                                            <SelectItem value="Práctica Calificada">Práctica Calificada</SelectItem>
                                            <SelectItem value="Tarea">Tarea</SelectItem>
                                            <SelectItem value="Proyecto">Proyecto</SelectItem>
                                            <SelectItem value="Participación">Participación</SelectItem>
                                            
                                          </SelectContent>
                                        </Select>
                                      </div>

                                      <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Fecha</label>
                                        <Input
                                          type="date"
                                          value={formData.date}
                                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        />
                                      </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-4">
                                      <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Nota</label>
                                        <Input
                                          type="number"
                                          min="0"
                                          max={formData.maxScore}
                                          step="0.1"
                                          value={formData.score}
                                          onChange={(e) => setFormData({ ...formData, score: e.target.value })}
                                        />
                                      </div>

                                      <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Máxima</label>
                                        <Input
                                          type="number"
                                          min="1"
                                          value={formData.maxScore}
                                          onChange={(e) => setFormData({ ...formData, maxScore: e.target.value })}
                                        />
                                      </div>

                                      <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Peso (%)</label>
                                        <Input
                                          type="number"
                                          min="0"
                                          max="100"
                                          value={formData.weight}
                                          onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                                        />
                                      </div>
                                    </div>

                                    <div>
                                      <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Descripción
                                      </label>
                                      <Textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        rows={3}
                                      />
                                    </div>

                                    <div className="flex gap-3">
                                      <Button
                                        onClick={handleUpdateGrade}
                                        className="flex-1 bg-emerald-500 hover:bg-emerald-600"
                                      >
                                        <Save className="w-4 h-4 mr-2" />
                                        Actualizar
                                      </Button>
                                      <Button variant="outline" onClick={() => setEditingGrade(null)}>
                                        Cancelar
                                      </Button>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>

                              <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </>
      )}

      {!selectedCourse && (
        <Card>
          <CardContent className="p-12 text-center">
            <GraduationCap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Selecciona un curso</h3>
            <p className="text-gray-600">Elige un curso para ver y gestionar las calificaciones de tus estudiantes</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
