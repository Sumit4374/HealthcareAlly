"use client";

import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Scan, Upload, Camera, FileText, Check, X, AlertCircle } from 'lucide-react';
import { PatientSidebar } from '@/components/patient-sidebar';

// Tesseract.js-like OCR simulation for demo purposes
const simulateOCR = async (imageFile) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulated OCR result for demo
      const sampleText = `Dr. Sarah Johnson MD
Date: 15/03/2024

Rx:
1. Amoxicillin 500mg
   Take 1 tablet twice daily for 7 days
   
2. Paracetamol 500mg  
   Take 1-2 tablets every Once a day as needed
   Maximum 8 tablets per day
   
3. Omeprazole 20mg
   Take 1 capsule once daily before breakfast
   Continue for 14 days

Follow up in 1 week if symptoms persist

Dr. Sarah Johnson
License: MD12345`;
      
      resolve({ data: { text: sampleText } });
    }, 3000);
  });
};

interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions?: string;
}

interface DoctorDetails {
  name: string;
  date: string;
  license?: string;
}

export default function ScanPrescriptionPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scannedText, setScannedText] = useState(null);
  const [medications, setMedications] = useState([]);
  const [doctorDetails, setDoctorDetails] = useState(null);
  const [error, setError] = useState(null);
  const [ocrStatus, setOcrStatus] = useState('idle');
  const fileInputRef = useRef(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file
    if (file.size > 10 * 1024 * 1024) {
      setError('File size too large. Please upload an image smaller than 10MB.');
      return;
    }

    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file (JPEG, PNG, WebP)');
      return;
    }

    setSelectedImage(file);
    setError(null);
    setOcrStatus('processing');
    setIsScanning(true);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
    };
    reader.readAsDataURL(file);

    try {
      const result = await simulateOCR(file);
      const extractedText = result.data.text;
      
      if (extractedText) {
        setScannedText(extractedText);
        parsePrescription(extractedText);
        setOcrStatus('success');
      } else {
        setError('No text found in image. Please try a clearer image.');
        setOcrStatus('error');
      }
    } catch (err) {
      console.error('OCR Error:', err);
      setError('Failed to process prescription. Please try with a clearer image.');
      setOcrStatus('error');
    } finally {
      setIsScanning(false);
    }
  };

  const parsePrescription = (text) => {
    try {
      const lines = text.split('\n').filter(line => line.trim());
      
      // Extract doctor details
      const doctorName = lines.find(line => 
        /dr\.?\s+[a-z]+/i.test(line) || 
        /[a-z]+\s+md|mbbs|do/i.test(line)
      ) || 'Dr. Unknown';
      
      const dateMatch = text.match(/\b\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}\b/);
      const licenseMatch = text.match(/license:?\s*([a-z0-9]+)/i);
      
      setDoctorDetails({
        name: doctorName.replace(/^dr\.?\s*/i, 'Dr. ').trim(),
        date: dateMatch ? dateMatch[0] : new Date().toLocaleDateString(),
        license: licenseMatch ? licenseMatch[1] : undefined
      });

      // Enhanced medication parsing
      const medicationsList = [];
      let currentMed = null;
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        const lowerLine = line.toLowerCase();
        
        // Skip header lines
        if (lowerLine.includes('rx:') || lowerLine.includes('prescription')) continue;
        if (lowerLine.match(/^dr\.?\s+/i) || lowerLine.includes('date:')) continue;
        if (lowerLine.includes('follow up') || lowerLine.includes('license')) continue;
        
        // Check if this is a new medication
        const isNewMed = /^\d+\./.test(line) || 
                        (/^[a-z]/i.test(line) && /\d+\s*(mg|ml|g|mcg)/i.test(line));
        
        if (isNewMed) {
          // Save previous medication
          if (currentMed) {
            medicationsList.push(currentMed);
          }
          
          // Parse new medication
          const nameMatch = line.match(/^(\d+\.\s*)?([a-z\s]+?)(?=\s*\d)/i);
          const dosageMatch = line.match(/(\d+\s*(mg|ml|g|mcg|units?))/i);
          
          currentMed = {
            name: nameMatch ? nameMatch[2].trim() : 'Unknown Medication',
            dosage: dosageMatch ? dosageMatch[0] : 'As directed',
            frequency: '',
            duration: '',
            instructions: line
          };
        } else if (currentMed && line.length > 5) {
          // This is a continuation line for current medication
          currentMed.instructions += '\n' + line;
          
          // Extract frequency and duration from instruction lines
          if (!currentMed.frequency) {
            const freqMatch = line.match(/(once|twice|thrice|\d+\s*times?)\s*(daily|a\s*day|per\s*day)/i) ||
                             line.match(/(every\s*\d+(-\d+)?\s*hours?)/i) ||
                             line.match(/(bd|tds|qid|od)/i);
            if (freqMatch) currentMed.frequency = freqMatch[0];
          }
          
          if (!currentMed.duration) {
            const durMatch = line.match(/(for\s*\d+\s*(days?|weeks?|months?))/i) ||
                            line.match(/(continue\s*(for\s*)?\d+\s*(days?|weeks?))/i);
            if (durMatch) currentMed.duration = durMatch[0];
          }
        }
      }
      
      // Add the last medication
      if (currentMed) {
        medicationsList.push(currentMed);
      }
      
      // Clean up and set defaults
      medicationsList.forEach(med => {
        if (!med.frequency) med.frequency = 'As directed';
        if (!med.duration) med.duration = 'As prescribed';
        med.instructions = med.instructions.replace(/^\d+\.\s*/, '').trim();
      });

      setMedications(medicationsList);
    } catch (err) {
      console.error('Parsing error:', err);
      setError('Failed to parse prescription. Showing raw text instead.');
    }
  };

  const handleCameraCapture = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment';
    input.onchange = (e) => {
      const file = e.target.files?.[0];
      if (file) {
        handleFileUpload({ target: { files: [file] } });
      }
    };
    input.click();
  };

  const confirmPrescription = () => {
    alert('Prescription confirmed and saved to patient records!');
    resetForm();
  };

  const resetForm = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setScannedText(null);
    setMedications([]);
    setDoctorDetails(null);
    setError(null);
    setOcrStatus('idle');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100">
      <PatientSidebar />

      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Scan Prescription</h1>
            <p className="text-gray-600">Upload or scan your prescription to extract text</p>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded flex items-center">
              <AlertCircle className="w-5 h-5 mr-3" />
              <div className="flex-1">{error}</div>
              {ocrStatus === 'error' && (
                <Button 
                  onClick={resetForm}
                  variant="ghost"
                  size="sm"
                  className="ml-4 text-red-700 hover:bg-red-200"
                >
                  Try Again
                </Button>
              )}
            </div>
          )}

          {!scannedText ? (
            <Card className="bg-white border-emerald-200">
              <CardContent className="p-8">
                <div className="text-center">
                  <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    {isScanning ? (
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
                    ) : (
                      <Scan className="w-12 h-12 text-emerald-500" />
                    )}
                  </div>

                  {isScanning ? (
                    <>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Processing Prescription...</h3>
                      <p className="text-gray-600">Please wait while we analyze your prescription</p>
                      <div className="mt-4 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 animate-pulse" style={{ width: '70%' }}></div>
                      </div>
                    </>
                  ) : (
                    <>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Upload Your Prescription</h3>
                      <p className="text-gray-600 mb-6">Take a photo or upload an image of your prescription</p>

                      <div className="space-y-4">
                        <div className="flex justify-center gap-4">
                          <Label htmlFor="prescription-upload" className="sr-only">Upload prescription</Label>
                          <Input
                            ref={fileInputRef}
                            id="prescription-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                          <Button
                            onClick={() => fileInputRef.current?.click()}
                            className="bg-emerald-500 hover:bg-emerald-600 text-white"
                            disabled={isScanning}
                          >
                            <Upload className="w-4 h-4 mr-2" />
                            Upload Image
                          </Button>
                          <Button
                            onClick={handleCameraCapture}
                            variant="outline"
                            className="border-emerald-500 text-emerald-600 bg-transparent"
                            disabled={isScanning}
                          >
                            <Camera className="w-4 h-4 mr-2" />
                            Take Photo
                          </Button>
                        </div>
                        <div className="text-sm text-gray-500 bg-emerald-50 p-4 rounded-lg">
                          <h4 className="font-medium mb-2">For best results:</h4>
                          <ul className="list-disc list-inside space-y-1">
                            <li>Take photo in good lighting</li>
                            <li>Ensure all text is visible and in focus</li>
                            <li>Place prescription on a dark, flat surface</li>
                            <li>Avoid shadows and glare</li>
                            <li>Capture the entire prescription</li>
                          </ul>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {/* Image Preview */}
              {imagePreview && (
                <Card className="bg-white border-emerald-200">
                  <CardHeader>
                    <CardTitle className="text-emerald-600">Prescription Image</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <img
                      src={imagePreview}
                      alt="Prescription"
                      className="w-full max-h-96 object-contain rounded-lg border"
                    />
                  </CardContent>
                </Card>
              )}

              {doctorDetails && (
                <Card className="bg-white border-emerald-200">
                  <CardHeader>
                    <CardTitle className="text-emerald-600">
                      Prescription Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-gray-500">Prescribed by</Label>
                        <p className="font-medium">{doctorDetails.name}</p>
                      </div>
                      <div>
                        <Label className="text-gray-500">Date</Label>
                        <p className="font-medium">{doctorDetails.date}</p>
                      </div>
                      {doctorDetails.license && (
                        <div className="col-span-2">
                          <Label className="text-gray-500">License</Label>
                          <p className="font-medium">{doctorDetails.license}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {medications.length > 0 ? (
                <Card className="bg-white border-emerald-200">
                  <CardHeader>
                    <CardTitle className="flex items-center text-emerald-600">
                      <FileText className="w-6 h-6 mr-2" />
                      Prescribed Medications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {medications.map((med, index) => (
                        <div key={index} className="border-b border-gray-100 pb-4 last:border-0">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h4 className="font-bold text-gray-900">{med.name}</h4>
                              <div className="grid grid-cols-3 gap-2 mt-2 text-sm">
                                <div>
                                  <Label className="text-gray-500">Dosage</Label>
                                  <p>{med.dosage}</p>
                                </div>
                                <div>
                                  <Label className="text-gray-500">Frequency</Label>
                                  <p>{med.frequency}</p>
                                </div>
                                <div>
                                  <Label className="text-gray-500">Duration</Label>
                                  <p>{med.duration}</p>
                                </div>
                              </div>
                              {med.instructions && (
                                <div className="mt-2">
                                  <Label className="text-gray-500">Full Instructions</Label>
                                  <p className="text-sm bg-gray-50 p-2 rounded">{med.instructions}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="bg-white border-emerald-200">
                  <CardHeader>
                    <CardTitle className="text-emerald-600">
                      Extracted Prescription Text
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="whitespace-pre-wrap text-sm text-gray-800 bg-gray-50 p-4 rounded border border-gray-200 max-h-96 overflow-y-auto">
                      {scannedText}
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card className="bg-white border-emerald-200">
                <CardFooter className="flex justify-between">
                  <Button 
                    onClick={resetForm} 
                    variant="outline" 
                    className="border-gray-300"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Scan Again
                  </Button>
                  <Button 
                    onClick={confirmPrescription} 
                    className="bg-emerald-500 hover:bg-emerald-600"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Confirm Prescription
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}