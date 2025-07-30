"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Calendar, Users, UserCheck, Settings, Building2, LogOut, Shield } from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/hospital/dashboard", icon: LayoutDashboard },
  { name: "Appointments", href: "/hospital/appointments", icon: Calendar },
  { name: "Patients", href: "/hospital/patients", icon: Users },
  { name: "Doctors", href: "/hospital/doctors", icon: UserCheck },
  { name: "Insurances", href: "/hospital/insurances", icon: Shield },
  { name: "Settings", href: "/hospital/settings", icon: Settings },
]

export function HospitalSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-gray-800 border-r border-gray-700">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center px-6 py-4 border-b border-gray-700">
          <Building2 className="w-8 h-8 text-emerald-400 mr-3" />
          <div>
            <h1 className="text-white font-bold text-lg">Healthcare Ally</h1>
            <p className="text-gray-400 text-sm">Hospital Portal</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                  isActive ? "bg-emerald-500 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white",
                )}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* User Info */}
        <div className="border-t border-gray-700 p-4">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center mr-3">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-white font-medium">Hospital Admin</p>
              <p className="text-gray-400 text-sm">admin@hospital.com</p>
            </div>
          </div>
          <Link
            href="/auth/login"
            className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Link>
        </div>
      </div>
    </div>
  )
}
