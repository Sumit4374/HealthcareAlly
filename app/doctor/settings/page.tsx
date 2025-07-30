"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, Bell, Clock, Save } from "lucide-react"
import { DoctorSidebar } from "@/components/doctor-sidebar"

export default function DoctorSettingsPage() {
  const [profile, setProfile] = useState({
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@healthcareally.com",
    phone: "+1 234-567-8901",
    specialization: "Cardiology",
    licenseNumber: "MD123456",
    experience: "15",
    consultationFee: "150",
    bio: "Experienced cardiologist with 15 years of practice in treating heart conditions.",
    hospital: "City Hospital",
  })

  const [notifications, setNotifications] = useState({
    appointmentReminders: true,
    patientMessages: true,
    paymentAlerts: true,
    systemUpdates: false,
  })

  const [availability, setAvailability] = useState({
    monday: { enabled: true, start: "09:00", end: "17:00" },
    tuesday: { enabled: true, start: "09:00", end: "17:00" },
    wednesday: { enabled: true, start: "09:00", end: "17:00" },
    thursday: { enabled: true, start: "09:00", end: "17:00" },
    friday: { enabled: true, start: "09:00", end: "17:00" },
    saturday: { enabled: false, start: "09:00", end: "13:00" },
    sunday: { enabled: false, start: "09:00", end: "13:00" },
  })

  const handleSaveProfile = () => {
    alert("Profile updated successfully!")
  }

  const handleSaveNotifications = () => {
    alert("Notification preferences updated!")
  }

  const handleSaveAvailability = () => {
    alert("Availability schedule updated!")
  }

  return (
    <div className="flex min-h-screen bg-gray-900">
      <DoctorSidebar />

      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
            <p className="text-gray-400">Manage your profile and preferences</p>
          </div>

          <div className="space-y-6">
            {/* Profile Settings */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <User className="w-6 h-6 mr-2 text-emerald-400" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-gray-300">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile((prev) => ({ ...prev, name: e.target.value }))}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-gray-300">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile((prev) => ({ ...prev, email: e.target.value }))}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-gray-300">
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => setProfile((prev) => ({ ...prev, phone: e.target.value }))}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="specialization" className="text-gray-300">
                      Specialization
                    </Label>
                    <Select onValueChange={(value) => setProfile((prev) => ({ ...prev, specialization: value }))}>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue placeholder={profile.specialization} />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        <SelectItem value="cardiology">Cardiology</SelectItem>
                        <SelectItem value="dermatology">Dermatology</SelectItem>
                        <SelectItem value="neurology">Neurology</SelectItem>
                        <SelectItem value="orthopedics">Orthopedics</SelectItem>
                        <SelectItem value="pediatrics">Pediatrics</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="license" className="text-gray-300">
                      License Number
                    </Label>
                    <Input
                      id="license"
                      value={profile.licenseNumber}
                      onChange={(e) => setProfile((prev) => ({ ...prev, licenseNumber: e.target.value }))}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="fee" className="text-gray-300">
                      Consultation Fee (USD)
                    </Label>
                    <Input
                      id="fee"
                      type="number"
                      value={profile.consultationFee}
                      onChange={(e) => setProfile((prev) => ({ ...prev, consultationFee: e.target.value }))}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="bio" className="text-gray-300">
                    Bio
                  </Label>
                  <Textarea
                    id="bio"
                    value={profile.bio}
                    onChange={(e) => setProfile((prev) => ({ ...prev, bio: e.target.value }))}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <Button onClick={handleSaveProfile} className="bg-emerald-500 hover:bg-emerald-600">
                  <Save className="w-4 h-4 mr-2" />
                  Save Profile
                </Button>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Bell className="w-6 h-6 mr-2 text-emerald-400" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white">Appointment Reminders</p>
                    <p className="text-gray-400 text-sm">Get notified about upcoming appointments</p>
                  </div>
                  <Switch
                    checked={notifications.appointmentReminders}
                    onCheckedChange={(checked) =>
                      setNotifications((prev) => ({ ...prev, appointmentReminders: checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white">Patient Messages</p>
                    <p className="text-gray-400 text-sm">Get notified when patients send messages</p>
                  </div>
                  <Switch
                    checked={notifications.patientMessages}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, patientMessages: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white">Payment Alerts</p>
                    <p className="text-gray-400 text-sm">Get notified about payment confirmations</p>
                  </div>
                  <Switch
                    checked={notifications.paymentAlerts}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, paymentAlerts: checked }))}
                  />
                </div>
                <Button onClick={handleSaveNotifications} className="bg-emerald-500 hover:bg-emerald-600">
                  <Save className="w-4 h-4 mr-2" />
                  Save Preferences
                </Button>
              </CardContent>
            </Card>

            {/* Availability Settings */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Clock className="w-6 h-6 mr-2 text-emerald-400" />
                  Availability Schedule
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(availability).map(([day, schedule]) => (
                  <div key={day} className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Switch
                        checked={schedule.enabled}
                        onCheckedChange={(checked) =>
                          setAvailability((prev) => ({
                            ...prev,
                            [day]: { ...prev[day as keyof typeof prev], enabled: checked },
                          }))
                        }
                      />
                      <span className="text-white capitalize w-20">{day}</span>
                    </div>
                    {schedule.enabled && (
                      <div className="flex items-center space-x-2">
                        <Input
                          type="time"
                          value={schedule.start}
                          onChange={(e) =>
                            setAvailability((prev) => ({
                              ...prev,
                              [day]: { ...prev[day as keyof typeof prev], start: e.target.value },
                            }))
                          }
                          className="bg-gray-700 border-gray-600 text-white w-32"
                        />
                        <span className="text-gray-400">to</span>
                        <Input
                          type="time"
                          value={schedule.end}
                          onChange={(e) =>
                            setAvailability((prev) => ({
                              ...prev,
                              [day]: { ...prev[day as keyof typeof prev], end: e.target.value },
                            }))
                          }
                          className="bg-gray-700 border-gray-600 text-white w-32"
                        />
                      </div>
                    )}
                  </div>
                ))}
                <Button onClick={handleSaveAvailability} className="bg-emerald-500 hover:bg-emerald-600">
                  <Save className="w-4 h-4 mr-2" />
                  Save Schedule
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
