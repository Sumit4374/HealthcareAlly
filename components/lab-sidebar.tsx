"use client"

import { FlaskConical, Calendar, Send, Clock, ActivitySquare, FileText, Users, Settings, LogOut } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

// Menu items for lab dashboard
const labMenuItems = [
  {
    title: "Dashboard",
    url: "/lab/dashboard",
    icon: FlaskConical,
  },
  {
    title: "Appointments",
    url: "/lab/appointments",
    icon: Calendar,
  },
  {
    title: "Send Results",
    url: "/lab/send-results",
    icon: Send,
  },
  {
    title: "Opening Hours",
    url: "/lab/settings",
    icon: Clock,
  },
  {
    title: "Activity Logs",
    url: "/lab/activity-logs",
    icon: ActivitySquare,
  },
  {
    title: "Test Reports",
    url: "/lab/reports",
    icon: FileText,
  },
  {
    title: "Patient Records",
    url: "/lab/patients",
    icon: Users,
  },
  {
    title: "Settings",
    url: "/lab/settings",
    icon: Settings,
  },
]

export function LabSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center">
          <FlaskConical className="w-8 h-8 text-emerald-400 mr-3" />
          <div>
            <h2 className="text-white font-bold text-lg">Lab Portal</h2>
            <p className="text-gray-400 text-sm">Management System</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {labMenuItems.map((item) => {
            const isActive = pathname === item.url
            return (
              <Link
                key={item.title}
                href={item.url}
                className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                  isActive ? "bg-emerald-600 text-white" : "text-gray-300 hover:text-white hover:bg-gray-700"
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                <span className="font-medium">{item.title}</span>
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700">
        <button className="flex items-center px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-red-600/20 transition-colors w-full">
          <LogOut className="w-5 h-5 mr-3" />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  )
}
