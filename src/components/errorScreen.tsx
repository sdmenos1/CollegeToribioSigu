"use client"

import { AlertCircle, Home, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface ErrorScreenProps {
  error: string
  username?: string
}

export default function ErrorScreen({ error, username }: ErrorScreenProps) {
  const handleRefresh = () => {
    window.location.reload()
  }

  const handleGoHome = () => {
    window.location.href = "/"
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>

          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error de Acceso</h2>

          <p className="text-gray-600 mb-6">
            {error === "Student not found"
              ? `No se encontró información para el usuario "${username}". Verifica que tengas acceso autorizado.`
              : "Ocurrió un error al cargar tu información. Por favor, intenta nuevamente."}
          </p>

          <div className="space-y-3">
            <Button onClick={handleRefresh} className="w-full bg-amber-500 hover:bg-amber-600">
              <RefreshCw className="w-4 h-4 mr-2" />
              Intentar Nuevamente
            </Button>

            <Button onClick={handleGoHome} variant="outline" className="w-full">
              <Home className="w-4 h-4 mr-2" />
              Ir al Inicio
            </Button>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500">Si el problema persiste, contacta al administrador del sistema.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
