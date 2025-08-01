"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, Bell, Clock, Calendar, Bot, Activity, ShoppingCart, Scan, LogOut, Menu, X, Wallet, Shield, TestTube, FlaskConical } from "lucide-react"
import { Button } from "@/components/ui/button"

const navigation = [
  { name: "Dashboard", href: "/patient/dashboard", icon: Home },
  { name: "Reminders", href: "/patient/reminders", icon: Bell },
  { name: "Track Medicine", href: "/patient/track-medicine", icon: Clock },
  { name: "Appointments", href: "/patient/appointments", icon: Calendar },
  { name: "Lab Management", href: "/patient/lab-management", icon: TestTube },
  { name: "Lab Appointments", href: "/patient/lab-appointments", icon: TestTube },
  { name: "AI Assistant", href: "/patient/ai-assistant", icon: Bot },
  { name: "Health Records", href: "/patient/health-records", icon: Activity },
  { name: "Lab Reports", href: "/patient/lab-reports", icon: FlaskConical },
  { name: "Insurances", href: "/patient/insurances", icon: Shield },
  { name: "Pharmacy", href: "/patient/pharmacy", icon: ShoppingCart },
  { name: "HealthCoin Wallet", href: "/patient/wallet", icon: Wallet },
  { name: "Scan Prescription", href: "/patient/scan-prescription", icon: Scan },
]

export function PatientSidebar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("userType")
    localStorage.removeItem("userId")
    localStorage.removeItem("userName")
    window.location.href = "/"
  }

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-white/90 backdrop-blur-sm"
        >
          {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-gray-800 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center px-6 py-4 border-b border-gray-700">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center mr-3">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-semibold text-lg">Healthcare Ally</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive ? "bg-emerald-600 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white",
                  )}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* Logout */}
          <div className="px-4 py-4 border-t border-gray-700">
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="w-full justify-start text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  )
}
