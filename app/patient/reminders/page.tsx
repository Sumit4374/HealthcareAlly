"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Pill, Clock, CalendarIcon } from "lucide-react"
import { PatientSidebar } from "@/components/patient-sidebar"

export default function RemindersPage() {
  const [reminders, setReminders] = useState([
    {
      id: 1,
      medicine: "Vitamin D3",
      dosage: "1 tablet after breakfast",
      frequency: 1,
      times: ["9:00"],
      startDate: "2024-01-15",
      endDate: "2024-02-15",
    },
    {
      id: 2,
      medicine: "Amoxicillin",
      dosage: "1 tablet",
      frequency: 3,
      times: ["8:00", "14:00", "20:00"],
      startDate: "2024-01-15",
      endDate: "2024-01-22",
    },
  ])

  const [newReminder, setNewReminder] = useState({
    medicine: "",
    dosage: "",
    frequency: 1,
    times: [""],
    startDate: "",
    endDate: "",
  })

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleFrequencyChange = (frequency: number) => {
    const times = Array(frequency)
      .fill("")
      .map((_, index) => {
        // Suggest default times based on frequency
        if (frequency === 1) return "09:00"
        if (frequency === 2) return index === 0 ? "09:00" : "21:00"
        if (frequency === 3) return index === 0 ? "08:00" : index === 1 ? "14:00" : "20:00"
        if (frequency === 4) return index === 0 ? "08:00" : index === 1 ? "12:00" : index === 2 ? "16:00" : "20:00"
        return ""
      })

    setNewReminder((prev) => ({ ...prev, frequency, times }))
  }

  const handleTimeChange = (index: number, time: string) => {
    const newTimes = [...newReminder.times]
    newTimes[index] = time
    setNewReminder((prev) => ({ ...prev, times: newTimes }))
  }

  const handleAddReminder = () => {
    if (
      newReminder.medicine &&
      newReminder.dosage &&
      newReminder.times.every((time) => time) &&
      newReminder.startDate &&
      newReminder.endDate
    ) {
      const reminder = {
        id: Date.now(),
        ...newReminder,
      }
      setReminders([...reminders, reminder])
      setNewReminder({ medicine: "", dosage: "", frequency: 1, times: [""], startDate: "", endDate: "" })
      setIsDialogOpen(false)
    }
  }

  const calculateDaysRemaining = (endDate: string) => {
    const today = new Date()
    const end = new Date(endDate)
    const diffTime = end.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 0 ? diffDays : 0
  }

  const stats = {
    activeReminders: reminders.length,
    dueToday: reminders.reduce((sum, reminder) => sum + reminder.frequency, 0),
    streakDays: 7,
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100">
      <PatientSidebar />

      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-white border-emerald-200">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Pill className="w-6 h-6 text-emerald-500 mr-2" />
                  <span className="text-emerald-600 text-sm font-medium">ACTIVE REMINDERS</span>
                </div>
                <div className="text-3xl font-bold text-gray-900">{stats.activeReminders}</div>
              </CardContent>
            </Card>

            <Card className="bg-white border-emerald-200">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Clock className="w-6 h-6 text-emerald-500 mr-2" />
                  <span className="text-emerald-600 text-sm font-medium">DOSES TODAY</span>
                </div>
                <div className="text-3xl font-bold text-gray-900">{stats.dueToday}</div>
              </CardContent>
            </Card>

            <Card className="bg-white border-emerald-200">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center mb-2">
                  <CalendarIcon className="w-6 h-6 text-emerald-500 mr-2" />
                  <span className="text-emerald-600 text-sm font-medium">STREAK DAYS</span>
                </div>
                <div className="text-3xl font-bold text-gray-900">{stats.streakDays}</div>
              </CardContent>
            </Card>
          </div>

          {/* Add New Reminder Button */}
          <div className="text-center mb-8">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Reminder
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-emerald-600 flex items-center">
                    <Plus className="w-5 h-5 mr-2" />
                    Add New Reminder
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="medicine">Medicine Name</Label>
                      <Input
                        id="medicine"
                        placeholder="Enter medicine name"
                        value={newReminder.medicine}
                        onChange={(e) => setNewReminder((prev) => ({ ...prev, medicine: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="dosage">Dosage</Label>
                      <Input
                        id="dosage"
                        placeholder="e.g., 1 tablet, 5ml"
                        value={newReminder.dosage}
                        onChange={(e) => setNewReminder((prev) => ({ ...prev, dosage: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="frequency">Frequency (times per day)</Label>
                    <select
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={newReminder.frequency}
                      onChange={(e) => handleFrequencyChange(Number(e.target.value))}
                    >
                      <option value={1}>Once daily</option>
                      <option value={2}>Twice daily</option>
                      <option value={3}>Three times daily</option>
                      <option value={4}>Four times daily</option>
                    </select>
                  </div>

                  <div>
                    <Label>Times</Label>
                    <div className="space-y-2">
                      {newReminder.times.map((time, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600 w-16">Time {index + 1}:</span>
                          <Input
                            type="time"
                            value={time}
                            onChange={(e) => handleTimeChange(index, e.target.value)}
                            className="flex-1"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="startDate">Start Date</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={newReminder.startDate}
                        onChange={(e) => setNewReminder((prev) => ({ ...prev, startDate: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="endDate">End Date</Label>
                      <Input
                        id="endDate"
                        type="date"
                        value={newReminder.endDate}
                        onChange={(e) => setNewReminder((prev) => ({ ...prev, endDate: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddReminder} className="bg-emerald-500 hover:bg-emerald-600">
                      Add Reminder
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Reminders List */}
          <Card className="bg-white border-emerald-200">
            <CardContent className="p-6">
              <div className="flex items-center mb-6">
                <Clock className="w-5 h-5 text-emerald-500 mr-2" />
                <h2 className="text-xl font-bold text-gray-900">Today's Schedule</h2>
              </div>

              {reminders.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Pill className="w-8 h-8 text-emerald-500" />
                  </div>
                  <p className="text-gray-500">No reminders yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {reminders.map((reminder) => (
                    <div key={reminder.id} className="border border-emerald-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center mr-4">
                            <Pill className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{reminder.medicine}</h3>
                            <p className="text-gray-600 text-sm">{reminder.dosage}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-emerald-600 font-medium">{reminder.frequency}x daily</p>
                          <p className="text-xs text-gray-500">
                            {calculateDaysRemaining(reminder.endDate)} days remaining
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
                        {reminder.times.map((time, index) => (
                          <div key={index} className="bg-emerald-50 p-2 rounded text-center">
                            <p className="text-emerald-600 font-medium">{time}</p>
                            <p className="text-xs text-gray-500">Dose {index + 1}</p>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-between items-center text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Start:</span> {reminder.startDate}
                        </div>
                        <div>
                          <span className="font-medium">End:</span> {reminder.endDate}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
