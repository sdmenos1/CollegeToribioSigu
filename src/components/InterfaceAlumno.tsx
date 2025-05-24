"use client"

import Image from "next/image"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Calendar, UserCheck, BookOpen, GraduationCap, Bell, Menu, Home, LogOut, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useStudent } from "@/contexts/student-context"
import SchedulePage from "./Horarios"
import AttendancePage from "./pageAttendance"
import GradesPage from "./grades-page"
import logo from '../../Pictures/LogoColegio.png'
const navigationItems = [
  {
    icon: Home,
    label: "Inicio",
    href: "#inicio",
    id: "home",
  },
  {
    icon: Calendar,
    label: "Mis Horarios",
    href: "#horarios",
    id: "schedule",
  },
  {
    icon: UserCheck,
    label: "Mi Asistencia",
    href: "#asistencia",
    id: "attendance",
  },
  {
    icon: BookOpen,
    label: "Mis Cursos",
    href: "#cursos",
    id: "courses",
  },
  {
    icon: GraduationCap,
    label: "Mis Calificaciones",
    href: "#calificaciones",
    id: "grades",
  },
]

function SidebarContent({ onItemClick, activeSection }: { onItemClick?: (id: string) => void; activeSection: string }) {
  const { currentStudent, courses, clearStudentData } = useStudent()
  const router = useRouter()

  const handleLogout = () => {
    clearStudentData()
    router.push("/")
  }

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-amber-400 to-amber-500">
      {/* Logo Section */}
      <div className="flex flex-col items-center p-6 border-b border-amber-600/20">
        <div className="w-20 h-20 rounded-full overflow-hidden bg-white p-1 shadow-lg">
          <Image
            src={logo}
            alt="Logo Colegio"
            width={80}
            height={80}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <h2 className="mt-3 text-lg font-bold text-amber-900">Portal Estudiantil</h2>
        {currentStudent && (
          <div className="mt-2 text-center">
            <p className="text-sm text-amber-800 font-medium">{currentStudent.name}</p>
            <p className="text-xs text-amber-700">
              {currentStudent.grade} {currentStudent.section} - {currentStudent.level}
            </p>
            {currentStudent.studentCode && (
              <p className="text-xs text-amber-700">Código: {currentStudent.studentCode}</p>
            )}
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
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-amber-900 hover:bg-amber-300/50 hover:text-amber-950 transition-all duration-200 group ${
                  activeSection === item.id ? "bg-amber-300/50 text-amber-950" : ""
                }`}
              >
                <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="font-medium">{item.label}</span>
                {item.id === "schedule" && courses.length > 0 && (
                  <Badge className="ml-auto bg-amber-200 text-amber-800 text-xs">{courses.length}</Badge>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-amber-600/20">
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full text-amber-900 hover:bg-amber-300/50 hover:text-amber-950"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Cerrar Sesión
        </Button>
        <div className="text-center text-sm text-amber-800 mt-2">
          <p>Año Escolar {currentStudent?.academicYear || "2024"}</p>
        </div>
      </div>
    </div>
  )
}

function HomePage() {
  const { currentStudent, courses } = useStudent()

  if (!currentStudent) {
    return null
  }

  // Calculate next classes for today
  const today = new Date().toLocaleDateString("es-ES", { weekday: "long" })
  const todayClasses = courses
    .filter((course) => course.schedule.some((slot) => slot.day.toLowerCase() === today.toLowerCase()))
    .slice(0, 3)

  // Calculate total credits
  const totalCredits = courses.reduce((sum, course) => sum + (course.credits || 0), 0)

  return (
    <div className="p-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">¡Bienvenido, {currentStudent.name.split(" ")[0]}!</h1>
        <p className="text-gray-600">
          Aquí tienes un resumen de tu actividad académica para {currentStudent.grade} {currentStudent.section}
        </p>
      </div>

      {/* Dashboard Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Today's Classes Card */}
        <div className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Clases de Hoy</h3>
          </div>
          {todayClasses.length > 0 ? (
            <div className="space-y-3">
              {todayClasses.map((course) => {
                const todaySchedule = course.schedule.find((slot) => slot.day.toLowerCase() === today.toLowerCase())
                return (
                  <div key={course.id} className="text-sm">
                    <p className="font-medium text-gray-900">{course.name}</p>
                    <p className="text-gray-600">
                      {todaySchedule?.time} - {course.room}
                    </p>
                    <p className="text-xs text-gray-500">{course.teacher}</p>
                  </div>
                )
              })}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No tienes clases programadas para hoy</p>
          )}
        </div>

        {/* Academic Info Card */}
        <div className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Mi Información Académica</h3>
          </div>
          <div className="space-y-2 text-sm">
            <p>
              <span className="font-medium">Grado:</span> {currentStudent.grade} {currentStudent.section}
            </p>
            <p>
              <span className="font-medium">Nivel:</span> {currentStudent.level}
            </p>
            <p>
              <span className="font-medium">Cursos:</span> {courses.length}
            </p>
            <p>
              <span className="font-medium">Créditos Totales:</span> {totalCredits}
            </p>
            {currentStudent.studentCode && (
              <p>
                <span className="font-medium">Código:</span> {currentStudent.studentCode}
              </p>
            )}
          </div>
        </div>

        {/* Student Profile Card */}
        <div className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Mi Perfil</h3>
          </div>
          <div className="space-y-2 text-sm">
            <p>
              <span className="font-medium">Nombre:</span> {currentStudent.name}
            </p>
            {currentStudent.email && (
              <p>
                <span className="font-medium">Email:</span> {currentStudent.email}
              </p>
            )}
            <p>
              <span className="font-medium">Año Académico:</span> {currentStudent.academicYear}
            </p>
          </div>
        </div>
      </div>

      {/* My Courses Overview */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Mis Cursos - {currentStudent.grade} {currentStudent.section}
        </h3>
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
            {courses.map((course) => (
              <div key={course.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className={`w-full h-2 ${course.color} rounded-full mb-3`}></div>
                <h4 className="font-semibold text-gray-900 mb-2">{course.name}</h4>
                <p className="text-sm text-gray-600 mb-1">{course.teacher}</p>
                <p className="text-xs text-gray-500">
                  {course.room} • {course.credits} créditos
                </p>
                <p className="text-xs text-gray-500 mt-2">{course.schedule.length} sesiones por semana</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function StudentInterface() {
  const [hasNotification, setHasNotification] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const { currentStudent } = useStudent()

  const handleNavigation = (sectionId: string) => {
    setActiveSection(sectionId)
    setMobileMenuOpen(false)
  }

  const renderContent = () => {
    switch (activeSection) {
      case "schedule":
        return <SchedulePage />
      case "attendance":
        return <AttendancePage />
      case "grades":
        return <GradesPage />
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

          <h1 className="text-lg font-semibold text-gray-900">Portal Estudiantil</h1>

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
                    alt="Avatar del estudiante"
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{currentStudent?.name}</h2>
                  <p className="text-gray-600">
                    {currentStudent?.grade} {currentStudent?.section} - {currentStudent?.level}
                  </p>
                  {currentStudent?.email && <p className="text-sm text-gray-500">{currentStudent.email}</p>}
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
