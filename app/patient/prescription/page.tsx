'use client'
import { useState } from 'react'

export default function ScanPrescription() {
  const [image, setImage] = useState<File | null>(null)
  const [result, setResult] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const handleUpload = async () => {
    if (!image) return
    setLoading(true)

    const formData = new FormData()
    formData.append('file', image)

    try {
      const res = await fetch('/api/ocr', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      setResult(data.text)
    } catch (err) {
      alert('OCR Failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-bold">Scan Your Prescription</h2>

      <input type="file" onChange={(e) => setImage(e.target.files?.[0] || null)} />
      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        disabled={!image || loading}
      >
        {loading ? 'Scanning...' : 'Upload & Scan'}
      </button>

      {result && (
        <div className="mt-4 bg-gray-100 p-4 rounded text-sm whitespace-pre-wrap">
          <strong>Result:</strong>
          <br />
          {result}
        </div>
      )}
    </div>
  )
}
