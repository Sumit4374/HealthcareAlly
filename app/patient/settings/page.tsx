"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, Bell, Shield, CreditCard, Save, Camera } from "lucide-react"
import { PatientSidebar } from "@/components/patient-sidebar"

export default function PatientSettingsPage() {
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@email.com",
    phone: "+1 234-567-8901",
    dateOfBirth: "1990-05-15",
    gender: "male",
    address: "123 Main Street, City, State 12345",
    emergencyContact: "Jane Smith - +1 234-567-8902",
    bloodType: "O+",
    allergies: "Penicillin, Shellfish",
  })

  const [notifications, setNotifications] = useState({
    appointmentReminders: true,
    medicationReminders: true,
    healthTips: false,
    promotions: false,
    emergencyAlerts: true,
  })

  const [privacy, setPrivacy] = useState({
    shareDataWithDoctors: true,
    allowResearchParticipation: false,
    showProfileToOthers: false,
    enableLocationServices: true,
  })

  const [paymentMethods] = useState([
    { id: 1, type: "HealthCoin", balance: 250, primary: true },
    { id: 2, type: "Credit Card", last4: "4532", primary: false },
    { id: 3, type: "Google Pay", email: "john.smith@gmail.com", primary: false },
  ])

  const handleSavePersonalInfo = () => {
    alert("Personal information updated successfully!")
  }

  const handleSaveNotifications = () => {
    alert("Notification preferences updated successfully!")
  }

  const handleSavePrivacy = () => {
    alert("Privacy settings updated successfully!")
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100">
      <PatientSidebar />

      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Account Settings</h1>
            <p className="text-gray-600">Manage your personal information and preferences</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Personal Information */}
            <Card className="bg-white border-emerald-200">
              <CardHeader>
                <CardTitle className="flex items-center text-emerald-600">
                  <User className="w-6 h-6 mr-2" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-center mb-4">
                  <div className="relative">
                    <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center">
                      <User className="w-12 h-12 text-white" />
                    </div>
                    <Button
                      size="sm"
                      className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0 bg-emerald-500 hover:bg-emerald-600"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={personalInfo.firstName}
                      onChange={(e) => setPersonalInfo((prev) => ({ ...prev, firstName: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={personalInfo.lastName}
                      onChange={(e) => setPersonalInfo((prev) => ({ ...prev, lastName: e.target.value }))}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={personalInfo.email}
                    onChange={(e) => setPersonalInfo((prev) => ({ ...prev, email: e.target.value }))}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={personalInfo.phone}
                      onChange={(e) => setPersonalInfo((prev) => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={personalInfo.dateOfBirth}
                      onChange={(e) => setPersonalInfo((prev) => ({ ...prev, dateOfBirth: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="gender">Gender</Label>
                    <Select
                      value={personalInfo.gender}
                      onValueChange={(value) => setPersonalInfo((prev) => ({ ...prev, gender: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="bloodType">Blood Type</Label>
                    <Select
                      value={personalInfo.bloodType}
                      onValueChange={(value) => setPersonalInfo((prev) => ({ ...prev, bloodType: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A+">A+</SelectItem>
                        <SelectItem value="A-">A-</SelectItem>
                        <SelectItem value="B+">B+</SelectItem>
                        <SelectItem value="B-">B-</SelectItem>
                        <SelectItem value="AB+">AB+</SelectItem>
                        <SelectItem value="AB-">AB-</SelectItem>
                        <SelectItem value="O+">O+</SelectItem>
                        <SelectItem value="O-">O-</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={personalInfo.address}
                    onChange={(e) => setPersonalInfo((prev) => ({ ...prev, address: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="emergencyContact">Emergency Contact</Label>
                  <Input
                    id="emergencyContact"
                    value={personalInfo.emergencyContact}
                    onChange={(e) => setPersonalInfo((prev) => ({ ...prev, emergencyContact: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="allergies">Allergies</Label>
                  <Textarea
                    id="allergies"
                    placeholder="List any known allergies..."
                    value={personalInfo.allergies}
                    onChange={(e) => setPersonalInfo((prev) => ({ ...prev, allergies: e.target.value }))}
                  />
                </div>

                <Button onClick={handleSavePersonalInfo} className="bg-emerald-500 hover:bg-emerald-600">
                  <Save className="w-4 h-4 mr-2" />
                  Save Personal Info
                </Button>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card className="bg-white border-emerald-200">
              <CardHeader>
                <CardTitle className="flex items-center text-emerald-600">
                  <Bell className="w-6 h-6 mr-2" />
                  Notification Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Appointment Reminders</p>
                    <p className="text-gray-600 text-sm">Get notified about upcoming appointments</p>
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
                    <p className="font-medium">Medication Reminders</p>
                    <p className="text-gray-600 text-sm">Reminders to take your medications</p>
                  </div>
                  <Switch
                    checked={notifications.medicationReminders}
                    onCheckedChange={(checked) =>
                      setNotifications((prev) => ({ ...prev, medicationReminders: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Health Tips</p>
                    <p className="text-gray-600 text-sm">Receive personalized health tips</p>
                  </div>
                  <Switch
                    checked={notifications.healthTips}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, healthTips: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Promotions</p>
                    <p className="text-gray-600 text-sm">Special offers and promotions</p>
                  </div>
                  <Switch
                    checked={notifications.promotions}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, promotions: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Emergency Alerts</p>
                    <p className="text-gray-600 text-sm">Critical health and safety alerts</p>
                  </div>
                  <Switch
                    checked={notifications.emergencyAlerts}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, emergencyAlerts: checked }))}
                  />
                </div>

                <Button onClick={handleSaveNotifications} className="bg-emerald-500 hover:bg-emerald-600">
                  <Save className="w-4 h-4 mr-2" />
                  Save Notifications
                </Button>
              </CardContent>
            </Card>

            {/* Privacy Settings */}
            <Card className="bg-white border-emerald-200">
              <CardHeader>
                <CardTitle className="flex items-center text-emerald-600">
                  <Shield className="w-6 h-6 mr-2" />
                  Privacy Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Share Data with Doctors</p>
                    <p className="text-gray-600 text-sm">Allow doctors to access your health data</p>
                  </div>
                  <Switch
                    checked={privacy.shareDataWithDoctors}
                    onCheckedChange={(checked) => setPrivacy((prev) => ({ ...prev, shareDataWithDoctors: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Research Participation</p>
                    <p className="text-gray-600 text-sm">Allow anonymous data for medical research</p>
                  </div>
                  <Switch
                    checked={privacy.allowResearchParticipation}
                    onCheckedChange={(checked) =>
                      setPrivacy((prev) => ({ ...prev, allowResearchParticipation: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Public Profile</p>
                    <p className="text-gray-600 text-sm">Make your profile visible to other patients</p>
                  </div>
                  <Switch
                    checked={privacy.showProfileToOthers}
                    onCheckedChange={(checked) => setPrivacy((prev) => ({ ...prev, showProfileToOthers: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Location Services</p>
                    <p className="text-gray-600 text-sm">Use location for nearby hospitals and services</p>
                  </div>
                  <Switch
                    checked={privacy.enableLocationServices}
                    onCheckedChange={(checked) => setPrivacy((prev) => ({ ...prev, enableLocationServices: checked }))}
                  />
                </div>

                <Button onClick={handleSavePrivacy} className="bg-emerald-500 hover:bg-emerald-600">
                  <Save className="w-4 h-4 mr-2" />
                  Save Privacy Settings
                </Button>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card className="bg-white border-emerald-200">
              <CardHeader>
                <CardTitle className="flex items-center text-emerald-600">
                  <CreditCard className="w-6 h-6 mr-2" />
                  Payment Methods
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {paymentMethods.map((method) => (
                  <div key={method.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="font-medium">{method.type}</p>
                        <p className="text-gray-600 text-sm">
                          {method.type === "HealthCoin" && `Balance: ${method.balance} HC`}
                          {method.type === "Credit Card" && `****${method.last4}`}
                          {method.type === "Google Pay" && method.email}
                        </p>
                      </div>
                    </div>
                    {method.primary && (
                      <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full">Primary</span>
                    )}
                  </div>
                ))}

                <Button variant="outline" className="w-full border-emerald-500 text-emerald-600 bg-transparent">
                  Add Payment Method
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
