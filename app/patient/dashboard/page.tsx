"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, Clock, Calendar, Scan, ShoppingCart, Pill, ChevronRight, Coins, Wallet } from "lucide-react"
import Link from "next/link"
import { PatientSidebar } from "@/components/patient-sidebar"

export default function PatientDashboard() {
  const [userName, setUserName] = useState("Anil")
  const [healthCoinBalance, setHealthCoinBalance] = useState(250)
  const [reminders, setReminders] = useState([
    {
      id: 1,
      medicine: "Vitamin D3",
      dosage: "1 tablet after breakfast",
      time: "9:00 AM",
      status: "pending",
    },
    {
      id: 2,
      medicine: "ABC",
      dosage: "2 tablets after dinner",
      time: "8:00 PM",
      status: "pending",
    },
  ])

  return (
    <div className="flex min-h-screen bg-gray-900">
      <PatientSidebar />

      <div className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Header with HealthCoin Balance */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Welcome Back, {userName}!</h1>
              <p className="text-gray-400">Here's your health overview for today</p>
            </div>
            <Card className="bg-gradient-to-r from-emerald-500 to-emerald-600 border-emerald-400">
              <CardContent className="p-4">
                <div className="flex items-center text-white">
                  <Coins className="w-8 h-8 mr-3" />
                  <div>
                    <p className="text-sm opacity-90">HealthCoin Balance</p>
                    <p className="text-2xl font-bold">{healthCoinBalance} HC</p>
                    <p className="text-xs opacity-75">${(healthCoinBalance * 0.1).toFixed(2)} USD</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Link href="/patient/reminders">
              <Card className="bg-gray-800 border-emerald-500/20 hover:border-emerald-500/40 transition-colors cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center mb-2">
                        <Bell className="w-5 h-5 text-emerald-400 mr-2" />
                        <h3 className="text-white font-semibold">Set Reminder</h3>
                      </div>
                      <p className="text-gray-400 text-sm">Never miss your medicine doses</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-400 transition-colors" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/patient/track-medicine">
              <Card className="bg-gray-800 border-emerald-500/20 hover:border-emerald-500/40 transition-colors cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center mb-2">
                        <Clock className="w-5 h-5 text-emerald-400 mr-2" />
                        <h3 className="text-white font-semibold">Track Medicine</h3>
                      </div>
                      <p className="text-gray-400 text-sm">Monitor your medicine routine</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-400 transition-colors" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/patient/appointments">
              <Card className="bg-gray-800 border-emerald-500/20 hover:border-emerald-500/40 transition-colors cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center mb-2">
                        <Calendar className="w-5 h-5 text-emerald-400 mr-2" />
                        <h3 className="text-white font-semibold">Make Appointment</h3>
                      </div>
                      <p className="text-gray-400 text-sm">Schedule your next visit</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-400 transition-colors" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Secondary Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center mb-2">
                      <Scan className="w-5 h-5 text-emerald-400 mr-2" />
                      <h3 className="text-white font-semibold">Scan Prescription</h3>
                    </div>
                    <p className="text-gray-400 text-sm mb-4">Add prescription to your routine</p>
                    <Link href="/patient/scan-prescription">
                      <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">Scan Now</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center mb-2">
                      <ShoppingCart className="w-5 h-5 text-emerald-400 mr-2" />
                      <h3 className="text-white font-semibold">Purchase Medicine</h3>
                    </div>
                    <p className="text-gray-400 text-sm mb-2">Buy medicines with HealthCoin or Google Pay</p>
                    <p className="text-emerald-400 text-xs mb-4">💰 Pay with {healthCoinBalance} HC available</p>
                    <Link href="/patient/pharmacy">
                      <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">Shop Now</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* HealthCoin Rewards Section */}
          <Card className="bg-gradient-to-r from-emerald-900/20 to-emerald-800/20 border-emerald-500/20 mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center mb-2">
                    <Wallet className="w-6 h-6 text-emerald-400 mr-2" />
                    <h3 className="text-white font-semibold text-lg">Earn More HealthCoins</h3>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">Complete these activities to earn HC rewards:</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-emerald-400">
                      <Pill className="w-4 h-4 mr-2" />
                      <span>Take medicine on time: +5 HC per dose</span>
                    </div>
                    <div className="flex items-center text-emerald-400">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>Attend appointments: +25 HC per visit</span>
                    </div>
                    <div className="flex items-center text-emerald-400">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>7-day medication streak: +50 HC bonus</span>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mb-2">
                    <Coins className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-emerald-400 text-sm font-medium">Earn HC Daily!</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reminders Section */}
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Reminders</h2>
                <Link href="/patient/reminders">
                  <Button
                    variant="outline"
                    className="border-emerald-500 text-emerald-400 hover:bg-emerald-500 hover:text-white bg-transparent"
                  >
                    View All
                  </Button>
                </Link>
              </div>

              <div className="space-y-4">
                {reminders.map((reminder) => (
                  <div
                    key={reminder.id}
                    className="flex items-center justify-between p-4 bg-emerald-900/20 border border-emerald-500/20 rounded-lg"
                  >
                    <div className="flex items-center">
                      <Pill className="w-5 h-5 text-emerald-400 mr-3" />
                      <div>
                        <h3 className="text-white font-medium">{reminder.medicine}</h3>
                        <p className="text-gray-400 text-sm">{reminder.dosage}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-emerald-400 font-medium">{reminder.time}</p>
                      <p className="text-gray-400 text-sm">+5 HC reward</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
