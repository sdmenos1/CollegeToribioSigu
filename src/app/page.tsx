"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import LoginPage from "../components/login-page"

export default function Page() {
  const router = useRouter()

  return (
    <div className="relative">
      <LoginPage />

      {/* Teacher Portal Link */}
      <div className="absolute top-4 right-4">
        <Button
          onClick={() => router.push("/teacher/login")}
          variant="outline"
          className="bg-white/90 hover:bg-white border-emerald-200 text-emerald-700 hover:text-emerald-800"
        >
          Portal Docente
        </Button>
      </div>
    </div>
  )
}
