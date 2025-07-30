"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Building2, Bell, Users, Save, Clock } from "lucide-react"
import { HospitalSidebar } from "@/components/hospital-sidebar"

export default function HospitalSettingsPage() {
  const [hospitalInfo, setHospitalInfo] = useState({
    name: "Chakraborty Multi Speciality Hospital",
    address: "Near Dollygunj Junction, South Andaman, Andaman and Nicobar Islands (744101)",
    phone: "03192251971",
    email: "info@chakrabortyhospital.com",
    website: "www.chakrabortyhospital.com",
    licenseNumber: "HSP123456",
    established: "1995",
    bedCapacity: "200",
    description:
      "A leading multi-specialty hospital providing comprehensive healthcare services with state-of-the-art facilities and experienced medical professionals.",
  })

  const [operatingHours, setOperatingHours] = useState({
    monday: { enabled: true, start: "08:00", end: "20:00" },
    tuesday: { enabled: true, start: "08:00", end: "20:00" },
    wednesday: { enabled: true, start: "08:00", end: "20:00" },
    thursday: { enabled: true, start: "08:00", end: "20:00" },
    friday: { enabled: true, start: "08:00", end: "20:00" },
    saturday: { enabled: true, start: "08:00", end: "18:00" },
    sunday: { enabled: true, start: "09:00", end: "17:00" },
  })

  const [notifications, setNotifications] = useState({
    appointmentAlerts: true,
    emergencyAlerts: true,
    staffUpdates: true,
    systemMaintenance: false,
    patientFeedback: true,
  })

  const [departments] = useState([
    { id: 1, name: "Cardiology", head: "Dr. Sarah Johnson", beds: 25 },
    { id: 2, name: "Neurology", head: "Dr. Michael Chen", beds: 20 },
    { id: 3, name: "Orthopedics", head: "Dr. Emily Davis", beds: 30 },
    { id: 4, name: "Pediatrics", head: "Dr. Robert Wilson", beds: 15 },
    { id: 5, name: "Emergency", head: "Dr. Lisa Brown", beds: 10 },
  ])

  const handleSaveHospitalInfo = () => {
    alert("Hospital information updated successfully!")
  }

  const handleSaveOperatingHours = () => {
    alert("Operating hours updated successfully!")
  }

  const handleSaveNotifications = () => {
    alert("Notification preferences updated successfully!")
  }

  return (
    <div className="flex min-h-screen bg-gray-900">
      <HospitalSidebar />

      <div className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Hospital Settings</h1>
            <p className="text-gray-400">Manage hospital information and preferences</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Hospital Information */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Building2 className="w-6 h-6 mr-2 text-emerald-400" />
                  Hospital Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="hospitalName" className="text-gray-300">
                    Hospital Name
                  </Label>
                  <Input
                    id="hospitalName"
                    value={hospitalInfo.name}
                    onChange={(e) => setHospitalInfo((prev) => ({ ...prev, name: e.target.value }))}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="address" className="text-gray-300">
                    Address
                  </Label>
                  <Textarea
                    id="address"
                    value={hospitalInfo.address}
                    onChange={(e) => setHospitalInfo((prev) => ({ ...prev, address: e.target.value }))}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone" className="text-gray-300">
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      value={hospitalInfo.phone}
                      onChange={(e) => setHospitalInfo((prev) => ({ ...prev, phone: e.target.value }))}
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
                      value={hospitalInfo.email}
                      onChange={(e) => setHospitalInfo((prev) => ({ ...prev, email: e.target.value }))}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="license" className="text-gray-300">
                      License Number
                    </Label>
                    <Input
                      id="license"
                      value={hospitalInfo.licenseNumber}
                      onChange={(e) => setHospitalInfo((prev) => ({ ...prev, licenseNumber: e.target.value }))}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="bedCapacity" className="text-gray-300">
                      Bed Capacity
                    </Label>
                    <Input
                      id="bedCapacity"
                      type="number"
                      value={hospitalInfo.bedCapacity}
                      onChange={(e) => setHospitalInfo((prev) => ({ ...prev, bedCapacity: e.target.value }))}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description" className="text-gray-300">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={hospitalInfo.description}
                    onChange={(e) => setHospitalInfo((prev) => ({ ...prev, description: e.target.value }))}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>

                <Button onClick={handleSaveHospitalInfo} className="bg-emerald-500 hover:bg-emerald-600">
                  <Save className="w-4 h-4 mr-2" />
                  Save Information
                </Button>
              </CardContent>
            </Card>

            {/* Operating Hours */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Clock className="w-6 h-6 mr-2 text-emerald-400" />
                  Operating Hours
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(operatingHours).map(([day, hours]) => (
                  <div key={day} className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Switch
                        checked={hours.enabled}
                        onCheckedChange={(checked) =>
                          setOperatingHours((prev) => ({
                            ...prev,
                            [day]: { ...prev[day as keyof typeof prev], enabled: checked },
                          }))
                        }
                      />
                      <span className="text-white capitalize w-20">{day}</span>
                    </div>
                    {hours.enabled && (
                      <div className="flex items-center space-x-2">
                        <Input
                          type="time"
                          value={hours.start}
                          onChange={(e) =>
                            setOperatingHours((prev) => ({
                              ...prev,
                              [day]: { ...prev[day as keyof typeof prev], start: e.target.value },
                            }))
                          }
                          className="bg-gray-700 border-gray-600 text-white w-32"
                        />
                        <span className="text-gray-400">to</span>
                        <Input
                          type="time"
                          value={hours.end}
                          onChange={(e) =>
                            setOperatingHours((prev) => ({
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
                <Button onClick={handleSaveOperatingHours} className="bg-emerald-500 hover:bg-emerald-600">
                  <Save className="w-4 h-4 mr-2" />
                  Save Hours
                </Button>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Bell className="w-6 h-6 mr-2 text-emerald-400" />
                  Notification Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white">Appointment Alerts</p>
                    <p className="text-gray-400 text-sm">Get notified about new appointments</p>
                  </div>
                  <Switch
                    checked={notifications.appointmentAlerts}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, appointmentAlerts: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white">Emergency Alerts</p>
                    <p className="text-gray-400 text-sm">Critical emergency notifications</p>
                  </div>
                  <Switch
                    checked={notifications.emergencyAlerts}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, emergencyAlerts: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white">Staff Updates</p>
                    <p className="text-gray-400 text-sm">Updates about staff schedules and changes</p>
                  </div>
                  <Switch
                    checked={notifications.staffUpdates}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, staffUpdates: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white">Patient Feedback</p>
                    <p className="text-gray-400 text-sm">Notifications about patient reviews and feedback</p>
                  </div>
                  <Switch
                    checked={notifications.patientFeedback}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, patientFeedback: checked }))}
                  />
                </div>

                <Button onClick={handleSaveNotifications} className="bg-emerald-500 hover:bg-emerald-600">
                  <Save className="w-4 h-4 mr-2" />
                  Save Preferences
                </Button>
              </CardContent>
            </Card>

            {/* Departments Overview */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Users className="w-6 h-6 mr-2 text-emerald-400" />
                  Departments Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {departments.map((dept) => (
                    <div key={dept.id} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                      <div>
                        <h4 className="text-white font-medium">{dept.name}</h4>
                        <p className="text-gray-400 text-sm">Head: {dept.head}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-emerald-400 font-medium">{dept.beds} beds</p>
                        <p className="text-gray-400 text-sm">Available</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
