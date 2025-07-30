"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Clock,
  Calendar,
  Send,
  FlaskConical,
  ActivitySquare,
  Coins,
  ChevronRight,
  TestTube,
  Wallet,
  Users,
  CheckCircle,
  FileText,
} from "lucide-react"
import Link from "next/link"
import { LabSidebar } from "@/components/lab-sidebar"

export default function LabDashboard() {
  const [userName, setUserName] = useState("Dr. Smith")
  const [labCoinBalance, setLabCoinBalance] = useState(320)
  const [pendingTests, setPendingTests] = useState([
    {
      id: 1,
      patient: "John Doe",
      test: "Complete Blood Count",
      appointmentTime: "10:30 AM",
      status: "pending",
    },
    {
      id: 2,
      patient: "Sarah Smith",
      test: "Lipid Profile",
      appointmentTime: "2:00 PM",
      status: "pending",
    },
  ])

  return (
    <div className="flex min-h-screen bg-gray-900">
      <LabSidebar />
      <div className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Header with LabCoin Balance */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Welcome Back, {userName}!</h1>
              <p className="text-gray-400">Here's your lab overview for today</p>
            </div>
            <Card className="bg-gradient-to-r from-emerald-500 to-emerald-600 border-emerald-400">
              <CardContent className="p-4">
                <div className="flex items-center text-white">
                  <Coins className="w-8 h-8 mr-3" />
                  <div>
                    <p className="text-sm opacity-90">LabCoin Balance</p>
                    <p className="text-2xl font-bold">{labCoinBalance} LC</p>
                    <p className="text-xs opacity-75">${(labCoinBalance * 0.1).toFixed(2)} USD</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Link href="/lab/settings">
              <Card className="bg-gray-800 border-emerald-500/20 hover:border-emerald-500/40 transition-colors cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center mb-2">
                        <Clock className="w-5 h-5 text-emerald-400 mr-2" />
                        <h3 className="text-white font-semibold">Opening Hours</h3>
                      </div>
                      <p className="text-gray-400 text-sm">Manage lab availability</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-400 transition-colors" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/lab/appointments">
              <Card className="bg-gray-800 border-emerald-500/20 hover:border-emerald-500/40 transition-colors cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center mb-2">
                        <Calendar className="w-5 h-5 text-emerald-400 mr-2" />
                        <h3 className="text-white font-semibold">Manage Tests</h3>
                      </div>
                      <p className="text-gray-400 text-sm">View and process test requests</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-400 transition-colors" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/lab/send-results">
              <Card className="bg-gray-800 border-emerald-500/20 hover:border-emerald-500/40 transition-colors cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center mb-2">
                        <Send className="w-5 h-5 text-emerald-400 mr-2" />
                        <h3 className="text-white font-semibold">Send Results</h3>
                      </div>
                      <p className="text-gray-400 text-sm">Share results with patients</p>
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
                      <FlaskConical className="w-5 h-5 text-emerald-400 mr-2" />
                      <h3 className="text-white font-semibold">Available Tests</h3>
                    </div>
                    <p className="text-gray-400 text-sm mb-4">Manage lab test catalog</p>
                    <Link href="/lab/test-catalog">
                      <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">Manage Tests</Button>
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
                      <ActivitySquare className="w-5 h-5 text-emerald-400 mr-2" />
                      <h3 className="text-white font-semibold">Activity Logs</h3>
                    </div>
                    <p className="text-gray-400 text-sm mb-4">View recent lab activities</p>
                    <Link href="/lab/activity-logs">
                      <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">View Logs</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Lab Reports and Patient Management */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center mb-2">
                      <FileText className="w-5 h-5 text-emerald-400 mr-2" />
                      <h3 className="text-white font-semibold">Test Reports</h3>
                    </div>
                    <p className="text-gray-400 text-sm mb-4">Review and manage results</p>
                    <Link href="/lab/reports">
                      <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">View Reports</Button>
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
                      <Users className="w-5 h-5 text-emerald-400 mr-2" />
                      <h3 className="text-white font-semibold">Patient Records</h3>
                    </div>
                    <p className="text-gray-400 text-sm mb-2">Manage patient information</p>
                    <p className="text-emerald-400 text-xs mb-4">💰 Earn {labCoinBalance} LC per completed test</p>
                    <Link href="/lab/patients">
                      <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">Manage Records</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* LabCoin Rewards Section */}
          <Card className="bg-gradient-to-r from-emerald-900/20 to-emerald-800/20 border-emerald-500/20 mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center mb-2">
                    <Wallet className="w-6 h-6 text-emerald-400 mr-2" />
                    <h3 className="text-white font-semibold text-lg">Earn More LabCoins</h3>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">Complete these activities to earn LC rewards:</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-emerald-400">
                      <TestTube className="w-4 h-4 mr-2" />
                      <span>Complete lab test: +15 LC per test</span>
                    </div>
                    <div className="flex items-center text-emerald-400">
                      <Send className="w-4 h-4 mr-2" />
                      <span>Send results on time: +10 LC per report</span>
                    </div>
                    <div className="flex items-center text-emerald-400">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      <span>100% accuracy streak: +50 LC bonus</span>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mb-2">
                    <Coins className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-emerald-400 text-sm font-medium">Earn LC Daily!</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pending Tests Section */}
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Pending Tests</h2>
                <Link href="/lab/appointments">
                  <Button
                    variant="outline"
                    className="border-emerald-500 text-emerald-400 hover:bg-emerald-500 hover:text-white bg-transparent"
                  >
                    View All
                  </Button>
                </Link>
              </div>
              <div className="space-y-4">
                {pendingTests.map((test) => (
                  <div
                    key={test.id}
                    className="flex items-center justify-between p-4 bg-emerald-900/20 border border-emerald-500/20 rounded-lg"
                  >
                    <div className="flex items-center">
                      <TestTube className="w-5 h-5 text-emerald-400 mr-3" />
                      <div>
                        <h3 className="text-white font-medium">{test.patient}</h3>
                        <p className="text-gray-400 text-sm">{test.test}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-emerald-400 font-medium">{test.appointmentTime}</p>
                      <p className="text-gray-400 text-sm">+15 LC reward</p>
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
