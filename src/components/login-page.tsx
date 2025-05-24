"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Mail, Lock, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { useStudent } from "@/contexts/student-context"
import logo from '../../Pictures/LogoColegio.png'

const authenticateStudent = async (email: string, password: string) => {
  
  await new Promise((resolve) => setTimeout(resolve, 5000))

  
  const studentDatabase: Record<string, any> = {
    "carlos.mendoza@colegio.edu": {
      student: {
        id: "student_004",
        name: "Carlos Mendoza López",
        grade: "4°",
        section: "B",
        level: "SECUNDARIA",
        academicYear: "2024",
        email: "carlos.mendoza@colegio.edu",
        studentCode: "2024-4B-015",
      },
      courses: [
        {
          id: "ALG001",
          name: "ALGEBRA",
          teacher: "Prof. María López Hernández",
          schedule: [
            { day: "Lunes", time: "08:00:00 - 09:30:00" },
            { day: "Miércoles", time: "10:00:00 - 11:30:00" },
            { day: "Viernes", time: "08:00:00 - 09:30:00" },
          ],
          level: "SECUNDARIA",
          grade: "4°",
          section: "B",
          color: "bg-blue-600",
          room: "Aula 205",
          credits: 5,
        },
        {
          id: "FIS001",
          name: "FISICA",
          teacher: "Prof. Roberto Silva Vargas",
          schedule: [
            { day: "Martes", time: "08:00:00 - 09:30:00" },
            { day: "Jueves", time: "10:00:00 - 11:30:00" },
          ],
          level: "SECUNDARIA",
          grade: "4°",
          section: "B",
          color: "bg-purple-500",
          room: "Lab 301",
          credits: 4,
        },
        {
          id: "QUI001",
          name: "QUIMICA",
          teacher: "Prof. Diego Morales Castro",
          schedule: [
            { day: "Lunes", time: "10:00:00 - 11:30:00" },
            { day: "Miércoles", time: "08:00:00 - 09:30:00" },
            { day: "Jueves", time: "08:00:00 - 09:30:00" },
          ],
          level: "SECUNDARIA",
          grade: "4°",
          section: "B",
          color: "bg-orange-500",
          room: "Lab 302",
          credits: 4,
        },
      ],
    },
  }

  // Simulate authentication
  if (email === "carlos.mendoza@colegio.edu" && password === "123456") {
    return studentDatabase[email]
  }

  throw new Error("Credenciales incorrectas")
}

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const router = useRouter()
  const { setStudentData } = useStudent()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const authResult = await authenticateStudent(email, password)

      setStudentData(authResult.student, authResult.courses)

      router.push("/dashboard")
    } catch (err) {
      setError("Credenciales incorrectas. Intenta nuevamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-600/20 to-amber-800/40 z-10"></div>
        <Image
          src="/placeholder.svg?height=800&width=600"
          alt="Colegio Toribio Rodriguez de Mendoza"
          fill
          className="object-cover"
        />
        <div className="absolute bottom-8 left-8 z-20 text-white">
          <h1 className="text-3xl font-bold mb-2">COLEGIO TORIBIO RODRIGUEZ DE MENDOZA</h1>
          <p className="text-lg opacity-90">Formando líderes del mañana</p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <Card className="w-full max-w-md">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Image
                  src={logo}
                  alt="Logo Colegio"
                  width={60}
                  height={60}
                  className="rounded-full"
                />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Toribio Rodriguez</h2>
              <h3 className="text-lg font-semibold text-gray-700">de Mendoza</h3>
              <p className="text-sm text-gray-600">N° 135</p>
            </div>

            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Bienvenidos</h1>
              <p className="text-gray-600 text-sm">
                Accede a tu portal estudiantil para consultar tus horarios, calificaciones y más información académica.
              </p>
            </div>

            {/* Login form */}
            <form onSubmit={handleLogin} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Correo
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Ingrese su correo"
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
                className="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-3"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Iniciando sesión...
                  </div>
                ) : (
                  "Iniciar sesión"
                )}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-xs font-medium text-blue-800 mb-2">Credenciales de prueba:</p>
              <div className="text-xs text-blue-700 space-y-1">
                <p>
                  <strong>Estudiante 4° Grado:</strong>
                </p>
                <p>Email: carlos.mendoza@colegio.edu</p>
                <p>Contraseña: 123456</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
