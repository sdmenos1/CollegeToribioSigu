"use client"

import Image from "next/image"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Calendar, Users, GraduationCap, Bell, Menu, Home, LogOut, User, ClipboardCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useTeacher } from "@/contexts/teacher-context"
import TeacherAttendancePage from "./teacher-attendance-page"
import TeacherStudentsPage from "./teacher-students-page"
import TeacherGradesPage from "./teacher-grades-page"
import logo from '../../Pictures/LogoColegio.png'
const navigationItems = [
  {
    icon: Home,
    label: "Inicio",
    href: "#inicio",
    id: "home",
  },
  {
    icon: ClipboardCheck,
    label: "Registro de Asistencia",
    href: "#asistencia",
    id: "attendance",
  },
  {
    icon: Users,
    label: "Mis Estudiantes",
    href: "#estudiantes",
    id: "students",
  },
  {
    icon: GraduationCap,
    label: "Gestión de Notas",
    href: "#notas",
    id: "grades",
  },
]

function SidebarContent({ onItemClick, activeSection }: { onItemClick?: (id: string) => void; activeSection: string }) {
  const { currentTeacher, courses, clearTeacherData } = useTeacher()
  const router = useRouter()

  const handleLogout = () => {
    clearTeacherData()
    router.push("/teacher/login")
  }

  const totalStudents = courses.reduce((sum, course) => sum + course.students.length, 0)

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-emerald-400 to-emerald-500">
      {/* Logo Section */}
      <div className="flex flex-col items-center p-6 border-b border-emerald-600/20">
        <div className="w-20 h-20 rounded-full overflow-hidden bg-white p-1 shadow-lg">
          <Image
            src={logo}
            alt="Logo Colegio"
            width={80}
            height={80}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <h2 className="mt-3 text-lg font-bold text-emerald-900">Portal Docente</h2>
        {currentTeacher && (
          <div className="mt-2 text-center">
            <p className="text-sm text-emerald-800 font-medium">{currentTeacher.name}</p>
            <p className="text-xs text-emerald-700">{currentTeacher.department}</p>
            <p className="text-xs text-emerald-700">Código: {currentTeacher.employeeCode}</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigationItems.map((item) => (
            <li key={item.label}>
              <button
                onClick={() => onItemClick?.(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-emerald-900 hover:bg-emerald-300/50 hover:text-emerald-950 transition-all duration-200 group ${
                  activeSection === item.id ? "bg-emerald-300/50 text-emerald-950" : ""
                }`}
              >
                <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="font-medium">{item.label}</span>
                {item.id === "students" && totalStudents > 0 && (
                  <Badge className="ml-auto bg-emerald-200 text-emerald-800 text-xs">{totalStudents}</Badge>
                )}
                {item.id === "attendance" && courses.length > 0 && (
                  <Badge className="ml-auto bg-emerald-200 text-emerald-800 text-xs">{courses.length}</Badge>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-emerald-600/20">
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full text-emerald-900 hover:bg-emerald-300/50 hover:text-emerald-950"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Cerrar Sesión
        </Button>
        <div className="text-center text-sm text-emerald-800 mt-2">
          <p>Año Escolar 2024</p>
        </div>
      </div>
    </div>
  )
}

function HomePage() {
  const { currentTeacher, courses } = useTeacher()

  if (!currentTeacher) {
    return null
  }

  const totalStudents = courses.reduce((sum, course) => sum + course.students.length, 0)
  const totalClasses = courses.reduce((sum, course) => sum + course.schedule.length, 0)

  // Get today's classes
  const today = new Date().toLocaleDateString("es-ES", { weekday: "long" })
  const todayClasses = courses.filter((course) =>
    course.schedule.some((slot) => slot.day.toLowerCase() === today.toLowerCase()),
  )

  return (
    <div className="p-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          ¡Bienvenido, {currentTeacher.name.replace("Prof. ", "")}!
        </h1>
        <p className="text-gray-600">Aquí tienes un resumen de tu actividad docente para hoy</p>
      </div>

      {/* Dashboard Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Students Card */}
        <div className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Estudiantes</p>
              <p className="text-2xl font-bold text-gray-900">{totalStudents}</p>
            </div>
          </div>
        </div>

        {/* Total Courses Card */}
        <div className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Cursos Asignados</p>
              <p className="text-2xl font-bold text-gray-900">{courses.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Departamento</p>
              <p className="text-lg font-bold text-gray-900">{currentTeacher.department}</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Mis Cursos Asignados</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg p-4 shadow-sm border hover:shadow-md transition-shadow">
              <div className={`w-full h-2 ${course.color} rounded-full mb-3`}></div>
              <h4 className="font-semibold text-gray-900 mb-2">{course.name}</h4>
              <p className="text-sm text-gray-600 mb-1">
                {course.grade} {course.section} - {course.level}
              </p>
              <p className="text-xs text-gray-500 mb-2">{course.room}</p>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-700">{course.students.length} estudiantes</p>
                <p className="text-xs text-gray-500">{course.schedule.length} sesiones/semana</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function TeacherInterface() {
  const [hasNotification, setHasNotification] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const { currentTeacher } = useTeacher()

  const handleNavigation = (sectionId: string) => {
    setActiveSection(sectionId)
    setMobileMenuOpen(false)
  }

  const renderContent = () => {
    switch (activeSection) {
      case "attendance":
        return <TeacherAttendancePage />
      case "students":
        return <TeacherStudentsPage />
      case "grades":
        return <TeacherGradesPage />
      case "home":
      default:
        return <HomePage />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-sm border-b">
        <div className="flex items-center justify-between p-4">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-80">
              <SidebarContent onItemClick={handleNavigation} activeSection={activeSection} />
            </SheetContent>
          </Sheet>

          <h1 className="text-lg font-semibold text-gray-900">Portal Docente</h1>

          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-6 w-6" />
            {hasNotification && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 bg-red-500 hover:bg-red-500">
                <span className="sr-only">Notificaciones</span>
              </Badge>
            )}
          </Button>
        </div>
      </div>

      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-80 h-screen sticky top-0">
          <SidebarContent onItemClick={handleNavigation} activeSection={activeSection} />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Desktop Header */}
          {activeSection === "home" && (
            <div className="hidden lg:flex justify-between items-center p-6 pb-0">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
                  <Image
                    src="/placeholder.svg?height=64&width=64"
                    alt="Avatar del profesor"
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{currentTeacher?.name}</h2>
                  <p className="text-gray-600">{currentTeacher?.department}</p>
                  {currentTeacher?.email && <p className="text-sm text-gray-500">{currentTeacher.email}</p>}
                </div>
              </div>

              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-8 w-8" />
                {hasNotification && (
                  <Badge className="absolute -top-1 -right-1 h-6 w-6 p-0 bg-red-500 hover:bg-red-500 animate-pulse">
                    <span className="sr-only">Notificaciones</span>
                  </Badge>
                )}
              </Button>
            </div>
          )}

          {/* Dynamic Content */}
          {renderContent()}
        </div>
      </div>
    </div>
  )
}
