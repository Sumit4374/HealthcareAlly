"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, TestTube, Save, Plus, Edit, Trash2, Building } from "lucide-react"
import { LabSidebar } from "@/components/lab-sidebar"

export default function LabSettings() {
  const [labSettings, setLabSettings] = useState({
    openingTime: "08:00",
    closingTime: "18:00",
    labName: "Advanced Medical Laboratory",
    labAddress: "123 Healthcare Blvd, Medical District, City 12345",
    labPhone: "+1 (555) 123-4567",
    labEmail: "contact@advancedmedlab.com",
    availableTests: [
      { id: 1, name: "Complete Blood Count", duration: "30 min", price: "$50", category: "Hematology" },
      { id: 2, name: "MRI Scan", duration: "60 min", price: "$300", category: "Radiology" },
      { id: 3, name: "X-Ray", duration: "15 min", price: "$75", category: "Radiology" },
      { id: 4, name: "CT Scan", duration: "45 min", price: "$250", category: "Radiology" },
      { id: 5, name: "Ultrasound", duration: "30 min", price: "$100", category: "Radiology" },
      { id: 6, name: "Lipid Profile", duration: "20 min", price: "$60", category: "Chemistry" },
      { id: 7, name: "Liver Function Test", duration: "25 min", price: "$80", category: "Chemistry" },
      { id: 8, name: "Thyroid Function Test", duration: "30 min", price: "$90", category: "Endocrinology" },
    ],
  })

  const [newTest, setNewTest] = useState({
    name: "",
    duration: "",
    price: "",
    category: "",
  })

  const [editingTest, setEditingTest] = useState(null)
  const [showAddTest, setShowAddTest] = useState(false)

  const handleSaveSettings = () => {
    // Handle saving settings logic here
    console.log("Saving settings:", labSettings)
    alert("Settings saved successfully!")
  }

  const handleAddTest = () => {
    if (newTest.name && newTest.duration && newTest.price && newTest.category) {
      const test = {
        id: Date.now(),
        ...newTest,
      }
      setLabSettings((prev) => ({
        ...prev,
        availableTests: [...prev.availableTests, test],
      }))
      setNewTest({ name: "", duration: "", price: "", category: "" })
      setShowAddTest(false)
    }
  }

  const handleEditTest = (test) => {
    setEditingTest(test)
    setNewTest(test)
    setShowAddTest(true)
  }

  const handleUpdateTest = () => {
    if (editingTest) {
      setLabSettings((prev) => ({
        ...prev,
        availableTests: prev.availableTests.map((test) =>
          test.id === editingTest.id ? { ...editingTest, ...newTest } : test,
        ),
      }))
      setEditingTest(null)
      setNewTest({ name: "", duration: "", price: "", category: "" })
      setShowAddTest(false)
    }
  }

  const handleDeleteTest = (testId) => {
    if (confirm("Are you sure you want to delete this test?")) {
      setLabSettings((prev) => ({
        ...prev,
        availableTests: prev.availableTests.filter((test) => test.id !== testId),
      }))
    }
  }

  const testCategories = ["Hematology", "Chemistry", "Radiology", "Endocrinology", "Microbiology", "Pathology"]

  return (
    <div className="flex min-h-screen bg-gray-900">
      <LabSidebar />
      <div className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Laboratory Settings</h1>
              <p className="text-gray-400">Configure your laboratory operations and services</p>
            </div>
            <Button onClick={handleSaveSettings} className="bg-emerald-600 hover:bg-emerald-700 text-white">
              <Save className="w-4 h-4 mr-2" />
              Save All Changes
            </Button>
          </div>

          {/* Lab Information */}
          <Card className="bg-gray-800 border-gray-700 mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-white">
                <Building className="w-5 h-5" />
                <span>Laboratory Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Laboratory Name</label>
                  <input
                    type="text"
                    value={labSettings.labName}
                    onChange={(e) => setLabSettings((prev) => ({ ...prev, labName: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={labSettings.labPhone}
                    onChange={(e) => setLabSettings((prev) => ({ ...prev, labPhone: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                <input
                  type="email"
                  value={labSettings.labEmail}
                  onChange={(e) => setLabSettings((prev) => ({ ...prev, labEmail: e.target.value }))}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Laboratory Address</label>
                <textarea
                  value={labSettings.labAddress}
                  onChange={(e) => setLabSettings((prev) => ({ ...prev, labAddress: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </CardContent>
          </Card>

          {/* Operating Hours */}
          <Card className="bg-gray-800 border-gray-700 mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-white">
                <Clock className="w-5 h-5" />
                <span>Operating Hours</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Opening Time</label>
                  <input
                    type="time"
                    value={labSettings.openingTime}
                    onChange={(e) => setLabSettings((prev) => ({ ...prev, openingTime: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Closing Time</label>
                  <input
                    type="time"
                    value={labSettings.closingTime}
                    onChange={(e) => setLabSettings((prev) => ({ ...prev, closingTime: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
              <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
                <p className="text-emerald-400 text-sm">
                  <strong>Current Hours:</strong> {labSettings.openingTime} - {labSettings.closingTime}
                </p>
                <p className="text-gray-400 text-xs mt-1">
                  These hours will be displayed to patients when booking appointments
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Available Tests */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2 text-white">
                  <TestTube className="w-5 h-5" />
                  <span>Available Tests</span>
                </CardTitle>
                <Button onClick={() => setShowAddTest(true)} className="bg-emerald-600 hover:bg-emerald-700 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Test
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Add/Edit Test Form */}
              {showAddTest && (
                <div className="bg-gray-700/50 rounded-lg p-4 mb-6">
                  <h4 className="text-white font-medium mb-4">{editingTest ? "Edit Test" : "Add New Test"}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Test Name</label>
                      <input
                        type="text"
                        value={newTest.name}
                        onChange={(e) => setNewTest((prev) => ({ ...prev, name: e.target.value }))}
                        className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="e.g., Complete Blood Count"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                      <select
                        value={newTest.category}
                        onChange={(e) => setNewTest((prev) => ({ ...prev, category: e.target.value }))}
                        className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="">Select Category</option>
                        {testCategories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Duration</label>
                      <input
                        type="text"
                        value={newTest.duration}
                        onChange={(e) => setNewTest((prev) => ({ ...prev, duration: e.target.value }))}
                        className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="e.g., 30 min"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Price</label>
                      <input
                        type="text"
                        value={newTest.price}
                        onChange={(e) => setNewTest((prev) => ({ ...prev, price: e.target.value }))}
                        className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="e.g., $50"
                      />
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      onClick={editingTest ? handleUpdateTest : handleAddTest}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white"
                    >
                      {editingTest ? "Update Test" : "Add Test"}
                    </Button>
                    <Button
                      onClick={() => {
                        setShowAddTest(false)
                        setEditingTest(null)
                        setNewTest({ name: "", duration: "", price: "", category: "" })
                      }}
                      variant="outline"
                      className="border-gray-500 text-gray-300 hover:bg-gray-700"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}

              {/* Tests List */}
              <div className="space-y-4">
                {labSettings.availableTests.map((test) => (
                  <div
                    key={test.id}
                    className="flex items-center justify-between p-4 bg-gray-700/30 border border-gray-600 rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-1">
                        <h3 className="font-medium text-white">{test.name}</h3>
                        <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs rounded-full">
                          {test.category}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400">
                        Duration: {test.duration} • Price: {test.price}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => handleEditTest(test)}
                        variant="outline"
                        size="sm"
                        className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={() => handleDeleteTest(test.id)}
                        variant="outline"
                        size="sm"
                        className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
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
