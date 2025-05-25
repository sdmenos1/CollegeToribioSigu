"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Mail, Lock, Eye, EyeOff, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { useTeacher } from "@/contexts/teacher-context"

const authenticateTeacher = async (email: string, password: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1500))

  const teacherDatabase: Record<string, any> = {
    "maria.lopez@colegio.edu": {
      teacher: {
        id: "teacher_001",
        name: "Prof. María López Hernández",
        email: "maria.lopez@colegio.edu",
        department: "Matemáticas",
        employeeCode: "PROF-2024-001",
      },
      courses: [
        {
          id: "ALG001",
          name: "ALGEBRA",
          grade: "4°",
          section: "B",
          level: "SECUNDARIA",
          schedule: [
            { day: "Lunes", time: "08:00:00 - 09:30:00" },
            { day: "Miércoles", time: "10:00:00 - 11:30:00" },
            { day: "Viernes", time: "08:00:00 - 09:30:00" },
          ],
          room: "Aula 205",
          color: "bg-blue-600",
          students: [
            {
              id: "student_004",
              name: "Carlos Mendoza López",
              grade: "4°",
              section: "B",
              level: "SECUNDARIA",
              studentCode: "2024-4B-015",
              email: "carlos.mendoza@colegio.edu",
            },
            {
              id: "student_005",
              name: "Ana Sofía Ramírez",
              grade: "4°",
              section: "B",
              level: "SECUNDARIA",
              studentCode: "2024-4B-003",
              email: "ana.ramirez@colegio.edu",
            },
            {
              id: "student_006",
              name: "Diego Fernández Castro",
              grade: "4°",
              section: "B",
              level: "SECUNDARIA",
              studentCode: "2024-4B-012",
              email: "diego.fernandez@colegio.edu",
            },
          ],
        },
        {
          id: "ALG002",
          name: "ALGEBRA",
          grade: "4°",
          section: "A",
          level: "SECUNDARIA",
          schedule: [
            { day: "Martes", time: "08:00:00 - 09:30:00" },
            { day: "Jueves", time: "10:00:00 - 11:30:00" },
          ],
          room: "Aula 203",
          color: "bg-blue-500",
          students: [
            {
              id: "student_009",
              name: "Valentina Herrera Silva",
              grade: "4°",
              section: "A",
              level: "SECUNDARIA",
              studentCode: "2024-4A-007",
              email: "valentina.herrera@colegio.edu",
            },
            {
              id: "student_010",
              name: "Mateo Jiménez López",
              grade: "4°",
              section: "A",
              level: "SECUNDARIA",
              studentCode: "2024-4A-014",
              email: "mateo.jimenez@colegio.edu",
            },
          ],
        },
      ],
    }
  }

  if (email === "maria.lopez@colegio.edu" && password === "123456") {
    return teacherDatabase[email]
  }


  throw new Error("Credenciales incorrectas")
}

export default function TeacherLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const router = useRouter()
  const { setTeacherData } = useTeacher()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const authResult = await authenticateTeacher(email, password)
      setTeacherData(authResult.teacher, authResult.courses)
      router.push("/teacher/dashboard")
    } catch (err) {
      setError("Credenciales incorrectas. Intenta nuevamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 to-emerald-800/40 z-10"></div>
        <Image
          src="/placeholder.svg?height=800&width=600"
          alt="Colegio Toribio Rodriguez de Mendoza"
          fill
          className="object-cover"
        />
        <div className="absolute bottom-8 left-8 z-20 text-white">
          <h1 className="text-3xl font-bold mb-2">PORTAL DOCENTE</h1>
          <p className="text-lg opacity-90">Colegio Toribio Rodriguez de Mendoza</p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <Card className="w-full max-w-md">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Portal Docente</h2>
              <h3 className="text-lg font-semibold text-gray-700">Toribio Rodriguez de Mendoza</h3>
              <p className="text-sm text-gray-600">N° 135</p>
            </div>

            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Acceso Docente</h1>
              <p className="text-gray-600 text-sm">
                Ingresa a tu portal para gestionar asistencia, estudiantes y calificaciones.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Correo Institucional
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="profesor@colegio.edu"
                    className="pl-10"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Ingrese su contraseña"
                    className="pl-10 pr-10"
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    disabled={loading}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-3"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Iniciando sesión...
                  </div>
                ) : (
                  "Acceder al Portal"
                )}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-emerald-50 rounded-lg">
              <p className="text-xs font-medium text-emerald-800 mb-2">Credenciales de prueba:</p>
              <div className="text-xs text-emerald-700 space-y-1">
                <p>
                  <strong>Prof. Matemáticas:</strong>
                </p>
                <p>Email: maria.lopez@colegio.edu</p>
                <p>Contraseña: 123456</p>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                ¿Eres estudiante?{" "}
                <button
                  onClick={() => router.push("/")}
                  className="text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  Ir al Portal Estudiantil
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
